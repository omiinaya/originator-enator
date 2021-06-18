if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) 
{ Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs; exit }  

CD $PSScriptRoot

#prepare to import user emulation functions from win32 API
$cSource = @'
using System;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Windows.Forms;
public class Clicker
{
//https://msdn.microsoft.com/en-us/library/windows/desktop/ms646270(v=vs.85).aspx
[StructLayout(LayoutKind.Sequential)]
struct INPUT
{ 
    public int        type; // 0 = INPUT_MOUSE
                            // 1 = INPUT_KEYBOARD
                            // 2 = INPUT_HARDWARE
    public MOUSEINPUT mi;
}

//https://msdn.microsoft.com/en-us/library/windows/desktop/ms646273(v=vs.85).aspx
[StructLayout(LayoutKind.Sequential)]
struct MOUSEINPUT
{
    public int    dx ;
    public int    dy ;
    public int    mouseData ;
    public int    dwFlags;
    public int    time;
    public IntPtr dwExtraInfo;
}

//This covers most use cases although complex mice may have additional buttons
//There are additional constants you can use for those cases, see the msdn page
const int MOUSEEVENTF_MOVED      = 0x0001 ;
const int MOUSEEVENTF_LEFTDOWN   = 0x0002 ;
const int MOUSEEVENTF_LEFTUP     = 0x0004 ;
const int MOUSEEVENTF_RIGHTDOWN  = 0x0008 ;
const int MOUSEEVENTF_RIGHTUP    = 0x0010 ;
const int MOUSEEVENTF_MIDDLEDOWN = 0x0020 ;
const int MOUSEEVENTF_MIDDLEUP   = 0x0040 ;
const int MOUSEEVENTF_WHEEL      = 0x0080 ;
const int MOUSEEVENTF_XDOWN      = 0x0100 ;
const int MOUSEEVENTF_XUP        = 0x0200 ;
const int MOUSEEVENTF_ABSOLUTE   = 0x8000 ;

const int screen_length = 0x10000 ;

//https://msdn.microsoft.com/en-us/library/windows/desktop/ms646310(v=vs.85).aspx
[System.Runtime.InteropServices.DllImport("user32.dll")]
extern static uint SendInput(uint nInputs, INPUT[] pInputs, int cbSize);

public static void LeftClickAtPoint(int x, int y)
{
    //Move the mouse
    INPUT[] input = new INPUT[3];
    input[0].mi.dx = x*(65535/System.Windows.Forms.Screen.PrimaryScreen.Bounds.Width);
    input[0].mi.dy = y*(65535/System.Windows.Forms.Screen.PrimaryScreen.Bounds.Height);
    input[0].mi.dwFlags = MOUSEEVENTF_MOVED | MOUSEEVENTF_ABSOLUTE;
    //Left mouse button down
    input[1].mi.dwFlags = MOUSEEVENTF_LEFTDOWN;
    //Left mouse button up
    input[2].mi.dwFlags = MOUSEEVENTF_LEFTUP;
    SendInput(3, input, Marshal.SizeOf(input[0]));
}
public static double GetWidth()
{
    return System.Windows.Forms.Screen.PrimaryScreen.Bounds.Width;
}
public static double GetHeight()
{
    return System.Windows.Forms.Screen.PrimaryScreen.Bounds.Height;
}

}
'@

