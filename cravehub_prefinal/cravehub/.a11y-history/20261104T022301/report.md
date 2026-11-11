# Web Accessibility Audit

An audit of web content, run on 2026-11-03. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-11-03 |
| Scope | 4 items |
| Skills run | alt-text-headings, aria-specialist, contrast-master, keyboard-navigator, live-region-controller |
| Tooling | node v24.21.0, a11y-mcp-server 7.1.0 |
| Scan configuration | defaults, no config file found |
| Checks counted | 17 |

Audited:

- `src/App.css`
- `src/App.jsx`
- `src/components/Navbar.jsx`
- `src/components/ProductCard.jsx`

## Executive summary

Pass. No critical or serious findings.

The headline numbers for this run.

| Measure | Value |
|---|---|
| Score | 97 out of 100 |
| Grade | A |
| Findings | 2 |
| Blocking (critical plus serious) | 0 |
| Verdict | Pass |

## Severity breakdown

Counts by severity, highest impact first.

| Severity | Count | What it means |
|---|---:|---|
| critical | 0 | Blocks a person from completing the task |
| serious | 0 | Major barrier with a difficult workaround |
| moderate | 1 | Real friction, workaround exists |
| minor | 1 | Noticeable but rarely blocking |

## Findings

2 findings, ordered by severity then by rule.

### Moderate (1)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `NON-TEXT-CONTROL-CONTRAST` | 1.4.11 AA | src/App.css:.upload-dropzone | The existing upload dropzone border has 2.11:1 contrast against its background, below the 3:1 control-boundary minimum. | Darken the upload dropzone border until it reaches at least 3:1 contrast against #fffaf7. |

### Minor (1)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `LIVE-REGION-003` | 4.1.3 AA | src/App.jsx:MenuPage and ProductManagementPage result counts | Menu and management result counts update on every search keystroke, which can create frequent live announcements. | Keep visual filtering immediate, but debounce the live result announcement until input pauses or announce only the settled count. |

## Remediation priorities

The remaining 2 moderate and minor findings can follow in normal work.

## Delta tracking

Movement since the previous report.

| Change | Count |
|---|---:|
| Fixed | 0 |
| New | 0 |
| Persistent | 2 |
| Regressed | 0 |

Score moved from 97 to 97.

## What passed

15 checks ran and found nothing.

- Cart quantity is included in the accessible name of the cart link.
- Category filters expose pressed state and a visible checkmark for the selected category.
- Header, labeled navigation, main, and footer landmarks are present.
- Home and product-card image alternatives identify the products shown.
- Home navigation returns to the top of the document, including the header.
- Homepage Add to Cart uses the shared cart handler and provides a success notice without a competing cart-count live announcement.
- Homepage hero actions and navigation links reach their intended destinations.
- Menu navigation focuses the search field when requested.
- Menu search describes the current result count, including after category navigation.
- Product detail links have product-specific accessible names.
- Selected category controls use a checkmark in addition to brand color.
- The document title is set for the home route and updates on route changes.
- The homepage has one H1 and logical section headings.
- The homepage keeps one H1 and uses section headings for its browsing areas.
- The mobile navigation closes after selection and returns focus to its toggle.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **keyboard-navigator**: Automated axe, contrast, and keyboard scans were unavailable because Playwright is not installed; browser navigation and interactions were tested separately.
- **contrast-master**: The existing upload-dropzone contrast issue is in Product Management styling and was left unchanged to honor the requested scope.

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
    "src/App.css",
    "src/App.jsx",
    "src/components/Navbar.jsx",
    "src/components/ProductCard.jsx"
  ],
  "findings": [
    {
      "rule": "NON-TEXT-CONTROL-CONTRAST",
      "wcag": "1.4.11 AA",
      "severity": "moderate",
      "location": "src/App.css:.upload-dropzone",
      "summary": "The existing upload dropzone border has 2.11:1 contrast against its background, below the 3:1 control-boundary minimum.",
      "fix": "Darken the upload dropzone border until it reaches at least 3:1 contrast against #fffaf7.",
      "evidence": "The border is #c9a995 on a #fffaf7 background.",
      "component": "Product Management image upload",
      "foundBy": [
        "contrast-master"
      ]
    },
    {
      "rule": "LIVE-REGION-003",
      "wcag": "4.1.3 AA",
      "severity": "minor",
      "confidence": "medium",
      "location": "src/App.jsx:MenuPage and ProductManagementPage result counts",
      "summary": "Menu and management result counts update on every search keystroke, which can create frequent live announcements.",
      "fix": "Keep visual filtering immediate, but debounce the live result announcement until input pauses or announce only the settled count.",
      "evidence": "Both search views update their live result counts on each input change.",
      "foundBy": [
        "live-region-controller"
      ]
    }
  ],
  "passed": [
    "Cart quantity is included in the accessible name of the cart link.",
    "Category filters expose pressed state and a visible checkmark for the selected category.",
    "Header, labeled navigation, main, and footer landmarks are present.",
    "Home and product-card image alternatives identify the products shown.",
    "Home navigation returns to the top of the document, including the header.",
    "Homepage Add to Cart uses the shared cart handler and provides a success notice without a competing cart-count live announcement.",
    "Homepage hero actions and navigation links reach their intended destinations.",
    "Menu navigation focuses the search field when requested.",
    "Menu search describes the current result count, including after category navigation.",
    "Product detail links have product-specific accessible names.",
    "Selected category controls use a checkmark in addition to brand color.",
    "The document title is set for the home route and updates on route changes.",
    "The homepage has one H1 and logical section headings.",
    "The homepage keeps one H1 and uses section headings for its browsing areas.",
    "The mobile navigation closes after selection and returns focus to its toggle."
  ],
  "notes": [
    {
      "skill": "keyboard-navigator",
      "note": "Automated axe, contrast, and keyboard scans were unavailable because Playwright is not installed; browser navigation and interactions were tested separately."
    },
    {
      "skill": "contrast-master",
      "note": "The existing upload-dropzone contrast issue is in Product Management styling and was left unchanged to honor the requested scope."
    }
  ],
  "counts": {
    "critical": 0,
    "serious": 0,
    "moderate": 1,
    "minor": 1
  },
  "components": [],
  "score": 97,
  "grade": "A",
  "penalty": 2.7,
  "checks": 17,
  "generated": "2026-11-03",
  "template": "web"
}
```
