# Web Accessibility Audit

An audit of web content, run on 2026-11-03. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-11-03 |
| Scope | 8 items |
| Skills run | alt-text-headings, keyboard-navigator |
| Tooling | node v24.21.0, a11y-mcp-server 7.1.0 |
| Scan configuration | defaults, no config file found |
| Checks counted | 10 |

Audited:

- `src/App.css`
- `src/App.jsx`
- `src/components/ImageField.jsx`
- `src/components/Navbar.jsx`
- `src/components/ProductCard.jsx`
- `src/components/ProductForm.jsx`
- `src/components/ProductImage.jsx`
- `src/index.css`

## Executive summary

Pass. No critical or serious findings.

The headline numbers for this run.

| Measure | Value |
|---|---|
| Score | 90 out of 100 |
| Grade | A |
| Findings | 3 |
| Blocking (critical plus serious) | 0 |
| Verdict | Pass |

## Severity breakdown

Counts by severity, highest impact first.

| Severity | Count | What it means |
|---|---:|---|
| critical | 0 | Blocks a person from completing the task |
| serious | 0 | Major barrier with a difficult workaround |
| moderate | 2 | Real friction, workaround exists |
| minor | 1 | Noticeable but rarely blocking |

## Findings

3 findings, ordered by severity then by rule.

### Moderate (2)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `KBD-FOCUS-REMOVAL` | 2.4.3 AA | src/App.jsx:466 | Removing a cart item removes the focused Remove button, leaving keyboard focus at the document body and losing the user's place. | After removal, focus the next item's Remove button, otherwise the previous item's button, or the cart heading when the cart becomes empty. |
| `KBD-FOCUS-REMOVAL` | 2.4.3 AA | src/App.jsx:763 | Deleting a product removes the focused row and its Delete button, leaving keyboard focus at the document body and losing the user's place. | After deletion, focus the next row's action, otherwise the previous row's action, or Add New Product when the table becomes empty. |

### Minor (1)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `ALT-REDUNDANT` | 1.1.1 A | src/App.jsx:219,379,441 | Product thumbnails add repeated or extraneous names to category-button, cart-row, and inventory-row announcements. | Allow context-specific alt text and use alt="" for these thumbnails when the visible category or adjacent product name already identifies the control or item. |

## Remediation priorities

The remaining 3 moderate and minor findings can follow in normal work.

## Delta tracking

Movement since the previous report.

| Change | Count |
|---|---:|
| Fixed | 0 |
| New | 0 |
| Persistent | 3 |
| Regressed | 0 |

Score moved from 90 to 90.

## What passed

7 checks ran and found nothing.

- A focused browser Tab check followed the image button, the enabled View Details action, and the next card image button; the visible focus outline appeared on View Details.
- Catalog and search cards use a semantic img with product-name alt text; their detail buttons have explicit action labels.
- Detail images and management previews retain image alternatives, including a named fallback when an image fails to load.
- File and URL previews use the current product name as alt text; responsive object-fit sizing preserves the full image without replacing it with a CSS background.
- Product-card image and action controls follow DOM order; responsive card styles do not reorder the focus sequence.
- The skip link precedes navigation, and route changes focus the main content.
- Visible :focus-visible styles apply to buttons and links, including product-card controls.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **keyboard-navigator**: The dedicated accessibility keyboard scanner could not run because its Playwright dependency is unavailable; a targeted keyboard sequence was checked in the integrated browser.
- **alt-text-headings**: Custom uploaded or URL images vary at runtime, so their content-to-name match cannot be verified from source alone.

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
    "keyboard-navigator"
  ],
  "scope": [
    "src/App.css",
    "src/App.jsx",
    "src/components/ImageField.jsx",
    "src/components/Navbar.jsx",
    "src/components/ProductCard.jsx",
    "src/components/ProductForm.jsx",
    "src/components/ProductImage.jsx",
    "src/index.css"
  ],
  "findings": [
    {
      "rule": "KBD-FOCUS-REMOVAL",
      "wcag": "2.4.3 AA",
      "severity": "moderate",
      "confidence": "high",
      "location": "src/App.jsx:466",
      "summary": "Removing a cart item removes the focused Remove button, leaving keyboard focus at the document body and losing the user's place.",
      "fix": "After removal, focus the next item's Remove button, otherwise the previous item's button, or the cart heading when the cart becomes empty.",
      "evidence": "The Remove button calls onRemove; the resulting item list no longer renders its focused row.",
      "foundBy": [
        "keyboard-navigator"
      ]
    },
    {
      "rule": "KBD-FOCUS-REMOVAL",
      "wcag": "2.4.3 AA",
      "severity": "moderate",
      "confidence": "high",
      "location": "src/App.jsx:763",
      "summary": "Deleting a product removes the focused row and its Delete button, leaving keyboard focus at the document body and losing the user's place.",
      "fix": "After deletion, focus the next row's action, otherwise the previous row's action, or Add New Product when the table becomes empty.",
      "evidence": "deleteProduct filters the product out of the list without assigning focus.",
      "foundBy": [
        "keyboard-navigator"
      ]
    },
    {
      "rule": "ALT-REDUNDANT",
      "wcag": "1.1.1 A",
      "severity": "minor",
      "confidence": "high",
      "location": "src/App.jsx:219,379,441",
      "summary": "Product thumbnails add repeated or extraneous names to category-button, cart-row, and inventory-row announcements.",
      "fix": "Allow context-specific alt text and use alt=\"\" for these thumbnails when the visible category or adjacent product name already identifies the control or item.",
      "evidence": "ProductImage always sets alt={product.name}; these uses also render the category label or adjacent product name.",
      "component": "ProductImage",
      "foundBy": [
        "alt-text-headings"
      ]
    }
  ],
  "passed": [
    "A focused browser Tab check followed the image button, the enabled View Details action, and the next card image button; the visible focus outline appeared on View Details.",
    "Catalog and search cards use a semantic img with product-name alt text; their detail buttons have explicit action labels.",
    "Detail images and management previews retain image alternatives, including a named fallback when an image fails to load.",
    "File and URL previews use the current product name as alt text; responsive object-fit sizing preserves the full image without replacing it with a CSS background.",
    "Product-card image and action controls follow DOM order; responsive card styles do not reorder the focus sequence.",
    "The skip link precedes navigation, and route changes focus the main content.",
    "Visible :focus-visible styles apply to buttons and links, including product-card controls."
  ],
  "notes": [
    {
      "skill": "keyboard-navigator",
      "note": "The dedicated accessibility keyboard scanner could not run because its Playwright dependency is unavailable; a targeted keyboard sequence was checked in the integrated browser."
    },
    {
      "skill": "alt-text-headings",
      "note": "Custom uploaded or URL images vary at runtime, so their content-to-name match cannot be verified from source alone."
    }
  ],
  "counts": {
    "critical": 0,
    "serious": 0,
    "moderate": 2,
    "minor": 1
  },
  "components": [],
  "score": 90,
  "grade": "A",
  "penalty": 5,
  "checks": 10,
  "generated": "2026-11-03",
  "template": "web"
}
```
