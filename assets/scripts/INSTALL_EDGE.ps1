# Ensure that powershell has admin privledges to avoid popups
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) 
{ Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs; exit }  

CD $PSScriptRoot

Start-Process msiexec.exe -Wait -ArgumentList '/i ORIGINator2.0\Software\Edge\Edge.msi /quiet'
