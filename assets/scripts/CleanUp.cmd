@echo off

::ORIGINator 2.0 Cleanup
CALL "C:\ORIGINator2.0\Bin\Source\Cleanup.exe"
Net Stop tvnserver
msiexec /q /x {8B9896FC-B4F2-44CD-8B6E-78A0B1851B59}
IF EXIST "C:\Program Files\TightVNC" (rmdir /s /q "C:\Program Files\TightVNC")
Reg delete HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run\ /v tvncontrol /f
Reg delete HKEY_LOCAL_MACHINE\SOFTWARE\TightVNC /f
msiexec /q /x {6A7D0067-CF88-453E-9EA5-A2008EC7CB19}
msiexec /q /x {1F9EB3B6-AED7-4AA7-B8F1-8E314B74B2A5}
msiexec /q /x {68BA34E8-9B9D-4A74-83F0-7D366B532D75}
msiexec /q /x "C:\ORIGINator2.0\Bin\Module\SQLPS\PowerShellTools.msi"
msiexec /q /x "C:\ORIGINator2.0\Bin\Module\SQLPS\SharedManagementObjects.msi"
msiexec /q /x "C:\ORIGINator2.0\Bin\Module\SQLPS\SQLSysClrTypes.msi"
rem Start /wait C:\ORIGINator2.0\Software\CCleaner\CCleaner64.exe /AUTO
IF EXIST "C:\Program Files (x86)\Microsoft SQL Server" (rmdir /s /q "C:\Program Files (x86)\Microsoft SQL Server")
IF EXIST "C:\Program Files\Microsoft SQL Server" (rmdir /s /q "C:\Program Files\Microsoft SQL Server")
del /f /s /q "C:\Windows\System32\oobe\OEM\CallTask.exe"
del /f /s /q "C:\Users\Public\Desktop\ORIGINator SOP-FAQ.lnk"
del /f /s /q "C:\Users\Public\Desktop\ORIGINator2.0.lnk"
del /f /s /q "C:\Users\Public\Desktop\ORIGINator2.0.exe.lnk"
del /f /s /q "C:\Users\Public\Desktop\Bug-Report.exe"
del /f /s /q "C:\Users\Public\Desktop\Update_ORIGINator.bat
IF EXIST "C:\Program Files\WindowsPowerShell\Modules\DeviceManagement" (rmdir /s /q "C:\Program Files\WindowsPowerShell\Modules\DeviceManagement")
IF EXIST "C:\Program Files\WindowsPowerShell\Modules\SQLPS" (rmdir /s /q "C:\Program Files\WindowsPowerShell\Modules\SQLPS")

taskkill /im originator2.0.exe
taskkill /im Heaven_Benchmark.exe
IF EXIST c:\ORIGINator2.0 (rmdir /s /q c:\ORIGINator2.0) 

taskkill /im select.exe
taskkill /im install.exe
taskkill /im sysprep.exe

call net use /delete * /y

Reg delete "HKLM\System\CurrentControlSet\Control\7503491f-4a39-4f84-b231-8aca3e203b94" /f
reg delete HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\WindowsStore /v AutoDownload /f

IF EXIST C:\Scripts (rmdir /s /q C:\Scripts)

rem schtasks /delete /tn "Start Network" /f

move /y C:\Windows\System32\oobe\OEM\Sysprep.xml C:\Windows\Panther\Unattend.xml

rmdir /s /q c:\ORIGINator

rmdir /s /q c:\Windows\AsusInstAll

rmdir /s /q "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Futuremark"

rmdir /s /q "C:\Program Files (x86)\Futuremark"

rmdir /s /q "C:\Program Files\Futuremark"

rmdir /s /q "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\SPECviewperf"

rmdir /s /q "C:\SPEC"

rmdir /s /q "C:\Windows\System32\WindowsPowerShell\v1.0\Modules\PSWindowsUpdate"

rmdir /s /q "C:\Users\Administrator\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\EVGA Precision X"

rmdir /s /q "C:\Users\Default\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\EVGA Precision X"

rmdir /s /q "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Intel Extreme Tuning Utility"

rmdir /s /q "C:\Users\Administrator\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Intel Extreme Tuning Utility"

rmdir /s /q "C:\Users\Default\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\EVGA Precision X"

rmdir /s /q "C:\Users\Public\Desktop\03Lan"

rmdir /s /q "C:\Users\Public\Desktop\Desktop_Killer"

del /f /s /q "C:\Windows\System32\Sysprep\sysprep.cmd"

