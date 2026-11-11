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
| Checks counted | 26 |

Audited:

- `src/App.css`
- `src/App.jsx`
- `src/components/ProductImage.jsx`

## Executive summary

Pass. No critical or serious findings.

The headline numbers for this run.

| Measure | Value |
|---|---|
| Score | 91 out of 100 |
| Grade | A |
| Findings | 7 |
| Blocking (critical plus serious) | 0 |
| Verdict | Pass |

## Severity breakdown

Counts by severity, highest impact first.

| Severity | Count | What it means |
|---|---:|---|
| critical | 0 | Blocks a person from completing the task |
| serious | 0 | Major barrier with a difficult workaround |
| moderate | 6 | Real friction, workaround exists |
| minor | 1 | Noticeable but rarely blocking |

## Findings

7 findings, ordered by severity then by rule.

### Moderate (6)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `ARIA-CART-REMOVE-NAME` | 2.4.6 AA | src/App.jsx:704 | Cart remove buttons were named only “Remove,” so assistive technology users could not distinguish the affected product. | Include the product name in each remove button's accessible name. |
| `CART-REMOVE-FOCUS` | 2.4.3 A | src/App.jsx:704 | Removing a cart row removed the focused button without moving focus to a useful remaining element. | Move focus to the next or previous remove button, or the cart heading when the last item is removed. |
| `FORM-REQUIRED-001` | 3.3.2 A | src/App.jsx:842 | Required checkout fields had no visible required-field indication. | Add a visible Required marker to required labels and explain the marker near the form heading. |
| `KEY-002` | 3.3.1 A | src/App.jsx:928-970 | Order type and payment errors were not programmatically associated with their radio controls. | Give each group error an ID and reference it from the radio controls with aria-describedby. |
| `LIVE-CART-001` | 4.1.3 AA | src/App.jsx:1330-1364 | Cart quantity changes did not announce the product context or updated order total. | Use the polite status region to announce the product name, new quantity, and cart total after quantity changes and removal. |
| `LIVE-CART-002` | 2.4.3 A | src/App.jsx:638-714 | Removing the last cart item removed the focused button without moving focus to the empty state. | Move focus to the cart heading after the last row is removed and announce the updated cart total. |

### Minor (1)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `ALT-001` | 1.1.1 A | src/App.jsx:670 | The cart product image alternative repeated the adjacent product heading. | Give the cart image an empty alternative and support decorative alternatives in ProductImage. |

## Remediation priorities

The remaining 7 moderate and minor findings can follow in normal work.

## What passed

19 checks ran and found nothing.

