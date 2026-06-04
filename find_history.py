import json
import os

transcript_path = r"C:\Users\admin\.gemini\antigravity\brain\917a9c43-15c4-4efe-98e9-93ce7dcfe605\.system_generated\logs\transcript.jsonl"

if not os.path.exists(transcript_path):
    print("Transcript not found")
    exit()

print("Analyzing transcript...")
with open(transcript_path, "r", encoding="utf-8") as f:
    for i, line in enumerate(f):
        try:
            data = json.loads(line)
            content = str(data)
            if "preview.html" in content:
                step_idx = data.get("step_index")
                step_type = data.get("type")
                status = data.get("status")
                print(f"Line {i+1}: Step {step_idx} ({step_type}) status={status}")
                if "tool_calls" in data:
                    for tc in data["tool_calls"]:
                        if tc.get("name") in ("view_file", "replace_file_content", "multi_replace_file_content"):
                            print("  Tool call args:", tc.get("args"))
        except Exception as e:
            print(f"Error parsing line {i+1}: {e}")
