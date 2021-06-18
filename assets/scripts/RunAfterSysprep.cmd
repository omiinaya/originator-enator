@Echo Off

call C:\Windows\System32\oobe\OEM\ThemeSwitcher.exe c:\Windows\Resources\Themes\OriginRed.theme

rem call C:\Windows\System32\oobe\OEM\Set_Homepage.exe

del /f /q c:\Users\Public\Desktop\RunAfterSysprep.cmd

exit
