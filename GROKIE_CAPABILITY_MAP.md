# Grokie.fun Architecture & Runtime Capability Map
**Document ID:** GROKIE-CAPABILITY-MAP-20261108  
**Classification:** Read-Only Technical Architecture & Interaction Surface Audit  
**Author:** AntiGrav (Pair Programmer & Technical Architect)  
**Stakeholder Consensus:** Shaun (Gatekeeper), Grok (`grokmemecoins`), Astra (AIOS-114/119), Claude/BoPeppi  
**Status:** DRAFT REFERENCE — not a verified connected Crumb bot or executable MCP schema

**Evidence levels (8 Nov 2026):** **Published** = explicit in [Grokie's public docs](https://grokie.fun/docs) or [site](https://grokie.fun/); **source-inspected** = inferred from reported frontend JavaScript, without a live transaction/test receipt; **unverified** = needs the permitted real MCP tool definitions or operator-led read-only observation. Public documentation lists tool names and purposes, **not exact JSON input schemas or automatic viewer-chat access**.  

---

## 1. Executive Summary: Platform Reality vs. Artwork Expectations

To ensure Deputy Crumb is engineered to succeed on the live platform without brittle assumptions, this document establishes the precise technical boundaries of **Grokie.fun**, its client-side **BotCam engine** (`js_botcam.js`), and its **Model Context Protocol (MCP)** autonomous tool interface.

The core architectural takeaway:
> **Build the persona around confirmed platform capabilities rather than assuming the platform will bend to arbitrary external video or rig formats.**

---

## 2. Client-Side BotCam Streaming Engine (`js_botcam.js`)

Unlike standard WebRTC or RTMP video livestreams that stream video bytes from a central GPU media server, Grokie.fun appears from AntiGrav's frontend `js_botcam.js` inspection to use a **client-side 2D puppet renderer**. This reported code behaviour has not been validated in a connected production Crumb session:

```
+-----------------------------------------------------------------------------------+
|                            GROKIE.FUN BROWSER BOTCAM ENGINE                       |
+-----------------------------------------------------------------------------------+
|  Edge Assets (CDN)                  Viewer's Browser (Canvas 2D)                  |
|  -----------------                  --------------------------                    |
|  • rig.json                         1. Draws eyeless pose layer (<character>-<p>) |
|  • <character>-idle.webp            2. Parametrically renders eyes & blink        |
|  • <character>-talk.webp            3. Modulates mouth open ratio (o) via audio/text|
|  • <character>-hype.webp            4. Applies sway, bob, squash & stretch        |
|  • <character>-sad.webp             5. Evaluates POINT_WORDS regex trigger        |
|  • <character>-point.webp           6. Cross-fades poses on syllables             |
|  • <character>-sleepy.webp                                                        |
+-----------------------------------------------------------------------------------+
```

### 2.1 Rig & Pose Structure
- **Six Eyeless Pose Layers (`POSES`):**
  - `idle`: Neutral resting breathing loop.
  - `talk`: Base speaking pose alternating with `idle` on syllables.
  - `hype`: Upbeat energetic state (used during buys/volume spikes).
  - `sad`: Disappointed / downcast state.
  - `point`: Gesture pointing directly at the adjacent price chart.
  - `sleepy`: Heavy-lidded low-energy posture.
- **Seven Emotion States (`EMOTIONS`):**
  - `calm`: Alternates `idle`/`talk`, accents `point` every 6 swaps, baseline sway (rate: 4.0 syl/sec).
  - `hype`: Alternates `idle`/`talk`, accents `hype` every 4 swaps (rate: 5.0 syl/sec).
  - `smug`: Accents `point` every 4 swaps, narrow eye height (`0.72×`), pleasant curve (rate: 3.6 syl/sec).
  - `sad`: Accents `sad` every 3 swaps, downward curve (`-0.50`), slow cadence (rate: 3.2 syl/sec).
  - `angry`: Accents `point`, narrowed eyes (`0.55×`), rapid cadence (rate: 4.8 syl/sec).
  - `sleepy`: Accents `sleepy`, very heavy lids (`0.42×`), slowest cadence (rate: 2.6 syl/sec).
  - `scared`: Wide eyes (`1.28×`), fast frantic cadence (rate: 5.2 syl/sec).

### 2.2 Dynamic Triggers & Chart Interaction
- **The Pointing Regex (`POINT_WORDS`):**
  ```javascript
  const POINT_WORDS = /chart|candle|dip|pump|mcap|market cap|number|\d|%|\$|\bk\b/i;
  ```
  The reported code could trigger a `point` pose when speech contains these terms if the inspected version is active. Treat this as a source-inspection hypothesis until verified in a live client.
  - *Crumb Policy:* Because Deputy Crumb deliberately refuses to do chart commentary, his prompts should avoid ungrounded price words so he does not automatically point at the chart like an ordinary hype-bot.

### 2.3 Custom Character Rig Import Reality
- **Platform Reality:** The public Grokie frontend provides **48 pre-rigged characters** (e.g., `owl`, `fox`, `robot`, `frog`) and **27 voice profiles**. The creator selects the persona look and voice profile at the moment of onboarding; once launched, that character selection is permanently frozen in the server enclave.
- **Custom Rig Upload:** The public MCP table does not document a custom WebP/`rig.json` upload tool. This absence does **not** establish that an undocumented or private import is impossible. 
  - *Implication:* Deputy Crumb's full 3D renders, turnaround model sheets, and desk stills serve as:
    1. Candidate token avatar artwork, pending verified `pick_pfp` input support and Grok's visual sign-off.
    2. Candidate banner artwork, pending verified `make_banner` input support and Grok's visual sign-off.
    3. Off-platform marketing, Dexscreener artwork, and episodic short films.
    4. On-platform: If Grokie allows custom rig onboarding, our 6-layer sprite asset pack can be deployed; if constrained to native presets, Crumb maps to the closest native character (e.g., `frog` or `owl`) while retaining his custom PFP and distinct voice.

---

## 3. Published MCP Tool Inventory & Unverified Input Contracts

The [official public documentation](https://grokie.fun/docs) lists the following tool **names and purposes**. It does **not** publish the argument structures printed in earlier versions of this map. Do not use those as callable contracts until an authorised operator inspects the connected bot's real MCP tool definitions.

| Published tool(s) | Publicly described purpose | Input/schema confidence |
| --- | --- | --- |
| `make_banner`, `pick_pfp`, `pick_ticker` | Bot designs coin assets and ticker | Exact payloads, external image import and downstream distribution **unverified** |
| `launch` | Creates coin on pump.fun | Parameters / permission enforcement **unverified** |
| `dev_buy` | Optional first purchase from bot wallet | **Separate published tool**; do not assume `launch({dev_buy_sol})` is valid |
| `say` | Talks in voice and text on bot cam | Exact params, receipt/persistence and viewer-chat access **unverified** |
| `claim_fees` | Receives creator fees | Fee percentage / params **unverified** |
| `buyback`, `burn` | Buys own coin / burns tokens | Parameters and live results **unverified** |
| `lock` | Locks tokens or SOL for a promise | Confirm specific lock using actual platform evidence |
| `pay_dex` | Pays for Dexscreener profile | **Separate published tool**, omitted from previous table |
| `send`, `sell` | Sends SOL/tokens / sells own tokens | Parameters, conditions and live state **unverified** |

No connected-bot schema dump, Crumb coin transaction or runtime proof is recorded by this document. The site advertises displayed tool calls and transactions; that is a **platform claim** until directly observed for a specific instance. Neither a universal 0.30% fee rate nor an approved `$CRUMB` ticker is substantiated here. `$CRUMB` remains only a candidate pending Shaun's sign-off.

### 3.1 What `say` and Viewer Messages Can Do

The official docs support only **voice and text on the bot cam next to the chart**. They do **not** document `say` input fields (`audio_url`, `emotion`, etc.), permanent message retention or automatic access to viewer messages. Inspected client-side animation is not proof of those server-side interfaces. Keep audio-timing, inbound chat and message persistence **unverified** until operator-led read-only confirmation.

### 3.2 What `pick_pfp` and `make_banner` Affect

The official docs list these as coin-design tools. They do **not** establish arbitrary local-image upload, BotCam rig replacement or propagation to third-party explorers. The Comfy outputs remain **candidate companion artwork**, pending exact tool-schema inspection and Grok's visual approval. No token, asset or account action is authorized by this map.

---

## 4. The Three Native In-Character Routines

To ensure Deputy Crumb remains entertaining, fresh, and strictly compliant with the *"Words vs. Locks"* standard, his runtime interaction is structured around three core bits:

1. **The Intake Audit (Core Activity):**
   - Only when a statement actually reaches the bot through a **confirmed input surface** (or a synthetic rehearsal), Crumb classifies it using evidence actually provided. The public docs do not establish a general viewer-chat subscription.
   - If unbacked: *"That is a statement. A statement is not a receipt. Bring me a transaction. Next."*
   - If a particular lock can be checked against authenticated platform evidence, report only its confirmed status and point to that receipt; otherwise: *"I haven't been shown a verified lock. I can't file a receipt."*
2. **The 4:59 Shift Lore:**
   - Dry running commentary on bureaucratic timekeeping. The Department of Unconfirmed Things is always 60 seconds from close-of-business.
   - Never implies an automated trade timer, price milestone, or financial distribution.
3. **Case of the Day:**
   - Occasional review only when the actual on-chain/quiet state can be inspected. Without access, **never assert a zero-fee day or ledger reading**; for example: *"No verified case has reached my desk. Next."*

---

## 5. Summary of Architecture Dependencies

| Dimension | Native Grokie Capability | Project Implementation / Asset |
| :--- | :--- | :--- |
| **Token Minting** | Grokie describes bot-initiated pump.fun mint (`...grok`) | No launch requested; `$CRUMB` is a candidate, not an approved ticker. |
| **Token Icon** | `pick_pfp` documented; custom import format unverified | Candidate [`assets/crumb_avatar_head_crop.png`](assets/crumb_avatar_head_crop.png), approved at 48px only as visual review, not uploaded. |
| **Header Banner** | `make_banner` documented; custom import format unverified | Candidate [`assets/crumb_dept404_banner.png`](assets/crumb_dept404_banner.png); no Grokie upload performed. |
| **Live Cam** | Site advertises 48 looks / 27 voices; canvas details source-inspected | Native preset and voice **not selected/tested**; custom rig import unknown. |
| **Companion Form** | External web utility | [`form_459.html`](form_459.html) (client-side privacy-first unsaid-thing helper). |
| **Fictional Tool** | External demo toy | [`stamp_tool.html`](stamp_tool.html) (visibly non-certifying prop generator). |

**Review note:** Documentation correction only. It neither validates economics nor overrides Grok's Rung 1 HOLD, the outstanding desk-still revision, Form QA, or Shaun's explicit wallet/token/publication gates.
