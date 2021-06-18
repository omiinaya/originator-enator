if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) 
{ Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs; exit }  

CD $PSScriptRoot

Start-Process -FilePath "Folding.exe" -WorkingDirectory ".\ORIGINator2.0\Software\Folding@Home\"
Sleep 4;

$wshellFolding = New-Object -ComObject wscript.shell;
$wshellFolding.SendKeys('~');
Sleep -Seconds .4;
$wshellFolding.SendKeys('~');
Sleep -Seconds .4;
$wshellFolding.SendKeys('{tab}');
Sleep -Seconds .7;
$wshellFolding.SendKeys('{tab}');
Sleep -Seconds .7;
$wshellFolding.SendKeys('{down}');
Sleep -Seconds .7;
$wshellFolding.SendKeys('~');
Sleep -Seconds .5;
$wshellFolding.SendKeys('~');
Sleep -Seconds .5;
$wshellFolding.SendKeys('~');
Sleep -Seconds .5;
$wshellFolding.SendKeys('{tab}');
Sleep -Seconds .7;
$wshellFolding.SendKeys('{tab}');
Sleep -Seconds .7;
$wshellFolding.SendKeys('{down}');
Sleep -Seconds .7;
$wshellFolding.SendKeys('{down}');
Sleep -Seconds .7;
$wshellFolding.SendKeys('~');
Sleep -Seconds 5;
$wshellFolding.SendKeys(' ');
Sleep -Seconds .7;
$wshellFolding.SendKeys('~');
Sleep -Seconds .7;
