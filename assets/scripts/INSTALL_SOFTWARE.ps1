if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) 
{ Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs; exit }  

CD $PSScriptRoot

if(Test-Path C:\Windows\Import-Workorder.txt)
{
    #Make sure windows is activated
    Read-Host -Prompt “Make sure windows is activated before running this`n`nThen press enter to continue”
    Clear-Host;
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


#Track progress to display it
$AREWEDONEYET = 0;

#Make sure this will install things appropriately
if (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'Google Chrome' -Quiet)
{
    Write-Host "|  Google Chrome will install  |"
}
else
{
    Write-Host "|| Chrome will NOT install    ||"
}


if (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'Firefox' -Quiet)
{
    Write-Host "|  Firefox will install        |"
}
else
{
    Write-Host "|| Firefox will NOT install   ||"
}


if (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'Battle.net' -Quiet)
{
    Write-Host "|  Battle.net will install     |"
}
else
{
    Write-Host "|| Battle.net will NOT install||"
}

if (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'MB-ASUS' -Quiet)
{
    Write-Host "|  Armoury Crate will install  |"
}
else
{
    Write-Host "|| Armoury C will NOT install ||"
}

#if ( -not (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'H60 PRO' -Quiet))
#{
#    if (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'COOL-CORSAIR' -Quiet)
#    {
#        Write-Host "|  iCUE will install           |"
#    }
#}
#else
#
#    Write-Host "|| iCUE will NOT install      ||"
#}
if ((Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'COOL-CORSAIR' -Quiet) -and ((-not (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'H60 PRO' -Quiet)) -or (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'H60 PRO XT' -Quiet)))
{
        Write-Host "|  iCUE will install           |"
}
elseif ((Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'H60i RGB' -Quiet) -or (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'CL-9011109-WW' -Quiet) -or (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'CL-9011110-WW' -Quiet) -or (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'CO-8950020' -Quiet) -or (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'CW-9060049' -Quiet) -or (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'CW-9060043' -Quiet) -or (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'iCUE' -Quiet) -or (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'CW-9060045' -Quiet) -or (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'CW-8960067' -Quiet) -or (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'CX-' -Quiet)) 
{
    Write-Host "|  iCUE will install           |"
}
else
{
    Write-Host "||    iCUE will NOT install   ||"
}

if (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'Uplay' -Quiet)
{
    Write-Host "|  Uplay will install          |"
}
else
{
    Write-Host "|| Uplay will NOT install     ||"
}

if (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'FOLDING AT HOME' -Quiet)
{
    Write-Host "|  Folding@HOME will install   |"
}
else
{
    Write-Host "|| Fldg@HOME will NOT install ||"
}

if (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'DISCORD' -Quiet)
{
    Write-Host "|  DISCORD will install        |"
}
else
{
    Write-Host "|| DISCORD will NOT install   ||"
}


#Let the user check if things are going to install correctly ################################################################################
#Now in fun colors!
$originalForegroundColor = $Host.UI.RawUI.ForegroundColor
$originalBackgroundColor = $Host.UI.RawUI.BackgroundColor
Write-Host -NoNewline “Press any key "
$Host.UI.RawUI.ForegroundColor = "Red"
$Host.UI.RawUI.BackgroundColor = "Black"
Write-Host -NoNewline "E X C E P T   E N T E R"
$Host.UI.RawUI.ForegroundColor = $originalForegroundColor
$Host.UI.RawUI.BackgroundColor = $originalBackgroundColor
Write-Host -NoNewline " to continue”
$keypress = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

#if enter key was pressed...
if($keypress.character -eq 0x0D)
{
    "How dare you.."
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
}
Clear-Host;



# Actually do the installs! #################################################################################################################

$AREWEDONEYET = 0
Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "Taming Edge";

while ($AREWEDONEYET -lt 5) { Sleep -Milliseconds 300; $AREWEDONEYET++; Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "Taming Edge";}
Invoke-Expression -Command .\INSTALL_EDGE.ps1 4>&1 3>&1 2>&1 >> .\logs\log1_edge.txt


if (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'Google Chrome' -Quiet)
{
    $AREWEDONEYET = 20
    Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "Finding Chrome";
    Invoke-Expression -Command .\INSTALL_CHROME.ps1 4>&1 3>&1 2>&1 >> .\logs\log2_chrome.txt
}

while ($AREWEDONEYET -lt 29) { Sleep -Seconds .1; $AREWEDONEYET++;     Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "...";}

if (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'Firefox' -Quiet)
{
    $AREWEDONEYET = 30
    Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "Firefoxing";
    Invoke-Expression -Command .\INSTALL_FIREFOX.ps1 4>&1 3>&1 2>&1 >> .\logs\log3_fire.txt
}

while ($AREWEDONEYET -lt 39) { Sleep -Seconds .1; $AREWEDONEYET++; Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "...";}

#INSTALL BATTLENET
#if (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'Battle.net' -Quiet)
#{
#    $AREWEDONEYET = 40
#    Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "Battling Activision";
#    Invoke-Expression -Command .\INSTALL_BATTLENET.ps1 4>&1 3>&1 2>&1 >> .\logs\log4_batt.txt
#}

while ($AREWEDONEYET -lt 49) { Sleep -Seconds .1; $AREWEDONEYET++;     Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "...";}

#INSTALL UPLAY
if (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'Uplay' -Quiet)
{
    $AREWEDONEYET = 50
    Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "Ubisoft ROCKS";
    Invoke-Expression -Command .\INSTALL_UPLAY.ps1 4>&1 3>&1 2>&1 >> .\logs\log5_uplay.txt
}

while ($AREWEDONEYET -lt 79) { Sleep -Milliseconds 50; $AREWEDONEYET++; Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "...";}

#INSTALL ICUE
if (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'COOL-CORSAIR' -Quiet)
{
    if ((-not (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'H60 PRO' -Quiet)) -or (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'H60 PRO XT' -Quiet))
    {
        $AREWEDONEYET = 80
        Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "ALL THE RGB";
        Invoke-Expression -Command .\INSTALL_iCUE.ps1 4>&1 3>&1 2>&1 >> .\logs\log7_icue.txt
    }
}
elseif ((Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'H60i RGB' -Quiet) -or (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'CL-9011109-WW' -Quiet) -or (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'CL-9011110-WW' -Quiet) -or (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'CO-8950020' -Quiet) -or (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'CW-9060049-WW' -Quiet)) 
{
    $AREWEDONEYET = 80
    Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "ALL THE RGB";
    Invoke-Expression -Command .\INSTALL_iCUE.ps1 4>&1 3>&1 2>&1 >> .\logs\log7_icue.txt
}

while ($AREWEDONEYET -lt 89) { Sleep -Seconds .1; $AREWEDONEYET++; Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "...";}

if (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'FOLDING AT HOME' -Quiet)
{
    $AREWEDONEYET = 90
    Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "Folding Laundry";    
    Invoke-Expression -Command .\INSTALL_FOLDING@HOME.ps1 4>&1 3>&1 2>&1 >> .\logs\log8_fold.txt
}

while ($AREWEDONEYET -lt 94) { Sleep -Seconds .1; $AREWEDONEYET++; Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "...";}

if (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'DISCORD' -Quiet)
{
    $AREWEDONEYET = 95
    Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "Discord and Done";
    Invoke-Expression -Command .\INSTALL_DISCORD.ps1 4>&1 3>&1 2>&1 >> .\logs\log9_disco.txt
}

while ($AREWEDONEYET -lt 100) { Sleep -Seconds .1; $AREWEDONEYET++; Write-Progress -Activity "Integration in progress" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "Finishing up!";}

if (Select-String -Path C:\Windows\Import-Workorder.txt -Pattern 'MB-ASUS' -Quiet)
{
    Invoke-Expression -Command .\INSTALL_ARMOURY.ps1 4>&1 3>&1 2>&1 >> .\logs\log10_ArmoC.txt
}

if(Test-Path C:\Windows\Import-Workorder.txt) { Remove-Item C:\Windows\Import-Workorder.txt}