<?php
include 'ChromePhp.php';

$majorGroupID = $_GET['id'];
$majorGroupName = $_GET['name'];
$majorGroupActive = $_GET['active'];
$majorGroupModifiedDate = $_GET['modifieddate'];
ChromePhp::log($majorGroupName);

include("dbConfig.php");
include("dbOpen.php");

// $sql = 'UPDATE stations SET Name = "' . $stationName . '", Number = "' . $stationNumber . '", StationEmail = "' . $stationEmail . '", ModifiedDate = "' . $stationModifiedDate . '", 
//Active = ' . $stationActive . ' WHERE ID = ' . stationID;
$sql = 'UPDATE majorgroups SET Name = "' . $majorGroupName . '"';
$sql .= ', ModifiedDate = "' . $majorGroupModifiedDate . '"';
$sql .= ', Active = ' . $majorGroupActive . '';
$sql .= ' WHERE ID = ' . $majorGroupID . '';
ChromePhp::log($sql);

$result = $conn->query($sql);
echo($result);

include ("dbClose.php");

?>