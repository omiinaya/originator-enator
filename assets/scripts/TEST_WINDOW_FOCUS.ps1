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
    }
"@

$p = Get-Process -Name "dragoncenter" | Where {$_.MainWindowHandle} |
    Where {$_.Name -like "$proc"}
if (($p -eq $null) -and ($adm -ne "")) {
 
} else {
    $h = $p.MainWindowHandle
    [void] [WinAp]::SetForegroundWindow($h)
    [void] [WinAp]::ShowWindow($h, 3)
}