if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) 
{ Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs; exit }

$AREWEDONEYET = 30
while ($AREWEDONEYET -lt 39) { Sleep -Seconds .1; $AREWEDONEYET++;     Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "Rearranging Removeable Drives...";}

#Move any extraneous drives to the end of the lettering system, to be replaced later for unitialized drives if necessary
$assignments = 0
$letters = (Get-PSDrive).Name -match '^[a-z]$'
foreach ($letter in $letters)
{
    if($letter -ne 'C')
    {
        #Write-Host $letters`n$Letter`n`n
        $assignments += 1
        $currentdrive = Get-WmiObject -ClassName Win32_Volume -Filter “DriveLetter = '$letter`:'”
        $currentdrive | Set-WmiInstance -Property @{DriveLetter = "$([char](91-$assignments)):"}
    }
    if($AREWEDONEYET -lt 59) { $AREWEDONEYET+=5;     Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "Rearranging Removeable Drives...";}
}

while ($AREWEDONEYET -lt 69) { Sleep -Seconds .1; $AREWEDONEYET++;     Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "Initializing as GPT to maximum size...";}


#stop the thing that makes unnecessary popups as a result of a microsoft powershell backend bug.
Stop-Service -Name ShellHWDetection

#Find any uninitialized drives
$disk = Get-Disk | where-object PartitionStyle -eq "RAW" 

#Count number of initialized drives
$initializeCount = 0

foreach  ($d in $disk) 
{
    if ($AREWEDONEYET -lt 99) { $AREWEDONEYET++;     Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "Initializing as GPT to maximum size...";}
    Initialize-Disk -Number $d.Number -PartitionStyle GPT -Confirm:$False
    if ($AREWEDONEYET -lt 99) { $AREWEDONEYET++;     Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "Initializing as GPT to maximum size...";}
    New-Partition -DiskNumber $d.Number -UseMaximumSize -AssignDriveLetter | Format-Volume -FileSystem NTFS -NewFileSystemLabel "Storage" -Confirm:$False
    if ($AREWEDONEYET -lt 99) { $AREWEDONEYET++;     Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "Initializing as GPT to maximum size...";}
    $initializeCount += 1
}

Start-Service -Name ShellHWDetection

Write-Host Drives are now properly initialized!

Sleep -Milliseconds 2500