<?php
 // header("Access-Control-Allow-Origin:*");
  // 1. establish connection to the database
  include("connection.php");

  // 2. get the data passed from the client
  $username = $_POST['username'];
  $password = $_POST['password'];

  //3. Define SQL statement
  $sql = "SELECT * FROM usertbl ";
  $sql .= "WHERE user_name=:username AND password=:password";
  //4. define prepared statement
  $stmt = $conn->prepare($sql);
  $stmt->bindParam(":username", $username);
  $stmt->bindParam(":password", $password);
  //5. execute the command
  $returnValue = 0;
  $stmt->execute();
  
  if($stmt->rowCount() > 0){
    $returnValue = $stmt->fetch(PDO::FETCH_ASSOC);
  }

  echo json_encode($returnValue);
?>