del /f /s /q "C:\Windows\System32\Sysprep\CheckNetwork.bat"

del /f /s /q "C:\Users\Public\Desktop\CheckNetwork.bat"

del /f /s /q "C:\Windows\System32\Sysprep\UnattendCaptureWin8.xml"

del /f /s /q "C:\Windows\System32\Sysprep\UnattendWin8.xml"

del /f /s /q "C:\Windows\System32\Sysprep\UnifiedUnattend.xml"

del /f /s /q "C:\Windows\System32\oobe\OEM\ASUS.cmd"

del /f /s /q "C:\Windows\System32\oobe\OEM\CheckForAsusTask.bat"

del /f /s /q "C:\Windows\System32\oobe\OEM\EVGAPrecision.cmd"

del /f /s /q "C:\Windows\System32\oobe\OEM\MSI_Hotkey.cmd"

del /f /s /q "C:\Windows\System32\oobe\OEM\Network.cmd"

del /f /s /q "C:\Windows\System32\oobe\OEM\unattendNetwork.xml"

del /f /s /q "C:\Windows\System32\oobe\OEM\unattendAsus.xml"

del /f /s /q "C:\Windows\System32\oobe\OEM\unattendFinished.xml"

del /f /s /q "C:\Users\Public\Desktop\MSI_Killer.exe"

del /f /s /q %APPDATA%\Microsoft\Windows\Recent\*

del /f /s /q %APPDATA%\Microsoft\Windows\Recent\AutomaticDestinations\*

del /f /s /q %APPDATA%\Microsoft\Windows\Recent\CustomDestinations\*

del /f /s /q "C:\Users\Public\Desktop\MSI_Killer.exe"

del /f /s /q "C:\Users\Public\Desktop\EVO15S_Killer.exe"

del /f /s /q "C:\Users\Default\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\network.cmd"

del /f /s /q "C:\Users\Administrator\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\network.cmd"

del /f /s /q "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup\network.cmd"

del /f /s /q "C:\Users\Default\Desktop\network.cmd"

del /f /s /q "C:\Users\Administrator\Desktop\network.cmd"

del /f /s /q "C:\Users\Public\Desktop\network.cmd"

del /f /s /q "C:\Users\Default\Desktop\Unattend.xml"

del /f /s /q "C:\Users\Administrator\Desktop\Unattend.xml"

del /f /s /q "C:\Users\Public\Desktop\Unattend.xml"

del /f /s /q "C:\Users\Default\Desktop\InstallDrivers.cmd"

del /f /s /q "C:\Users\Administrator\Desktop\InstallDrivers.cmd"

del /f /s /q "C:\Users\Public\Desktop\InstallDrivers.cmd"

del /f /s /q "C:\Users\Default\Desktop\InstallUpdates.cmd"

del /f /s /q "C:\Users\Administrator\Desktop\InstallUpdates.cmd"

del /f /s /q "C:\Users\Public\Desktop\InstallUpdates.cmd"

del /f /s /q "C:\Users\Administrator\Desktop\EVGA Precision X.lnk"

del /f /s /q "C:\Users\Default\Desktop\EVGA Precision X.lnk"

del /f /s /q "C:\Users\Default\Public\EVGA Precision X.lnk"

del /f /s /q "C:\Users\Public\Desktop\WebCam Installer 4.04.lnk"

del /f /s /q "C:\Users\Administrator\Desktop\WebCam Installer 4.04.lnk"

del /f /s /q "C:\Users\Default\Desktop\WebCam Installer 4.04.lnk"

del /f /s /q "C:\Users\Default\Desktop\Webcam.lnk"

del /f /s /q "C:\Users\Public\Desktop\Intel(R) Extreme Tuning Utility.lnk"

del /f /s /q "C:\Users\Administrator\Desktop\Intel(R) Extreme Tuning Utility.lnk"

del /f /s /q "C:\Users\Default\Desktop\Intel(R) Extreme Tuning Utility.lnk"

call "C:\Users\Public\Desktop\clearlogs.bat"

del /f /s /q "C:\Users\Public\Desktop\clearlogs.bat"

IF EXIST c:\ORIGINator (rmdir /s /q c:\ORIGINator) 

del /f /s /q "C:\Users\Default\Desktop\cleanup.cmd"

del /f /s /q "C:\Users\Administrator\Desktop\cleanup.cmd"

del /f /s /q "C:\Users\Public\Desktop\cleanup.cmd"