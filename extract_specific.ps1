$transcriptPath = 'C:\Users\admin\.gemini\antigravity\brain\917a9c43-15c4-4efe-98e9-93ce7dcfe605\.system_generated\logs\transcript.jsonl'
if (!(Test-Path $transcriptPath)) {
    Write-Output "Transcript not found"
    exit
}

$steps = @(119, 194, 196)
Get-Content $transcriptPath | ForEach-Object {
    try {
        $json = $_ | ConvertFrom-Json
        if ($steps -contains $json.step_index) {
            Write-Output "--- STEP $($json.step_index) ($($json.type)) ---"
            Write-Output $json.content
        }
    } catch {}
}
