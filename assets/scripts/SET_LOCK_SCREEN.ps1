
#Set Lock Screen

$wshell = New-Object -ComObject wscript.shell;

(New-Object -ComObject shell.application).toggleDesktop()
Sleep -MilliSeconds 500;
$wshell.SendKeys('+{F10}');
Sleep -Seconds 1;
$wshell.SendKeys('{r}');
Sleep -Milliseconds 2000;
$wshell.SendKeys('{TAB}');
Sleep -Milliseconds 1000;
$wshell.SendKeys('{down}');
Sleep -Milliseconds 300;
$wshell.SendKeys('{down}');
Sleep -Milliseconds 300;
$wshell.SendKeys('~');
Sleep -Milliseconds 1000;
$wshell.SendKeys('{TAB}');
Sleep -Milliseconds 1000;
$wshell.SendKeys('{down}');
Sleep -Milliseconds 700;
$wshell.SendKeys('~');
Sleep -Milliseconds 300;
$wshell.SendKeys('%{F4}');
Sleep -Milliseconds 300;