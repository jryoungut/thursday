<?php

	include("dbConfig.php");
	include("dbOpen.php");

	$mainarray = array();

	$sql = "SELECT id, name, number, stationEmail, active, modifiedDate FROM stations";

	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
			$subarray = array();
	    
			$subarray['id'] = $row['id'];
			$subarray['name'] = $row['name'];
			$subarray['number'] = $row['number'];
			$subarray['stationEmail'] = $row['stationEmail'];
			$subarray['active'] = $row['active'];
			$subarray['modifiedDate'] = $row['modifiedDate'];
	    
			$mainarray[]=$subarray;
	    }
	} else {
	    echo "0 results";
	}
	include ("dbClose.php");


	echo(json_encode($mainarray));

?>