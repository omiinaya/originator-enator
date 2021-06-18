# Ensure that powershell has admin privledges to avoid popups
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) 
{ Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs; exit }  

CD $PSScriptRoot

Start-Process -FilePath "Install.cmd" -WorkingDirectory ".\ORIGINator2.0\Software\Chrome\" -Wait

$source = ".\ORIGINator2.0\Software\Chrome\master_preferences"
$destination = "C:\Program Files\Google\Chrome\Application\master_preferences"

Copy-Item $source -Destination $destination -force
