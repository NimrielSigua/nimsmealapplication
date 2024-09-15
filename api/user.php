<?php

    class Users
    {
        function Register($json)
        {
            include "connection.php";

            $json = json_decode($json, true);

            $familyname = $json['familyname'];
            $username = $json['username'];
            $password = $json['password'];
            $date = $json['date'];

            $checkSql = "SELECT COUNT(*) AS userCount FROM usertbl WHERE user_name = :username";
            $checkStmt = $conn->prepare($checkSql);
            $checkStmt->bindParam(":username", $username);
            $checkStmt->execute();

            $userCountResult = $checkStmt->fetch(PDO::FETCH_ASSOC);
            $userCount = $userCountResult['userCount'];

            if ($userCount > 0) {
                return "Username already exists! Please use a different username.";
            }


            $sql = "INSERT INTO usertbl(family_name, user_name, password, date) VALUES(:familyname, :username, :password, :date)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":familyname", $familyname);
            $stmt->bindParam(":username", $username);
            $stmt->bindParam(":password", $password);
            $stmt->bindParam(":date", $date);
            $stmt->execute();

            $returnValue = 0;
            if ($stmt->rowCount() > 0) {
                $returnValue = 1;
            }
            $stmt = null;
            $conn = null;
            return $returnValue;
        }


        // function Login($json) {
        //     include 'connection.php';

        //     $json = json_decode($json, true);

        //     $username = $json['username']; // Match the field names with the form
        //     $password = $json['password'];

        //     $sql = "SELECT * FROM usertbl WHERE user_name=:username AND password=:password";
        //     $stmt = $conn->prepare($sql);
        //     $stmt->bindParam(":username", $username);
        //     $stmt->bindParam(":password", $password);
        //     $stmt->execute();

        //     if ($stmt->rowCount() > 0) {
        //         $returnValue = $stmt->fetch(PDO::FETCH_ASSOC);
        //         $stmt = null;
        //         $conn = null;
        //         // Return user data as JSON when successful
        //         echo json_encode($returnValue);
        //     } else {
        //         // Return an error message as JSON when login fails
        //         echo json_encode(["error" => "Invalid username or password"]);
        //     }
        // }


    }

    $operation = isset($_POST["operation"]) ? $_POST["operation"] : "Invalid";
    $json  = isset($_POST["json"]) ? $_POST["json"] : "";

    $user = new Users();
    switch ($operation) {
        case "Register":
            echo $user->Register($json);
            break;
            // case "Login":
            //     echo $user->Login($json);
            //     break;
    }
