param (
    [Parameter(Mandatory = $true)]
    [string]$name,
    [Parameter(Mandatory = $true)]
    [string]$description
)

write-output "The name: $name"
write-output "The description: $description"

7z x template.7z -o"$name"

[int]$port = [convert]::ToInt32((Get-Content -Path "last_debug_port")) + 1

Write-Output "Port: $port"

$packageFile = (Get-Content -Path "$name\package.json" -Raw) -replace "\`$name", $name -replace "\`$description", $description -replace "\`$debugPort", $port

Set-Content -Path "last_debug_port" -Value $port
Set-Content -Path "$name\package.json" -Value $packageFile

$workspace = Get-Content -Path Lyst.code-workspace | ConvertFrom-Json
$workspace.folders = $workspace.folders + @(@{path=$name})
Write-Output $workspace
Set-Content -Path Lyst.code-workspace -Value ($workspace | ConvertTo-Json)