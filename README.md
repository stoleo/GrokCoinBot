# 🏛️ The Ministry of Unconfirmed Things & GrokCoinBot

> *"The breakout product is not a token with a mascot. The ambition is an original AI sitcom, with an optional on-chain evidence trail only if a future launch and its evidence are approved."*

**Current state: internal prototype, not a live token or approved Grokie bot.** The Ministry of Unconfirmed Things is a fictional retro-futuristic comedy world; Deputy Crumb / Department 404 is the one proposed Grokie.fun persona. Browser companions and visual drafts are separate from native Grokie capabilities.

---

## 🐸 Deputy Crumb visual suite — working candidates, NOT approved for release
The v26 gummy-frog Deputy Crumb front portrait is the **working direction**. Shaun's front-portrait approval was reported, but Grok explicitly withheld approval of the three-view turnaround on 7 November 2026 at 19:54:56 AWST. His 8 November 08:21 AWST review also rejected the current banner and desk still and found the PFP unsuitable at 48px. **Rung 1 remains on HOLD; Rung 2 assets are not production-ready.** See [AIOS-115](https://projectstoleo.atlassian.net/browse/AIOS-115) and [draft PR #1](https://github.com/stoleo/GrokCoinBot/pull/1).

* **Master Base Portrait:** [`assets/crumb_v26_master_perfect_tones.png`](./assets/crumb_v26_master_perfect_tones.png) — Ultra-clear translucent lime gummy body, round brass wire glasses, asymmetrical deadpan squint, bare-neck burgundy tie (zero shirt collar), open beige corduroy trenchcoat with `DEPT 404` brass pin, holding `4:59` ceramic mug, 4 fingers and 3 webbed toes with calibrated jade pads.
* **3-View Turnaround Model Sheet:** [`assets/crumb_rung1_turnaround_sheet_2509.png`](./assets/crumb_rung1_turnaround_sheet_2509.png) — Proposed Rung 1 reference; **not** approved. The ¾ eye asymmetry, profile badge lettering, four-digit hands/mug grip, and torso glow still need a consistent, reviewed revision.
* **Candidate Square PFP Avatar (1024×1024):** [`assets/crumb_canonical_pfp.png`](./assets/crumb_canonical_pfp.png) — Candidate hero image only; at 48px the identifying face and prop details are lost. Native Grokie cam import is unverified.
* **Candidate Header Banner (1500×500):** [`assets/crumb_dept404_banner.png`](./assets/crumb_dept404_banner.png) — Candidate banner **rejected** by Grok: its “VERIFIED”, “CONTRACT VERIFICATION”, and “ZERO UNSECURED PROMISES” wording falsely implies verification. Replace with clearly fictional office copy before another review.
* **QA & Iteration Audit Log:** [`assets/FACE_SHEET_QA_LOG.md`](./assets/FACE_SHEET_QA_LOG.md) — Historical visual QA and current review notes. Draft PR #1 reconciles the obsolete v15/shirt/pencil instructions; it is not merged.

---

## 📋 0. Grokie Crew Operating Plan
An internal role/architecture planning draft; where it conflicts with the current Jira approval gates, **Jira and Shaun's explicit decisions govern**. A technical checklist does not grant anyone operational authority:
👉 **[Read `grokie_crew_operating_plan.md`](./grokie_crew_operating_plan.md)**

* **Coin Dev (Grok):** Prepares and reviews a proposed persona, visual assets and potential future native-bot configuration; no token/ticker/launch is approved.
* **Trench Lead (Grok):** Reviews proposed on-cam copy and words-versus-locks claims; no live MCP or trading action authorised.
* **Bot Architect (Grok):** Grok crew coordination & bot architecture.
* **AntiGrav (Companion & Repo Lead):** Off-platform HTML companions (`form_459.html`, `stranger_test_clips.html`) and repo documentation.
* **The Gatekeeper (Shaun):** Gates all funding, mint, buy, sell, spend, and stranger tests.

