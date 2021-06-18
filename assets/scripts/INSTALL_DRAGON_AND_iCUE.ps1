if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) 
{ Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs; exit }  

CD $PSScriptRoot

$DragonSDKInstall = Start-Process -FilePath "Offline_Install.bat" -WorkingDirectory "\CleanInstallDragonCenter2.0.65.0SDK20200731updatecommSDK54\SDK"
$Dragon_AppInstall = Start-Process -FilePath "DragonCenter" -WorkingDirectory "\CleanInstallDragonCenter2.0.65.0SDK20200731updatecommSDK54\UWP"
$DragonSDKInstall.WaitForExit()
$Dragon_AppInstall.WaitForExit()

Start-Process msiexec.exe -Wait -ArgumentList '/i iCUE.msi /quiet'