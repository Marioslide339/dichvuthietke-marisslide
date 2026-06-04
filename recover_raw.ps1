$transcriptPath = 'C:\Users\admin\.gemini\antigravity\brain\917a9c43-15c4-4efe-98e9-93ce7dcfe605\.system_generated\logs\transcript.jsonl'
$utf8 = New-Object System.Text.UTF8Encoding($false)

# Read all lines of transcript
$lines = [System.IO.File]::ReadAllLines($transcriptPath, $utf8)

foreach ($line in $lines) {
    if ($line.Contains('"step_index":119') -or $line.Contains('"step_index":194') -or $line.Contains('"step_index":196')) {
        try {
            $json = $line | ConvertFrom-Json
            $content = $json.content
            $filename = "step_" + $json.step_index + ".txt"
            [System.IO.File]::WriteAllText("C:\Users\admin\.gemini\antigravity\brain\917a9c43-15c4-4efe-98e9-93ce7dcfe605\" + $filename, $content, $utf8)
            Write-Output "Saved $filename"
        } catch {
            Write-Output "Error parsing step: $_"
        }
    }
}