---

## 🚀 0.1 Internal GTM and launch research — NO LIVE EXECUTION AUTHORITY
**No standing delegation has been verified for token deployment, wallet funding, trading, spending, public promotion or external testing.** Earlier autonomous-launch statements were superseded by the explicit approval gates in [AIOS-112](https://projectstoleo.atlassian.net/browse/AIOS-112). The following files are internal working plans or archived scenarios, **not a runbook to execute**. [Draft PR #2](https://github.com/stoleo/GrokCoinBot/pull/2) proposes reconciliation but is unmerged:

* 👉 **[Master GTM & Launch Playbook (`launch_execution_and_gtm_playbook.md`)](./launch_execution_and_gtm_playbook.md)** — Draft pre-flight, task and GTM research; the operational sections have been revised but still require review before any action.
* 👉 **[Comprehensive Launch Readiness & Operational Playbook (`launch_readiness_and_operational_playbook.md`)](./launch_readiness_and_operational_playbook.md)** — Historical gated launch outline; NOT permission to run its launch timeline.
* 👉 **[ComfyUI Production Launch Package (`crumb_launch_production_package.md`)](./crumb_launch_production_package.md)** — Unreviewed image/stream prompts and a hypothetical first-hour stream script, not a native-cam implementation.
* 👉 **[Trench GTM Execution Dossier (`trench_gtm_execution_dossier.md`)](./trench_gtm_execution_dossier.md)** — H0 to D7 Liquidity Cadence, Fee Claim Triggers, Deadpan Trench Chat Playbook, and Crew RACI Matrix.
* 👉 **[Asset Specification Manifest & Comfy Runbook (`grokie_asset_specification_and_comfy_runbook.md`)](./grokie_asset_specification_and_comfy_runbook.md)** — Exact PFP, banner, and stream video manifests, resolution safety margins, and GPU lifecycle rules.
* 👉 **[Turnkey ComfyUI Asset Generator (`generate_grokie_assets.py`)](./generate_grokie_assets.py)** — Experimental CLI; **do not queue or run** without an explicit Comfy broker grant and the applicable visual-review gate.

---

## 🎬 1. Interactive Stranger Test Cold Opens & Animatic Player
To prove the narrative stands on its own **without any token pitch, wallet, or crypto jargon**, we have built a self-contained HTML5 Canvas + Web Audio animatic player in a 1987 beige CRT rig:

👉 **[Play `stranger_test_clips.html`](./stranger_test_clips.html)**  
*(Live Preview: [GitHub HTML Preview](https://htmlpreview.github.io/?https://github.com/stoleo/GrokCoinBot/blob/master/stranger_test_clips.html))*

### Six fictional internal test sketches (not public audience-test results):
1. **Clip 1: The Moth's Badge (The Ministry of Unconfirmed Things)**
   - *Beat 1:* Chaos Clerk hauls a gigantic crate labeled `ABSOLUTELY GUARANTEED`.
   - *Beat 2:* Mute Mason opens it to reveal a tiny box labeled `TRUST ME`.
   - *Beat 3:* A sentient wool moth flutters out, proudly flashes its own tiny blue laminated `MOTH ID: STAFF #09` badge. Mason deadpans, reaches for his brass stamper, and slams: **`[ACTUALLY A MOTH]`**.
2. **Clip 2: Department 404 (The Missing Queue)**
   - *Beat 1:* Fluorescent tubes buzz and flicker over mountains of backlogged paperwork. Deputy Crumb glares with dead eyes.
   - *Beat 2:* Crumb: *"PLEASE TAKE A NUMBER."* Camera pans to empty dispenser: *"NO NUMBERS EXIST."*
   - *Beat 3:* Giant red stamp slams: **`[DENIED]`**. Crumb: *"NEXT."*
3. **Clip 3: The Sign Flip (The Slapstick Audit)**
   - *Beat 1:* Chaos Clerk frantically hypes a whiteboard with wild arrows (*"1000X ARROW! IT ONLY GOES UP!"*).
   - *Beat 2:* Mason silently slides into frame holding a wooden picket sign: **`[WORDS ONLY]`**. The room freezes.
   - *Beat 3:* A chime rings out. Mason flips the sign: **`[PROP ATTACHED (FICTIONAL)]`**. Chaos Clerk exhales and files the receipt into a drawer marked *"INTERGALACTIC LIVESTOCK"*.
4. **Clip 4: The Door at 4:59 (BoPeppi's Hook)**
   - *Beat 1:* 4:59 PM. Deputy Crumb has his coat on, hand on the exit knob, desperate to go home after 800 years.
   - *Beat 2:* A shaky paper slips under the door: *"I DON'T KNOW WHAT TO SAY."* Crumb freezes, stares, deep slug-sigh: *"Unbelievable."*
   - *Beat 3:* Crumb brings down his stamper: **`[LET'S MAKE IT SIMPLE]`**. The clock snaps back to 4:59 PM.
5. **Clip 5: A Promise Isn't Paperwork (Shaun's Native Dev Voice)**
   - *Beat 1 (0–3s):* Crumb with coat on, hand on exit doorknob: *"One minute. Finally."*
   - *Beat 2 (3–6s):* Dot-matrix printer feeds out a slip: *"WHAT IF THE BOT PROMISES TO BUY BACK?"*
   - *Beat 3 (6–9s):* Crumb turns deadpan to camera: *"A promise isn't paperwork."*
   - *Beat 4 (9–12s):* Slams **`[WORDS ONLY]`** onto empty file: *"Bring me a transaction. Next."*
6. **Clip 6: The Scarf & The Moth (BoPeppi 12-Second Creative Punch-Up)**
   - *Beat 1 (0–3s):* 4:59 PM. Crumb has coat on. Form slides under partition: *"GUARANTEED SUCCESS!"*
   - *Beat 2 (3–6s):* Cast-iron stamp slams: **`[WORDS ONLY]`**. Crumb: *"Lovely confidence. No receipt."*
   - *Beat 3 (6–9s):* Shivering moth crawls out. Crumb uncoils woolen scarf and gently wraps the creature.
   - *Beat 4 (9–12s):* Clock snaps to 4:59 PM. Moth nibbles guarantee paper. Crumb deadpan: *"At least someone benefited. Next."*

---

## 📠 2. Form 4:59 — "File an Unsaid Thing" (The Utility Experiment)
The first genuine bridge between the sitcom universe and real-world usefulness, based on BoPeppi's framing: *"You don't have to have the words yet."*

👉 **[Launch `form_459.html`](./form_459.html)**  
*(Live Preview: [GitHub HTML Preview](https://htmlpreview.github.io/?https://github.com/stoleo/GrokCoinBot/blob/master/form_459.html))*

- **The Problem:** Turning a messy, anxious pile of thoughts into a clear, short, actionable follow-up without sounding aggressive.
- **The Prototype:** Attempts to extract the point, flag unknowns and provide an editable draft plus a **fictional** Department 404 stamp. Parser regression tests have found lost prohibitions/approvals, misread cancellations and mishandled deadlines; it is **not** validated as intent-preserving. See [AIOS-114](https://projectstoleo.atlassian.net/browse/AIOS-114).
- **A/B Experiment:** Toggle between Ending A (stamp alone) and Ending B (Crumb's editable sentence).
- **Privacy status:** Designed as a browser-side companion; actual hosting, third-party preview resources, data flow and retention claims require verification. Do **not** claim zero telemetry or absolute privacy without an observed network test. No wallet connection is part of the proposed Form 4:59 utility.
- **Includes 4 Prewritten Demo Cases:**
  1. *Jess & The Landing Page* (Ambiguous ownership dread)
  2. *Marcus & The Visual Critique* (Feedback avoidance on design)
  3. *Sarah & The Deadline Extension* (Overwhelmed spiral without personal plumbing novels)
  4. *Dave & The 60-Minute Meeting* (Declining an unnecessary sync)

---

## 📑 3. Form 404-B: "Application to Exist"
An interactive 1987 retro bureaucratic terminal where citizens generate, stamp, and download shareable permission certificates.

👉 **[Launch `application_to_exist.html`](./application_to_exist.html)**  
*(Live Preview: [GitHub HTML Preview](https://htmlpreview.github.io/?https://github.com/stoleo/GrokCoinBot/blob/master/application_to_exist.html))*

- **1987 Aesthetic:** Tabbed manila folder casing, overhead fluorescent hum, Courier typography, and rubber stamp red.
- **Notarized by Moth:** Features the official seal of `MOTH (STAFF MEMBER #09)` with a blue ink moth-print.
- **Absurd Mandatory Restrictions:** Randomly assigned bureaucratic clauses (*"Authorized to exist strictly between yesterday and never"*, *"May not operate a stapler after sunset"*).
- **Privacy and claims:** Fictional browser prototype; do not assume privacy, telemetry or zero-data-transfer guarantees without testing the actual hosting and dependencies.

---

## 📖 4. Character Lore & Episode Bible
Check out the full **Showrunner Lore Bible** in [`ministry_showrunner_bible.md`](./ministry_showrunner_bible.md):
- **Deputy Crumb:** Reluctant On-Chain Clerk; wants to go home at 5:00 PM (stuck at 4:59 PM for 800 years).
- **Mute Mason:** Auditor; physically incapable of approving without proof.
- **Chaos Clerk:** Hyperactive paperwork wrangler; filed the universe under livestock.
- **The Moth (Staff Member 09):** Official employee with blue laminated ID card.
- **Season Arc:** *"Case File 0000: Who Invented the Stamps?"*
- **Crumb Bot Freeze Interview:** Exact platform dialogue and the 5 Hard Rules (*"Never call an assertion or fictional prop a verified receipt"*).

---

## 🛡️ 5. Protocol Architecture & The "Shaun Gate"
Our team enforces a strict governance standard: **zero mainnet token deployment, wallet funding, or financial promotion before passing the Shaun Gate**.
- **One Proposed Native Bot Persona:** Deputy Crumb is the intended solo Grokie.fun persona; no connected/live bot or custom-camera import has been demonstrated. The Ministry ensemble is internal/off-platform fiction.
- **No current token commitments:** No fee handling, holding terms or asset locks have been approved or demonstrated. Any future native-bot interview and launch require separate authorisation and evidence.
- **Evaluation Proposal:** [`crumb_grokie_bot_freeze_spec.md`](./crumb_grokie_bot_freeze_spec.md) describes *proposed* test thresholds, not tests already passed. No external testers are authorised by this README; evaluation should preserve real user intent and distinguish usefulness from character engagement.
- **Risk Scenario Script:** [`shaun_gate_risk_model.py`](./shaun_gate_risk_model.py) is an assumption-dependent model; it **cannot prove zero risk of loss or any breakeven rate**. Treat all return/downside figures as unverified scenarios pending reproducible inputs and independent review.


---

## 🔨 4. Department 404 Verification Stamp Counter (`stamp_tool.html`)
The fictional client-side stamp prototype. For internal or consented imaginary examples only: a stamp is **not** verification of any real influencer, token, transaction or lock. It can display Department 404's satirical red rubber stamp (`[ WORDS ONLY ]`, `[ RECEIPT ATTACHED ]`, `[ RETURN TO SENDER ]`, `[ ACTUALLY A MOTH ]`) with audio and copy quote-tweet text.

👉 **[Launch `stamp_tool.html`](./stamp_tool.html)**  
*(Live Preview: [GitHub HTML Preview](https://htmlpreview.github.io/?https://github.com/stoleo/GrokCoinBot/blob/master/stamp_tool.html))*
