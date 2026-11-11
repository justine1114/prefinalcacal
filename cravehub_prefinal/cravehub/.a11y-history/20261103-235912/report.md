# Web Accessibility Audit

An audit of web content, run on 2026-11-03. Read the executive summary for the verdict, the priorities section for what to do first, and the findings tables for detail.

## Metadata

What was audited, with what, and under which settings.

| Field | Value |
|---|---|
| Date | 2026-11-03 |
| Scope | 9 items |
| Skills run | alt-text-headings, aria-specialist, contrast-master, forms-specialist, keyboard-navigator, live-region-controller, modal-specialist |
| Tooling | node v24.21.0, a11y-mcp-server 7.1.0 |
| Scan configuration | defaults, no config file found |
| Checks counted | 28 |

Audited:

- `index.html`
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
| Score | 72 out of 100 |
| Grade | C |
| Findings | 20 |
| Blocking (critical plus serious) | 0 |
| Verdict | Pass |

## Severity breakdown

Counts by severity, highest impact first.

| Severity | Count | What it means |
|---|---:|---|
| critical | 0 | Blocks a person from completing the task |
| serious | 0 | Major barrier with a difficult workaround |
| moderate | 20 | Real friction, workaround exists |
| minor | 0 | Noticeable but rarely blocking |

## Findings

20 findings, ordered by severity then by rule.

### Moderate (20)

Each row names the rule, the criterion it fails, where it is, and what to change.

