<?php
// class Ingredients
// {
//     function save($json)
//     {
//         include "connection.php";

//         $json = json_decode($json, true);

//         $name = $json['name'];
//         $description = $json['description'];

//         $sql = "INSERT INTO ingredienttbl(ingredient_name, ingredient_description)";
//         $sql .= "VALUES(:name, :description) ";
//         $stmt = $conn->prepare($sql);
//         $stmt->bindParam(":name", $name);
//         $stmt->bindParam(":description", $description);

//         $stmt->execute();
//         $returnValue = $stmt->rowCount() > 0 ? 1 : 0;

//         return $returnValue;
//     }
// }

// $json = isset($_POST['json']) ? $_POST['json'] : "";
// $operation = $_POST['operation'];

// $ingredient = new Ingredients();
// switch ($operation) {
//     case "save":
//         echo $ingredient->save($json);
//         break;
// }
?>
