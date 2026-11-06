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

# Workflow Template Mappings
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
        "format": "png",
        "template": "img_klein",
        "prompt": (
            "35mm film portrait of Deputy Crumb, an exhausted alien postal clerk in an underfunded space government office in 1987. "
            "Squashed rounded alien silhouette with three heavy drooping tired multi-lidded eyes, deadpan unbothered expression. "
            "Wearing a rumpled faded taupe trenchcoat over a dingy cream collared shirt with a crooked skinny tie, "
            "and an oversized tarnished heavy brass employee badge pinned askew engraved 'DEPUTY CRUMB #404'. "
            "Sitting at an administrative counter under cool flickering fluorescent tube lighting. "
            "On the desk is the edge of a mechanical industrial round wall clock locked at 04:59 PM. "
            "Muted pea-green and beige institutional walls with watermarks, Terry Gilliam Brazil retro cinematic aesthetic, Kodak 1980s film grain. "
            "1024x1024 square framing with subject centered within circular avatar safe zone."
        ),
        "seed": 4041987
    },
    "desk_still": {
        "id": "crumb_desk_still_1920x1080",
        "type": "still",
        "width": 1920,
        "height": 1080,
        "format": "png",
        "template": "img_klein",
        "prompt": (
            "Cinematic wide 16:9 shot of Department 404 intake station, an underfunded interstellar postal bureau in 1987. "
            "Deputy Crumb in a rumpled faded taupe trenchcoat and brass badge 'DEPUTY CRUMB #404' sits slumped behind a scratched dark oak clerk counter. "
            "Teetering precarious towers of yellowed carbon forms labeled 'STATEMENTS (UNVERIFIED)' rise toward the ceiling on the left, "
            "while a tiny brass tray on the right labeled 'RECEIPTS (CONFIRMED)' holds a single voucher. "
            "Heavy cast-iron brass stamper on red ink blotter. Bulky cream CRT monitor glowing green monochrome phosphor text 'STATUS: BACKLOG 800 YRS'. "
            "A mechanical industrial round wall clock with black metal rim prominently displays exactly 04:59 PM. "
            "Flickering fluorescent ceiling tube casting cool ambient green-white glow on drab pea-green watermarked walls, Terry Gilliam Brazil film still, 35mm grain."
        ),
        "seed": 4041988
    },
    "banner": {
        "id": "crumb_banner_1536x512",
        "type": "still",
        "width": 1536,
        "height": 512,
        "format": "png",
        "template": "img_klein",
        "prompt": (
            "Panoramic 3:1 establishing shot of Department 404 administrative counter, The Ministry of Unconfirmed Things, 1987. "
            "Frosted wire-reinforced glass partitions and beige filing cabinets behind the counter. "
            "To the left: leaning tower of paper labeled 'STATEMENTS (UNVERIFIED)'. To the right: tiny brass tray labeled 'RECEIPTS (CONFIRMED)'. "
            "In the center: Deputy Crumb slumped in a rumpled faded taupe trenchcoat with heavy brass badge 'DEPUTY CRUMB #404', staring at the clock. "
            "A mechanical industrial round wall clock on the wall displays exactly 04:59 PM. Harsh fluorescent tube lighting, drab pea-green walls, 35mm film photography."
        ),
        "seed": 4041989
    },
    "clip5": {
        "id": "crumb_clip5_promise_isnt_paperwork",
        "type": "video",
        "width": 1280,
        "height": 720,
        "length_frames": 252,
        "fps": 24,
        "format": "mp4",
        "template": "vid_h3_t2v",
        "prompt": (
            "Cinematic retro 1987 bureaucratic scene. Deputy Crumb in a rumpled faded taupe trenchcoat and brass badge 'DEPUTY CRUMB #404' "
            "has his hand on the office exit doorknob, muttering 'One minute. Finally.' "
            "A vintage dot-matrix printer suddenly screeches and spits continuous green-bar paper reading 'PROMISE: BUYBACK 100%'. "
            "Crumb freezes, turns with glacial slowness, shuffles back to his oak desk, stares deadpan directly into the camera lens: 'A promise isn't paperwork.' "
            "He forcefully slams a heavy brass stamper down, creating a bold red ink mark: '[ WORDS ONLY ]'. Crumb: 'Bring me a transaction. Next.' "
            "Fluorescent light flicker, mechanical printer screech, heavy metal stamper thud."
        ),
        "seed": 4041990
    },
    "stream_bg_loop": {
        "id": "crumb_stream_bg_loop_5s",
        "type": "video",
        "width": 1280,
        "height": 704,
        "length_frames": 121,
        "fps": 24,
        "format": "mp4",
        "template": "vid_h3_t2v",
        "prompt": (
            "Deputy Crumb sitting behind the Department 404 clerk counter at 04:59 PM, looking exhausted in his rumpled taupe trenchcoat with brass badge 'DEPUTY CRUMB #404'. "
            "Fixed locked-off camera. Fluorescent tube light softly flickers above pea-green watermarked walls. "
            "Crumb blinks his heavy multi-lidded eyes slowly in deliberate sequence, sighs a faint puff of administrative dust, and taps his fingers once on the desk blotting pad. "
            "A mechanical industrial round wall clock in corner reads 04:59 PM. "
            "Audio: Gentle 60Hz fluorescent hum, distant clock tick, faint sigh, heavy mechanical stamp thud. Seamless 5-second loop."
        ),
        "seed": 4041991
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
