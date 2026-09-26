define([], function () {
    'use strict';

    var instanceCount = 0;

    /**
     * Toggle a FAQ answer following the WAI-ARIA disclosure pattern.
     *
     * @param {Object} config
     * @param {HTMLElement} element
     */
    return function (config, element) {
        var button = element.querySelector('.faq-question'),
            panel = element.querySelector('.faq-answer');

        if (!button || !panel) {
            return;
        }

        instanceCount += 1;
        panel.id = panel.id || 'luan-faq-answer-' + instanceCount;
        button.setAttribute('aria-controls', panel.id);
        button.addEventListener('click', function () {
            var isExpanded = button.getAttribute('aria-expanded') === 'true';

            button.setAttribute('aria-expanded', String(!isExpanded));
            panel.hidden = isExpanded;
        });
    };
});
