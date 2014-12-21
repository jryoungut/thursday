<?php
header('Content-Type: application/json');

include("dbConfig.php");
include("dbOpen.php");

$mainarray = array();
$stationId = $_GET['stationID'];

//$sql = "SELECT id, apparatus, fleetNum, stationId, tireCnt, motorTracking FROM apparatus WHERE stationId = " .
//$stationId . " ORDER BY fleetNum ASC"; 

$sql = "SELECT DISTINCT apparatuslocations.apparatusId, apparatus.id, apparatus.apparatus, apparatus.fleetNum, apparatus.tireCnt, apparatus.motorTracking, apparatus.nextServiceDue, apparatus.dryPrime, apparatus.airTank FROM apparatuslocations INNER JOIN apparatus ON apparatuslocations.apparatusid = apparatus.id WHERE apparatuslocations.stationID = " . $stationId . " ORDER BY apparatuslocations.asofdate DESC, apparatuslocations.modifieddate DESC";
//echo var_dump($sql);
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
		$subarray = array();
    
		$subarray['id'] = $row['id'];
		$subarray['apparatus'] = $row['apparatus'];
		$subarray['fleetNum'] = $row['fleetNum'];
		$subarray['stationId'] = $stationId;
		$subarray['tireCnt'] = $row['tireCnt'];
		$subarray['motorTracking'] = $row['motorTracking'];
		$subarray['nextServiceDue'] = $row['nextServiceDue'];
		$subarray['dryPrime'] = $row['dryPrime'];
		$subarray['airTank'] = $row['airTank'];
    
		$mainarray[]=$subarray;
    }
} else {
    echo "0 results";
}
include ("dbClose.php");

echo(json_encode($mainarray));

?>