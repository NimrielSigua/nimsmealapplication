<?php
  header("Access-Control-Allow-Origin:*");
  
  include("connection.php");
  
  // 2. get the data passed from the client
  $famname = $_POST['famname'];
  $username = $_POST['upusername'];
  $password = $_POST['uppassword'];
  $status = $_POST['status'];

  //3. Define SQL statement
  $sql = "INSERT INTO usertbl(family_name, user_name ,password, status)";
  $sql .= "VALUES(:famname, :upusername :uppassword, :status)";
  //4. define prepared statement
  $stmt = $conn->prepare($sql);
  $stmt->bindParam(":famname", $famname);
  $stmt->bindParam(":username", $username);
  $stmt->bindParam(":password", $password);
  $stmt->bindParam(":status", $status);
  //5. execute the command
  $returnValue = 0;
  $stmt->execute();
  
  if($stmt->rowCount() > 0){
    $returnValue = 1;
  }

  echo $returnValue;
?>