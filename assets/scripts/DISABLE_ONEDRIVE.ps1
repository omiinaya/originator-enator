
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) 
{ Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs; exit }

#these are a bunch of paths that need to be changed in the registry in order to disable stuff from starting up
$32bit = "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run"
$32bitRunOnce = "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce"
$64bit = "HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run"
$64bitRunOnce = "HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\RunOnce"
$currentLOU = "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run"
$currentLOURunOnce = "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce"

#The list of things that need to be disabled from starting up (in this case only Onedrive but this makes future changes easy)
$disableList = @("Onedrive")
        
New-PSDrive -PSProvider Registry -Name HKU -Root HKEY_USERS | Out-Null
$startups = Get-CimInstance Win32_StartupCommand | Select-Object Name,Location

foreach ($startUp in $startUps){
    if ($startUp.Name -like $disableList){
        $number = ($startUp.Location).IndexOf("\")
        $location = ($startUp.Location).Insert("$number",":")
        #Write-Output "Disabling $($startUp.Name) from $location)"
        Remove-ItemProperty -Path "$location" -Name "$($startUp.name)" 
    }
}

$regStartList = Get-Item -path $32bit,$32bitRunOnce,$64bit,$64bitRunOnce,$currentLOU,$currentLOURunOnce | Where-Object {$_.ValueCount -ne 0} | Select-Object  property,name

foreach ($regName in $regStartList.name) {
   $regNumber = ($regName).IndexOf("\")
   $regLocation = ($regName).Insert("$regNumber",":")
   if ($regLocation -like "*HKEY_LOCAL_MACHINE*"){
    $regLocation = $regLocation.Replace("HKEY_LOCAL_MACHINE","HKLM")
    #write-host $regLocation
   }
   if ($regLocation -like "*HKEY_CURRENT_USER*"){
    $regLocation = $regLocation.Replace("HKEY_CURRENT_USER","HKCU")
    #write-host $regLocation
   }
}
