if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) 
{ Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs; exit }  

CD $PSScriptRoot

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
$wshell.SendKeys('{ESCAPE}');
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



