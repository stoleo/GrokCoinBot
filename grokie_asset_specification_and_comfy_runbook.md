# Grokie.fun Asset Specification Manifest & ComfyUI Generation Runbook
**Author:** Subagent 2 — Real-Time Engine & Visual Architect  
**Project:** GrokCoinBot / The Ministry of Unconfirmed Things  
**Execution Script:** [`c:\Projects\GrokCoinBot\generate_grokie_assets.py`](file:///c:/Projects/GrokCoinBot/generate_grokie_assets.py)

---

## 1. Exact Asset Specification Manifest for Grokie.fun Launch

### A. Bot Profile Picture (PFP / Avatar)
- **Primary Deliverable:** `assets/crumb_pfp_1024x1024.webp` (WebP lossy quality 95)
- **Backup Deliverable:** `assets/crumb_pfp_1024x1024.png` (PNG uncompressed)
- **Downsampled Delivery:** `assets/crumb_pfp_512x512.webp`
- **Aspect Ratio:** `1:1` square.
- **Dimensions:** 1024 × 1024 px (multiples of 16).
- **Safe Area & Framing:**
  - Standard circular avatar mask diameter: 820 px centered.
  - Crumb's facial silhouette, multi-lidded alien eyes, and oversized brass employee badge (`STAFF / DEPT 404`) must remain within the inner 80% bounding circle.
- **Narrative Art Direction:**
  - Slumped crescent-moon posture, dusty gray postal coat, worn collar.
  - Three tired, heavy alien eyelids blinking with slow administrative resignation.
  - Overhead fluorescent hum glare casting slight rim lighting on his shoulders.
  - Desk in immediate foreground with mechanical blotting pad and corner of red digital clock reading `04:59`.
  - Color Palette: 1987 Underfunded Space Government beige, sepia, dusty slate, and dull brass.

### B. Header / Social Banner (3:1 Aspect Ratio)
- **Primary Deliverable:** `assets/crumb_banner_1500x500.webp` (WebP quality 92)
- **High-Res Source:** `assets/crumb_banner_1536x512.png` (PNG uncompressed, multiple of 16 for diffusion latents)
- **Aspect Ratio:** `3:1` widescreen.
- **Dimensions:** 1536 × 512 px.
- **Safe Area & Framing:**
  - Bottom-left 25% reserved for PFP overlap on desktop Twitter/X and Grokie bot profile cards.
  - Core visual action centered in the right 75% of the frame.
- **Narrative Art Direction:**
  - Establishing panoramic view of Department 404 administrative counter.
  - Frosted wire-reinforced glass partition behind the counter.
  - On the left: Leaning 4-foot tower of beige paperwork labeled `STATEMENTS (UNVERIFIED)`.
  - On the right: A tiny, immaculately polished brass tray labeled `RECEIPTS (CONFIRMED)` containing one single stamped voucher.
  - In the center: Deputy Crumb slumped behind the counter, coat half-on, worn umbrella hooked over forearm, staring at the clock.
  - Industrial mechanical flip clock mounted to the wall prominently reading `04:59 PM`.

### C. Video Animatic & Stream Background (16:9 & 9:16)
- **Deliverables:**
  - Stream Background Loop: `assets/crumb_stream_bg_loop_5s_720p.mp4` (1280 × 704 px, 24 fps, 5.0s loop)
  - Mobile Short / Cold Open: `assets/crumb_cold_open_10s_1080p.mp4` (1080 × 1920 px, 24 fps, 10.0s narrative)
- **Container / Codec:** MP4 container with H.264 video codec (`yuv420p` pixel format, High Profile 4.1, web-optimized faststart `moov` atom at front).
- **Audio Specification:** AAC stereo, 128 kbps, 44.1 kHz, normalized to `-14.0 LUFS` integrated loudness and `-1.0 dBFS` true peak.
- **Frame Rate & Length:**
  - 24.0 fps constant frame rate (CFR).
  - 5.0s loop: 121 frames (frame 121 matches frame 1 seamlessly).
- **Narrative Motion:**
  - Fixed locked-off camera.
  - Subtle fluorescent light tube buzz oscillation.
  - Crumb blinks his multi-lidded eyes in deliberate sequence (left lid, top lid, right lid), releases a quiet puff of chalk dust, and glances at the door.
  - Audio contains authentic low 60Hz electrical hum, ticking mechanical clock, and distant pneumatic paper chute.

---

## 2. Turnkey ComfyUI Execution Script Structure

The turnkey runner script is committed and ready at:
`c:\Projects\GrokCoinBot\generate_grokie_assets.py`

### Safety Protocol & Hardware Gating Rules:
Per `C:\Projects\Skills\skills\comfyui\references\gpu-rules.md`, this machine features a single RTX 4090 (24 GB) shared between the LocalAI host (Ollama / Wren builder roles, ~20 GB) and ComfyUI (~19 GB staging memory).
- **Hard Rule:** Never bypass the gate or terminate host processes manually.
- The script checks GPU gate status via `comfy.py status`. If Wren's AI or Ollama holds VRAM, the script safely fails closed and exits without queueing.
- When Wren releases the GPU hold, the script invokes:
  ```bash
  python C:\Projects\Skills\skills\comfyui\scripts\comfy.py start --hold
  ```
  This requests a managed gateway hold (30-minute TTL), launches ComfyUI, runs the batch sequentially, and immediately calls:
  ```bash
  python C:\Projects\Skills\skills\comfyui\scripts\comfy.py stop
  ```
  to hand the card back to Wren and LocalAI.

### Exact Workflow Template Mappings:

| Asset Type | Target Model / Workflow Template | Script File Mapping | Key Generation Parameters |
| :--- | :--- | :--- | :--- |
| **Hero PFP Still** | `FLUX 3 Klein Base` (`img_klein`) | `C:\Projects\Skills\skills\comfyui-craft\templates\api\img_klein.json` | 1024×1024 px, 8 steps (distilled int8), cfg 1.0, seed 4041987 |
| **Fast PFP Draft** | `Z-Image Turbo` (`img_zimage`) | `C:\Projects\Skills\skills\comfyui-craft\templates\api\img_zimage.json` | 1024×1024 px, 8 steps, AuraFlow shift 3.0, cfg 1.0 |
| **Banner Panoramic** | `FLUX 3 Klein Base` (`img_klein`) | `C:\Projects\Skills\skills\comfyui-craft\templates\api\img_klein.json` | 1536×512 px (3:1 ratio), 8 steps, cfg 1.0, seed 4041988 |
| **Talking Video Clip** | `MiniMax H3 Audio-Visual` (`vid_h3_t2v`) | `C:\Projects\Skills\skills\comfyui-craft\templates\api\vid_h3_t2v.json` | 1280×704 px, 121 frames @ 24 fps, dual audio VAE, shift 12 |
| **High-Fidelity i2v** | `Wan 2.2 14B High/Low Noise` (`vid_wan_i2v`) | `C:\Projects\Skills\skills\comfyui-craft\templates\api\vid_wan_i2v.json` | Anchored on approved PFP keyframe, 20 steps (10+10 split), cfg 3.5 |

---

## 3. Asset Delivery & Verification Checklist (Pre-Grok Review)

Every rendered asset must pass this 10-point checklist before being submitted to Grok for final sign-off:

```
[ ] 1. Circular Mask Safe-Area Audit:
       - Place PFP inside an 80% circle overlay.
       - Ensure Crumb's eyes, nose/snout, and the "STAFF / DEPT 404" badge are not clipped.
[ ] 2. Multiple of 16/32 Resolution Check:
       - Verify exact dimensions (1024x1024, 1536x512, 1280x704). Zero arbitrary scaling artifacts.
[ ] 3. 1987 Space Bureaucracy Canon Compliance:
       - Clock strictly reads 04:59 (no modern digital fonts, authentic red 7-segment or mechanical flip).
       - Zero green/red crypto trading candles, zero token symbols, zero Lambos.
       - Authentic manila folder beige, industrial slate, and dull brass textures.
[ ] 4. Anatomical & AI Hallucination Filter:
       - Inspect hands/fingers: exactly 5 digits per hand (or consistent alien anatomy).
       - Inspect eyes: 3 distinct multi-lidded eyelids without floating pupils or distortion.
[ ] 5. High-DPI Contrast & Dark/Light Mode Legibility:
       - Test PFP visibility against pure black (#000000), Twitter dark (#15202B), and light mode (#FFFFFF).
[ ] 6. Video Frame-by-Frame Scrub:
       - Inspect frame 1, frame 60 (midpoint), and frame 121 (last frame).
       - Confirm zero facial melting, morphing clothing, or wandering badges.
[ ] 7. Seamless Loop Continuity:
       - For the 5.0s background loop, verify frame 121 transitions smoothly back into frame 1.
[ ] 8. Audio Loudness & Transients:
       - Verify audio integrated loudness is exactly -14.0 LUFS (+/- 1.0 LUFS).
       - Ensure stamp thud and fluorescent buzz do not clip (true peak <= -1.0 dBFS).
[ ] 9. Codec & Web-Faststart Validation:
       - Confirm MP4 container uses H.264 Baseline/High Profile with YUV420p color space.
       - Run qtfaststart / verify moov atom is at the beginning of the file for instant web playback.
[ ] 10. Native Browser Test:
       - Load into `dual_character_botcam_test.html` and `form_459.html` via standard file protocol.
       - Ensure 60 FPS playback with zero browser console warnings.
```
