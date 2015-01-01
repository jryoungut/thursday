<?php
	include("dbConfig.php");
	include("dbOpen.php");

	$mainarray = array();

	$sql = "SELECT a.ID, a.Apparatus, a.FleetNum, CONCAT_WS(' - ', s.Number, s.Name) as Location, a.TireCnt, a.MotorTracking, a.NextServiceDue, a.DryPrime, a.AirTank, a.Active, a.ModifiedDate FROM apparatus a JOIN stations s
ON a.StationID = s.ID";

	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
			$subarray = array();
	    
			$subarray['ID'] = $row['ID'];
			$subarray['Apparatus'] = $row['Apparatus'];
			$subarray['FleetNum'] = $row['FleetNum'];
			$subarray['Location'] = $row['Location'];
			$subarray['TireCnt'] = $row['TireCnt'];
			$subarray['MotorTracking'] = $row['MotorTracking'];
			$subarray['NextServiceDue'] = $row['NextServiceDue'];
			$subarray['DryPrime'] = $row['DryPrime'];
			$subarray['AirTank'] = $row['AirTank'];
			$subarray['Active'] = $row['Active'];
			$subarray['ModifiedDate'] = $row['ModifiedDate'];
	    
			$mainarray[]=$subarray;
	    }
	} else {
	    echo "0 results";
	}
	include ("dbClose.php");


	echo(json_encode($mainarray));

?>