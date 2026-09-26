# Changelog

All notable changes to this module are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project follows
[Semantic Versioning](https://semver.org/).

## [2.0.0] - 2026-09-26

### Changed (breaking)

- New storefront markup for FAQs saved with this version: the jQuery UI accordion (`mage/accordion`) was replaced by
  the WAI-ARIA disclosure pattern (`button.faq-question[aria-expanded]` + `div.faq-answer[hidden]`), initialized by
  `LuanModules_FAQ/js/faq-disclosure`. Custom CSS or JS targeting `.mage-accordion-disabled`, `[data-role=collapsible]`
  or `[data-role=trigger]` must be updated for re-saved FAQs.
- The answer container is now `div.faq-answer-content` (was `p`), allowing block content such as lists and headings.

### Added

- Rich-text (WYSIWYG/TinyMCE) editor for the **Answer** field, with the "Answer" label and keyboard help note.
- Accessible name for the answer editor (`iframe_aria_text`) via `LuanModules\FAQ\Model\Wysiwyg\AnswerConfig`.
- Accordion look for the disclosure markup: CSS chevron (down when closed, up when open), header highlight on
  hover/open, divider between question and answer, visible keyboard focus, `prefers-reduced-motion` support.
- Styles for formatted answers: paragraphs, headings, lists and links.
- Bundled Poppins font (SIL OFL 1.1), latin subset, weights 400, 400 italic, 600 and 700.
- LESS variables for colors and sizes, overridable from the theme `_extend.less`.
- `pt_BR` translations and unit tests.
- Module dependencies declared: `Magento_Cms`, `Magento_PageBuilder`, `Magento_Ui`.

### Fixed

- Whitespace between inline elements (e.g. `<strong>` and `<em>`) is preserved when Page Builder saves the answer.
- Screen-reader state: the question exposes its expanded/collapsed state; interactive content (links) is no longer
  nested inside an ARIA tab.

### Compatibility

- Pages saved with 1.x keep their accordion markup and styles and keep working. An FAQ switches to the 2.0 markup
  when its page is saved again in the admin; plain-text answers keep the same visible text.

## [1.1.2]

- Previous release. See the Git history for details.
