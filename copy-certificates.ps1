# Copy certificate files from My Documents to portfolio/certificates
# Run from: portfolio folder (where index.html is)
# Usage: .\copy-certificates.ps1
# Or: powershell -ExecutionPolicy Bypass -File copy-certificates.ps1

$sourceDir = Join-Path $env:USERPROFILE "Documents"
$destDir = Join-Path $PSScriptRoot "certificates"

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

$files = @(
    @{ Source = "Hackthon-Certificate.jpg"; Dest = "Hackthon-Certificate.jpg" },
    @{ Source = "Devops_certificate.jpg"; Dest = "Devops_certificate.jpg" },
    @{ Source = "iot_workshop_certifcate.jpg"; Dest = "iot_workshop_certifcate.jpg" },
    @{ Source = "htmlbootcamp.pdf"; Dest = "htmlbootcamp.pdf" },
    @{ Source = "java udemy.pdf"; Dest = "java udemy.pdf" },
    @{ Source = "javabootcamp.pdf"; Dest = "javabootcamp.pdf" },
    @{ Source = "sql_boot _camp.pdf"; Dest = "sql_boot _camp.pdf" }
)

foreach ($f in $files) {
    $srcPath = Join-Path $sourceDir $f.Source
    $dstPath = Join-Path $destDir $f.Dest
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $dstPath -Force
        Write-Host "Copied: $($f.Source)"
    } else {
        Write-Host "Not found (copy manually): $($f.Source)" -ForegroundColor Yellow
    }
}

Write-Host "`nDone. Certificates folder: $destDir"
