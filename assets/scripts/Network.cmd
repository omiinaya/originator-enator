@Echo Off

set drive=O:\ORIGINator2.0
set src="\\wds\Integration\ORIGINator2.0\ORIGINator2.0"
set dest="C:\ORIGINator2.0\"
set sleep=C:\Windows\System32\oobe\OEM\sleep.exe



Echo ====================================================
Echo Sleep for 1 seconds...
Echo ====================================================

%sleep% 1

IF NOT EXIST %drive% (start /wait /b NET USE O: \\wds\Integration /User:Deploy Origin2019 /persisten:yes)

Echo ====================================================
Echo Sleep for 3 seconds...
Echo ====================================================

%sleep% 3

IF NOT EXIST %dest% GOTO FirstRun
IF EXIST %dest% GOTO SecondRun

:FirstRun
IF NOT EXIST %dest% (ROBOCOPY %src% /E /Z /MT C:\ORIGINator2.0 )  
xcopy /y C:\Windows\System32\oobe\OEM\unattendNetwork.xml C:\Windows\Panther\unattend.xml
COPY "C:\ORIGINator2.0\ORIGINator SOP-FAQ.lnk" "C:\Users\Public\Desktop"
::COPY "C:\ORIGINator2.0\Bin\Source\Bug-Report.exe" "C:\Users\Public\Desktop"
::COPY "C:\ORIGINator2.0\Bin\Source\ORIGINator2.0.exe" "C:\Users\Public\Desktop"
IF EXIST C:\Scripts (rmdir /s /q C:\Scripts)
cls
Echo ====================================================
Echo Installing Module Prerequisites...
Echo ====================================================
Start /wait C:\ORIGINator2.0\Software\TightVNC\Setup.msi /q
Regedit.exe /s C:\ORIGINator2.0\Software\TightVNC\Settings.reg
Start /wait C:\ORIGINator2.0\Bin\Module\SQLPS\SQLSysClrTypes.msi /q /norestart
Start /wait C:\ORIGINator2.0\Bin\Module\SQLPS\SharedManagementObjects.msi /q /norestart
Start /wait C:\ORIGINator2.0\Bin\Module\SQLPS\PowerShellTools.msi /q /norestart
Start /wait C:\ORIGINator2.0\Software\DirectX\dxwebsetup.exe /Q
Shutdown /r /t 5
goto:eof

:SecondRun
xcopy /y C:\Windows\System32\oobe\OEM\unattendNetwork.xml C:\Windows\Panther\unattend.xml
IF EXIST "C:\Program Files (x86)\EVGA\PrecisionX 16\PrecisionX_x64.exe" (start c:\Windows\System32\oobe\OEM\EVGAPrecision.cmd)
IF EXIST "C:\Program Files (x86)\EVGA\Precision XOC\PrecisionX_x64.exe" (start c:\Windows\System32\oobe\OEM\EVGAPrecisionOC.cmd)
IF EXIST "C:\Program Files (x86)\Hotkey Config\HotkeyListener.exe" (start c:\Windows\System32\oobe\OEM\MSI_Hotkey.cmd)
call C:\Windows\System32\oobe\OEM\ASUS.cmd
goto:eof