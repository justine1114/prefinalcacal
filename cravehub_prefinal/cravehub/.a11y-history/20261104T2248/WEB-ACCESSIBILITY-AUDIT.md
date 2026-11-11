# Web Accessibility Audit

An audit of web content, run on 2026-11-04. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-11-04 |
| Scope | 2 items |
| Skills run | alt-text-headings, aria-specialist, contrast-master, keyboard-navigator, live-region-controller |
| Tooling | node v24.21.0, a11y-mcp-server 7.1.0 |
| Scan configuration | defaults, no config file found |
| Checks counted | 14 |

Audited:

- `C:\Users\justi\OneDrive\Desktop\cravehub_prefinal\cravehub\src\App.css`
- `C:\Users\justi\OneDrive\Desktop\cravehub_prefinal\cravehub\src\App.jsx`

## Executive summary

Pass. No critical or serious findings.

The headline numbers for this run.

| Measure | Value |
|---|---|
| Score | 100 out of 100 |
| Grade | A |
| Findings | 0 |
| Blocking (critical plus serious) | 0 |
| Verdict | Pass |

## Severity breakdown

Counts by severity, highest impact first.

| Severity | Count | What it means |
|---|---:|---|
| critical | 0 | Blocks a person from completing the task |
| serious | 0 | Major barrier with a difficult workaround |
| moderate | 0 | Real friction, workaround exists |
| minor | 0 | Noticeable but rarely blocking |

## Findings

No findings. Every check listed under "What passed" ran and came back clean.

## Remediation priorities

Nothing to remediate.

## Delta tracking

Movement since the previous report.

| Change | Count |
|---|---:|
| Fixed | 0 |
| New | 0 |
| Persistent | 0 |
| Regressed | 0 |

Score moved from 100 to 100.

## What passed

14 checks ran and found nothing.

- Browser keyboard test confirmed the focused Continue shopping link navigates to the Menu route on Enter.
- Cart additions and removals update the persistent polite status region with existing messages; removing the last item also moves focus to the cart heading.
- Empty-cart SVG is decorative and correctly excluded from the accessibility tree with aria-hidden="true" and focusable="false"; it does not need alternative text.
- Empty-cart body text (#65564f on white): 7.01:1; passes AA for small text.
- Empty-cart content uses a heading-labelled section and a native link.
- Empty-cart eyebrow text (#b6322e on #fff8eb): 5.70:1; passes AA for small text.
- Empty-cart heading structure is logical: the page H1 "Your cart" precedes the section H2 "Your cart is empty".
- Illustration is marked aria-hidden and its details are decorative; no essential graphic contrast issue found.
- Red CTA with white text (#d63732 on #fff): 4.72:1; passes AA for normal text.
- Route changes move focus to main; the page heading and main are programmatically focusable.
- Skip link and visible focus styles are present.
- The decorative illustration is hidden from assistive technology.
- The empty-cart Continue shopping link is a native keyboard-operable link to the menu route.
- The empty-cart state updates with cart contents; removing the last item focuses the page heading, and the status notice announces the removal.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **contrast-master**: The card border (#e7dccb) has low contrast against the cream page (1.28:1) and white card (1.36:1), but it outlines a non-interactive container rather than an essential control or state indicator.

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
    "alt-text-headings",
    "aria-specialist",
    "contrast-master",
    "keyboard-navigator",
    "live-region-controller"
  ],
  "scope": [
    "C:\\Users\\justi\\OneDrive\\Desktop\\cravehub_prefinal\\cravehub\\src\\App.css",
    "C:\\Users\\justi\\OneDrive\\Desktop\\cravehub_prefinal\\cravehub\\src\\App.jsx"
  ],
  "findings": [],
  "passed": [
    "Browser keyboard test confirmed the focused Continue shopping link navigates to the Menu route on Enter.",
    "Cart additions and removals update the persistent polite status region with existing messages; removing the last item also moves focus to the cart heading.",
    "Empty-cart SVG is decorative and correctly excluded from the accessibility tree with aria-hidden=\"true\" and focusable=\"false\"; it does not need alternative text.",
    "Empty-cart body text (#65564f on white): 7.01:1; passes AA for small text.",
    "Empty-cart content uses a heading-labelled section and a native link.",
    "Empty-cart eyebrow text (#b6322e on #fff8eb): 5.70:1; passes AA for small text.",
    "Empty-cart heading structure is logical: the page H1 \"Your cart\" precedes the section H2 \"Your cart is empty\".",
    "Illustration is marked aria-hidden and its details are decorative; no essential graphic contrast issue found.",
    "Red CTA with white text (#d63732 on #fff): 4.72:1; passes AA for normal text.",
    "Route changes move focus to main; the page heading and main are programmatically focusable.",
    "Skip link and visible focus styles are present.",
    "The decorative illustration is hidden from assistive technology.",
    "The empty-cart Continue shopping link is a native keyboard-operable link to the menu route.",
    "The empty-cart state updates with cart contents; removing the last item focuses the page heading, and the status notice announces the removal."
  ],
  "notes": [
    {
      "skill": "contrast-master",
      "note": "The card border (#e7dccb) has low contrast against the cream page (1.28:1) and white card (1.36:1), but it outlines a non-interactive container rather than an essential control or state indicator."
    }
  ],
  "counts": {
    "critical": 0,
    "serious": 0,
    "moderate": 0,
    "minor": 0
  },
  "components": [],
  "score": 100,
  "grade": "A",
  "penalty": 0,
  "checks": 14,
  "generated": "2026-11-04",
  "template": "web"
}
```