| Rule | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| `ARIA-ERROR-RELATION-001` | 1.3.1 A | src/components/ImageField.jsx:258 | When URL preview validation fails, the input is marked invalid but its error is not associated with it, so users revisiting the field may not learn why it is invalid. | Set `aria-describedby="feature-image-error"` on the URL input whenever an error is present. |
| `ARIA-NAME-001` | 2.5.3 A | src/components/ProductCard.jsx:31 | The Add to Cart button's accessible name inserts the product name between visible words, so speech-input users may be unable to invoke it by its visible label. | Keep the visible label contiguous in the accessible name, such as `Add to Cart: ${product.name}`. |
| `ARIA-REL-001` | 1.3.1 A | src/App.jsx:281,439 | The quantity controls put their group name on generic divs, which do not expose that name, leaving the quantity controls and value without a programmatic group label. | Use a `<fieldset>` with a `<legend>` naming the product quantity around each quantity control and its output. |
| `CONTRAST-001` | 1.4.3 AA | src/App.css:127,384 | Yellow brand and hero text has insufficient contrast against white and cream backgrounds. | Replace #edb43a with a darker text color that reaches at least 3:1 on the hero cream and white header backgrounds. |
| `CONTRAST-002` | 1.4.11 AA | src/App.css:519,1054,1076,1264,1340 | Several input and select boundaries are too low-contrast to identify the controls against white backgrounds. | Darken the borders for form fields, search fields, selects and URL inputs so their boundaries reach at least 3:1 against adjacent backgrounds. |
| `FOCUS-001` | 2.4.7 AA | src/App.css:544-546 | Keyboard focus is visually suppressed on both product-search inputs. | Restore a visible focus outline on the search inputs, or provide an equally visible :focus-visible style on their wrappers. |
| `FOCUS-002` | 2.4.7 AA | src/App.css:332-333; src/App.jsx:607,784 | Route changes move focus to the main element, but its focus indicator is removed. | Provide a visible focus style for main instead of outline: none. |
| `FORMS-ERROR-FOCUS` | 3.3.1 A | src/components/ProductForm.jsx:71 | The form focuses the first invalid control before React renders its error description, so screen readers may not announce the new error on focus. | Move focus after the error state has rendered, such as in an effect keyed to the submitted errors. |
| `FORMS-REQUIRED-STATE` | 4.1.2 A | src/components/ProductForm.jsx:115 | Product fields marked Required lack programmatic required state, so assistive technology may not expose them as required controls. | Add the native required attribute to each required product input, select and textarea. In ImageField, apply required to the active file or URL input. |
| `FORMS-UPLOAD-INSTRUCTIONS` | 3.3.2 A | src/components/ImageField.jsx:225 | The file input does not programmatically receive the visible accepted-format instructions. | Give the accepted-format instruction an id and reference it from the file input with aria-describedby. |
| `IMG-ALT-001` | 1.1.1 A | src/components/ImageField.jsx:269-271 | The image preview alternatives name the preview but do not describe the selected image. | Use a product-specific text alternative for the preview and product image. |
| `KEYBOARD-FOCUS-001` | 2.4.7 AA | src/App.css:332-333 | The main focus target has its focus outline removed, hiding focus after skip-link use and route changes. | Provide a visible focus style for main instead of removing its outline. |
| `KEYBOARD-FOCUS-001` | 2.4.7 AA | src/App.css:536-546 | The menu and product-management search inputs suppress their focus outlines without a visible replacement. | Restore a visible focus outline on these inputs or style their wrappers with :focus-within. |
| `LIVE-001` | 4.1.3 AA | src/App.jsx:565 | The app announcement region is removed when empty, so updates may insert the live region and its message simultaneously and go unannounced. | Render the role=status element continuously, even when empty, and update only its text; keep the dismiss control available only when a message exists. |
| `LIVE-002` | 4.1.3 AA | src/App.jsx:619 | A successful cart save clears a preceding product-save error, so checkout or product editing can hide a persistence failure and announce success despite unsaved changes. | Track the outcome of each write in a multi-write operation; retain and announce any failure, and announce completion only when every required write succeeds. |
| `LIVE-003` | 4.1.3 AA | src/App.jsx:351 | Product-management search and category filtering replace the table or empty state without announcing how many results remain. | Add an always-present polite status region that updates with the shown product count, including zero results, when search or category changes. |
| `LIVE-004` | 4.1.3 AA | src/App.jsx:611 | The cart count changes after cart actions, but the count is not announced unless a user happens to revisit or focus the cart link. | Update a persistent polite status message with the new cart total whenever the count changes. |
| `LIVE-005` | 4.1.3 AA | src/components/ImageField.jsx:289 | The image-preview success status is conditionally mounted with its message, so assistive technology may not announce that URL validation succeeded. | Keep an empty role=status region mounted and update its text when preview validation succeeds; clear it when the input changes. |
| `LIVE-006` | 4.1.3 AA | src/components/ImageField.jsx:284 | Recoverable image validation errors use role=alert, which can interrupt users assertively for routine input feedback. | Use a polite, persistent status region for these recoverable messages and associate the error with the relevant input. |
| `PAGE-TITLE-001` | 2.4.2 A | index.html:8 | The static document title does not identify the active page after SPA navigation. | Set a descriptive title for each route, such as “Menu - CraveHub,” and update document.title when the route changes. |

## Remediation priorities

The remaining 20 moderate and minor findings can follow in normal work.

## What passed

8 checks ran and found nothing.

- Dialog labeling, semantics, focus handling and keyboard dismissal passed the inspected checks.
- Escape and backdrop clicks dismiss the dialog.
- Heading hierarchy across inspected page states: one H1 per state and no skipped heading levels.
- Inspected images have alt attributes; decorative icons are hidden from assistive technology.
- Opening the native dialog moves focus inside; its first focusable element is the visible close button, and native closing restores focus.
- Page landmarks include a skip link, one main landmark, a labeled primary navigation and a footer.
- The dialog is labeled by its heading, and the email and password inputs have associated labels.
- The dialog uses showModal(), providing modal semantics, background inertness and focus containment.

## Needs a human

Items a skill could not decide, or could not check automatically.

