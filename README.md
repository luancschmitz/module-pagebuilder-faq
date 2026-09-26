<h1 align="center">Luan Modules Page Builder Magento 2 FAQ</h1>

<div align="center">
  <p>Create an FAQ in Pagebuilder Magento 2.</p>
  <img src="https://img.shields.io/badge/magento-2.4-brightgreen.svg?logo=magento&longCache=true&style=flat-square" alt="Supported Magento Versions" />
  <a href="https://packagist.org/packages/luan-modules/module-faq" target="_blank"><img src="https://img.shields.io/packagist/v/luan-modules/module-faq.svg?style=flat-square" alt="Latest Stable Version" /></a>
  <a href="https://packagist.org/packages/luan-modules/module-faq" target="_blank"><img src="https://poser.pugx.org/luan-modules/module-faq/downloads" alt="Composer Downloads" /></a>
  <a href="https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity" target="_blank"><img src="https://img.shields.io/badge/maintained%3F-yes-brightgreen.svg?style=flat-square" alt="Maintained - Yes" /></a>
</div>

## Summary

Adds an **FAQ** content type to Magento Page Builder. Each FAQ element holds one question and one answer and is
rendered on the storefront as an accessible accordion item: the question is a clickable header with an arrow icon,
and the answer expands below it.

- Plain-text question, rich-text (WYSIWYG) answer: bold, italic, underline, headings, lists and links.
- Accessible storefront markup (WAI-ARIA disclosure pattern), keyboard operable.
- Bundled [Poppins](https://github.com/itfoundry/Poppins) font, no external requests.

## Requirements

| Requirement | Notes |
|---|---|
| Magento Open Source / Adobe Commerce 2.4.x | Developed and tested on 2.4.7 |
| `Magento_PageBuilder`, `Magento_Cms`, `Magento_Ui` | Declared as module dependencies |
| WYSIWYG editor enabled | *Stores > Configuration > General > Content Management > Enable WYSIWYG Editor*. If it is *Disabled Completely*, the answer field falls back to a plain textarea that accepts HTML |

## Installation

```bash
composer require luan-modules/module-faq
bin/magento module:enable LuanModules_FAQ
bin/magento setup:upgrade
bin/magento cache:flush
```

In production mode, also run `bin/magento setup:di:compile` and `bin/magento setup:static-content:deploy`.

## Usage

### Adding an FAQ

1. Open a CMS page, CMS block, category or product description that uses Page Builder
   (e.g. *Content > Pages > Edit*) and open the Page Builder stage.
2. In the left panel, expand **Elements** and drag **FAQ** into a row or column.
3. Hover the element and click the gear icon (**Open Editor**) to open the FAQ form.
4. Fill in the fields:

   | Field | Content |
   |---|---|
   | **Question** | Plain text. HTML is shown literally, not interpreted. It can also be edited inline on the stage. |
   | **Answer** | Rich text editor. Use it for formatted content: paragraphs, headings, bold, italic, underline, bulleted and numbered lists, and links. |

5. Click **Save** in the form, then save the page.

Add one FAQ element per question. Consecutive FAQ elements are displayed as a stacked list of accordion items.

### Editing the answer

- The answer can only be edited in the form. The stage shows a read-only preview, or *Enter an Answer* when the
  answer is empty.
- Keyboard users can open the editor help with **Alt + 0** (Windows) or **⌥ 0** (macOS).
- Content pasted from Word or web pages keeps its structure (bold, italic, lists, links) and loses fonts, colors and
  sizes, so answers follow the storefront style.
- The toolbar is the standard Page Builder one, so images, tables, widgets and variables are also available. The FAQ
  styles are designed for text, lists and links.
- Scripts, event attributes (`onclick`, `onerror`, ...) and `javascript:` links are removed by the editor.

### Appearance options

The **Advanced** section of the form applies to the whole FAQ element: alignment, border, border color, border width,
border radius, CSS classes, margins and padding. In the **Background** section, background color and background image
are applied; the remaining background options have no effect on this element.

### Storefront behavior

- Every FAQ starts collapsed. Clicking the question, or pressing **Enter**/**Space** when it has focus, expands or
  collapses the answer. Each item works independently.
- The arrow points down when the answer is closed and up when it is open.
- The open item header gets a light background and a divider line; the focused item shows a visible outline.
- Screen readers announce the question as a button with its expanded/collapsed state.

## Customization

### Colors and sizes

Override these variables in your theme's `web/css/source/_extend.less` (it is compiled after the module styles):

| Variable | Default | Used for |
|---|---|---|
| `@faq-question__color` | `#0E299B` | Question text, arrow and focus outline |
| `@faq-question__padding` | `18px 40px 18px 35px` | Question text padding |
| `@faq-accordion__active-background` | `#F5F7FD` | Header background on hover and when open |
| `@faq-accordion__border-color` | `#E4E7F2` | Divider between question and answer |
| `@faq-accordion__radius` | `4px` | Header corner radius |
| `@faq-accordion__text-indent` | `35px` | Left indent of question and answer |
| `@faq-accordion__chevron-size` | `10px` | Arrow size |
| `@faq-accordion__chevron-stroke` | `2px` | Arrow line thickness |
| `@faq__font-family` | `'Poppins', @font-family__sans-serif` | Question and answer font |

Example:

```less
// app/design/frontend/<Vendor>/<theme>/web/css/source/_extend.less
@faq-question__color: #1A1A1A;
@faq-accordion__active-background: #F2F2F2;
```

### Markup and CSS hooks

```html
<div class="cms-faq faq-disclosure" data-mage-init='{"LuanModules_FAQ/js/faq-disclosure": {}}'>
    <button type="button" class="faq-question" aria-expanded="false" aria-controls="luan-faq-answer-1">
        <span class="faq-question-text">Question</span>
    </button>
    <div class="faq-answer" id="luan-faq-answer-1" hidden>
        <div class="faq-answer-content">Answer HTML</div>
    </div>
</div>
```

`LuanModules_FAQ/js/faq-disclosure` sets the answer `id` and `aria-controls` and toggles `aria-expanded` and
`hidden`. Style open items with `.faq-question[aria-expanded=true]`.

### Translations

Admin strings are translatable. Portuguese (Brazil) is included in `i18n/pt_BR.csv`.

## Upgrading from 1.x to 2.0

- Pages saved with earlier versions keep their previous accordion markup and keep working without changes.
- An FAQ switches to the new markup and look, including the rich-text answer, when its page is saved again in the
  admin. Existing plain-text answers keep the same visible text.

## Troubleshooting

| Symptom | Solution |
|---|---|
| The storefront still shows the old style (small arrow) | Open the page in the admin and save it again to regenerate the FAQ markup |
| Styles or the admin form did not change after an upgrade | Run `bin/magento setup:static-content:deploy` and `bin/magento cache:flush`. In developer mode, clear the browser cache (static files are cached by the browser under the same version URL) |
| The answer field is a plain textarea | Enable the WYSIWYG editor in *Stores > Configuration > General > Content Management* |
| A warning about restricted HTML appears when saving the page | The content has tags or attributes outside Magento's WYSIWYG allowlist; remove them or extend `DefaultWYSIWYGValidator` in your module's `di.xml` |

## Third-party assets

The storefront uses the [Poppins](https://github.com/itfoundry/Poppins) font, bundled in
`view/frontend/web/fonts/poppins` and licensed under the SIL Open Font License 1.1 (see `OFL.txt` in that folder).

## License

MIT

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