- Cart controls, checkout form fields, radio buttons, and navigation use native interactive elements.
- Cart product images are now decorative because their adjacent headings identify the products.
- Cart quantity and removal updates now announce the item context and updated total.
- Cart, checkout, and confirmation have one H1 each and coherent heading levels.
- Checkout and confirmation text colors pass WCAG AA: body text is 7.01:1, error text 8.80:1, and confirmation total 6.22:1.
- Checkout field borders exceed the 3:1 non-text contrast minimum.
- Checkout inputs have explicit labels and field errors are associated with aria-describedby.
- Checkout labels, autocomplete values, required semantics, email and Philippine phone validation, field error associations, and focus-on-error work.
- Invalid customer fields receive focus; cart deletion now focuses the next item or cart heading.
- Order Type and Payment Method use native radio buttons in fieldsets with legends.
- Persistence errors and route changes use existing status and focus handling.
- Removing the last product moves focus to the cart heading.
- Required indicators and their explanatory text are now visible.
- Route changes move focus to the main content and update the page title.
- The document title, skip link, main landmark, and footer landmark are present.
- The focus outline exceeds 3:1 against white and cream.
- The remove buttons now include product names, and removal moves focus to a remaining button or the cart heading.
- The skip link and route changes provide predictable focus behavior.
- White text on the primary red button is 4.72:1.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **aria-specialist**: Findings were recorded before their indicated fixes; the final implementation was verified afterward.
- **keyboard-navigator**: The automated Playwright accessibility scanner could not run because Playwright is not installed; interaction and responsive behavior were tested in the integrated browser.
- **keyboard-navigator**: Findings were recorded before their indicated fixes; the final implementation was verified afterward.
- **alt-text-headings**: Findings were recorded before their indicated fixes; the final implementation was verified afterward.
- **forms-specialist**: Findings were recorded before their indicated fixes; the final implementation was verified afterward.
- **live-region-controller**: Findings were recorded before their indicated fixes; the final implementation was verified afterward.

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
  "findings": [
    {
      "rule": "ARIA-CART-REMOVE-NAME",
      "wcag": "2.4.6 AA",
      "severity": "moderate",
      "confidence": "high",
      "location": "src/App.jsx:704",
      "summary": "Cart remove buttons were named only “Remove,” so assistive technology users could not distinguish the affected product.",
      "fix": "Include the product name in each remove button's accessible name.",
      "evidence": "Cart rows originally rendered an unlabeled “Remove” button.",
      "foundBy": [
        "aria-specialist"
      ]
    },
    {
      "rule": "CART-REMOVE-FOCUS",
      "wcag": "2.4.3 A",
      "severity": "moderate",
      "confidence": "high",
      "location": "src/App.jsx:704",
      "summary": "Removing a cart row removed the focused button without moving focus to a useful remaining element.",
      "fix": "Move focus to the next or previous remove button, or the cart heading when the last item is removed.",
      "evidence": "The focused remove button is unmounted after its row is deleted.",
      "foundBy": [
        "aria-specialist",
        "keyboard-navigator"
      ],
      "alsoReportedAs": [
        "KEY-001"
      ]
    },
    {
      "rule": "FORM-REQUIRED-001",
      "wcag": "3.3.2 A",
      "severity": "moderate",
      "confidence": "high",
      "location": "src/App.jsx:842",
      "summary": "Required checkout fields had no visible required-field indication.",
      "fix": "Add a visible Required marker to required labels and explain the marker near the form heading.",
      "evidence": "The inputs had required attributes but no visible cue.",
      "foundBy": [
        "forms-specialist"
      ]
    },
    {
      "rule": "KEY-002",
      "wcag": "3.3.1 A",
      "severity": "moderate",
      "confidence": "high",
      "location": "src/App.jsx:928-970",
      "summary": "Order type and payment errors were not programmatically associated with their radio controls.",
      "fix": "Give each group error an ID and reference it from the radio controls with aria-describedby.",
      "evidence": "The group error paragraphs initially had no descriptions linked to their controls.",
      "foundBy": [
        "keyboard-navigator"
      ]
    },
    {
      "rule": "LIVE-CART-001",
      "wcag": "4.1.3 AA",
      "severity": "moderate",
      "confidence": "medium",
      "location": "src/App.jsx:1330-1364",
      "summary": "Cart quantity changes did not announce the product context or updated order total.",
      "fix": "Use the polite status region to announce the product name, new quantity, and cart total after quantity changes and removal.",
      "evidence": "Quantity changes previously called finishPersistence without a message.",
      "foundBy": [
        "live-region-controller"
      ]
    },
    {
      "rule": "LIVE-CART-002",
      "wcag": "2.4.3 A",
      "severity": "moderate",
      "confidence": "high",
      "location": "src/App.jsx:638-714",
      "summary": "Removing the last cart item removed the focused button without moving focus to the empty state.",
      "fix": "Move focus to the cart heading after the last row is removed and announce the updated cart total.",
      "evidence": "The Remove button was removed from the DOM when the cart became empty.",
      "foundBy": [
        "live-region-controller"
      ]
    },
    {
      "rule": "ALT-001",
      "wcag": "1.1.1 A",
      "severity": "minor",
      "confidence": "medium",
      "location": "src/App.jsx:670",
      "summary": "The cart product image alternative repeated the adjacent product heading.",
      "fix": "Give the cart image an empty alternative and support decorative alternatives in ProductImage.",
      "evidence": "A product name was announced by both the image and the heading.",
      "foundBy": [
        "alt-text-headings"
      ]
    }
  ],
  "passed": [
    "Cart controls, checkout form fields, radio buttons, and navigation use native interactive elements.",
    "Cart product images are now decorative because their adjacent headings identify the products.",
    "Cart quantity and removal updates now announce the item context and updated total.",
    "Cart, checkout, and confirmation have one H1 each and coherent heading levels.",
    "Checkout and confirmation text colors pass WCAG AA: body text is 7.01:1, error text 8.80:1, and confirmation total 6.22:1.",
    "Checkout field borders exceed the 3:1 non-text contrast minimum.",
    "Checkout inputs have explicit labels and field errors are associated with aria-describedby.",
    "Checkout labels, autocomplete values, required semantics, email and Philippine phone validation, field error associations, and focus-on-error work.",
    "Invalid customer fields receive focus; cart deletion now focuses the next item or cart heading.",
    "Order Type and Payment Method use native radio buttons in fieldsets with legends.",
    "Persistence errors and route changes use existing status and focus handling.",
    "Removing the last product moves focus to the cart heading.",
    "Required indicators and their explanatory text are now visible.",
    "Route changes move focus to the main content and update the page title.",
    "The document title, skip link, main landmark, and footer landmark are present.",
    "The focus outline exceeds 3:1 against white and cream.",
    "The remove buttons now include product names, and removal moves focus to a remaining button or the cart heading.",
    "The skip link and route changes provide predictable focus behavior.",
    "White text on the primary red button is 4.72:1."
  ],
  "notes": [
    {
      "skill": "aria-specialist",
      "note": "Findings were recorded before their indicated fixes; the final implementation was verified afterward."
    },
    {
      "skill": "keyboard-navigator",
      "note": "The automated Playwright accessibility scanner could not run because Playwright is not installed; interaction and responsive behavior were tested in the integrated browser."
    },
    {
      "skill": "keyboard-navigator",
      "note": "Findings were recorded before their indicated fixes; the final implementation was verified afterward."
    },
    {
      "skill": "alt-text-headings",
      "note": "Findings were recorded before their indicated fixes; the final implementation was verified afterward."
    },
    {
      "skill": "forms-specialist",
      "note": "Findings were recorded before their indicated fixes; the final implementation was verified afterward."
    },
    {
      "skill": "live-region-controller",
      "note": "Findings were recorded before their indicated fixes; the final implementation was verified afterward."
    }
  ],
  "counts": {
    "critical": 0,
    "serious": 0,
    "moderate": 6,
    "minor": 1
  },
  "components": [],
  "score": 91,
  "grade": "A",
  "penalty": 12.1,
  "checks": 26,
  "generated": "2026-11-04",
  "template": "web"
}
```
