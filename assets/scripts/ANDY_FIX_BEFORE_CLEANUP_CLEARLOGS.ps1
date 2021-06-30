if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) 
{ Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs; exit }

CD $PSScriptRoot

#Copy import-Workorder file to a safe place where sysprep can't find it
if(Test-Path C:\ORIGINator2.0\Import-Workorder.txt)
{
    Copy-Item C:\ORIGINator2.0\Import-Workorder.txt C:\Windows\
}
else
{
    if(((Get-Random -Maximum 100) -eq 42) -or ((Get-Random -Maximum 100) -eq 12))
    {
        Read-Host "Workorder not found on this computer, did you run me after cleanup/clearlogs? `nJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONNNNNNNNNNAAAATHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    
    }
    else 
    {
        Read-Host "Workorder not found on this computer, did you run me after cleanup/clearlogs? SHAME! `nOr did the import fail... `n`n(press Enter to Exit)"
    }
    Exit;
}


#setup a color array for fun
$colors = [Enum]::GetValues([System.ConsoleColor])
#Track progress to display it
$backgroundRandomColor = $colors|Get-Random
$foregroundRandomColor = $colors|Get-Random
$Host.PrivateData.ProgressBackgroundColor=$backgroundRandomColor
#make sure the text is visible on the selected background by eliminating the few possiblities where it isn't
while($backgroundRandomColor -eq $foregroundRandomColor)
{
    $foregroundRandomColor = $colors|Get-Random
    if($backgroundRandomColor -eq "White"){ while($foregroundRandomColor -eq "White") {$foregroundRandomColor = $colors|Get-Random} $Host.PrivateData.ProgressForegroundColor=$foregroundRandomColor}
    elseif($backgroundRandomColor -eq "Yellow"){ while(($foregroundRandomColor -eq "White") -or ($foregroundRandomColor -eq "Yellow")) {$foregroundRandomColor = $colors|Get-Random} $Host.PrivateData.ProgressForegroundColor=$foregroundRandomColor}
    else {$Host.PrivateData.ProgressForegroundColor=$foregroundRandomColor}
}
$Host.PrivateData.ProgressForegroundColor=$foregroundRandomColor

if(Get-Disk | where-object PartitionStyle -eq "RAW")
{
   while ($AREWEDONEYET -lt 29) { Sleep -Seconds .1; $AREWEDONEYET++;     Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "Found Some!";}
   Invoke-Expression -Command .\INITIALIZE_DRIVES.ps1 4>&1 3>&1 2>&1 >> .\logs\log0_drives.txt
}

$AREWEDONEYET = 100

Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "Hunting Hard Drives";

Write-Host “Success, see you after sysprep!”
Sleep -Seconds 4;
Exit;