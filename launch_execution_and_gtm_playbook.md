# Deputy Crumb — Launch readiness and audience plan

**Project:** Grokie / Department 404  
**Status:** Internal planning only — **no live launch approval**  
**Working look:** v26 translucent gummy-frog clerk  
**Updated:** 8 November 2026  
**Record:** [Project home](https://projectstoleo.atlassian.net/wiki/spaces/SPHQ/pages/8749141) · [Jira AIOS-112](https://projectstoleo.atlassian.net/browse/AIOS-112)

> **Approval rule.** Passing a checklist, having files in GitHub, freeing a GPU, or receiving a creative sign-off does **not** authorise minting, transactions, platform/account changes, spending, public distribution or external testing. Each live action requires Shaun's separate, specific approval. Nothing in this document triggers a launch. Older “crew autonomous execution” language is superseded for this plan.

## What we're building

Department 404 is a fictional, chronically underfunded office where it is forever 4:59 pm. The central character, **Deputy Crumb**, is a dry, tired, secretly kind clerk who distinguishes *statements* from *receipts*. The joke should work instantly, even for people who know nothing about crypto. Utility experiments such as Form 4:59 are **off-platform companions**, not evidence that Grokie can host our custom model. Crypto activity is neither the measure of the character's usefulness nor an implied promise of profit.

The creative direction is a translucent lime-green gummy frog with coral cheeks, one half-squinting eye and one open eye, brass wire glasses, beige corduroy coat, burgundy tie on a bare green neck, brass `DEPT 404` badge and white `4:59` mug. The deliberate yellow belly glow, shirt, pencil and uniformly sleepy eyes belong to rejected/older iterations, not the current written target.

## Where things stand

| Area | Current evidence | Outstanding acceptance |
| --- | --- | --- |
| Visual identity | v26 master portrait and 2509 turnaround at [commit 902ce87](https://github.com/stoleo/GrokCoinBot/commit/902ce87). Shaun selected the working look. | **Rung 1 remains OPEN.** Grok withheld three-angle sign-off: correct eye asymmetry across views, four-digit hands/mug grip, legible profile badge, and torso glow. Obtain explicit PASS on one version-pinned corrected sheet. [AIOS-115](https://projectstoleo.atlassian.net/browse/AIOS-115). |
| Avatar, desk still, banner | Candidate images already exist, including [desk commit 600f340](https://github.com/stoleo/GrokCoinBot/commit/600f340). | They are **not** approved derivatives merely because files exist. Re-review after Rung 1; [draft PR #1](https://github.com/stoleo/GrokCoinBot/pull/1) proposes QA-log corrections and remains unmerged. |
| Native Grokie compatibility | Official site describes selectable cam characters, voices and MCP tools, but a custom ComfyUI rig/video/voice import is **not established**. | Keep (A) documented native bot, (B) unverified native import and (C) companion media separate. Confirm first-party character/voice selection evidence and an honest fallback without launching. [AIOS-113](https://projectstoleo.atlassian.net/browse/AIOS-113). |
| Form 4:59 | Internal prototype with known parser intent-loss, cancellation/date handling, edited-draft overwrite, false receipt stamp, keyboard/mobile and privacy-copy issues. | Repair and run synthetic regressions; do not call it user-ready or distribute a mutable third-party preview. [AIOS-114](https://projectstoleo.atlassian.net/browse/AIOS-114). |
| Audience evaluation | Current exploration UI primes people toward an option; sample strings are hard-coded. | Use balanced, unbranded first-view variants with equal facts and time; score factual intent and uncertainty before preference. No external cohort without separate approval. [AIOS-116](https://projectstoleo.atlassian.net/browse/AIOS-116). |
| Preview clips/share artwork | Creative experiments and source tests, not validated native streams or external conversion. | Fix and verify the known syntax and 10/12-second timing problems in a real browser, plus mobile/keyboard and actual sharing destination. [AIOS-119](https://projectstoleo.atlassian.net/browse/AIOS-119). |
| ComfyUI/GPU | Shared broker lease and gateway handback must be explicitly verifiable. | Fresh authenticated grant before *any* new job; successful authoritative release afterward. This plan does not grant GPU use. [AIOS-118](https://projectstoleo.atlassian.net/browse/AIOS-118). |
| Token/public launch | **Unapproved**, regardless of readiness claims in older drafts. | Separate authorisation specifying operator, account, budget, chain and platform actions, risks, publication scope and stop conditions. No automatic execution. |

## Character and truth boundaries

Crumb's first line is **“Take a number. There are no numbers.”** Other established beats are **“That was a statement.”** and **“Next.”** The 4:59 clock is *fictional character lore*, never an on-chain lock, automatic buyback or timer. If the bot has not directly inspected a verifiable platform state, it should say **“I haven't been shown a verified lock. I can't issue a receipt”**, not imply it read the page. A token mint ending in `...grok` is a vanity pattern, **not** proof of origin, security or trusted deployer; independent authority/mint checks are required. No invented receipts, wallet balances, holders, verified purchases, returns or projections.

Crumb may use three imaginary filing drawers—**STATEMENT / RECEIPT / MISSING INFORMATION**—as a repeatable joke. These are dialogue labels, not a substitute for factual verification. The six-scenario rehearsal is recorded in [AIOS-115](https://projectstoleo.atlassian.net/browse/AIOS-115); it is editorial work, **not** a live native Grokie capability test.

## How we earn attention, not just clicks

**Recognition:** one distinctive face and expression readable in a 48-pixel circular avatar, across front/three-quarter/profile and in the office scene.  
**Entertainment:** a repeatable, short bureaucratic bit. Humour should not depend on fabricated scarcity or financial claims.  
**Usefulness:** test whether an edited follow-up is genuinely easier to prepare **without losing the writer's instruction, refusal, deadline, audience or other consequential constraint**. A polished-looking draft that changes the intended action fails.  
**Trust:** visibly separate a fictional stamp, a spoken promise and an independently verified receipt.

### First audience and testable hypothesis

The proposed starting audience is **freelancers and small-studio leads who repeatedly rewrite client follow-ups**. This is an internal hypothesis, not a researched market claim: *Can Form 4:59 help someone produce a short, editable follow-up that preserves their intended action and all material constraints, or clearly flags what it cannot resolve?* Do not convert a refusal, cancellation or prohibition into a question or suggested action. Do not describe the prototype as reliable until tests support it.

### Keep two questions—and their measures—separate

**Does the Deputy Crumb story help people notice and remember the experience?** Compare a Crumb/story wrapper with a plain version using **the same actual draft, wording, font size, pause control, display time and exposure**. A matched plain control can isolate the packaging better than a plain card with different copy. Track unaided character/story recall, willingness to watch a second vignette and *observed* voluntary repeat viewing separately. A stated intention to return is not retention.

**Does Form 4:59 produce a better message?** In a different internal exercise, compare the prototype with each participant's usual drafting approach, using equivalently difficult, **previously unseen fictional cases**, not only the four hand-authored fixture strings. Score intent and consequential-constraint preservation first, then unresolved points, required corrections, acceptable final drafts and time taken. A draft is acceptable only if the key intent and constraints are retained, or omissions/unknowns are flagged unambiguously for the writer to resolve. Test ordinary free-text inputs and hard cases (negation, refusal, cancellation, dates) before cosmetic preference. Do not confuse a viewer's preference for the character with drafting utility.

**Measurement discipline:** Use real denominators and observed sessions, distinguish accessibility and factual integrity from engagement, and do not invent test counts, completion results, conversion, user traction or retention. Token interest, share clicks and self-reported return intent are not evidence that the communication tool works. Current Form 4:59 and story-card flows remain **internal explorations only**; internal cases use fictional, non-sensitive material. External participants, outreach, public links and distribution require Shaun's separate approval and a reviewed controlled hosting/privacy setup.

## Work sequence

1. **Finish identity QA.** AntiGrav maintains immutable asset references. Grok reviews exactly the revised three-angle sheet and records PASS or specific changes. Do not expand image variants or queue renders merely because idle GPU exists.
2. **Prove native feasibility.** Verify which native look/voice and viewer-interaction controls Grokie really exposes, and whether any custom import exists. If not, plan a compatible native Crumb persona while preserving the approved off-platform illustrations.
3. **Fix companion UX.** Close the known Form/clip functional and accessibility defects; verify with executed browser tests, synthetic inputs and accurate privacy/hosting copy. Keep internal preview and future consented evaluation separate.
4. **Assemble a decision pack.** Include approved character sources and hashes, tested behavior, platform unknowns, custody/identity assumptions, compliance needs, budget and irreversibility. Name the operator for each proposed action.
5. **Request an explicit go/no-go.** Shaun must approve each proposed live platform operation, financial action, spend, external study or public release **before** execution. A checked box, old delegation quote or silence is not approval.
6. **If authorised later, execute only the approved scope.** Record actual receipts, budget limits and stop conditions. Re-approve material changes of scope. If approval is absent, continue internal work only.

**Accountability:** AntiGrav — repo, companion and production QA; Grok — native persona/evidence handling and visual sign-off; BoPeppi — story and audience evaluation; Shaun — discrete live-action decisions. These roles do **not** transfer wallet, publication or spending permissions.

## Readiness gates

- [ ] Grok signs off one immutable corrected v26 three-view sheet.
- [ ] Derivative PFP/desk/banner independently checked against it.
- [ ] Native cam/voice/import capability established or fallback agreed.
- [ ] Form 4:59 intent/edit/privacy/accessibility regression suite passes.
- [ ] Clip timing, scripting and mobile/browser viewing tested.
- [ ] Any needed GPU grant and clean broker handback documented.
- [ ] Mint identity, custody and compliance claims independently checked.
- [ ] Any proposed external study, social post and destination reviewed.
- [ ] **Shaun specifically authorises the proposed live activity and its limits.**

## Documentation history

This file replaces the 7 November execution draft's immediate-launch mandate, queued-GPU instructions, superseded cream-shirt/sleepy-eyed prompts and unapproved outreach sequence. **It does not yet correct sibling files**: `launch_readiness_and_operational_playbook.md` still contains a pre-ticked delegation gate and launch checklist, and `trench_gtm_execution_dossier.md` presents itself as an execution blueprint. Neither is current launch authority; these require source-owner reconciliation before any merge. The exact old copy is preserved by [Git history](https://github.com/stoleo/GrokCoinBot/commits/master/launch_execution_and_gtm_playbook.md); it is not an operational order. See [Rung 1 review](https://projectstoleo.slack.com/archives/C0CFEBQFH9B/p1794051964398599) and the active Jira issues above for current acceptance evidence.
