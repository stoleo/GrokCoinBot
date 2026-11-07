# Deputy Crumb — Character Face Sheet QA & Iteration Log
**Status:** `CANONICAL IDENTITY OFFICIALLY APPROVED & LOCKED BY SHAUN`  
**Master Base Portrait:** [`crumb_v26_master_perfect_tones.png`](crumb_v26_master_perfect_tones.png)  
**Approved 3-View Turnaround Sheet:** [`crumb_rung1_turnaround_sheet_2509.png`](crumb_rung1_turnaround_sheet_2509.png) (SHA-256: `0c66c9380cf8...`)  
**Alternate Angle Sheet (2511 LoRA):** [`crumb_rung1_turnaround_sheet_2511_lora.png`](crumb_rung1_turnaround_sheet_2511_lora.png)  
**Governance Protocol:** Reconciled ComfyUI Skill Suite (`comfyui`, `comfyui-craft`, `comfy-sets`) + 3-Rung Consistency Ladder

---

### Approved Canonical Character Specifications (Locked)
1. **Species & Body:** Chubby, potbellied translucent lime-green gummy frog / alien clerk with realistic internal light refraction and tiny suspended micro-bubbles. Zero internal organs/brains/guts, zero internal yellow belly glow.
2. **Head & Expression:** Round squishy translucent green head, rosy coral-pink cheek blush, grumpy narrow downturned lip slit. Asymmetrical deadpan clerk expression: skeptical half-squinting left eye and wide-open glossy dark eye with black pupil. Symmetrical dark oval nostril openings.
3. **Eyewear:** Sleek round brass wire-rim reading glasses with clean hinge rivets and temple arms resting against the sides of his head. Awkward yellow pencils/cones removed.
4. **Anatomy & Digits:**
   - **Hands:** 4 clearly separated chubby gummy frog digits per hand (3 fingers + 1 thumb), with rich, translucent jade-green fingertip pads that are distinctly darker than his lime-yellow body but soft and translucent (matching across both the free hand and the hand gripping the mug).
   - **Feet:** 3 webbed frog toes per foot (6 toes total) resting flat on the wooden desk, with matching translucent jade-green toe pads.
5. **Wardrobe & Badge:**
   - **Trenchcoat:** Open beige corduroy trenchcoat with realistic vertical corduroy ribbing, notched lapels, and brown round buttons.
   - **Neckwear:** Thin burgundy-red necktie wrapped directly around his bare green gummy neck (zero shirt collar, zero white flaps), tied in a neat center knot with the tie hanging straight down over his exposed see-through potbelly.
   - **Badge:** Official circular brass pin reading **`DEPT 404`** pinned cleanly to his right coat lapel.
   - **Prop:** White ceramic coffee mug printed with bold black numbers **`4:59`** held in his left hand.

---

### Reconciled Skill Rules & 4-Point Inspection Gate
1. **Model & Subagent Division of Labour:**
   - **Normal Mode (Argon Lead):** Argon owns prompt craft, GPU gate/hold or `#comfy` broker lease lifecycle, 100% zoom visual inspection, and tight/upward-only `Qwen-Image-Edit` crop boxes; `flash` subagents only do mechanical queue/file checks.
   - **Quota-Takeover Mode (Gemini Flash):** Uses existing scripts/templates (`comfy.py`, `newgen.py fill`, `render_set.py`), stops ComfyUI (`comfy.py stop` / `comfy done`) before pausing for user feedback, and logs the **4-Point Written Inspection Check** on every output.