- **aria-specialist**: The Navbar trigger implementation was outside the requested scope, so its element semantics could not be verified.
- **modal-specialist**: The Navbar trigger implementation was outside the requested scope, so its element semantics could not be verified.

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
    "live-region-controller",
    "modal-specialist"
  ],
  "scope": [
    "index.html",
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
      "rule": "ARIA-ERROR-RELATION-001",
      "wcag": "1.3.1 A",
      "severity": "moderate",
      "location": "src/components/ImageField.jsx:258",
      "summary": "When URL preview validation fails, the input is marked invalid but its error is not associated with it, so users revisiting the field may not learn why it is invalid.",
      "fix": "Set `aria-describedby=\"feature-image-error\"` on the URL input whenever an error is present.",
      "evidence": "`aria-invalid` checks `error || imageError`, while `aria-describedby` checks only `error`.",
      "foundBy": [
        "aria-specialist",
        "forms-specialist"
      ],
      "alsoReportedAs": [
        "FORMS-ERROR-ASSOCIATION"
      ]
    },
    {
      "rule": "ARIA-NAME-001",
      "wcag": "2.5.3 A",
      "severity": "moderate",
      "location": "src/components/ProductCard.jsx:31",
      "summary": "The Add to Cart button's accessible name inserts the product name between visible words, so speech-input users may be unable to invoke it by its visible label.",
      "fix": "Keep the visible label contiguous in the accessible name, such as `Add to Cart: ${product.name}`.",
      "evidence": "Visible: “Add to Cart”; aria-label: `Add ${product.name} to cart`",
      "foundBy": [
        "aria-specialist"
      ]
    },
    {
      "rule": "ARIA-REL-001",
      "wcag": "1.3.1 A",
      "severity": "moderate",
      "location": "src/App.jsx:281,439",
      "summary": "The quantity controls put their group name on generic divs, which do not expose that name, leaving the quantity controls and value without a programmatic group label.",
      "fix": "Use a `<fieldset>` with a `<legend>` naming the product quantity around each quantity control and its output.",
      "evidence": "`<div className=\"quantity-control\" aria-label={`Quantity for ${product.name}`}>`",
      "foundBy": [
        "aria-specialist"
      ]
    },
    {
      "rule": "CONTRAST-001",
      "wcag": "1.4.3 AA",
      "severity": "moderate",
      "location": "src/App.css:127,384",
      "summary": "Yellow brand and hero text has insufficient contrast against white and cream backgrounds.",
      "fix": "Replace #edb43a with a darker text color that reaches at least 3:1 on the hero cream and white header backgrounds.",
      "evidence": "#edb43a measures 1.88:1 on #fff and 1.78:1 on #fff8eb; both uses are large text and require 3:1.",
      "foundBy": [
        "contrast-master"
      ]
    },
    {
      "rule": "CONTRAST-002",
      "wcag": "1.4.11 AA",
      "severity": "moderate",
      "location": "src/App.css:519,1054,1076,1264,1340",
      "summary": "Several input and select boundaries are too low-contrast to identify the controls against white backgrounds.",
      "fix": "Darken the borders for form fields, search fields, selects and URL inputs so their boundaries reach at least 3:1 against adjacent backgrounds.",
      "evidence": "#ded4c7 against white is 1.46:1; --line (#e7dccb) against white is 1.36:1.",
      "foundBy": [
        "contrast-master"
      ]
    },
    {
      "rule": "FOCUS-001",
      "wcag": "2.4.7 AA",
      "severity": "moderate",
      "location": "src/App.css:544-546",
      "summary": "Keyboard focus is visually suppressed on both product-search inputs.",
      "fix": "Restore a visible focus outline on the search inputs, or provide an equally visible :focus-visible style on their wrappers.",
      "evidence": "Both input :focus-visible rules set outline: none.",
      "foundBy": [
        "contrast-master"
      ]
    },
    {
      "rule": "FOCUS-002",
      "wcag": "2.4.7 AA",
      "severity": "moderate",
      "location": "src/App.css:332-333; src/App.jsx:607,784",
      "summary": "Route changes move focus to the main element, but its focus indicator is removed.",
      "fix": "Provide a visible focus style for main instead of outline: none.",
      "evidence": "mainRef.current.focus() targets the tabindex=-1 main element; main:focus removes the outline.",
      "foundBy": [
        "contrast-master"
      ]
    },
    {
      "rule": "FORMS-ERROR-FOCUS",
      "wcag": "3.3.1 A",
      "severity": "moderate",
      "confidence": "medium",
      "location": "src/components/ProductForm.jsx:71",
      "summary": "The form focuses the first invalid control before React renders its error description, so screen readers may not announce the new error on focus.",
      "fix": "Move focus after the error state has rendered, such as in an effect keyed to the submitted errors.",
      "evidence": "`setErrors(nextErrors)` is followed immediately by focus.",
      "foundBy": [
        "forms-specialist"
      ]
    },
    {
      "rule": "FORMS-REQUIRED-STATE",
      "wcag": "4.1.2 A",
      "severity": "moderate",
      "location": "src/components/ProductForm.jsx:115",
      "summary": "Product fields marked Required lack programmatic required state, so assistive technology may not expose them as required controls.",
      "fix": "Add the native required attribute to each required product input, select and textarea. In ImageField, apply required to the active file or URL input.",
      "evidence": "The labels display “Required,” but the controls have no required attribute.",
      "foundBy": [
        "forms-specialist"
      ]
    },
    {
      "rule": "FORMS-UPLOAD-INSTRUCTIONS",
      "wcag": "3.3.2 A",
      "severity": "moderate",
      "location": "src/components/ImageField.jsx:225",
      "summary": "The file input does not programmatically receive the visible accepted-format instructions.",
      "fix": "Give the accepted-format instruction an id and reference it from the file input with aria-describedby.",
      "evidence": "The file input has accepted formats but no aria-describedby for the visible instructions.",
      "foundBy": [
        "forms-specialist"
      ]
    },
    {
      "rule": "IMG-ALT-001",
      "wcag": "1.1.1 A",
      "severity": "moderate",
      "confidence": "medium",
      "location": "src/components/ImageField.jsx:269-271",
      "summary": "The image preview alternatives name the preview but do not describe the selected image.",
      "fix": "Use a product-specific text alternative for the preview and product image.",
      "evidence": "alt=\"Selected product preview\"; alt=\"Image URL preview\"",
      "component": "ImageField",
      "foundBy": [
        "alt-text-headings"
      ]
    },
    {
      "rule": "KEYBOARD-FOCUS-001",
      "wcag": "2.4.7 AA",
      "severity": "moderate",
      "location": "src/App.css:332-333",
      "summary": "The main focus target has its focus outline removed, hiding focus after skip-link use and route changes.",
      "fix": "Provide a visible focus style for main instead of removing its outline.",
      "evidence": "main:focus { outline: none; }",
      "foundBy": [
        "keyboard-navigator"
      ]
    },
    {
      "rule": "KEYBOARD-FOCUS-001",
      "wcag": "2.4.7 AA",
      "severity": "moderate",
      "location": "src/App.css:536-546",
      "summary": "The menu and product-management search inputs suppress their focus outlines without a visible replacement.",
      "fix": "Restore a visible focus outline on these inputs or style their wrappers with :focus-within.",
      "evidence": "input:focus-visible { outline: none; }",
      "foundBy": [
        "keyboard-navigator"
      ]
    },
    {
      "rule": "LIVE-001",
      "wcag": "4.1.3 AA",
      "severity": "moderate",
      "location": "src/App.jsx:565",
      "summary": "The app announcement region is removed when empty, so updates may insert the live region and its message simultaneously and go unannounced.",
      "fix": "Render the role=status element continuously, even when empty, and update only its text; keep the dismiss control available only when a message exists.",
      "evidence": "if (!children) return null",
      "foundBy": [
        "live-region-controller"
      ]
    },
    {
      "rule": "LIVE-002",
      "wcag": "4.1.3 AA",
      "severity": "moderate",
      "location": "src/App.jsx:619",
      "summary": "A successful cart save clears a preceding product-save error, so checkout or product editing can hide a persistence failure and announce success despite unsaved changes.",
      "fix": "Track the outcome of each write in a multi-write operation; retain and announce any failure, and announce completion only when every required write succeeds.",
      "evidence": "Both persistProducts and persistCart clear storageNotice after their own successful write.",
      "foundBy": [
        "live-region-controller"
      ]
    },
    {
      "rule": "LIVE-003",
      "wcag": "4.1.3 AA",
      "severity": "moderate",
      "location": "src/App.jsx:351",
      "summary": "Product-management search and category filtering replace the table or empty state without announcing how many results remain.",
      "fix": "Add an always-present polite status region that updates with the shown product count, including zero results, when search or category changes.",
      "evidence": "{shownProducts.length ? (",
      "foundBy": [
        "live-region-controller"
      ]
    },
    {
      "rule": "LIVE-004",
      "wcag": "4.1.3 AA",
      "severity": "moderate",
      "location": "src/App.jsx:611",
      "summary": "The cart count changes after cart actions, but the count is not announced unless a user happens to revisit or focus the cart link.",
      "fix": "Update a persistent polite status message with the new cart total whenever the count changes.",
      "evidence": "const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)",
      "foundBy": [
        "live-region-controller"
      ]
    },
    {
      "rule": "LIVE-005",
      "wcag": "4.1.3 AA",
      "severity": "moderate",
      "location": "src/components/ImageField.jsx:289",
      "summary": "The image-preview success status is conditionally mounted with its message, so assistive technology may not announce that URL validation succeeded.",
      "fix": "Keep an empty role=status region mounted and update its text when preview validation succeeds; clear it when the input changes.",
      "evidence": "{statusMessage && <p className=\"field-success\" role=\"status\">{statusMessage}</p>}",
      "foundBy": [
        "live-region-controller"
      ]
    },
    {
      "rule": "LIVE-006",
      "wcag": "4.1.3 AA",
      "severity": "moderate",
      "location": "src/components/ImageField.jsx:284",
      "summary": "Recoverable image validation errors use role=alert, which can interrupt users assertively for routine input feedback.",
      "fix": "Use a polite, persistent status region for these recoverable messages and associate the error with the relevant input.",
      "evidence": "<p className=\"field-error\" id=\"feature-image-error\" role=\"alert\">",
      "foundBy": [
        "live-region-controller"
      ]
    },
    {
      "rule": "PAGE-TITLE-001",
      "wcag": "2.4.2 A",
      "severity": "moderate",
      "location": "index.html:8",
      "summary": "The static document title does not identify the active page after SPA navigation.",
      "fix": "Set a descriptive title for each route, such as “Menu - CraveHub,” and update document.title when the route changes.",
      "evidence": "<title>CraveHub - Your cravings, One Hub</title>",
      "foundBy": [
        "alt-text-headings"
      ]
    }
  ],
  "passed": [
    "Dialog labeling, semantics, focus handling and keyboard dismissal passed the inspected checks.",
    "Escape and backdrop clicks dismiss the dialog.",
    "Heading hierarchy across inspected page states: one H1 per state and no skipped heading levels.",
    "Inspected images have alt attributes; decorative icons are hidden from assistive technology.",
    "Opening the native dialog moves focus inside; its first focusable element is the visible close button, and native closing restores focus.",
    "Page landmarks include a skip link, one main landmark, a labeled primary navigation and a footer.",
    "The dialog is labeled by its heading, and the email and password inputs have associated labels.",
    "The dialog uses showModal(), providing modal semantics, background inertness and focus containment."
  ],
  "notes": [
    {
      "skill": "aria-specialist",
      "note": "The Navbar trigger implementation was outside the requested scope, so its element semantics could not be verified."
    },
    {
      "skill": "modal-specialist",
      "note": "The Navbar trigger implementation was outside the requested scope, so its element semantics could not be verified."
    }
  ],
  "counts": {
    "critical": 0,
    "serious": 0,
    "moderate": 20,
    "minor": 0
  },
  "components": [],
  "score": 72,
  "grade": "C",
  "penalty": 38.8,
  "checks": 28,
  "generated": "2026-11-03",
  "template": "web"
}
```
