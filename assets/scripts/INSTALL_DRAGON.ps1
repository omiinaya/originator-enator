if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) 
{ Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs; exit }  

CD $PSScriptRoot

#note the time
$StartTime = $(get-date);

# give us the ability to simulate keyboard commands and other user interactions
$wshelldragon = New-Object -ComObject wscript.shell;

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


# begin Dragon App install
Start-Process -FilePath "DragonCenter.exe" -WorkingDirectory ".\CleanInstallDragonCenter2.0.65.0SDK20200731updatecommSDK54\UWP"




#intelligently detect when installation popup window has appeared
$dragonCenterInstallationHandle = 0; #assume window has not popped up yet
$timeElapsed = 0; #make sure we don't sit in this loop forever on an error
while( ($dragonCenterInstallationHandle -eq 0) -and ($timeElapsed -lt 10000)) {
  $dragonCenterInstallationHandle = if (Get-Process DragonCenter.tmp -ErrorAction SilentlyContinue) {(Get-Process DragonCenter.tmp).MainWindowHandle} else {0};
  Sleep -Milliseconds 100;
  $timeElapsed += 100;
} 

# we found the window, lets focus it just in case it isn't
[void] [WinAp]::SetForegroundWindow($dragonCenterInstallationHandle);
Sleep -Milliseconds 100;

#$oldInstallationState = (Get-Process DragonCenter.tmp).HandleCount;

$wshelldragon.SendKeys('~');

#detect when installation hanged
$currentHandleCount = 0;
$previousHandleCount = 0;
$numberOfTimesTheHandleCountWasTheSame = 0; #a nice way to tell if the program hanged
$problematicWindowHandle = 0; #assume window has not popped up yet

while( ($problematicWindowHandle -eq 0) -or ($numberOfTimesTheHandleCountWasTheSame -lt 20)) {
  $problematicWindowHandle = if (Get-Process DragonCenter.tmp -ErrorAction SilentlyContinue) {(Get-Process DragonCenter.tmp).MainWindowHandle} else {0};
  Sleep -Milliseconds 100;

  if(!($problematicWindowHandle -eq 0)){
    $currentHandleCount = (Get-Process DragonCenter.tmp).HandleCount;
    if($currentHandleCount -eq $previousHandleCount){
        $numberOfTimesTheHandleCountWasTheSame+=1;
    }  else {
        $previousHandleCount = $currentHandleCount;
        $numberOfTimesTheHandleCountWasTheSame = 0;
      }
  }
}


#$timeElapsed = 0;
#while ( ($oldInstallationState -eq (Get-Process DragonCenter.tmp).HandleCount) -and ($timeElapsed -lt 10000))
#{
#    Sleep -Milliseconds 100;
#    $timeElapsed += 100;
#}
#$oldInstallationState = (Get-Process DragonCenter.tmp).HandleCount;

[void] [WinAp]::SetForegroundWindow($problematicWindowHandle);
Sleep -Milliseconds 1000;

$wshelldragon.SendKeys('~');

#now we monitor the installation and wait for it to finish and close itself before moving on
while (Get-Process DragonCenter.tmp -ErrorAction SilentlyContinue) {
  Sleep -Milliseconds 100;
} 

#Dragon SDK install
Start-Process -FilePath "Offline_Install.bat" -WorkingDirectory ".\CleanInstallDragonCenter2.0.65.0SDK20200731updatecommSDK54\SDK"
#this installation almost always hangs on a very particular window. I will monitor the process until I notice that it hanged, then end it properly
$currentHandleCount = 0;
$previousHandleCount = 0;
$numberOfTimesTheHandleCountWasTheSame = 0; #a nice way to tell if the program hanged
$problematicWindowHandle = 0; #assume window has not popped up yet

while( (($problematicWindowHandle -eq 0) -or ($numberOfTimesTheHandleCountWasTheSame -lt 20)) -and (Get-Process cmd -ErrorAction SilentlyContinue)) {
  $problematicWindowHandle = if (Get-Process MSI_NBFoundation_Service -ErrorAction SilentlyContinue) {(Get-Process MSI_NBFoundation_Service).MainWindowHandle} else {0}
  Sleep -Milliseconds 100;

  if(!($problematicWindowHandle -eq 0)){
    $currentHandleCount = (Get-Process MSI_NBFoundation_Service).HandleCount;
    if($currentHandleCount -eq $previousHandleCount){
        $numberOfTimesTheHandleCountWasTheSame+=1;
    } else {
        $previousHandleCount = $currentHandleCount;
        $numberOfTimesTheHandleCountWasTheSame = 0;
      }
  }
} 

[void] [WinAp]::SetForegroundWindow($problematicWindowHandle);
Sleep -Milliseconds 1000;

$wshelldragon.SendKeys('~');

$elapsedTime = $(get-date) - $StartTime;
$totalTime = "{0:HH:mm:ss}" -f ([datetime]$elapsedTime.Ticks);
"Time elapsed for this Dragon Center app + SDK install" >> .\logs\log6_dragon.txt;
$totalTime >> .\logs\log6_dragon.txt;

Sleep -Seconds 2;

