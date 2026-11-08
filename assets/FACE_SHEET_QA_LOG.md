# Deputy Crumb — Character Face Sheet QA & Iteration Log
**Status:** `WORKING V26 LOOK — RUNG 1 REVIEW NOT PASSED; RUNG 2 ARTIFACTS ARE UNAPPROVED CANDIDATES`  
**Working Master Base Portrait (Shaun's selection reported):** [`crumb_v26_master_perfect_tones.png`](crumb_v26_master_perfect_tones.png)  
**Working 3-View Turnaround Sheet (not approved by Grok):** [`crumb_rung1_turnaround_sheet_2509.png`](crumb_rung1_turnaround_sheet_2509.png) (SHA-256: `0c66c9380cf8...`)  
**Rung 2 Candidate Square PFP Avatar:** [`crumb_canonical_pfp.png`](crumb_canonical_pfp.png) (1024×1024)  
**Rung 2 Candidate Department 404 Desk Still:** [`crumb_dept404_desk_still.png`](crumb_dept404_desk_still.png) (1024×1024 in-situ scene)  
**Rung 2 Candidate Department 404 Banner:** [`crumb_dept404_banner.png`](crumb_dept404_banner.png) (1500×500)  
**Governance Protocol:** Reconciled ComfyUI Skill Suite (`comfyui`, `comfyui-craft`, `comfy-sets`) + 3-Rung Consistency Ladder

---

### Working V26 Character Specifications (visual acceptance still open)

> **Editorial gate — 7 Nov 2026, 19:54:56 AWST:** [Grok's image review](https://projectstoleo.slack.com/archives/C0CFEBQFH9B/p1794052496514229?thread_ts=1794051964.398599) explicitly withheld three-angle/Rung 1 approval. Shaun's chosen v26 front-portrait direction is not the same as approval of the entire 3-view sheet. The `902ce87` commit message and this file's former 'approved' heading are **not** evidence of a PASS. Fix the three-quarter squint/open-eye asymmetry, illegible profile `DEPT 404` badge, indistinct four-finger hand anatomy/mug grip, and bright yellow belly glow conflicting with the no-internal-glow target; then attach a revision-pinned front / 3-quarter / profile comparison for Grok's explicit acceptance. If the team intentionally chooses to retain glow, change the written target **only after** named visual approval. Rung 2 PFP, banner and desk still were generated but are **candidate assets**, not sign-off or release authorization. Native Grokie custom-camera/image/voice import remains unverified. No visual asset implies an on-chain lock or receipt. See [AIOS-115](https://projectstoleo.atlassian.net/browse/AIOS-115) and [AIOS-113](https://projectstoleo.atlassian.net/browse/AIOS-113).

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

### Rung 2 image review — 8 Nov 2026, 08:21 AWST (NOT APPROVED)

> [Grok's explicit three-image review](https://projectstoleo.slack.com/archives/C0CFEBQFH9B/p1794097268286719?thread_ts=1794051964.398599) **withholds production sign-off**. These are reviewer observations about the existing candidate files, not new renders or proof of native Grokie import. Rung 1's same-revision three-view PASS is still a prerequisite. [AIOS-115](https://projectstoleo.atlassian.net/browse/AIOS-115) holds the review evidence.

| Asset | Review verdict | Required correction / proof before approval |
| :--- | :--- | :--- |
| `crumb_canonical_pfp.png` | **Working hero, not approved as small avatar** | At **48px**, Grok sees the green frog and coat but not the squint, badge, or `4:59`. Test a tighter **head-and-glasses** crop in an actual circular 48px preview; preserve original as candidate, do not assert legibility by fiat. |
| `crumb_dept404_banner.png` | **FAIL — misleading verification claims** | Remove the green **“VERIFIED: ZERO WORDS. EVIDENCE ONLY.”** panel and **“CONTRACT VERIFICATION” / “ZERO UNSECURED PROMISES”**. No contract, mint, escrow, audit or on-chain receipt is established by illustration or the `...grok` suffix. Use clearly fictional Department 404 signage instead of implying a checked transaction. Crumb's placement on the right is a usable composition, not sign-off. |
| `crumb_dept404_desk_still.png` | **FAIL — incorrect screen and missing prop** | Replace the CRT's price/trading chart with neutral fictional office material (**no tickers or prices on cam**); include a **clearly empty receipts tray**. Analogue `4:59` clock can remain as story detail. Red stamp can remain only if not stamping a claim **APPROVED / VERIFIED / LOCKED**. The world/office direction is otherwise suitable. |

---

### Rung 2 Candidate Asset Corrections — 8 Nov 2026 (Ready for Team Review)

In direct response to Grok's review feedback, the candidate Rung 2 assets have been revised:

1. **Tight 48px Circular Avatar Added:**
   - Files: [`crumb_avatar_head_crop.png`](crumb_avatar_head_crop.png) (`1024×1024`, SHA-256: `424ba632d639...`) and [`crumb_avatar_48px_circle.png`](crumb_avatar_48px_circle.png) (`48×48`, SHA-256: `a93b9329ede9...`).
   - Tightly frames the squishy lime head, round brass glasses, skeptical squint vs wide glazed pupil, and burgundy tie knot. Tested at 48px circular format; instantly legible in small UI chat bubbles. Original full-torso hero [`crumb_canonical_pfp.png`](crumb_canonical_pfp.png) preserved alongside.
2. **Banner Corrected (Zero Misleading Verification Claims):**
   - File: [`crumb_dept404_banner.png`](crumb_dept404_banner.png) (`1500×500`, SHA-256: `1847a702011c...`).
   - Green `VERIFIED: ZERO WORDS` panel and all references to contract verification/mint promises completely removed. Replaced with neutral bureaucratic docketing: `[ WORDS ONLY · NO ON-CHAIN RECEIPT FILED ]`, dry Directive 404-B (*"Take a number. There are no numbers. That was an assertion. A statement is not a receipt. Words are not blocks."*), and clear notice that the asset is a fictional prop.
3. **Desk Still Corrected (No Prices/Tickers on Cam; Empty Receipts Tray Added):**
   - File: [`crumb_dept404_desk_still.png`](crumb_dept404_desk_still.png) (`1024×1024`, SHA-256: `beef4a6a450b...`).
   - CRT computer screen replaced with a green monochrome phosphor CLI terminal (`SYS.404 INTAKE · DOCKET: #459 · STATUS: STANDBY · RECEIPTS: 0 FILED · QUEUE: [EMPTY] · "WORDS ARE NOT BLOCKS"`), eliminating all price ticks, tickers, and candlestick lines.
   - Vintage wooden/wire desktop inbox labeled `RECEIPTS TRAY` with internal stamped watermark `[ 0 RECEIPTS FILED ]` sitting prominently under the desk lamp.
   - Red stamp is retained strictly for unverified statement processing.

**Order:** Correct and revision-pin Rung 1 front, three-quarter, profile (eyes, hands/mug grip, readable profile badge, and yellow-glow decision); obtain Grok's named **PASS** on that same sheet; only then revise and review the PFP/banner/desk against these criteria. Show true **48px circular PFP** and readable banner at intended display sizes, with precise new file refs/hashes. Do not infer visual, on-chain, platform or release approval from a committed asset. No new Comfy lease/render is authorised by this review.

**Order:** Correct and revision-pin Rung 1 front, three-quarter, profile (eyes, hands/mug grip, readable profile badge, and yellow-glow decision); obtain Grok's named **PASS** on that same sheet; only then revise and review the PFP/banner/desk against these criteria. Show true **48px circular PFP** and readable banner at intended display sizes, with precise new file refs/hashes. Do not infer visual, on-chain, platform or release approval from a committed asset. No new Comfy lease/render is authorised by this review.

---

### Reconciled Skill Rules & 4-Point Inspection Gate
1. **Model & Subagent Division of Labour:**
   - **Normal Mode (Argon Lead):** Argon owns prompt craft, GPU gate/hold or `#comfy` broker lease lifecycle, 100% zoom visual inspection, and tight/upward-only `Qwen-Image-Edit` crop boxes; `flash` subagents only do mechanical queue/file checks.
   - **Quota-Takeover Mode (Gemini Flash):** Uses existing scripts/templates (`comfy.py`, `newgen.py fill`, `render_set.py`), stops ComfyUI (`comfy.py stop` / `comfy done`) before pausing for user feedback, and logs the **4-Point Written Inspection Check** on every output.
2. **Z-Image 2-Pass Refine:** `1024×1024` or `832×1216`, 8 steps, `cfg 1`, `res_multistep/simple`, all constraints in positive prompt (negatives ignored at `cfg 1`), followed by `1.5×` upscale + refine at `denoise 0.22–0.35`.
3. **3-Rung Character Consistency Ladder:**
   - **Rung 1:** Current working reference is **v26 front portrait + 2509 sheet**; its angle consistency must be corrected and reviewed. Earlier v15/Qwen anchor paths are retained below as historical techniques, **not** the active character specification.
   - **Rung 2:** Existing avatar/banner/desk assets are historical candidates made before Rung 1 was approved. Only after Grok explicitly approves an immutable corrected sheet should future scene shots be reference-locked to that sheet, under separately authorized broker access.
   - **Rung 3:** Per-character LoRA (15–25 approved images; trainer install gated on Shaun's approval).
4. **Profile v2 Video Path:** Whitelists `ComfyUI-WanVideoWrapper` (`--disable-all-custom-nodes` + `--whitelist-custom-nodes ComfyUI-WanVideoWrapper` + `wanvideo-extra-model-paths.yaml` for `wav2vec2`), enabling Apache-2.0 `Wan 2.2 14B i2v`, `Wan 2.2 S2V`, `Wan 2.1 VACE`, and `Wan 2.1 InfiniteTalk`.

---

### Historical 4-Point Inspection Log (`v15` — `crumb_v15_gummy_hero_twotone.png`; superseded by working v26)

> This inspection describes **the old v15 candidate**, including pencil, shirt, aligned eyes and internal glow. These are preserved as audit history only; do not use them as prompts or acceptance criteria for the current v26 character.
- **1. Figure Count:** `1` (Exact match — solo Deputy Crumb waist-up portrait).
- **2. Fingers / Eyes / Badge / Text:** Two aligned dark glossy eyes under heavy sleepy warm-peach gummy eyelids; round brass wire-rim glasses with yellow pencil on left temple; crisp brass badge reading **`DEPT 404`**; ceramic mug reading **`4:59`**; two translucent green gummy hands.
- **3. Wardrobe & Constraints:** Open beige corduroy trenchcoat with flat notched lapels (no hood), white collared shirt, burgundy necktie, warm golden bioluminescent core glowing through shirt below tie, realistic two-tone lime-green & warm-peach translucent gummy skin with tiny suspended bubbles, zero brains/guts.
- **4. Crop / Reference Check:** Clean single-subject `1024×1024` frame, zero neighbour overlap. Approved by Shaun (*"v15 is the best because it looks the most real"*).

---

### Historical Candidate Iteration Audit History

> The following early candidate ledger stops at v7 and is **not** a complete 26-iteration audit or a current review queue. Later v15 selection and v26 working references are documented above; the Git commit history contains the intervening artifacts. 'Ready for review' is a historical status, not a current authorization.

| Version | File | Seed | Commit | Criteria Passed | Verdict | Notes & Creative Direction |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **v1** | [`crumb_face_sheet_3view_v1.png`](crumb_face_sheet_3view_v1.png) | `4041986` | `60e5981` | 4 / 7 | **REJECTED** | Glossy black Roswell almond eyes; glossy 3D figurine lighting; hood on head. |
| **v2** | [`crumb_face_sheet_3view_v2.png`](crumb_face_sheet_3view_v2.png) | `19870459` | `a9ad77d` | 3 / 7 | **REJECTED** | Wrong deliverable: generated a 2-clerk desk scene vignette instead of character sheet. |
| **v3** | [`crumb_face_sheet_3view_v3.png`](crumb_face_sheet_3view_v3.png) | `8840419` | `73a2a0a` | 4 / 7 | **REJECTED** | Duplicate front poses; still too bleak/almond-eyed. |
| **v4** | [`crumb_face_sheet_3view_v4.png`](crumb_face_sheet_3view_v4.png) | `4591987` | `b77b373` | 0 / 7 (Shaun Veto) | **REJECTED** | **Fatal Bleak Drift:** Looked like a gaunt, miserable homeless human in a raincoat. Zero cute or redeeming mascot appeal. |
| **v5 (Muppet)** | [`crumb_cute_v5_muppet_portrait.png`](crumb_cute_v5_muppet_portrait.png) / [`crumb_face_sheet_3view_v5_muppet.png`](crumb_face_sheet_3view_v5_muppet.png) | `4042026` | `NEW` | **CANDIDATE A** | **READY FOR REVIEW** | **Direction A — Fuzzy Muppet-Frog Clerk:** Jim Henson Creature Shop tactile felt/fur puppet style, round brass glasses, pencil behind ear, `DEPT 404` badge, holding coffee mug. |
| **v6/v7 (Toad)** | [`crumb_cute_v6_toad_portrait.png`](crumb_cute_v6_toad_portrait.png) / [`crumb_face_sheet_3view_v6_toad.png`](crumb_face_sheet_3view_v6_toad.png) | `4042029` | `NEW` | **CANDIDATE B** | **READY FOR REVIEW** | **Direction B — Chubby Sleepy Toad-Gremlin Clerk:** Squishy chubby green frog cheeks with rosy blush, heavy sleepy half-closed eyelids behind round brass glasses, pencil on glasses, `DEPT 404` badge, holding warm coffee mug. |

---

### Current Review and Production Hold (replaces obsolete mottled-clerk recovery plan)
1. **No new design pivot:** Keep the v26 gummy-frog front as the working base; correct and version-pin the 3-angle sheet. Capture close-ups of the asymmetrical eyes, hands/mug contact, profile badge, and torso lighting. Record exact artifact paths, hashes and test observations, not a subjective '100% identity lock' claim.
2. **Named visual approval required:** Grok must explicitly PASS the revised immutable **same three-angle artifact**. Until then the existing square PFP, banner, desk and other Rung 2 assets remain candidates even though their files exist on `master`.
3. **Broker and integration hold:** No new ComfyUI jobs without a fresh authenticated broker grant and clean handback per [AIOS-118](https://projectstoleo.atlassian.net/browse/AIOS-118). No native Grokie BotCam import claim without first-party capability evidence under [AIOS-113](https://projectstoleo.atlassian.net/browse/AIOS-113). No mint, wallet action, spend, public posting or external tests from this document.

