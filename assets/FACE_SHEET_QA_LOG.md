# Deputy Crumb — Character Face Sheet QA & Iteration Log
**Status:** `IN PROGRESS — IDENTITY LOCK PENDING GROK APPROVAL`  
**Reviewer:** Grok (Coin Dev Authority)  
**Governance Protocol:** Shaun & Grok 7-Criterion QA Gate

---

### The 7-Criterion Visual Review Grid
Every candidate face sheet must strictly pass all 7 criteria before entering Phase 3 identity-locked still generation:
1. **Alien Species:** Definite extraterrestrial anatomy, weathered mottled gray-green olive skin (NEVER gaunt human).
2. **Eyelids Visibly Overhang:** Heavy wrinkly drooping baggy eyelids covering >60% of eye area, carrying the deadpan fatigue (NEVER glossy almond Greys, NEVER shiny saucers).
3. **Small Fatigued Eyes:** Small pupils with visible white sclera, dark under-eye baggage and exhaustion rings.
4. **Slumped Crescent Silhouette:** Stooped, hunchbacked postal clerk posture with defeated sloping shoulders (NEVER upright figurine/detective).
5. **Distinct 3 Turnaround Angles:** Exactly one character shown in 3 clean separate poses: direct front, 45° three-quarter, and 90° side profile (NEVER duplicate front poses, NEVER scene dressing/desks/computers).
6. **Gritty 35mm Analog Finish:** Desaturated 1980s Kodak color palette, utilitarian institutional fluorescent lighting, authentic 35mm film grain on plain neutral backdrop (NEVER glossy CGI/3D toy polish).
7. **Costume & Badge:** Open faded rumpled taupe trenchcoat (HOOD DOWN/NO HOOD), dingy cream collared shirt, crooked wrinkled skinny burgundy necktie, heavy tarnished brass employee badge pinned askew engraved **`DEPT 404`**.

---

### Candidate Iteration Audit History

| Version | File | Seed | Commit | Criteria Passed | Grok Verdict | Primary Failure Mode & Corrective Direction |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **v1** | [`crumb_face_sheet_3view_v1.png`](crumb_face_sheet_3view_v1.png) | `4041986` | `60e5981` | 4 / 7 | **REJECTED** | Large glossy black Grey almond eyes; glossy 3D figurine studio lighting; hood on head. |
| **v2** | [`crumb_face_sheet_3view_v2.png`](crumb_face_sheet_3view_v2.png) | `19870459` | `a9ad77d` | 3 / 7 | **REJECTED** | Wrong deliverable: generated a 2-clerk desk scene vignette with monitor/keyboard instead of isolated character sheet. |
| **v3** | [`crumb_face_sheet_3view_v3.png`](crumb_face_sheet_3view_v3.png) | `8840419` | `73a2a0a` | 4 / 7 | **REJECTED** | Good single-clerk layout on plain sheet, but duplicate front pose (left + center identical), eyes still too large/almond. |
| **v4** | [`crumb_face_sheet_3view_v4.png`](crumb_face_sheet_3view_v4.png) | `4591987` | `b77b373` | 5 / 7 | **REJECTED** | Excellent 3-angle layout, grain, and drooping eyelid fatigue, but species drifted to **gaunt human** with hood up. Lost alien species. |
| **v5** | *Pending Next Lease* | `TBD` | `PENDING` | `[ ] PENDING` | `[ ] PENDING` | Anchor single front-view alien species + overhanging lids first, then derive clean 3-view turnaround. |

---

### Recovery Plan for Next Broker Lease Window
1. **Anchor Front Identity First:** Lock single front-view alien face (mottled gray-green, heavily hooded droopy eyes, no hood) before full turnaround.
2. **Inpaint / Derive Angles:** Once front alien identity is locked, generate 45° three-quarter and 90° profile using the locked front face as reference.
3. **Phase 3 Hold:** Zero Phase 3 stills (PFP, Desk Still, Banner, Posters) will be queued until Grok explicitly comments `:white_check_mark:` on the approved face sheet.
