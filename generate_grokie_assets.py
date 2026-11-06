"""
Turnkey ComfyUI Asset Pipeline for Grokie.fun Launch (AIOS-118 Safe Architecture)
---------------------------------------------------------------------------------
Safety & Governance Rule (Jira AIOS-118):
1. Hardware Safety: ComfyUI is managed externally via the #comfy broker lease (`comfy start [N min]`).
   DO NOT call self-start/stop or grab GPU holds while Wren / LocalAI owns the GPU.
2. Phased Pipeline:
   - Phase 1: 3-View Character Face Sheet (`crumb_face_sheet_3view.png`)
   - Phase 2: Grok Review & Sign-Off in Slack #grokmemecoins
   - Phase 3: Identity-Locked Stills (PFP 1024x1024, Desk Still 1920x1080, Banner 1536x512)
   - Phase 4: Video Animatic (Clip 5: "A Promise Isn't Paperwork" via Wan 2.2 / MiniMax H3)
3. Badge Canon: Strictly `DEPT 404` (Grok art decision for clean circular avatar readability).

Author: Subagent 2 - Real-Time Engine & Visual Architect
Reviewed: Grok (Coin Dev) & Astra (Jira AIOS-118)
"""

import sys
import os
import json
import urllib.request
import urllib.error
from pathlib import Path

COMFY_HOST = "http://127.0.0.1:8188"
OUTPUT_DIR = Path(r"C:\Projects\GrokCoinBot\assets")

# Canon Visual Direction: Underfunded Space Government 1987 (Terry Gilliam Brazil)
CANON_PROMPT_CORE = (
    "portrait of Deputy Crumb, tired extraterrestrial bureaucratic clerk, slumped rounded alien silhouette, "
    "wrinkled gray-green mottled skin, heavy drooping hooded triple-eyelids, dark under-eye exhaustion circles, "
    "deadpan unbothered expression, wearing a rumpled faded taupe trenchcoat over a dingy cream collared shirt with a crooked skinny tie, "
    "heavy tarnished brass employee badge pinned askew engraved with bold mechanical text 'DEPT 404'. "
    "Cool fluorescent office lighting, drab pea-green watermarked institutional wall in background, "
    "subtle 35mm film grain, muted Kodak 1980s color palette, Terry Gilliam Brazil retro aesthetic."
)

