---
name: gauntlet-loop
description: Run a rigorous, multi-round design iteration loop with independent fresh-context critics for brief fidelity, design-system fidelity, and visual/interaction craft. Use when creating, reviewing, or refining important UI surfaces, websites, components, prototypes, presentations, carousels, templates, or other design deliverables; when the user asks for a Gauntlet Loop, ruthless design critique, independent design judges, or a high-confidence final polish; or when a reusable/high-value design result must pass explicit quality gates. Do not use for trivial edits or low-stakes one-off changes unless the user explicitly requests it.
---

# Gauntlet Loop

Turn subjective design taste into an observable checklist, create or revise the artifact, and send the rendered result through independent critics until the same revision passes every gate or a declared limit is reached.

Use the user's language for all user-facing output.

## Non-negotiable principles

1. Never let the creator be the sole judge of its own work.
2. Judge rendered evidence, not intentions or source code alone.
3. Give each critic a fresh context. Do not expose creator reasoning, other critics' findings, or prior-round conclusions before that critic has judged the current artifact.
4. Keep the brief and acceptance criteria stable during a run. Record approved scope changes explicitly.
5. Translate taste into testable criteria before iterating.
6. Treat criticism as evidence, not commands. Resolve conflicts against the frozen contract.
7. Never loop indefinitely. Enforce round, budget, and human stop conditions.

## Decide whether to run

Run the loop for reusable templates, launch-critical pages, important product surfaces, client-facing deliverables, design-system exemplars, or work where a weak first result would create costly rework.

Skip or propose a normal single-pass review for tiny copy changes, mechanical token replacements, disposable drafts, or work whose iteration cost exceeds its value.

If the request is review-only, inspect and report without editing. If the user asks to create, improve, refine, or iterate, implement the revisions as part of the loop.

## Select a budget mode

Use `standard` unless the user specifies another mode.

| Mode | Maximum rounds | Overall target | Appropriate use |
| --- | ---: | ---: | --- |
| `lite` | 2 | 85/100 | A contained surface already close to done |
| `standard` | 5 | 90/100 | Important product or marketing work |
| `full` | 10 | 95/100 | Reusable templates, launch-critical work, or explicit "zero mercy" review |

Run all three judges in every mode. Lower modes reduce rounds, not independent coverage.

Warn once before a `full` run that multi-round critique can consume substantial credits or potentially millions of tokens. If usage data is visible, report actual usage; otherwise do not invent a cost estimate.

## Phase 1: Freeze the design contract

Inspect the repository, current artifact, supplied references, and existing design system before asking questions. Infer what can be established safely from project evidence.

Create a compact contract containing:

- objective and intended outcome;
- target audience and primary user journey;
- deliverable, platform, routes/components, and required states;
- explicit requirements and non-goals;
- content, assets, and reference designs;
- brand/design-system tokens and constraints;
- functional, responsive, accessibility, and performance requirements;
- required viewports, themes, and interaction states;
- success criteria and selected budget mode.

Ask a question only when a missing choice would materially change the result. Otherwise state the assumption and continue.

Assign stable criterion IDs such as `B1`, `S2`, and `C4`. Mark each criterion as:

- `hard`: any failure blocks a pass;
- `weighted`: contributes to the score;
- `advisory`: useful but non-blocking.

Do not change the criteria mid-loop merely to make the artifact pass.

## Phase 2: Preflight the evidence surface

Before creating or reviewing:

1. Identify the correct build, render, preview, and test workflow.
2. Capture the current baseline when an artifact already exists.
3. Verify that required fonts, images, icons, data, and states are available.
4. Determine how every hard criterion will be observed.
5. For code-based interfaces, read the project-specific framework documentation and instructions before editing.

For UI work, plan evidence for relevant breakpoints and states, including loading, empty, error, focus, hover, active, disabled, overflow, and reduced motion when applicable.

## Phase 3: Create the candidate

Have the primary creator implement the best complete candidate against the frozen contract.

The creator must:

- use the existing stack and design system where present;
- preserve unrelated behavior and user changes;
- avoid placeholders when real assets or content are available;
- render and inspect the result before submitting it to critics;
- produce a small evidence manifest listing artifact paths, URLs, screenshots/renders, tested states, and known limitations;
- refrain from issuing the final pass verdict.

## Phase 4: Run three fresh-context judges

Prefer three independent subagents or equivalent fresh contexts, launched in parallel after the candidate and evidence exist. Give every judge only:

- the frozen contract and relevant criteria;
- the current artifact or exact files to inspect;
- rendered evidence and instructions for reproducing it;
- the judge's role below.

Do not give a judge previous critiques, the creator's self-assessment, or the expected answer. If independent contexts are unavailable, run isolated role passes and disclose that independence was reduced.

### Judge A: Brief fidelity

Check whether the result actually solves the requested problem.

Inspect requirements, content completeness, information architecture, user journey, functional behavior, constraints, non-goals, and reference intent. Reject polished work that solves the wrong problem.

