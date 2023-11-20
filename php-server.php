<?php
require_once(getenv('HOME') . "/.composer/vendor/autoload.php");
require_once("./vendor/autoload.php");

use Webmozart\PathUtil\Path;
use Moment\Moment as MMoment;
use vigihdev\utils\TextCase;
use vigihdev\moment\Moment;

$start = Moment::now()->format(Moment::NO_TZ_MYSQL);
$end = Moment::new($start)->addDays(10)->format(Moment::NO_TZ_MYSQL);

echo "<pre>";
// set the default timezone to use.
var_dump(date('Y-m-d H:i:s'));
var_dump(Moment::range($start, $end));
var_dump(Moment::new($start)->format('d-m-Y'));
var_dump(Moment::parse('2023-11-10 09:09:00', 'D d M Y H:i'));
var_dump(Moment::parse('2023-10-10', 'D d M Y H:i'));
echo "</pre>";
