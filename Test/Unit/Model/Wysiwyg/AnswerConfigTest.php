<?php

declare(strict_types=1);

namespace LuanModules\FAQ\Test\Unit\Model\Wysiwyg;

use LuanModules\FAQ\Model\Wysiwyg\AnswerConfig;
use Magento\Framework\DataObject;
use Magento\Ui\Component\Wysiwyg\ConfigInterface;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class AnswerConfigTest extends TestCase
{
    private const ACCESSIBLE_NAME = 'Answer. Press ALT-0 for help.';
    private const FORM_DATA = ['is_pagebuilder_enabled' => false, 'toggle_button' => false];

    /**
     * @var ConfigInterface&MockObject
     */
    private ConfigInterface $wysiwygConfig;

    /**
     * @var AnswerConfig
     */
    private AnswerConfig $answerConfig;

    protected function setUp(): void
    {
        $this->wysiwygConfig = $this->createMock(ConfigInterface::class);
        $this->answerConfig = new AnswerConfig($this->wysiwygConfig);
    }

    public function testForwardsFormDataToWrappedConfig(): void
    {
        $this->wysiwygConfig->expects($this->once())
            ->method('getConfig')
            ->with(self::FORM_DATA)
            ->willReturn(new DataObject());

        $this->answerConfig->getConfig(self::FORM_DATA);
    }

    public function testAddsAccessibleNameKeepingProviderSettings(): void
    {
        $providerSettings = ['fixed_toolbar_container' => '.pagebuilder-content-type'];
        $this->wysiwygConfig->method('getConfig')
            ->willReturn(new DataObject(['settings' => $providerSettings, 'tinymce' => ['toolbar' => 'bold']]));

        $config = $this->answerConfig->getConfig(self::FORM_DATA);

        $this->assertSame(
            $providerSettings + [AnswerConfig::ACCESSIBLE_NAME_KEY => self::ACCESSIBLE_NAME],
            $config->getData('settings')
        );
        $this->assertSame(['toolbar' => 'bold'], $config->getData('tinymce'));
    }

    public function testAddsAccessibleNameWhenProviderHasNoSettings(): void
    {
        $this->wysiwygConfig->method('getConfig')->willReturn(new DataObject());

        $config = $this->answerConfig->getConfig();

        $this->assertSame(
            [AnswerConfig::ACCESSIBLE_NAME_KEY => self::ACCESSIBLE_NAME],
            $config->getData('settings')
        );
    }
}