if(!(Test-Path variable:WIN32)){
    $WIN32 = $true;
    Add-Type -TypeDefinition $cSource -ReferencedAssemblies System.Windows.Forms,System.Drawing;
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

#Initialize a RECT to be used later
$currentWindowRECT = New-Object RECT;

#Start the dreaded battlenet installer...
Start-Process -FilePath "Battle.exe" -WorkingDirectory ".\ORIGINator2.0\Software\Battle\"

#detect if installation window is hanging
$currentHandleCount = 0;
$previousHandleCount = 0;
$numberOfTimesTheHandleCountWasTheSame = 0; #a nice way to tell if the program hanged
$monitoredWindowHandle = 0; #assume window has not popped up yet
while( ($monitoredWindowHandle -eq 0) -or ($numberOfTimesTheHandleCountWasTheSame -lt 30)) { #every 10 $numberOf... represents about 1 second of actual runtime regardless of computer
  $monitoredWindowHandle = if (Get-Process Battle -ErrorAction SilentlyContinue) {(Get-Process Battle).MainWindowHandle} else {0};
  Sleep -Milliseconds 100;
    
  if(Get-Process Battle.net -ErrorAction SilentlyContinue) {break;} #incase crash and restart after initial options were set

  if(!($monitoredWindowHandle -eq 0)){
    $currentHandleCount = (Get-Process Battle).HandleCount;
    if($currentHandleCount -eq $previousHandleCount){
        $numberOfTimesTheHandleCountWasTheSame+=1;
    }  else {
        $previousHandleCount = $currentHandleCount;
        $numberOfTimesTheHandleCountWasTheSame = 0;
      }
  }
}

echo $currentHandleCount

if($currentHandleCount -lt 500){ #the handle count will let me know which step of the installation I'm starting at, and I should be prepared for odd cases. At this point handlecount should be 265 plus or minus 5. Just using < 500 to be sure
    #Find where the desired window is, to accurately click on it's internal buttons (battlenet installer cannot be done via keyboard AT ALL... why tho)
    [WinAp]::GetWindowRect($monitoredWindowHandle, [ref]$currentWindowRECT);
    
    #Bring window to the foreground so we can click on it
    [WinAp]::SetForegroundWindow($monitoredWindowHandle);
    [WinAp]::ShowWindow($monitoredWindowHandle, 10);

    #Simulate a left click because Blizzard is wack sometimes
    #[void] [Clicker]::LeftClickAtPoint(([void] [Clicker]::GetWidth()*.403),([void] [Clicker]::GetHeight())*.550);
    [void] [Clicker]::LeftClickAtPoint( ($currentWindowRECT.Right-$currentWindowRECT.Left)*.25 + $currentWindowRECT.Left,
                                 ($currentWindowRECT.Bottom-$currentWindowRECT.Top)*.92 + $currentWindowRECT.Top
                               )
    
    echo window should be set to foreground
    echo click occured
    #Wait for installation window to hang again
    $currentHandleCount = 0;
    $previousHandleCount = 0;
    $numberOfTimesTheHandleCountWasTheSame = 0; #a nice way to tell if the program hanged
    $monitoredWindowHandle = 0; #assume window has not popped up yet
    while(($currentHandleCount -lt 490) -or ($monitoredWindowHandle -eq 0) -or ($numberOfTimesTheHandleCountWasTheSame -lt 30)) { #every 10 $numberOf... represents about 1 second of actual runtime regardless of computer
      $monitoredWindowHandle = if (Get-Process Battle.net-Setup -ErrorAction SilentlyContinue) {(Get-Process Battle.net-Setup).MainWindowHandle} else {0};
      Sleep -Milliseconds 100;
    
      if(!($monitoredWindowHandle -eq 0)){
        $currentHandleCount = (Get-Process Battle.net-Setup).HandleCount;
        if($currentHandleCount -eq $previousHandleCount){
            $numberOfTimesTheHandleCountWasTheSame+=1;
        }  else {
            $previousHandleCount = $currentHandleCount;
            $numberOfTimesTheHandleCountWasTheSame = 0;
          }
      }
    }
}

if($currentHandleCount -gt 250){
    #Find where the new desired window is, to accurately click on it's internal buttons
    [WinAp]::GetWindowRect($monitoredWindowHandle, [ref]$currentWindowRECT);
    
    #Bring window to the foreground so we can click on it
    [WinAp]::SetForegroundWindow($monitoredWindowHandle);
    
    #[void] [Clicker]::LeftClickAtPoint(([void] [Clicker]::GetWidth()*.610),([void] [Clicker]::GetHeight())*.503);
    [void] [Clicker]::LeftClickAtPoint( ($currentWindowRECT.Right-$currentWindowRECT.Left)*.87 + $currentWindowRECT.Left,
                                 ($currentWindowRECT.Bottom-$currentWindowRECT.Top)*.93 + $currentWindowRECT.Top)


}

#detect if installation window is hanging
$currentHandleCount = 0;
$previousHandleCount = 0;
$numberOfTimesTheHandleCountWasTheSame = 0; #a nice way to tell if the program hanged
$monitoredWindowHandle = 0; #assume window has not popped up yet
while( ($monitoredWindowHandle -eq 0) -or ($numberOfTimesTheHandleCountWasTheSame -lt 30)) { #every 10 $numberOf... represents about 1 second of actual runtime regardless of computer
  $monitoredWindowHandle = if (Get-Process Battle.net-Setup -ErrorAction SilentlyContinue) {(Get-Process Battle.net-Setup).MainWindowHandle} else {0};
  Sleep -Milliseconds 100;

  if(!($monitoredWindowHandle -eq 0)){
    $currentHandleCount = (Get-Process Battle.net-Setup).HandleCount;
    if($currentHandleCount -eq $previousHandleCount){
        $numberOfTimesTheHandleCountWasTheSame+=1;
    }  else {
        $previousHandleCount = $currentHandleCount;
        $numberOfTimesTheHandleCountWasTheSame = 0;
      }
  }
}
if($currentHandleCount -gt 250){
    #Find where the new desired window is, to accurately click on it's internal buttons
    [WinAp]::GetWindowRect($monitoredWindowHandle, [ref]$currentWindowRECT);
    
    #Bring window to the foreground so we can click on it
    [WinAp]::SetForegroundWindow($monitoredWindowHandle);
    
    #[void] [Clicker]::LeftClickAtPoint(([void] [Clicker]::GetWidth()*.610),([void] [Clicker]::GetHeight())*.503);
    [void] [Clicker]::LeftClickAtPoint( ($currentWindowRECT.Right-$currentWindowRECT.Left)*.87 + $currentWindowRECT.Left,
                                 ($currentWindowRECT.Bottom-$currentWindowRECT.Top)*.93 + $currentWindowRECT.Top)


}

#Now we wait until the final window pops up, and close that thing. Blizzard gave the final window a different process name, because why not
$currentHandleCount = 0;
$previousHandleCount = 0;
$numberOfTimesTheHandleCountWasTheSame = 0; #a nice way to tell if the program hanged
$monitoredWindowHandle = 0; #assume window has not popped up yet
while( ($monitoredWindowHandle -eq 0) -or ($numberOfTimesTheHandleCountWasTheSame -lt 50)) { #every 10 $numberOf... represents about 1 second of actual runtime regardless of computer
  $monitoredWindowHandle = if (Get-Process Battle.net -ErrorAction SilentlyContinue | Where-Object {$_.HandleCount -gt 900}) {(Get-Process Battle.net | Where-Object {$_.HandleCount -gt 900}).MainWindowHandle} else {0};
  Sleep -Milliseconds 100;

  if(!($monitoredWindowHandle -eq 0)){
    $currentHandleCount = (Get-Process Battle.net | Where-Object {$_.HandleCount -gt 900}).HandleCount;
    if($currentHandleCount -eq $previousHandleCount){
        $numberOfTimesTheHandleCountWasTheSame+=1;
    }  else {
        $previousHandleCount = $currentHandleCount;
        $numberOfTimesTheHandleCountWasTheSame = 0;
      }
  }
}
#Find where the new desired window is, to accurately click on it's internal buttons
[WinAp]::GetWindowRect($monitoredWindowHandle, [ref]$currentWindowRECT);

#Bring window to the foreground so we can click on it
[WinAp]::SetForegroundWindow($monitoredWindowHandle);

#[void] [Clicker]::LeftClickAtPoint(([void] [Clicker]::GetWidth()*.585),([void] [Clicker]::GetHeight())*.281);
[void] [Clicker]::LeftClickAtPoint( ($currentWindowRECT.Right-$currentWindowRECT.Left)*.97 + $currentWindowRECT.Left,
                             ($currentWindowRECT.Bottom-$currentWindowRECT.Top)*.05 + $currentWindowRECT.Top)