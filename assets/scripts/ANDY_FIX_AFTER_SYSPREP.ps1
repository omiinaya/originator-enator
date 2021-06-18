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















#gain access to user32 API functions SetForegroundWindow and ShowWindow =)
if(!(Test-Path variable:USER32)){
$USER32 = $true;
Add-Type @"
    using System;
    using System.Runtime.InteropServices;
    public class WinAp {
      
      [DllImport("user32.dll")]
      [return: MarshalAs(UnmanagedType.Bool)]
      public static extern bool SetForegroundWindow(IntPtr hWnd);

      [DllImport("user32.dll")]
      [return: MarshalAs(UnmanagedType.Bool)]
      public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

      [DllImport("user32.dll")]
      [return: MarshalAs(UnmanagedType.Bool)]
      public static extern bool GetWindowRect(IntPtr hwnd, out RECT lpRect);
    }
        public struct RECT{

        public int Left;        // x position of upper-left corner
        public int Top;         // y position of upper-left corner
        public int Right;       // x position of lower-right corner
        public int Bottom;      // y position of lower-right corner
    }
"@
}

#Disable the first run "experience" for Edge
reg import .\ORIGINator2.0\Software\Edge\disableFirstRun.reg;

#Setup to save webpage and start Edge
$originPage = "http://originpc.com";

#Start edge
start "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe":
#Start our simulated user input device
$wshell = New-Object -ComObject wscript.shell;

#Let's wait for edge to properly start up
$currentHandleCount = 0;
$previousHandleCount = 0;
$numberOfTimesTheHandleCountWasTheSame = 0; #a nice way to tell if the program hanged
$monitoredWindowHandle = 0; #assume window has not popped up yet

while( ($monitoredWindowHandle -eq 0) -or ($numberOfTimesTheHandleCountWasTheSame -lt 20)) { #every 10 $numberOf... represents about 1 second of actual runtime regardless of computer
  $monitoredWindowHandle = if (Get-Process Msedge -ErrorAction SilentlyContinue | Where-Object {$_.HandleCount -gt 900}) {(Get-Process Msedge | Where-Object {$_.HandleCount -gt 900}).MainWindowHandle} else {0};
  Sleep -Milliseconds 100;

  if(!($monitoredWindowHandle -eq 0)){
    $currentHandleCount = (Get-Process Msedge | Where-Object {$_.HandleCount -gt 900}).HandleCount;
    if($currentHandleCount -eq $previousHandleCount){
        $numberOfTimesTheHandleCountWasTheSame+=1;
    }  else {
        $previousHandleCount = $currentHandleCount;
        $numberOfTimesTheHandleCountWasTheSame = 0;
      }
  }
}

#Bring edge to the forefront in fullscreen mode 
[WinAp]::SetForegroundWindow($monitoredWindowHandle);
[WinAp]::ShowWindow($monitoredWindowHandle,3);

#Get to the location of startup settings
$wshell.SendKeys('%{f}');
Sleep -Seconds 1;
$wshell.SendKeys('+{s}');
Sleep -Seconds 1;
$wshell.SendKeys('{TAB}');
$wshell.SendKeys('{down}');
$wshell.SendKeys('{down}');
$wshell.SendKeys('{down}');
$wshell.SendKeys('~');
Sleep -Milliseconds 300;


#navigate through edge settings menu, and open the add new page dialogue box
$wshell.SendKeys('{tab}');
Sleep -Milliseconds 100;
$wshell.SendKeys('{tab}');
Sleep -Milliseconds 100;
$wshell.SendKeys('{down}');
Sleep -Milliseconds 100;
$wshell.SendKeys('{down}');
Sleep -Milliseconds 100;
$wshell.SendKeys('{tab}');
Sleep -Milliseconds 100;
$wshell.SendKeys('~');

#Let's wait for edge to properly settle at this point
$currentHandleCount = 0;
$previousHandleCount = 0;
$numberOfTimesTheHandleCountWasTheSame = 0; #a nice way to tell if the program hanged
$monitoredWindowHandle = 0; #assume window has not popped up yet

