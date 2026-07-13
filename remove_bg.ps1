Add-Type -AssemblyName System.Drawing
$path = 'c:\Users\ASUS\OneDrive\Lucenva\lucenva\lucenva\images\logo.png'
$img = [System.Drawing.Image]::FromFile($path)
$bmp = New-Object System.Drawing.Bitmap($img)
$img.Dispose()
$rect = New-Object System.Drawing.Rectangle(0, 0, $bmp.Width, $bmp.Height)
$bmpData = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$ptr = $bmpData.Scan0
$bytes = [Math]::Abs($bmpData.Stride) * $bmp.Height
$rgbValues = New-Object byte[] $bytes
[System.Runtime.InteropServices.Marshal]::Copy($ptr, $rgbValues, 0, $bytes)
for ($i = 0; $i -lt $rgbValues.Length; $i += 4) {
    $b = $rgbValues[$i]
    $g = $rgbValues[$i+1]
    $r = $rgbValues[$i+2]
    # If the pixel is close to white, make it transparent
    if ($r -gt 240 -and $g -gt 240 -and $b -gt 240) {
        $rgbValues[$i+3] = 0
    }
}
[System.Runtime.InteropServices.Marshal]::Copy($rgbValues, 0, $ptr, $bytes)
$bmp.UnlockBits($bmpData)
$bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host 'Image processed successfully'
