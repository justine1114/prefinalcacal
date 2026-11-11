# Web Accessibility Audit

An audit of web content, run on 2026-11-04. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-11-04 |
| Scope | 3 items |
| Skills run | alt-text-headings, aria-specialist, contrast-master, forms-specialist, keyboard-navigator, live-region-controller |
| Tooling | node v24.21.0, a11y-mcp-server 7.1.0 |
| Scan configuration | defaults, no config file found |
| Checks counted | 20 |

Audited:

- `src/App.css`
- `src/App.jsx`
- `src/components/ProductImage.jsx`

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

20 checks ran and found nothing.

- Body, error, and confirmation-total text colors pass WCAG AA with measured ratios of 7.01:1, 8.80:1, and 6.22:1.
- Cart product images are decorative because their adjacent headings identify the products.
- Cart quantity and removal changes announce the product context and updated total via the polite status region.
- Cart remove buttons identify their product, and cart image alternatives do not repeat adjacent names.
- Cart, checkout, and confirmation have one H1 each and coherent heading levels.
- Checkout field borders and focus outlines exceed the applicable 3:1 contrast minimum.
- Checkout fields have explicit labels and field errors are associated with their inputs.
- Delivery and Pickup and all three payment methods use native radio controls.
- Email, Philippine mobile number, name, and delivery address validation show associated messages and focus invalid controls.
- Invalid checkout data focuses the first invalid field.
- Keyboard focus styles are present on links and form controls.
- Order Type and Payment Method use labeled fieldsets and radio controls linked to the checkout form.
- Persistence errors remain visible and announced.
- Pickup hides the address field, and required fields remain labeled and keyboard-operable.
- Removing a cart item moves focus to the next or previous remove control; removing the last item focuses the cart heading.
- Required checkout labels have visible Required markers and a form-level explanation.
- Route changes move focus to main content, and checkout errors focus the relevant field.
- Status and page focus behavior support cart changes, validation, and route changes.
- The document title, skip link, main landmark, and footer landmark are present.
- White text on the primary red button is 4.72:1.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **aria-specialist**: The final state was verified after correcting the issues recorded in the accompanying pre-fix review.
- **keyboard-navigator**: The accessibility-agent Playwright scanner could not run because Playwright is not installed; the integrated browser was used to verify checkout validation and removal focus.
- **live-region-controller**: The integrated browser confirmed contextual quantity/removal announcements and last-item focus behavior.

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
    "forms-specialist",
    "keyboard-navigator",
    "live-region-controller"
  ],
  "scope": [
    "src/App.css",
    "src/App.jsx",
    "src/components/ProductImage.jsx"
  ],
  "findings": [],
  "passed": [
    "Body, error, and confirmation-total text colors pass WCAG AA with measured ratios of 7.01:1, 8.80:1, and 6.22:1.",
    "Cart product images are decorative because their adjacent headings identify the products.",
    "Cart quantity and removal changes announce the product context and updated total via the polite status region.",
    "Cart remove buttons identify their product, and cart image alternatives do not repeat adjacent names.",
    "Cart, checkout, and confirmation have one H1 each and coherent heading levels.",
    "Checkout field borders and focus outlines exceed the applicable 3:1 contrast minimum.",
    "Checkout fields have explicit labels and field errors are associated with their inputs.",
    "Delivery and Pickup and all three payment methods use native radio controls.",
    "Email, Philippine mobile number, name, and delivery address validation show associated messages and focus invalid controls.",
    "Invalid checkout data focuses the first invalid field.",
    "Keyboard focus styles are present on links and form controls.",
    "Order Type and Payment Method use labeled fieldsets and radio controls linked to the checkout form.",
    "Persistence errors remain visible and announced.",
    "Pickup hides the address field, and required fields remain labeled and keyboard-operable.",
    "Removing a cart item moves focus to the next or previous remove control; removing the last item focuses the cart heading.",
    "Required checkout labels have visible Required markers and a form-level explanation.",
    "Route changes move focus to main content, and checkout errors focus the relevant field.",
    "Status and page focus behavior support cart changes, validation, and route changes.",
    "The document title, skip link, main landmark, and footer landmark are present.",
    "White text on the primary red button is 4.72:1."
  ],
  "notes": [
    {
      "skill": "aria-specialist",
      "note": "The final state was verified after correcting the issues recorded in the accompanying pre-fix review."
    },
    {
      "skill": "keyboard-navigator",
      "note": "The accessibility-agent Playwright scanner could not run because Playwright is not installed; the integrated browser was used to verify checkout validation and removal focus."
    },
    {
      "skill": "live-region-controller",
      "note": "The integrated browser confirmed contextual quantity/removal announcements and last-item focus behavior."
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
  "checks": 20,
  "generated": "2026-11-04",
  "template": "web"
}
```
