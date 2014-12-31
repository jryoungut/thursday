<?php
include 'ChromePhp.php';
$postdata = $_GET["stationInfo"];
$request = json_decode($postdata);
$stationID = $request->id;
$stationName = $request->name;
$stationNumber = $request->number;
$stationEmail = $request->stationEmail;
$stationActive = $request->active;
$stationModifiedDate = $request->modifiedDate;

$date = new DateTime();
ChromePhp::log($date->format('U = Y-m-d H:i:s'));

include("dbConfig.php");
include("dbOpen.php");
ChromePhp::log('db OK');

// $sql = 'UPDATE stations SET Name = "' . $stationName . '", Number = "' . $stationNumber . '", StationEmail = "' . $stationEmail . '", ModifiedDate = "' . $stationModifiedDate . '", 
//Active = ' . $stationActive . ' WHERE ID = ' . stationID;
$sql = 'UPDATE stations SET Name = "' . $stationName . '"';
$sql .= ', Number = "' . $stationNumber . '"';
$sql .= ', StationEmail = "' . $stationEmail . '"';
$sql .= ', ModifiedDate = "' . $stationModifiedDate . '"';
$sql .= ', Active = ' . $stationActive . '';
$sql .= ' WHERE ID = ' . $stationID . '';
ChromePhp::log($sql);

$result = $conn->query($sql);
echo($result);

include ("dbClose.php");

?>