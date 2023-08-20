<?php

require_once($_SERVER['HOME'] . "/.composer/vendor/autoload.php");

use PHPUnit\Framework\TestCase;
use SebastianBergmann\CodeCoverage\CodeCoverage;
use SebastianBergmann\CodeCoverage\Driver\Driver;
use SebastianBergmann\CodeCoverage\Filter;
use SebastianBergmann\CodeCoverage\Report\Html\Facade as HtmlReport;

class BootstrapTest extends TestCase
{
    public function testCok()
    {
        $this->assertArrayHasKey('fo', ['fo' => 'fo Value'], 'message 1');
        $this->assertArrayHasKey('fi', ['fi' => 'fo Value'], 'message 2');
    }

    public function testCak()
    {
        $this->assertDirectoryExists(__DIR__);
        $this->assertArrayHasKey('fi', ['fi' => 'fo Value']);
    }
}
