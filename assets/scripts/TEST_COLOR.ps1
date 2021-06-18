#setup a color array for fun
$colors = [Enum]::GetValues([System.ConsoleColor])
#Track progress to display it
$backgroundRandomColor = $colors|Get-Random
$foregroundRandomColor = $colors|Get-Random
while($foregroundRandomColor -eq $backgroundRandomColor){$foregroundRandomColor = $colors|Get-Random}
$Host.PrivateData.ProgressBackgroundColor=$backgroundRandomColor
$Host.PrivateData.ProgressForegroundColor=$foregroundRandomColor
$AREWEDONEYET = 0;
while(1)
{
    $backgroundRandomColor = $colors|Get-Random
    $foregroundRandomColor = $colors|Get-Random
    $Host.PrivateData.ProgressBackgroundColor=$backgroundRandomColor
    #make sure the text is visible on the selected background by eliminating the few possiblities where it isn't
    while($backgroundRandomColor -eq $foregroundRandomColor)
    {
        $foregroundRandomColor = $colors|Get-Random
        if($backgroundRandomColor -eq "White"){ while($foregroundRandomColor -eq "White") {$foregroundRandomColor = $colors|Get-Random} $Host.PrivateData.ProgressForegroundColor=$foregroundRandomColor}
        elseif($backgroundRandomColor -eq "Yellow"){ while(($foregroundRandomColor -eq "White") -or ($foregroundRandomColor -eq "Yellow")) {$foregroundRandomColor = $colors|Get-Random} $Host.PrivateData.ProgressForegroundColor=$foregroundRandomColor}
        else {$Host.PrivateData.ProgressForegroundColor=$foregroundRandomColor}
    }
    $Host.PrivateData.ProgressForegroundColor=$foregroundRandomColor


    Write-Progress -Activity "Testing Colors" -Status "$AREWEDONEYET% Complete:" -PercentComplete $AREWEDONEYET -CurrentOperation "=D";
    Sleep -Milliseconds 100;
}