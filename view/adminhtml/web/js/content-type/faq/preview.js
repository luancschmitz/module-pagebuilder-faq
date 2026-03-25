define([
  "Magento_PageBuilder/js/content-type/preview",
  "Magento_PageBuilder/js/utils/editor",
  "Magento_PageBuilder/js/wysiwyg/factory",
  "underscore",
], function (PreviewBase, editor, factory, _) {
  "use strict";
  var $super;

  function Preview(contentType, config, observableUpdater) {
    PreviewBase.call(this, contentType, config, observableUpdater);
    this.answerWysiwyg = null;
  }

  Preview.prototype = Object.create(PreviewBase.prototype);
  $super = PreviewBase.prototype;

  Preview.prototype.retrieveOptions = function retrieveOptions() {
    var options = $super.retrieveOptions.call(this, arguments);
    options.edit.title = "Open Editor";
    options.remove.title = "Delete";
    return options;
  };

  Preview.prototype.isWysiwygSupported = function () {
    return editor.isWysiwygSupported();
  };

  /**
   * Called by afterRender; store element and set content. Do NOT init WYSIWYG here
   * (lazy init on click, like text content type). Same as core text: use data.answer.html() directly.
   */
  Preview.prototype.afterRenderWysiwyg = function (element) {
    var self = this;
    var el =
      element && element.nodeType
        ? element
        : Array.isArray(element)
          ? element[0]
          : null;

    if (!el || !el.nodeType) {
      return;
    }

    this.answerElement = el;
    el.id = this.contentType.id + "-answer-editor";
    el.innerHTML = this.data.answer.html();

    this.contentType.dataStore.subscribe(function () {
      // If we're not focused into TinyMCE inline, update the value when it changes in the data store
      var activeEditor = editor.getActiveEditor && editor.getActiveEditor();
      if (
        !self.answerWysiwyg ||
        (self.answerWysiwyg &&
          (!activeEditor ||
            self.answerWysiwyg.getAdapter().id !== activeEditor.id))
      ) {
        el.innerHTML = self.data.answer.html();
      }
    }, "answer");

    this.answerWysiwyg = null;
  };

  /**
   * Activate WYSIWYG on click (lazy init).
   */
  Preview.prototype.activateEditor = function () {
    var self = this;
    if (!this.answerElement || this.answerWysiwyg) {
      return;
    }
    this.answerElement.removeAttribute("contenteditable");
    _.defer(function () {
      self.initAnswerWysiwygFromClick(true);
    });
  };

  /**
   * Init WYSIWYG (called on first click). Uses this.contentType.
   */
  Preview.prototype.initAnswerWysiwygFromClick = function (focus) {
    var self = this;
    if (this.answerWysiwyg) {
      return Promise.resolve(this.answerWysiwyg);
    }
    if (
      !this.answerElement ||
      !this.config.additional_data ||
      !this.config.additional_data.wysiwygConfig
    ) {
      return Promise.reject();
    }

    var wysiwygConfig =
      this.config.additional_data.wysiwygConfig.wysiwygConfigData;
    if (focus && wysiwygConfig.adapter && wysiwygConfig.adapter.settings) {
      wysiwygConfig.adapter.settings.auto_focus = this.answerElement.id;
    }

    return factory(
      this.contentType.id,
      this.answerElement.id,
      this.config.name,
      wysiwygConfig,
      this.contentType.dataStore,
      "faq_answer",
      this.contentType.stageId,
    ).then(function (wysiwyg) {
      self.answerWysiwyg = wysiwyg;
      return wysiwyg;
    });
  };

  Preview.prototype.handleMouseDown = function (preview, event) {
    event.stopPropagation();
    return true;
  };

  Preview.prototype.handleDoubleClick = function () {
    // Optional: forward to WYSIWYG when needed
    return true;
  };

  /**
   * Placeholder styles (margin, padding, alignment) like text content type.
   */
  Preview.prototype.getPlaceholderStyle = function () {
    var keys = [
      "marginBottom",
      "marginLeft",
      "marginRight",
      "marginTop",
      "paddingBottom",
      "paddingLeft",
      "paddingRight",
      "paddingTop",
      "textAlign",
    ];
    var style =
      this.data.answer && this.data.answer.style
        ? this.data.answer.style()
        : {};
    return _.pick(style, keys);
  };

  Preview.prototype.bindEvents = function () {
    this.contentType.dataStore.subscribe(function (state) {
      var faq_answer = state.faq_answer;
      if (!faq_answer || typeof faq_answer !== "object") {
        return;
      }
      var sanitizedContent = editor.removeReservedHtmlAttributes(faq_answer);
      if (sanitizedContent !== faq_answer) {
        state.faq_answer = sanitizedContent;
      }
    }, "faq_answer");

    $super.bindEvents.call(this);
  };

  return Preview;
});
