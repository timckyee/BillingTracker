<?php

$user = 'root';
$password = 'root';
$db = 'BillingTracker';
$host = 'localhost';
$port = 8889;

$mysqli = new mysqli($host, $user, $password, $db, $port);

if($mysqli->connect_error) {
    echo "connection error";
}

function login($username, $password, $con){
	
	$sql = "SELECT password FROM `Login` WHERE `username`=?";
	$stmt = $con->prepare($sql);
	$stmt->bind_param("s", $username);

	$stmt->execute();

	$result = $stmt->get_result();

	$user = $result->fetch_assoc();

	$password_from_database = $user['password'];

	if($password_from_database == $password)
	{
		echo 1;
	}
	else
	{
		echo 0;
	}
}

$username = $_POST["username"];
$password = $_POST["password"];

login($username, $password, $mysqli);