while( ($monitoredWindowHandle -eq 0) -or ($numberOfTimesTheHandleCountWasTheSame -lt 10)) { #every 10 $numberOf... represents about 1 second of actual runtime regardless of computer
  $monitoredWindowHandle = if (Get-Process Msedge -ErrorAction SilentlyContinue | Where-Object {$_.HandleCount -gt 900}) {(Get-Process Msedge | Where-Object {$_.HandleCount -gt 900}).MainWindowHandle} else {0};
  Sleep -Milliseconds 100;

  if(!($monitoredWindowHandle -eq 0)){
    $currentHandleCount = (Get-Process Msedge | Where-Object {$_.HandleCount -gt 900}).HandleCount;
    if($currentHandleCount -eq $previousHandleCount){
        $numberOfTimesTheHandleCountWasTheSame+=1;
    }  else {
        $previousHandleCount = $currentHandleCount;
        $numberOfTimesTheHandleCountWasTheSame = 0;
      }
  }
}

#type out the originpc website into dialogue box
foreach($char in $originPage)
{
    $wshell.SendKeys($char);
    Sleep -Milliseconds 50;   
}

#wait again
$currentHandleCount = 0;
$previousHandleCount = 0;
$numberOfTimesTheHandleCountWasTheSame = 0; #a nice way to tell if the program hanged
$monitoredWindowHandle = 0; #assume window has not popped up yet
while( ($monitoredWindowHandle -eq 0) -or ($numberOfTimesTheHandleCountWasTheSame -lt 10)) { #every 10 $numberOf... represents about 1 second of actual runtime regardless of computer
  $monitoredWindowHandle = if (Get-Process Msedge -ErrorAction SilentlyContinue | Where-Object {$_.HandleCount -gt 900}) {(Get-Process Msedge | Where-Object {$_.HandleCount -gt 900}).MainWindowHandle} else {0};
  Sleep -Milliseconds 100;

  if(!($monitoredWindowHandle -eq 0)){
    $currentHandleCount = (Get-Process Msedge | Where-Object {$_.HandleCount -gt 900}).HandleCount;
    if($currentHandleCount -eq $previousHandleCount){
        $numberOfTimesTheHandleCountWasTheSame+=1;
    }  else {
        $previousHandleCount = $currentHandleCount;
        $numberOfTimesTheHandleCountWasTheSame = 0;
      }
  }
}

Sleep -Milliseconds 50;
$wshell.SendKeys("~");

#Wait one last time just in case
$currentHandleCount = 0;
$previousHandleCount = 0;
$numberOfTimesTheHandleCountWasTheSame = 0; #a nice way to tell if the program hanged
$monitoredWindowHandle = 0; #assume window has not popped up yet
while( ($monitoredWindowHandle -eq 0) -or ($numberOfTimesTheHandleCountWasTheSame -lt 10)) { #every 10 $numberOf... represents about 1 second of actual runtime regardless of computer
  $monitoredWindowHandle = if (Get-Process Msedge -ErrorAction SilentlyContinue | Where-Object {$_.HandleCount -gt 900}) {(Get-Process Msedge | Where-Object {$_.HandleCount -gt 900}).MainWindowHandle} else {0};
  Sleep -Milliseconds 100;

  if(!($monitoredWindowHandle -eq 0)){
    $currentHandleCount = (Get-Process Msedge | Where-Object {$_.HandleCount -gt 900}).HandleCount;
    if($currentHandleCount -eq $previousHandleCount){
        $numberOfTimesTheHandleCountWasTheSame+=1;
    }  else {
        $previousHandleCount = $currentHandleCount;
        $numberOfTimesTheHandleCountWasTheSame = 0;
      }
  }
}

#Close out the thing
Sleep -Milliseconds 200;
$wshell.SendKeys('%{F4}');

Invoke-Expression -Command .\SET_LOCK_SCREEN.ps1 4>&1 3>&1 2>&1 >> .\logs\log0_drives.txt

Invoke-Expression -Command .\DISABLE_ONEDRIVE_STARTUP.ps1 4>&1 3>&1 2>&1 >> .\logs\log0_drives.txt

if(Test-Path C:\Windows\Import-Workorder.txt) { Remove-Item C:\Windows\Import-Workorder.txt}



