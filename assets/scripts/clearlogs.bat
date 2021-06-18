@echo off
FOR /F "tokens=1,2*" %%V IN ('bcdedit') DO SET adminTest=%%V
IF (%adminTest%)==(Access) goto theEnd
for /F "tokens=*" %%G in ('wevtutil.exe el') DO (call :do_clear "%%G")
goto theEnd
:do_clear
echo clearing %1
wevtutil.exe cl %1
goto :eof
:theEnd