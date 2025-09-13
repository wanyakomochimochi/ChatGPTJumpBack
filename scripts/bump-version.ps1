Param(
  [Parameter(Mandatory=$false)][string]$Version,
  [switch]$Major,
  [switch]$Minor,
  [switch]$Patch
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Get-Manifest {
  (Get-Content -Raw "$PSScriptRoot/../manifest.json") | ConvertFrom-Json
}

function Save-Manifest($mf) {
  $json = $mf | ConvertTo-Json -Depth 20
  $utf8NoBom = New-Object System.Text.UTF8Encoding $false
  [System.IO.File]::WriteAllText((Join-Path $PSScriptRoot '..\manifest.json'), $json, $utf8NoBom)
}

function Bump-Version($cur, $part) {
  $parts = $cur.Split('.')
  while ($parts.Count -lt 3) { $parts += '0' }
  switch ($part) {
    'major' { $parts[0] = ([int]$parts[0] + 1); $parts[1] = 0; $parts[2] = 0 }
    'minor' { $parts[1] = ([int]$parts[1] + 1); $parts[2] = 0 }
    'patch' { $parts[2] = ([int]$parts[2] + 1) }
  }
  ($parts -join '.')
}

$mf = Get-Manifest
if (-not $mf.version) { throw 'manifest.json does not contain "version"' }

if ($Version) {
  $new = $Version
} else {
  if ($Major) { $new = Bump-Version $mf.version 'major' }
  elseif ($Minor) { $new = Bump-Version $mf.version 'minor' }
  else { $new = Bump-Version $mf.version 'patch' }
}

$mf.version = $new
$mf.version_name = $new
Save-Manifest $mf

Write-Host "Updated manifest.json to version $new" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  git add manifest.json" -ForegroundColor Cyan
Write-Host "  git commit -m 'chore: bump version to $new'" -ForegroundColor Cyan
Write-Host "  git tag -a v$new -m 'Release v$new'" -ForegroundColor Cyan
Write-Host "  git push && git push origin v$new" -ForegroundColor Cyan
