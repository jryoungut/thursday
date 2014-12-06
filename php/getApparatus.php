<?php
header('Content-Type: application/json');

include("dbConfig.php");
include("dbOpen.php");

$mainarray = array();
$stationId = $_GET['stationID'];

$sql = "SELECT id, apparatus, fleetNum, stationId, tireCnt, motorTracking FROM apparatus WHERE stationId = " .
$stationId . " ORDER BY fleetNum ASC"; 
 
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
		$subarray = array();
    
		$subarray['id'] = $row['id'];
		$subarray['apparatus'] = $row['apparatus'];
		$subarray['fleetNum'] = $row['fleetNum'];
		$subarray['stationId'] = $row['stationId'];
		$subarray['tireCnt'] = $row['tireCnt'];
		$subarray['motorTracking'] = $row['motorTracking'];
    
		$mainarray[]=$subarray;
    }
} else {
    echo "0 results";
}
include ("dbClose.php");

echo(json_encode($mainarray));

?>