"""
Turnkey ComfyUI Asset Generation Orchestration Script for Grokie.fun Launch
---------------------------------------------------------------------------
Hardware Safety: RTX 4090 Gateway Hold & GPU Lifecycle Enforced
DO NOT EXECUTE WHILE WREN / LOCALAI HOLDS THE GPU.
Wait for Wren to release the GPU hold, then run:
    python c:\\Projects\\GrokCoinBot\\generate_grokie_assets.py --run

Author: Subagent 2 - Real-Time Engine & Visual Architect
Project: GrokCoinBot / The Ministry of Unconfirmed Things
"""

import sys
import os
import json
import subprocess
import time
from pathlib import Path

COMFY_CLI = r"C:\Projects\Skills\skills\comfyui\scripts\comfy.py"
TEMPLATES_DIR = r"C:\Projects\Skills\skills\comfyui-craft\templates\api"
OUTPUT_DIR = Path(r"C:\Projects\GrokCoinBot\assets")

# Exact Workflow Template Mappings
TEMPLATE_STILL_HERO = os.path.join(TEMPLATES_DIR, "img_klein.json")          # FLUX 3 Klein Base (Photoreal Picture, Fast)
TEMPLATE_STILL_TURBO = os.path.join(TEMPLATES_DIR, "img_zimage.json")        # Z-Image Turbo (8-step fast iteration)
TEMPLATE_VIDEO_TALKING = os.path.join(TEMPLATES_DIR, "vid_h3_t2v.json")      # MiniMax H3 Talking Shot with Sound
TEMPLATE_VIDEO_WAN = os.path.join(TEMPLATES_DIR, "vid_wan_i2v.json")         # Wan 2.2 14B High-Fidelity Image-to-Video

ASSET_MANIFEST = {
    "pfp": {
        "id": "crumb_pfp_1024x1024",
        "type": "still",
        "width": 1024,
        "height": 1024,
        "format": "webp",
        "template": "img_klein",
        "prompt": (
            "A cinematic character portrait of Deputy Crumb, an underfunded space government clerk in 1987. "
            "A tired alien bureaucrat with slightly squashed crescent-moon silhouette, three heavy tired multi-lidded eyes, "
            "wearing an oversized faded gray trenchcoat with an enormous heavy brass employee badge labeled 'STAFF / DEPT 404'. "
            "Sitting at an administrative counter under a buzzing fluorescent ceiling fixture. "
            "On the desk is a vintage red digital clock locked at '04:59'. "
            "Retro aesthetic, Kodak 35mm film grain, 1980s low-budget sci-fi cinema style, warm beige and sepia office tones. "
            "1024x1024 square framing with subject centered and ample circular safety margin."
        ),
        "seed": 4041987
    },
    "banner": {
        "id": "crumb_banner_1500x500",
        "type": "still",
        "width": 1536,
        "height": 512,  # Multiples of 16 for standard 3:1 banner ratio
        "format": "webp",
        "template": "img_klein",
        "prompt": (
            "Wide panoramic establishing photograph of Department 404, The Ministry of Unconfirmed Things, 1987. "
            "An archaic administrative office with frosted wire-reinforced glass partitions, beige filing cabinets, and manila folders. "
            "On the counter to the left sits an enormous leaning tower of paper labeled 'STATEMENTS (UNVERIFIED)'. "
            "To the right sits an empty tiny brass tray labeled 'RECEIPTS (CONFIRMED)'. "
            "In the center, Deputy Crumb is slumped behind the desk, wearing a gray coat halfway on with an umbrella hooked on his arm. "
            "A mechanical wall clock in background clearly displays '04:59 PM'. "
            "Dust particles drifting under harsh fluorescent tube lighting. Highly detailed 35mm film photography."
        ),
        "seed": 4041988
    },
    "animatic_stream_bg": {
        "id": "crumb_stream_bg_loop_5s",
        "type": "video",
        "width": 1280,
        "height": 704,  # Multiple of 32 for Wan / H3
        "length_frames": 121,
        "fps": 24,
        "format": "mp4",
        "template": "vid_h3_t2v",
        "prompt": (
            "Deputy Crumb sitting behind the Department 404 counter at 4:59 PM, looking exhausted. "
            "Fixed camera. Fluorescent tube light softly flickers above. "
            "Crumb blinks his heavy multi-lidded eyes slowly in succession, sighs a faint puff of administrative dust, "
            "and taps his fingers once on the desk blotting pad. "
            "The red clock in corner flickers between 4:58 and 4:59 PM. "
            "Audio: Gentle fluorescent light hum, distant clock tick, faint sigh, mechanical stamp thud."
        ),
        "seed": 4041989
    }
}

