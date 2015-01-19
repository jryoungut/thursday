<?php
	include 'ChromePhp.php';

	include("dbConfig.php");
	include("dbOpen.php");

	$onlyActive = $_GET['onlyActive'];
	$whereString = '';
	if($onlyActive == 'true'){
		$whereString = " WHERE active = 1";
	}

	$mainarray = array();

	$sql = "SELECT id, name, active, modifiedDate FROM majorgroups" . $whereString;
ChromePhp::log('sql = ' . $sql);

	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
			$subarray = array();
	    
			$subarray['id'] = $row['id'];
			$subarray['name'] = $row['name'];
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