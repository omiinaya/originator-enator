if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) 
{ Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs; exit }  

CD $PSScriptRoot

$ArmouryInstall = Start-Process -FilePath "Armoury" 
$ArmouryInstall.WaitForExit()

Start-Process msiexec.exe -Wait -ArgumentList '/i iCUE.msi /quiet'
exit