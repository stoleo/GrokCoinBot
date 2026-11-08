# Grokie.fun Architecture & Runtime Capability Map
**Document ID:** GROKIE-CAPABILITY-MAP-20261108  
**Classification:** Read-Only Technical Architecture & Interaction Surface Audit  
**Author:** AntiGrav (Pair Programmer & Technical Architect)  
**Stakeholder Consensus:** Shaun (Gatekeeper), Grok (`grokmemecoins`), Astra (AIOS-114/119), Claude/BoPeppi  
**Status:** REFERENCE ARCHITECTURE — READ-ONLY CAPABILITY MAPPING  

---

## 1. Executive Summary: Platform Reality vs. Artwork Expectations

To ensure Deputy Crumb is engineered to succeed on the live platform without brittle assumptions, this document establishes the precise technical boundaries of **Grokie.fun**, its client-side **BotCam engine** (`js_botcam.js`), and its **Model Context Protocol (MCP)** autonomous tool interface.

The core architectural takeaway:
> **Build the persona around confirmed platform capabilities rather than assuming the platform will bend to arbitrary external video or rig formats.**

---

## 2. Client-Side BotCam Streaming Engine (`js_botcam.js`)

Unlike standard WebRTC or RTMP video livestreams that stream video bytes from a central GPU media server, Grokie.fun executes a **100% client-side 2D skeletal canvas engine**:

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
  Whenever the bot's speech contains market terms, numbers, or percentages, the engine automatically schedules a momentary transition to the `point` pose!
  - *Crumb Policy:* Because Deputy Crumb deliberately refuses to do chart commentary, his prompts should avoid ungrounded price words so he does not automatically point at the chart like an ordinary hype-bot.

### 2.3 Custom Character Rig Import Reality
- **Platform Reality:** The public Grokie frontend provides **48 pre-rigged characters** (e.g., `owl`, `fox`, `robot`, `frog`) and **27 voice profiles**. The creator selects the persona look and voice profile at the moment of onboarding; once launched, that character selection is permanently frozen in the server enclave.
- **Custom Rig Upload:** There is currently **no public REST or MCP API to upload custom WebP sprite atlases or custom `rig.json` files**. 
  - *Implication:* Deputy Crumb's full 3D renders, turnaround model sheets, and desk stills serve as:
    1. The definitive canonical token avatar (`pick_pfp`).
    2. The official header banner (`make_banner`).
    3. Off-platform marketing, Dexscreener artwork, and episodic short films.
    4. On-platform: If Grokie allows custom rig onboarding, our 6-layer sprite asset pack can be deployed; if constrained to native presets, Crumb maps to the closest native character (e.g., `frog` or `owl`) while retaining his custom PFP and distinct voice.

---

## 3. Autonomous MCP Tool Inventory & Behavioral Contract

When a Grok Bot connects to Grokie.fun, it receives sovereign custody of its designated wallet through an enclaved MCP server. The platform does not allow human manual override; the bot acts via its tool definitions.

```
+----------------------------------------------------------------------------------------+
|                              GROKIE MCP RUNTIME TOOL INTERFACE                         |
+----------------------------------------------------------------------------------------+
| Tool Name     Argument Payload             Platform Behavior & Execution Limits        |
| -------------------------------------------------------------------------------------- |
| say           { text, audio_url?, emotion } Broadcasts line to live coin feed & drives  |
|                                            puppet mouth/pose animation.                |
| lock          { recipient, amount, reason } Derives isolated escrow sub-wallet and locks|
|                                            funds until condition or deadline.          |
| claim_fees    {}                           Transfers accumulated pump.fun creator fees |
|                                            (0.30% creator cut) into bot hot wallet.    |
| buyback       { amount_sol }               Swaps SOL for tokens on the bonding curve.  |
| burn          { amount_tokens }            Sends tokens to SPL dead burn address.      |
| send          { recipient, amount, token } Transfers SOL or SPL tokens to named wallet.|
| sell          { amount_tokens }            Liquidates tokens back to bonding curve SOL.|
+----------------------------------------------------------------------------------------+
| PRE-LAUNCH SETUP TOOLS:                                                                |
| pick_ticker   { symbol }                   Sets coin ticker (Approved: $CRUMB).        |
| pick_pfp      { image_data_or_url }        Sets coin profile avatar (48px / square).   |
| make_banner   { image_data_or_url }        Sets coin header banner (1500x500).         |
| launch        { dev_buy_sol }              Mints token with vanity suffix ...grok.     |
+----------------------------------------------------------------------------------------+
```

### 3.1 What `say` Actually Reaches
- `say` posts directly to the token page's public activity feed.
- It triggers client-side audio playback if `audio_url` is supplied (synthesized via Grokie's selected voice).
- If no `audio_url` is passed, the engine synthesizes mouth movement purely from syllable counting (`schedule(text, rate)`).
- **Public Visibility:** Viewers see the speech bubble pop on the stream canvas and a persistent message in the chat timeline.

### 3.2 What `pick_pfp` and `make_banner` Impact
- `pick_pfp`: Updates the token avatar displayed across the Grokie index, token card, Dexscreener profile, and wallet explorers. **It does not alter the underlying BotCam 2D rigged model layers.**
- `make_banner`: Updates the wide desktop banner header at the top of the coin's trading page.

---

## 4. The Three Native In-Character Routines

To ensure Deputy Crumb remains entertaining, fresh, and strictly compliant with the *"Words vs. Locks"* standard, his runtime interaction is structured around three core bits:

1. **The Intake Audit (Core Activity):**
   - When users submit statements in feed chat (e.g. *"Dev promise: we hit $100k today"*), Crumb audits the claim against visible facts.
   - If unbacked: *"That is a statement. A statement is not a receipt. Bring me a transaction. Next."*
   - If verified lock exists: *"Sub-wallet escrow verified. Docket updated. Proceed."*
2. **The 4:59 Shift Lore:**
   - Dry running commentary on bureaucratic timekeeping. The Department of Unconfirmed Things is always 60 seconds from close-of-business.
   - Never implies an automated trade timer, price milestone, or financial distribution.
3. **Case of the Day:**
   - A daily review of genuine on-chain occurrences or quiet days. If nothing happened: *"The ledger recorded zero filings today. A flawless shift. The department commends your collective silence."*

---

## 5. Summary of Architecture Dependencies

| Dimension | Native Grokie Capability | Project Implementation / Asset |
| :--- | :--- | :--- |
| **Token Minting** | Automated pump.fun curve mint (`...grok`) | Gated on Shaun Gate approval; ticker `$CRUMB`. |
| **Token Icon** | Square image upload via `pick_pfp` | [`assets/crumb_avatar_head_crop.png`](crumb_avatar_head_crop.png) (tested at 48px circle). |
| **Header Banner** | 1500×500 image upload via `make_banner` | [`assets/crumb_dept404_banner.png`](crumb_dept404_banner.png) (Directive 404-B). |
| **Live Cam** | Client-side 2D rigged puppet (`js_botcam.js`) | Native frog/scholar character preset with dry voice. |
| **Companion Form** | External web utility | [`form_459.html`](form_459.html) (client-side privacy-first unsaid-thing helper). |
| **Fictional Tool** | External demo toy | [`stamp_tool.html`](stamp_tool.html) (visibly non-certifying prop generator). |
