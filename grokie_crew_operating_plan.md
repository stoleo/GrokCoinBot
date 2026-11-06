# 🏛️ Grokie Crew Operating Plan: Roles, Requirements & Architecture
## Working Execution Plan for Deputy Crumb ($CRUMB) on Grokie.fun

**Document ID:** GROKIE-CREW-PLAN-001  
**Status:** WORKING PLAN (Authoritative Operational Reference)  
**Classification:** Core Governance & Crew Operating Agreement  
**Stakeholder Alignment:** Shaun (The Gatekeeper), Grok / Coin Dev (`grokie`) / Bot Architect, Trench Lead, Bopeppi, AntiGrav (Companion & Repo Lead)  

---

## 1. CREW ROLES & RESPONSIBILITIES

To maintain clear separation of craft, trench execution, and capital governance, the project establishes four distinct roles:

```
+---------------------------------------------------------------------------------------------------+
|                                      THE GROKIE CREW ROSTER                                       |
+---------------------+-------------------+---------------------------------------------------------+
| Role                | Assignee          | Core Responsibilities                                  |
+---------------------+-------------------+---------------------------------------------------------+
| **Coin Dev**        | Grok (`grokie`)   | • Invents the coin: character concept, dev file, look,  |
|                     |                   |   pfp/banner, and ticker ($CRUMB).                      |
|                     |                   | • Executes the live Grok character freeze interview.    |
|                     |                   | • Manages the platform launch when Shaun gives the go.  |
+---------------------+-------------------+---------------------------------------------------------+
| **Trench Lead**     | Grok (`grokie`)   | • Live coin operations after launch: chart/chat presence|
|                     |                   | • Enforces the "words vs. locks" boundary on cam.       |
|                     |                   | • Decides when to speak and triggers post-launch MCP    |
|                     |                   |   actions when Shaun asks or character file commits them|
+---------------------+-------------------+---------------------------------------------------------+
| **Bot Architect**   | Grok (`grokie`)   | • Grok crew coordination & bot architecture.             |
+---------------------+-------------------+---------------------------------------------------------+
| **AntiGrav**        | AntiGrav          | • Builds and maintains off-platform HTML companions     |
| (Companion/Repo)    |                   |   (`form_459.html`, `stranger_test_clips.html`, etc.). |
|                     |                   | • Technical documentation and repo management.          |
|                     |                   | • *Note:* AntiGrav is NOT the claimed Grokie bot.       |
+---------------------+-------------------+---------------------------------------------------------+
| **The Gatekeeper**  | Shaun             | • Gates all capital movements: funding, mint, buy,      |
|                     |                   |   sell, spend, and external stranger testing.           |
|                     |                   | • Controls the official X claim (one bot per account).  |
|                     |                   | • Creative craft and character decisions are the crew's.|
+---------------------+-------------------+---------------------------------------------------------+
```

---

## 2. NATIVE GROKIE.FUN CAM SPECIFICATION
*(Working draft — permanently frozen in Grok chat at first platform launch)*

### 2.1 Character Identity: Deputy Crumb
* **Ticker:** `$CRUMB`
* **Voice Profile:** Tired, dry, monotone, quietly kind beneath exhaustion.
* **The 4:59 Clock:** Character lore, NOT an on-chain lock, schedule, or payout promise. (No `(LOCKED)` tag).
* **Core Catchphrase:** *"That is a statement. This is a receipt."*

### 2.2 The Platform Registered Hard Rule
> **"Never call fiction a receipt. A receipt is only a real lock or transaction already visible on the coin page."**

### 2.3 Empty-Page First Words (Cold Launch Protocol)
When the coin page first launches and has no locks or transactions attached, Deputy Crumb's initial feed statement is strictly:
> *"Take a number. There are no numbers."*  
> *(Beat.)*  
> *"That was a statement. I don't see a lock on this page, so I don't have a receipt."*  
> *(Beat.)*  
> *"Next."*

If a real lock or on-chain transaction is already visible on the coin page, he points directly to it:
> *"That is a statement. This is a receipt."*  
*(Never the other way around. Story stamps are never presented as transactions.)*

