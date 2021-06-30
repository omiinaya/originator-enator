if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) 
{ Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs; exit }  

##remove my USB from the D: position to make room for proper drive initialization
#$driveLetters= (Get-Volume).DriveLetter
#foreach ($drive in $driveLetters)
#{
#    if (Where-Object ("d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z" -in $drive))
#    {
#        switch ($drive)
#        {
#            "d" {Get-Volume -Drive D | Get-Partition | Remove-PartitionAccessPath -AccessPath "D`:\"}
#            "e" {Get-Volume -Drive E | Get-Partition | Remove-PartitionAccessPath -AccessPath "E`:\"}
#            "f" {Get-Volume -Drive F | Get-Partition | Remove-PartitionAccessPath -AccessPath "F`:\"}
#            "g" {Get-Volume -Drive G | Get-Partition | Remove-PartitionAccessPath -AccessPath "G`:\"}
#            "h" {Get-Volume -Drive H | Get-Partition | Remove-PartitionAccessPath -AccessPath "H`:\"}
#            "i" {Get-Volume -Drive I | Get-Partition | Remove-PartitionAccessPath -AccessPath "I`:\"}
#            "j" {Get-Volume -Drive J | Get-Partition | Remove-PartitionAccessPath -AccessPath "J`:\"}
#            "k" {Get-Volume -Drive K | Get-Partition | Remove-PartitionAccessPath -AccessPath "K`:\"}
#            "l" {Get-Volume -Drive L | Get-Partition | Remove-PartitionAccessPath -AccessPath "L`:\"}
#            "m" {Get-Volume -Drive M | Get-Partition | Remove-PartitionAccessPath -AccessPath "M`:\"}
#            "n" {Get-Volume -Drive N | Get-Partition | Remove-PartitionAccessPath -AccessPath "N`:\"}
#            "o" {Get-Volume -Drive O | Get-Partition | Remove-PartitionAccessPath -AccessPath "O`:\"}
#            "p" {Get-Volume -Drive P | Get-Partition | Remove-PartitionAccessPath -AccessPath "P`:\"}
#            "q" {Get-Volume -Drive Q | Get-Partition | Remove-PartitionAccessPath -AccessPath "Q`:\"}
#            "r" {Get-Volume -Drive R | Get-Partition | Remove-PartitionAccessPath -AccessPath "R`:\"}
#            "s" {Get-Volume -Drive S | Get-Partition | Remove-PartitionAccessPath -AccessPath "S`:\"}
#            "t" {Get-Volume -Drive T | Get-Partition | Remove-PartitionAccessPath -AccessPath "T`:\"}
#            "u" {Get-Volume -Drive U | Get-Partition | Remove-PartitionAccessPath -AccessPath "U`:\"}
#            "v" {Get-Volume -Drive V | Get-Partition | Remove-PartitionAccessPath -AccessPath "V`:\"}
#            "w" {Get-Volume -Drive W | Get-Partition | Remove-PartitionAccessPath -AccessPath "W`:\"}
#            "x" {Get-Volume -Drive X | Get-Partition | Remove-PartitionAccessPath -AccessPath "X`:\"}
#            "y" {Get-Volume -Drive Y | Get-Partition | Remove-PartitionAccessPath -AccessPath "Y`:\"}
#            "z" {Get-Volume -Drive Z | Get-Partition | Remove-PartitionAccessPath -AccessPath "Z`:\"}
#        }
#    }
#
#    $DataPartition = Get-WMIObject Win32_Volume 
#
#    $DataPartition.DriveLetter = $null
#    $DataPartition.Put()
#}
#
#
#Try
#{
#    Set-WmiInstance -input $DataPartition -Arguments @{DriveLetter="D:"} | Out-File -FilePath  C:\Windows\Temp\FixPartitionsLog.txt -Append
#    Set-WmiInstance -input $FileServerPartition -Arguments @{DriveLetter="E:"} | Out-File -FilePath  C:\Windows\Temp\FixPartitionsLog.txt -Append
#
#}
#Catch
#{
#    $ErrorMessage = $_.Exception.Message | Out-File -FilePath C:\Windows\Temp\FixPartitionsLog.txt
#}
#sleep 5






#Unassign all drive letters
#$letters=1
#while($letters -lt 24)
#{
#   $letter = ([char](67 + $letters))
#   if(Test-Path (Get-Volume -Drive $letter ))
#   {
#       Get-Volume -Drive $letter | Get-Partition | Remove-PartitionAccessPath -AccessPath "$letter`:\" 
#   }
#   $letters+=1
#   Write-Host $letters
#}

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

#Mount everything else again
#$drives = (Get-Volume | Select -Property DriveLetter | Where-Object {$_.DriveLetter -eq "`0"});
#foreach ($drive in $drives)
#{
#    $drive | Set-Partition -NewDriveLetter [char](68+$initializeCount)
#    $initializeCount += 1; 
#}

Start-Service -Name ShellHWDetection

Write-Host Drives are now properly initialized!

Sleep -Milliseconds 2500