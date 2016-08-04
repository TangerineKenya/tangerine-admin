<?php
	/***Get dta from angular app format and send***/

	$post = file_get_contents("php://input");
	$data = json_decode($post);

	var_dump($data);
	
?>