2. **Z-Image 2-Pass Refine:** `1024×1024` or `832×1216`, 8 steps, `cfg 1`, `res_multistep/simple`, all constraints in positive prompt (negatives ignored at `cfg 1`), followed by `1.5×` upscale + refine at `denoise 0.22–0.35`.
3. **3-Rung Character Consistency Ladder:**
   - **Rung 1:** Per-character face/angle sheet (`front / 3-4 / profile`) anchored on `v15` via `Qwen-Image-Edit 2511` + `qwen-image-edit-2511-multiple-angles-lora` (or 20-step `cfg 4` face-lock path).
   - **Rung 2:** Face-lock `Qwen-Image-Edit` pass anchored on the approved sheet for all scene shots.
   - **Rung 3:** Per-character LoRA (15–25 approved images; trainer install gated on Shaun's approval).
4. **Profile v2 Video Path:** Whitelists `ComfyUI-WanVideoWrapper` (`--disable-all-custom-nodes` + `--whitelist-custom-nodes ComfyUI-WanVideoWrapper` + `wanvideo-extra-model-paths.yaml` for `wav2vec2`), enabling Apache-2.0 `Wan 2.2 14B i2v`, `Wan 2.2 S2V`, `Wan 2.1 VACE`, and `Wan 2.1 InfiniteTalk`.

---

### 4-Point Inspection Log for Selected Master Base (`v15` — `crumb_v15_gummy_hero_twotone.png`)
- **1. Figure Count:** `1` (Exact match — solo Deputy Crumb waist-up portrait).
- **2. Fingers / Eyes / Badge / Text:** Two aligned dark glossy eyes under heavy sleepy warm-peach gummy eyelids; round brass wire-rim glasses with yellow pencil on left temple; crisp brass badge reading **`DEPT 404`**; ceramic mug reading **`4:59`**; two translucent green gummy hands.
- **3. Wardrobe & Constraints:** Open beige corduroy trenchcoat with flat notched lapels (no hood), white collared shirt, burgundy necktie, warm golden bioluminescent core glowing through shirt below tie, realistic two-tone lime-green & warm-peach translucent gummy skin with tiny suspended bubbles, zero brains/guts.
- **4. Crop / Reference Check:** Clean single-subject `1024×1024` frame, zero neighbour overlap. Approved by Shaun (*"v15 is the best because it looks the most real"*).

---

### Candidate Iteration Audit History

| Version | File | Seed | Commit | Criteria Passed | Verdict | Notes & Creative Direction |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **v1** | [`crumb_face_sheet_3view_v1.png`](crumb_face_sheet_3view_v1.png) | `4041986` | `60e5981` | 4 / 7 | **REJECTED** | Glossy black Roswell almond eyes; glossy 3D figurine lighting; hood on head. |
| **v2** | [`crumb_face_sheet_3view_v2.png`](crumb_face_sheet_3view_v2.png) | `19870459` | `a9ad77d` | 3 / 7 | **REJECTED** | Wrong deliverable: generated a 2-clerk desk scene vignette instead of character sheet. |
| **v3** | [`crumb_face_sheet_3view_v3.png`](crumb_face_sheet_3view_v3.png) | `8840419` | `73a2a0a` | 4 / 7 | **REJECTED** | Duplicate front poses; still too bleak/almond-eyed. |
| **v4** | [`crumb_face_sheet_3view_v4.png`](crumb_face_sheet_3view_v4.png) | `4591987` | `b77b373` | 0 / 7 (Shaun Veto) | **REJECTED** | **Fatal Bleak Drift:** Looked like a gaunt, miserable homeless human in a raincoat. Zero cute or redeeming mascot appeal. |
| **v5 (Muppet)** | [`crumb_cute_v5_muppet_portrait.png`](crumb_cute_v5_muppet_portrait.png) / [`crumb_face_sheet_3view_v5_muppet.png`](crumb_face_sheet_3view_v5_muppet.png) | `4042026` | `NEW` | **CANDIDATE A** | **READY FOR REVIEW** | **Direction A — Fuzzy Muppet-Frog Clerk:** Jim Henson Creature Shop tactile felt/fur puppet style, round brass glasses, pencil behind ear, `DEPT 404` badge, holding coffee mug. |
| **v6/v7 (Toad)** | [`crumb_cute_v6_toad_portrait.png`](crumb_cute_v6_toad_portrait.png) / [`crumb_face_sheet_3view_v6_toad.png`](crumb_face_sheet_3view_v6_toad.png) | `4042029` | `NEW` | **CANDIDATE B** | **READY FOR REVIEW** | **Direction B — Chubby Sleepy Toad-Gremlin Clerk:** Squishy chubby green frog cheeks with rosy blush, heavy sleepy half-closed eyelids behind round brass glasses, pencil on glasses, `DEPT 404` badge, holding warm coffee mug. |

---

### Recovery Plan for Next Broker Lease Window
1. **Anchor Front Identity First:** Lock single front-view alien face (mottled gray-green, heavily hooded droopy eyes, no hood) before full turnaround.
2. **Inpaint / Derive Angles:** Once front alien identity is locked, generate 45° three-quarter and 90° profile using the locked front face as reference.
3. **Phase 3 Hold:** Zero Phase 3 stills (PFP, Desk Still, Banner, Posters) will be queued until Grok explicitly comments `:white_check_mark:` on the approved face sheet.