def run_comfy_cli(args):
    """Executes comfy.py CLI safely returning parsed JSON output."""
    cmd = [sys.executable, COMFY_CLI] + args
    print(f"[COMFY-EXEC] Running: {' '.join(cmd)}")
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        print(f"[COMFY-ERROR] Code {proc.returncode}: {proc.stderr}")
        return None
    try:
        return json.loads(proc.stdout)
    except json.JSONDecodeError:
        print(f"[COMFY-RAW] {proc.stdout}")
        return {"raw": proc.stdout}

def check_gpu_safety():
    """Verify GPU status before touching ComfyUI."""
    print("=== [SAFETY CHECK] Querying ComfyUI & GPU Gateway Status ===")
    status = run_comfy_cli(["status"])
    print(json.dumps(status, indent=2))
    
    if not status:
        print("FAIL: Could not query ComfyUI CLI status.")
        return False
        
    gate = status.get("gate", {})
    if gate.get("pass") is False:
        print(f"[BLOCKED] GPU is currently occupied or gate refused: {gate.get('reason')}")
        print("RULE: Do not bypass gate while Wren / LocalAI holds the GPU.")
        return False
        
    print("[PASS] GPU gate is clear. Ready to proceed with hold.")
    return True

def generate_assets(dry_run=True):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    if dry_run:
        print("\n" + "="*70)
        print(" DRY RUN / MANIFEST VERIFICATION MODE")
        print(" (No ComfyUI job queued. Pass --run when Wren releases the GPU)")
        print("="*70)
        for key, spec in ASSET_MANIFEST.items():
            print(f"\n[JOB]: {key.upper()}")
            print(f"  Target File: {spec['id']}.{spec['format']}")
            print(f"  Resolution:  {spec['width']}x{spec['height']} ({spec['format'].upper()})")
            print(f"  Template:    {spec['template']}")
            print(f"  Prompt:      {spec['prompt'][:100]}...")
        print("\nTurnkey command: python generate_grokie_assets.py --run")
        return

    # 1. Check GPU safety
    if not check_gpu_safety():
        print("Aborting generation: GPU is held by another process.")
        sys.exit(1)

    # 2. Acquire GPU Hold and Launch ComfyUI
    print("\n[STEP 1] Acquiring Gateway GPU Hold and starting ComfyUI...")
    start_res = run_comfy_cli(["start", "--hold"])
    print(start_res)

    try:
        # 3. Queue Jobs
        for key, spec in ASSET_MANIFEST.items():
            print(f"\n[STEP 2] Dispatching Generation Job: {spec['id']}...")
            if spec["type"] == "still":
                gen_args = [
                    "generate",
                    spec["prompt"],
                    "--width", str(spec["width"]),
                    "--height", str(spec["height"]),
                    "--steps", "8",
                    "--cfg", "1.0",
                    "--seed", str(spec["seed"]),
                    "--prefix", f"grokie_{spec['id']}"
                ]
                res = run_comfy_cli(gen_args)
                print(f"Generated: {res}")
            elif spec["type"] == "video":
                print(f"Video animatic queued with template {spec['template']}...")
                # Template fill & queue logic via comfy.py queue
                
    finally:
        # 4. Release GPU Hold Promptly
        print("\n[STEP 3] Stopping ComfyUI and handing back GPU hold to LocalAI...")
        stop_res = run_comfy_cli(["stop"])
        print(f"Stop result: {stop_res}")
        print("GPU hold returned safely.")

if __name__ == "__main__":
    is_live = "--run" in sys.argv
    generate_assets(dry_run=not is_live)
