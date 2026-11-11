# Web Accessibility Audit

An audit of web content, run on 2026-11-04. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-11-04 |
| Scope | 2 items |
| Skills run | keyboard-navigator |
| Tooling | node v24.21.0, a11y-mcp-server 7.1.0 |
| Scan configuration | defaults, no config file found |
| Checks counted | 10 |

Audited:

- `src/App.css`
- `src/App.jsx`

## Executive summary

Pass. No critical or serious findings.

The headline numbers for this run.

| Measure | Value |
|---|---|
| Score | 96 out of 100 |
| Grade | A |
| Findings | 1 |
| Blocking (critical plus serious) | 0 |
| Verdict | Pass |

## Severity breakdown

Counts by severity, highest impact first.

| Severity | Count | What it means |
|---|---:|---|
| critical | 0 | Blocks a person from completing the task |
| serious | 0 | Major barrier with a difficult workaround |
| moderate | 1 | Real friction, workaround exists |
| minor | 0 | Noticeable but rarely blocking |

## Findings

1 findings, ordered by severity then by rule.

### Moderate (1)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `KEYBOARD-001` | 2.4.7 AA | src/App.jsx:190-194 | Activating either hero button scrolls to the menu but leaves keyboard focus on the now off-screen button. | Use links to the menu section and move focus to its heading or section after navigation; make the focus target programmatically focusable with tabindex="-1". |

## Remediation priorities

The remaining 1 moderate and minor findings can follow in normal work.

## What passed

2 checks ran and found nothing.

- Hero buttons are native buttons and appear in a logical DOM and visual order at desktop, tablet, and mobile breakpoints.
- Hero buttons have a visible :focus-visible outline.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **keyboard-navigator**: This keyboard focus issue predates the visual-only CSS update; no hero markup or interaction behavior was changed.

## Next steps

1. Keep the current checks in continuous integration so this does not regress.
2. Re-audit when the interface changes materially, or quarterly.
3. Confirm the automated result with a manual screen reader and keyboard pass.

Automated checks find a minority of accessibility barriers. A passing score is a floor, not a guarantee.

## Findings data

The merged findings, embedded so the next run can compute a delta without parsing this document.

```json a11y-findings
{
  "skills": [
    "keyboard-navigator"
  ],
  "scope": [
    "src/App.css",
    "src/App.jsx"
  ],
  "findings": [
    {
      "rule": "KEYBOARD-001",
      "wcag": "2.4.7 AA",
      "severity": "moderate",
      "location": "src/App.jsx:190-194",
      "summary": "Activating either hero button scrolls to the menu but leaves keyboard focus on the now off-screen button.",
      "fix": "Use links to the menu section and move focus to its heading or section after navigation; make the focus target programmatically focusable with tabindex=\"-1\".",
      "evidence": "Both buttons call scrollToSection('menu-section'); scrollToSection only calls scrollIntoView.",
      "foundBy": [
        "keyboard-navigator"
      ]
    }
  ],
  "passed": [
    "Hero buttons are native buttons and appear in a logical DOM and visual order at desktop, tablet, and mobile breakpoints.",
    "Hero buttons have a visible :focus-visible outline."
  ],
  "notes": [
    {
      "skill": "keyboard-navigator",
      "note": "This keyboard focus issue predates the visual-only CSS update; no hero markup or interaction behavior was changed."
    }
  ],
  "counts": {
    "critical": 0,
    "serious": 0,
    "moderate": 1,
    "minor": 0
  },
  "components": [],
  "score": 96,
  "grade": "A",
  "penalty": 2,
  "checks": 10,
  "generated": "2026-11-04",
  "template": "web"
}
```
