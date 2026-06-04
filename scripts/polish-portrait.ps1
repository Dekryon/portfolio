# Professional portrait edit pass for public/portrait.jpg.
# Source: school-hallway mirror selfie (IMG_802C213E-...jpeg).
#
# Pipeline:
#   1. Rotate per EXIF, crop to 4:5, resize to 1200x1500
#   2. LockBits for fast per-pixel ops
#   3. White balance: pull warmth out of the indoor fluorescent cast
#   4. S-curve contrast: gentle, slightly crush shadows
#   5. Global desaturation 15% (editorial moodier read)
#   6. Subtle radial vignette (max -22% at corners)
#   7. UnlockBits, save JPEG q88
#
# All linear ops in 0..255 byte space (Portrait.jsx applies its own
# grayscale + contrast-110 by default — we pre-grade so the color-on-hover
# state holds up too).

Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Image]::FromFile('C:\Users\ukugr\iCloudPhotos\Photos\IMG_802C213E-CE13-4D1E-89EA-E4C5E6EB935C.jpeg')
$src.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone)

# crop 3024x3780 (4:5) centered vertically, then resize to 1200x1500
$bmp = New-Object System.Drawing.Bitmap 1200, 1500, ([System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode    = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode  = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.DrawImage($src,
  (New-Object System.Drawing.Rectangle 0, 0, 1200, 1500),
  (New-Object System.Drawing.Rectangle 0, 126, 3024, 3780),
  [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$src.Dispose()

# Pre-build LUTs for the three global ops
$wbR = New-Object byte[] 256   # red:   leave alone
$wbG = New-Object byte[] 256   # green: leave alone
$wbB = New-Object byte[] 256   # blue:  multiply 1.07 to cool the warm cast
# S-curve in normalized 0..1: y = 0.5 - cos(pi*x)*0.5, blended 0.55 with linear
# Desaturation: rec601 luma * 0.15 + color * 0.85 (applied later per-pixel)
for ($i = 0; $i -lt 256; $i++) {
  $x = $i / 255.0
  # Gentle S-curve, blended
  $s = 0.5 - [math]::Cos([math]::PI * $x) * 0.5
  $y = $s * 0.55 + $x * 0.45
  # White balance per channel
  $wbR[$i] = [byte]([math]::Min(255, [math]::Max(0, [int]([math]::Round($y * 255 * 1.00)))))
  $wbG[$i] = [byte]([math]::Min(255, [math]::Max(0, [int]([math]::Round($y * 255 * 1.00)))))
  $wbB[$i] = [byte]([math]::Min(255, [math]::Max(0, [int]([math]::Round($y * 255 * 1.07)))))
}

# Pre-build vignette mask: 1.0 at center, ~0.78 at corners, smooth
$cx = 600.0; $cy = 750.0
$maxR = [math]::Sqrt($cx * $cx + $cy * $cy)
# Cache per-row factor isn't trivial because vignette depends on both x and y.

# LockBits, walk the buffer
$rect = New-Object System.Drawing.Rectangle 0, 0, 1200, 1500
$data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$stride = $data.Stride
$len    = $stride * 1500
$buf = New-Object byte[] $len
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $buf, 0, $len)

# 24bpp = BGR per pixel
$desatMix = 0.15
$vigBase  = 0.78
for ($y = 0; $y -lt 1500; $y++) {
  $dy = $y - $cy
  $rowStart = $y * $stride
  for ($x = 0; $x -lt 1200; $x++) {
    $dx = $x - $cx
    $r = [math]::Sqrt($dx * $dx + $dy * $dy) / $maxR  # 0..1
    # Smooth falloff (raised cosine), gentle at center, stronger at corners
    $v = $vigBase + (1.0 - $vigBase) * (1.0 - $r * $r)
    if ($v -gt 1.0) { $v = 1.0 } elseif ($v -lt 0.0) { $v = 0.0 }

    $p = $rowStart + $x * 3
    $b = $buf[$p]
    $g0 = $buf[$p + 1]
    $r0 = $buf[$p + 2]

    # WB + S-curve via LUT
    $b = $wbB[$b]
    $g0 = $wbG[$g0]
    $r0 = $wbR[$r0]

    # Desaturate toward luma
    $luma = 0.299 * $r0 + 0.587 * $g0 + 0.114 * $b
    $r1 = $luma * $desatMix + $r0 * (1.0 - $desatMix)
    $g1 = $luma * $desatMix + $g0 * (1.0 - $desatMix)
    $b1 = $luma * $desatMix + $b  * (1.0 - $desatMix)

    # Vignette
    $r1 *= $v; $g1 *= $v; $b1 *= $v

    if ($r1 -gt 255) { $r1 = 255 } elseif ($r1 -lt 0) { $r1 = 0 }
    if ($g1 -gt 255) { $g1 = 255 } elseif ($g1 -lt 0) { $g1 = 0 }
    if ($b1 -gt 255) { $b1 = 255 } elseif ($b1 -lt 0) { $b1 = 0 }

    $buf[$p]     = [byte]$b1
    $buf[$p + 1] = [byte]$g1
    $buf[$p + 2] = [byte]$r1
  }
}

[System.Runtime.InteropServices.Marshal]::Copy($buf, 0, $data.Scan0, $len)
$bmp.UnlockBits($data)

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 90L
$out = 'C:\Claude code\portfolio\public\portrait.jpg'
$bmp.Save($out, $encoder, $params)
$bmp.Dispose()

$info = Get-Item $out
Write-Host ("saved {0} ({1} KB)" -f $info.Name, [int]($info.Length / 1024))
