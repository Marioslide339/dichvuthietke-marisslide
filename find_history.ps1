$transcriptPath = 'C:\Users\admin\.gemini\antigravity\brain\917a9c43-15c4-4efe-98e9-93ce7dcfe605\.system_generated\logs\transcript.jsonl'
if (!(Test-Path $transcriptPath)) {
    Write-Output "Transcript not found"
    exit
}

Write-Output "Analyzing transcript via PowerShell..."
Get-Content $transcriptPath | ForEach-Object {
    if ($_.Contains("preview.html")) {
        try {
            $json = $_ | ConvertFrom-Json
            $step_idx = $json.step_index
            $step_type = $json.type
            $status = $json.status
            Write-Output "Step $step_idx ($step_type) status=$status"
            if ($json.tool_calls) {
                foreach ($tc in $json.tool_calls) {
                    if ($tc.name -eq "view_file" -or $tc.name -eq "replace_file_content" -or $tc.name -eq "multi_replace_file_content") {
                        Write-Output "  Tool: $($tc.name)"
                        Write-Output "  StartLine: $($tc.args.StartLine), EndLine: $($tc.args.EndLine)"
                    }
                }
            }
        } catch {
            # ignore
        }
    }
}
