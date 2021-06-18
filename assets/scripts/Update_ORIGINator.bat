@echo off
taskkill /IM "ORIGINator2.0.exe"
CLS
ROBOCOPY "\\wds\Integration\ORIGINator2.0\ORIGINator2.0\Bin" /E /Z /IS /MT "C:\ORIGINator2.0\Bin" 
ROBOCOPY "\\wds\Integration\ORIGINator2.0\ORIGINator2.0\Benchmarks" /E /Z /IS /MT "C:\ORIGINator2.0\Benchmarks"
