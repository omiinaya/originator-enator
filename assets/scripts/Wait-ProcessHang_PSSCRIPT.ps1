#detect if installation window is hanging
$currentHandleCount = 0;
$previousHandleCount = 0;
$numberOfTimesTheHandleCountWasTheSame = 0; #a nice way to tell if the program hanged
$monitoredWindowHandle = 0; #assume window has not popped up yet

while( ($monitoredWindowHandle -eq 0) -or ($numberOfTimesTheHandleCountWasTheSame -lt 50)) { #every 10 $numberOf... represents about 1 second of actual runtime regardless of computer
  $monitoredWindowHandle = if (Get-Process INSERT_PROCESS_NAME -ErrorAction SilentlyContinue) {(Get-Process INSERT_PROCESS_NAME).MainWindowHandle} else {0};
  Sleep -Milliseconds 100;

  if(!($monitoredWindowHandle -eq 0)){
    $currentHandleCount = (Get-Process INSERT_PROCESS_NAME).HandleCount;
    if($currentHandleCount -eq $previousHandleCount){
        $numberOfTimesTheHandleCountWasTheSame+=1;
    }  else {
        $previousHandleCount = $currentHandleCount;
        $numberOfTimesTheHandleCountWasTheSame = 0;
      }
  }
}