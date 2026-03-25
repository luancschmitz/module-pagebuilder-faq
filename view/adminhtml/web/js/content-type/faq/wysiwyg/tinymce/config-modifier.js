/**
 * Places the TinyMCE toolbar in .faq-answer-toolbar-container, which is
 * right after the answer field (.inline-wysiwyg) inside each FAQ block.
 */
define([], function () {
  "use strict";

  var ConfigModifier = function () {};
  ConfigModifier.prototype.modify = function (contentTypeId, config) {
    if (config.adapter_config.mode === "inline") {
      config.adapter.settings.fixed_toolbar_container =
        "#" + contentTypeId + " .faq-answer-toolbar-container";
    }
  };

  return ConfigModifier;
});
