$transcriptPath = 'C:\Users\admin\.gemini\antigravity\brain\917a9c43-15c4-4efe-98e9-93ce7dcfe605\.system_generated\logs\transcript.jsonl'
if (!(Test-Path $transcriptPath)) {
    Write-Output "Transcript not found"
    exit
}

Write-Output "Searching for full file backup in transcript..."
$found = $false
Get-Content $transcriptPath | ForEach-Object {
    if (!$found -and $_.Contains("Total Lines:") -and $_.Contains("preview.html")) {
        try {
            $json = $_ | ConvertFrom-Json
            if ($json.content -match "Total Lines: \d+") {
                Write-Output "Found step $($json.step_index) of type $($json.type) containing preview.html"
                $lines = $json.content -split "`n"
                Write-Output "Number of lines in content: $($lines.Count)"
                
                # Check if this contains the whole file or a large chunk
                if ($lines.Count -gt 1500) {
                    Write-Output "This is a large view containing most or all of the file. Saving to preview_backup.html..."
                    
                    # We need to strip the line numbers if they are prepended, like "1: <original_line>" or similar
                    $cleanLines = [System.Collections.Generic.List[string]]::new()
                    $isStart = $false
                    foreach ($line in $lines) {
                        # Look for lines formatted like "123: <html>"
                        if ($line -match '^\d+:\s(.*)') {
                            $cleanLines.Add($Matches[1])
                            $isStart = $true
                        } elseif ($line -match '^\d+:$') {
                            $cleanLines.Add("")
                            $isStart = $true
                        } elseif ($isStart) {
                            # If it doesn't match the format but we already started, add it as is or handle it
                            $cleanLines.Add($line)
                        }
                    }
                    
                    if ($cleanLines.Count -gt 0) {
                        [System.IO.File]::WriteAllLines("d:\8-TẢI VỀ\TẠO APP\websitedichvuthietke\preview_backup.html", $cleanLines)
                        Write-Output "Saved to preview_backup.html successfully!"
                        $found = $true
                    } else {
                        Write-Output "Could not strip line numbers, saving raw content instead..."
                        [System.IO.File]::WriteAllLines("d:\8-TẢI VỀ\TẠO APP\websitedichvuthietke\preview_raw_backup.html", $lines)
                    }
                }
            }
        } catch {
            Write-Output "Error: $_"
        }
    }
}
