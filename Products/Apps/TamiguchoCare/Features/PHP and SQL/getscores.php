<?php
header('Access-Control-Allow-Origin: *');




$host="localhost"; // Host name 
$username="username"; // Mysql username 
$password="password"; // Mysql password 
$db_name="database"; // Database name 
$tbl_name="scores"; // Table name

// Connect to server and select database.
mysql_connect("$host", "$username", "$password")or die("cannot connect"); 
mysql_select_db("$db_name")or die("cannot select DB");

// Retrieve data from database 
$sql="SELECT * FROM scores ORDER BY score DESC LIMIT 10";
$result=mysql_query($sql);

// Start looping rows in mysql database.
while($rows=mysql_fetch_array($result)){
echo $rows['name'] . "|" . $rows['score'] . "|";

// close while loop 
}

// close MySQL connection 
mysql_close();
?>