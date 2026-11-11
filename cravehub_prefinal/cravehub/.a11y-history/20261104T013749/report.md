# Web Accessibility Audit

An audit of web content, run on 2026-11-03. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-11-03 |
| Scope | 2 items |
| Skills run | aria-specialist, keyboard-navigator |
| Tooling | node v24.21.0, a11y-mcp-server 7.1.0 |
| Scan configuration | defaults, no config file found |
| Checks counted | 10 |

Audited:

- `src/App.jsx`
- `src/components/ProductCard.jsx`

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

## What passed

9 checks ran and found nothing.

- Product Management presents quantity, subtotal, and status under table headers with column scope.
- Product Management retains its search and category controls, inventory data, and native Edit and Delete buttons.
- Product card buttons have accessible names independent of inventory text; the decorative plus is hidden from assistive technology.
- Product cards retain native buttons for viewing details and adding to cart; unavailable purchases use the native disabled state.
- Product detail quantity controls retain accessible names, live output, and native disabled behavior.
- Product details retain native quantity buttons and an Add to Cart button; removing static inventory text does not remove a keyboard-operable control.
- Runtime verification confirmed inventory content is absent on all 50 menu cards and on product details, while ordering controls remain usable.
- The disabled purchase action remains visibly named 'Unavailable to order' without exposing inventory status.
- The shared stylesheet provides visible focus indicators for buttons, links, inputs, and selects.

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
    "aria-specialist",
    "keyboard-navigator"
  ],
  "scope": [
    "src/App.jsx",
    "src/components/ProductCard.jsx"
  ],
  "findings": [],
  "passed": [
    "Product Management presents quantity, subtotal, and status under table headers with column scope.",
    "Product Management retains its search and category controls, inventory data, and native Edit and Delete buttons.",
    "Product card buttons have accessible names independent of inventory text; the decorative plus is hidden from assistive technology.",
    "Product cards retain native buttons for viewing details and adding to cart; unavailable purchases use the native disabled state.",
    "Product detail quantity controls retain accessible names, live output, and native disabled behavior.",
    "Product details retain native quantity buttons and an Add to Cart button; removing static inventory text does not remove a keyboard-operable control.",
    "Runtime verification confirmed inventory content is absent on all 50 menu cards and on product details, while ordering controls remain usable.",
    "The disabled purchase action remains visibly named 'Unavailable to order' without exposing inventory status.",
    "The shared stylesheet provides visible focus indicators for buttons, links, inputs, and selects."
  ],
  "notes": [],
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
  "checks": 10,
  "generated": "2026-11-03",
  "template": "web"
}
```