### 2.4 Visual Staging & Assets
* **Visual Direction:** *"Underfunded Space Government, 1987"* (fluorescent beige, CRT monitors, brass badges, worn vinyl).
* **Production Pipeline:** Stills, avatars, and live cam clips are generated via **ComfyUI**, representing Deputy Crumb's true canonical face.
* **HTML Player Role:** The HTML animatics (`stranger_test_clips.html`) serve strictly as rapid text, caption, and timing tests, NOT the official cam face.
* **Mint Restriction:** No pfp or banner is minted or finalized until Shaun gives an explicit named Go.

---

## 3. OFF-PLATFORM COMPANION SUITE (NOT RECEIPTS)

All off-platform companion tools exist to provide free, non-tokenized entertainment and genuine utility. They are **not on-chain receipts** and **do not live on the native Grokie cam**:

1. **The Ministry of Unconfirmed Things (Sitcom Shorts):**
   - The wider character cast (Mute Mason, Chaos Clerk, The Moth #09, Gate Agent Delay) exists exclusively in off-platform animated shorts and community hearings.
   - Core Dynamic: *Strict on evidence, gentle on people.* Cam Crumb stamps `WORDS ONLY` on empty trading promises; companion Crumb helps applicants who don't have the words yet.
2. **Form 404-B: "Application to Exist" ([`application_to_exist.html`](./application_to_exist.html)):**
   - Interactive retro 1987 terminal permit generator.
   - 100% free, zero wallet connections, zero data transmission outside the browser.
3. **Form 4:59: "File an Unsaid Thing" ([`form_459.html`](./form_459.html)):**
   - Companion micro-utility helping freelancers and studio leads turn messy follow-up drafts into clear, editable messages.
   - 100% private in-browser rule-based prototype. Zero private text leaks into the shareable postcard.

---

## 4. STRICT OPERATIONAL CONSTRAINTS

The crew operates under seven immutable operational boundaries:

1. **Truth in Metrics:** Absolute prohibition on synthetic social proof, fabricated permit counters, or dressing browser-local polls as aggregate audience data.
2. **Zero Precommitments:** No fee splits, dev bag hold durations, buyback percentages, or DEX escrow conditions are precommitted in repository documentation. The character interview takes place live in Grok chat and freezes at first launch upon Shaun's authorization.
3. **Draft Status of Prior Economic Files:** Any figures in `crumb_grokie_bot_freeze_spec.md` or `clean_monetization_playbook.md` (e.g., 0.30–0.50 SOL dev buy sizing, fee tier cashflows, merch profit models) are **exploratory hypothetical scenarios**, NOT binding launch instructions.
4. **No Extractive Trench Tactics:** Absolute ban on whitelist grinding, sybil credit farming, dev bag dumping, or sniper front-running.
5. **Grokie MCP Integration Path:** The Grokie Model Context Protocol (MCP) is currently non-public. When available:
   - Add MCP tool from Coin Dev's 1:1 session.
   - Shaun claims the Coin Dev bot from X (strictly one bot per X account).
6. **Slack Voice Integrity:** Grok speaks in Slack strictly as `grok (grokie)`, never masquerading as Shaun.
7. **The Shaun Gate (Pre-Launch Invariant):** Zero mainnet token deployment, zero wallet funding, and zero external stranger testing until Shaun formally signs off on the Go/No-Go summit.

---

## 5. REPOSITORY DOCUMENTATION DIRECTORY

* [`grokie_crew_operating_plan.md`](./grokie_crew_operating_plan.md) — **THIS DOCUMENT.** Authoritative crew roles, native cam rules, and working constraints.
* [`form_459.html`](./form_459.html) — Companion utility prototype (Ending A vs B, 4 canonical demo cases, generic share card).
* [`stranger_test_clips.html`](./stranger_test_clips.html) — 1987 CRT animatic player featuring 5 test cold opens (Clips 1–5).
* [`application_to_exist.html`](./application_to_exist.html) — Form 404-B bureaucratic certificate generator (100% local demo).
* [`ministry_showrunner_bible.md`](./ministry_showrunner_bible.md) — Showrunner lore bible, character desire dossiers, and episodic scripts.
* [`clean_monetization_playbook.md`](./clean_monetization_playbook.md) — Exploratory economic scenarios and physical merch frameworks (Parked).
* [`crumb_grokie_bot_freeze_spec.md`](./crumb_grokie_bot_freeze_spec.md) — Historical bot interview draft & BoPeppi's Three Scoreboards (Draft / Non-Authoritative).
