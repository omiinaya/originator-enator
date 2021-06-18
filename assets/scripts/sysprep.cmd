@echo off

taskkill /im sysprep.exe

start C:\Windows\System32\sysprep\sysprep.exe /oobe /reboot 

rem start C:\Windows\System32\sysprep\sysprep.exe /oobe /reboot /unattend:C:\Windows\System32\oobe\OEM\Unattend.xml

del /f /s /q "C:\Users\Default\Desktop\sysprep.cmd"

del /f /s /q "C:\Users\Administrator\Desktop\sysprep.cmd"

del /f /s /q "C:\Users\Public\Desktop\sysprep.cmd"