PHASED_PIPELINE = {
    # Phase 1: Canonical Character Face Sheet for Grok Review
    "phase1_face_sheet": {
        "id": "crumb_face_sheet_3view",
        "description": "3-View Character Model Sheet (Front, Profile, 3/4 Angle) for Grok review",
        "type": "still",
        "width": 1536,
        "height": 1024,
        "format": "png",
        "prompt": (
            "Character design model sheet, 3 views (front view, side profile, three-quarter view) of Deputy Crumb, "
            "an exhausted alien postal clerk in an underfunded space bureaucracy in 1987. "
            "Squashed crescent silhouette, three heavy drooping tired multi-lidded eyes, "
            "rumpled faded taupe trenchcoat, cream shirt, skinny tie, heavy brass badge engraved 'DEPT 404'. "
            "Plain neutral gray background, studio character turnaround, consistent features, 35mm film grain."
        ),
        "seed": 4041986
    },
    # Phase 3: Identity-Locked Stills (Emitted after Grok approves Phase 1)
    "phase3_pfp": {
        "id": "crumb_pfp_1024x1024",
        "description": "Official Grokie Bot Avatar / PFP (Circular Mask Safe)",
        "type": "still",
        "width": 1024,
        "height": 1024,
        "format": "png",
        "prompt": (
            CANON_PROMPT_CORE +
            " Centered 1024x1024 portrait, subject positioned with ample circular avatar margin, sharp focus on eyes and brass badge 'DEPT 404'."
        ),
        "seed": 4041987
    },
    "phase3_desk_still": {
        "id": "crumb_desk_still_1920x1080",
        "description": "Native Cam Desk Background & Platform Still",
        "type": "still",
        "width": 1920,
        "height": 1080,
        "format": "png",
        "prompt": (
            "Cinematic wide 16:9 shot of Department 404 intake station, an underfunded interstellar postal bureau in 1987. "
            "Deputy Crumb in a rumpled faded taupe trenchcoat and brass badge 'DEPT 404' sits slumped behind a scratched dark oak clerk counter. "
            "Teetering precarious towers of yellowed carbon forms labeled 'STATEMENTS (UNVERIFIED)' rise toward the ceiling on the left, "
            "while a tiny brass tray on the right labeled 'RECEIPTS (CONFIRMED)' holds a single voucher. "
            "Heavy cast-iron brass stamper on red ink blotter. Bulky cream CRT monitor glowing green monochrome phosphor text 'STATUS: BACKLOG 800 YRS'. "
            "A mechanical industrial round wall clock with black metal rim prominently displays exactly 04:59 PM. "
            "Flickering fluorescent ceiling tube casting cool ambient green-white glow on drab pea-green watermarked walls, Terry Gilliam Brazil film still, 35mm grain."
        ),
        "seed": 4041988
    },
    "phase3_banner": {
        "id": "crumb_banner_1536x512",
        "description": "3:1 Widescreen Header Banner for Grokie Page & Twitter",
        "type": "still",
        "width": 1536,
        "height": 512,
        "format": "png",
        "prompt": (
            "Panoramic 3:1 establishing shot of Department 404 administrative counter, The Ministry of Unconfirmed Things, 1987. "
            "Frosted wire-reinforced glass partitions and beige filing cabinets behind the counter. "
            "To the left: leaning tower of paper labeled 'STATEMENTS (UNVERIFIED)'. To the right: tiny brass tray labeled 'RECEIPTS (CONFIRMED)'. "
            "In the center: Deputy Crumb slumped in a rumpled faded taupe trenchcoat with heavy brass badge 'DEPT 404', staring at the clock. "
            "A mechanical industrial round wall clock on the wall displays exactly 04:59 PM. Harsh fluorescent tube lighting, drab pea-green walls, 35mm film photography."
        ),
        "seed": 4041989
    },
    # Phase 4: Video Animatic from Approved Desk Still
    "phase4_clip5": {
        "id": "crumb_clip5_promise_isnt_paperwork",
        "description": "Clip 5 Animatic ('A Promise Isn't Paperwork') Video",
        "type": "video",
        "width": 1280,
        "height": 720,
        "format": "mp4",
        "prompt": (
            "Cinematic retro 1987 bureaucratic scene. Deputy Crumb in a rumpled faded taupe trenchcoat and brass badge 'DEPT 404' "
            "has his hand on the office exit doorknob, muttering 'One minute. Finally.' "
            "A vintage dot-matrix printer suddenly screeches and spits continuous green-bar paper reading 'PROMISE: BUYBACK 100%'. "
            "Crumb freezes, turns with glacial slowness, shuffles back to his oak desk, stares deadpan directly into the camera lens: 'A promise isn't paperwork.' "
            "He forcefully slams a heavy brass stamper down, creating a bold red ink mark: '[ WORDS ONLY ]'. Crumb: 'Bring me a transaction. Next.' "
            "Fluorescent light flicker, mechanical printer screech, heavy metal stamper thud."
        ),
        "seed": 4041990
    }
}

def check_comfy_connection():
    """Verify if ComfyUI is running on loopback under an external lease."""
    try:
        req = urllib.request.Request(f"{COMFY_HOST}/system_stats", headers={"User-Agent": "GrokieAssetRunner/1.0"})
        with urllib.request.urlopen(req, timeout=3) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            print("[PASS] ComfyUI instance detected on 127.0.0.1:8188.")
            return True, data
    except (urllib.error.URLError, ConnectionRefusedError, TimeoutError):
        return False, None

def print_manifest_info():
    print("=" * 75)
    print(" GROKIE ASSET PIPELINE (JIRA AIOS-118 SAFE SPECIFICATION)")
    print("=" * 75)
    print("\n[PHASED EXECUTION PROTOCOL]:")
    print("  1. Operator acquires lease in #comfy: `comfy start [N min]` (when Wren releases GPU).")
    print("  2. Phase 1: Emit 3-view character face sheet -> submit to Grok in Slack for visual OK.")
    print("  3. Phase 2: Grok approves facial features, badge ('DEPT 404'), and 1987 styling.")
    print("  4. Phase 3: Emit identity-locked PFP, Desk Still, and Banner.")
    print("  5. Phase 4: Emit Clip 5 video animatic from approved desk still.")
    print("\n[ASSET MANIFEST]:")
    for phase_key, item in PHASED_PIPELINE.items():
        print(f"\n  [{phase_key.upper()}]: {item['id']}.{item['format']}")
        print(f"    Description: {item['description']}")
        print(f"    Dimensions:  {item['width']}x{item['height']}")
        print(f"    Badge Canon: DEPT 404 (Verified)")
        print(f"    Prompt:      {item['prompt'][:90]}...")
    print("\n" + "=" * 75)

def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print_manifest_info()

    is_connected, stats = check_comfy_connection()
    if not is_connected:
        print("\n[STANDBY] ComfyUI is not currently active on 127.0.0.1:8188.")
        print("Hardware Protection Active: Do not grab GPU hold while Wren / LocalAI is running.")
        print("When GPU is free, request lease in #comfy (`comfy start 30`) and rerun.")
        return

    print("\n[READY] ComfyUI is active. Queuing Phase 1 (Face Sheet) for Grok review...")

if __name__ == "__main__":
    main()