### Judge B: System fidelity

Check whether the result belongs to the intended brand and product system.

Inspect tokens, typography, color, spacing, components, iconography, imagery, responsive rules, accessibility, platform conventions, and cross-surface consistency. Reject attractive one-off choices that weaken the system or violate usability.

### Judge C: Craft fidelity

Check the quality of the rendered execution.

Inspect hierarchy, composition, rhythm, alignment, density, typography, contrast, imagery, micro-details, interaction feedback, motion, edge states, implementation artifacts, and perceived finish. Inspect both rendered frames and implementation behavior when code is involved.

### Required judge response

Each judge must return only evidence-backed findings in this structure:

```text
VERDICT: PASS | FAIL
SCORE: 0-100

FINDINGS
- severity: critical | major | minor | note
  criterion: <criterion ID>
  location: <screen/state/file/element>
  evidence: <observable problem>
  impact: <why it matters>
  fix_direction: <specific direction, not a full rewrite>

STRONGEST ASPECT
- <one concise evidence-backed strength>

UNCERTAINTY
- <missing evidence or "none">
```

A judge may return `PASS` only when its hard criteria pass, it reports no critical or major finding, and its score meets the selected mode's target.

Critics critique; they do not edit the artifact.

## Phase 5: Adjudicate findings

Combine the three reports without flattening disagreements.

1. Deduplicate findings that describe the same root cause.
2. Verify each critical or major claim against the artifact.
3. Resolve conflicts using this priority:
   - explicit user brief and functional correctness;
   - accessibility, safety, and usability;
   - established design system and brand rules;
   - evidence-backed craft preference;
   - unsupported personal preference.
4. Reject suggestions that contradict the contract, introduce unrelated redesign, or lack observable evidence.
5. Produce a prioritized revision plan grouped by root cause, not by judge.

Do not average away a hard failure. One verified critical or major failure blocks the round.

## Phase 6: Revise and prove

Have the primary creator apply the smallest coherent set of changes that addresses the accepted findings.

After editing:

- rebuild or rerender the artifact;
- inspect every affected viewport and state;
- rerun relevant functional and accessibility checks;
- compare against the prior round to prevent regressions;
- update the evidence manifest;
- append a round entry to the iteration ledger.

Use this ledger shape:

| Round | Brief | System | Craft | Accepted fixes | Regressions | Overall score |
| ---: | --- | --- | --- | --- | --- | ---: |

Then run a new round with new fresh-context judges against the revised artifact. Do not ask critics merely whether previous fixes were made; ask them to judge the whole current result from scratch.

## Stop conditions

Declare success only when the same artifact revision satisfies all of the following:

- all three judges return `PASS`;
- zero verified critical or major findings remain;
- the overall score meets the selected mode target;
- every hard criterion is proven by current evidence;
- relevant tests pass and no regression is observed.

Stop without claiming success when any of these occurs:

- the maximum round count is reached;
- the user stops the loop;
- the declared budget or time limit is reached;
- required evidence, assets, or authority are missing;
- two consecutive rounds produce negligible improvement and the remaining issue is a genuine subjective conflict.

When stopping short, report the best current artifact, unresolved findings, their severity, and the concrete decision or input needed. Never silently lower the bar.

The human remains the final stop authority even after automated passes.

## Evidence rules by deliverable

### Websites and product UI

- Inspect the running interface, not only source files.
- Cover relevant breakpoints, themes, and interaction states.
- Verify keyboard use, focus visibility, contrast, overflow, content extremes, and reduced motion when applicable.
- Treat runtime errors, broken interactions, and inaccessible flows as hard failures.

### Components and design-system work

- Test variants, sizes, states, composition with neighboring components, and token usage.
- Reject local fixes that create a new one-off pattern without justification.

### Presentations, carousels, and static graphics

- Render every page or frame.
- Inspect sequence, pacing, hierarchy, legibility, safe areas, crop behavior, and export quality.
- Check the set as a system as well as each individual frame.

### Motion and interactive prototypes

- Inspect the full state sequence, timing, easing, interruption behavior, and reduced-motion fallback.
- Confirm that motion clarifies hierarchy or feedback rather than masking weak composition.

## Final handoff

Lead with the outcome. Provide:

1. final status: `passed`, `stopped at limit`, or `blocked`;
2. artifact locations or preview route;
3. selected mode, rounds completed, and final three judge scores;
4. the most consequential changes;
5. verification performed;
6. unresolved findings or assumptions;
7. actual token/cost data only when available.

Do not expose private chain-of-thought. Summarize decisions and evidence instead.

## Invocation examples

```text
/gauntlet-loop Iterate the homepage hero in standard mode. Preserve the current brand system.
/gauntlet-loop Run a full zero-mercy pass on this reusable carousel template.
/gauntlet-loop Review this dashboard without editing it; stop after two rounds.
```
