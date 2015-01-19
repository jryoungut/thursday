<?php

	include("dbConfig.php");
	include("dbOpen.php");

	$id = $_GET['id'];

	$mainarray = array();

	$sql = "SELECT id, name, value, active FROM settings WHERE id = " . $id . " LIMIT 1";

	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
			$subarray = array();
	    
			$subarray['id'] = $row['id'];
			$subarray['name'] = $row['name'];
			$subarray['value'] = $row['value'];
			$subarray['active'] = $row['active'];
	    
			$mainarray[]=$subarray;
	    }
	} else {
	    echo "0 results";
	}
	include ("dbClose.php");


	echo(json_encode($mainarray));

?>