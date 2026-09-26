<?php

declare(strict_types=1);

namespace LuanModules\FAQ\Model\Wysiwyg;

use Magento\Framework\DataObject;
use Magento\Ui\Component\Wysiwyg\ConfigInterface;

/**
 * WYSIWYG configuration for the FAQ answer field.
 *
 * Gives the TinyMCE editable area an accessible name matching the field label. It is applied after the
 * wrapped configuration because the Page Builder config provider replaces any "settings" sent by the form.
 */
class AnswerConfig implements ConfigInterface
{
    public const SETTINGS_KEY = 'settings';
    public const ACCESSIBLE_NAME_KEY = 'iframe_aria_text';

    /**
     * @param ConfigInterface $wysiwygConfig
     */
    public function __construct(
        private readonly ConfigInterface $wysiwygConfig
    ) {
    }

    /**
     * Return the wrapped WYSIWYG configuration with the answer accessible name.
     *
     * @param array|DataObject $data
     * @return DataObject
     */
    public function getConfig($data = []): DataObject
    {
        $config = $this->wysiwygConfig->getConfig($data);
        $settings = (array) $config->getData(self::SETTINGS_KEY);
        $settings[self::ACCESSIBLE_NAME_KEY] = (string) __('Answer. Press ALT-0 for help.');

        return $config->setData(self::SETTINGS_KEY, $settings);
    }
}
