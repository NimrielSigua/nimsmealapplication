<?php
class DailyMeal
{
    // function save($json)
    // {
    //     include "connection.php";

    //     $json = json_decode($json, true);

    //     $day = $json['day'];
    //     $date = $json['date'];
    //     $breakfast = $json['breakfast'];
    //     $lunch = $json['lunch'];
    //     $dinner = $json['dinner'];

    //     $sql = "INSERT INTO dailyplantbl(day_name, date, breakfast, lunch, dinner)";
    //     $sql .= "VALUES(:day, :date, :breakfast, :lunch, :dinner) ";
    //     $stmt = $conn->prepare($sql);
    //     $stmt->bindParam(":day", $day);
    //     $stmt->bindParam(":date", $date);
    //     $stmt->bindParam(":breakfast", $breakfast);
    //     $stmt->bindParam(":lunch", $lunch);
    //     $stmt->bindParam(":dinner", $dinner);

    //     $stmt->execute();
    //     $returnValue = $stmt->rowCount() > 0 ? 1 : 0;

    //     return $returnValue;
    // }


    function getRecords()
    {
        include "connection.php";

        // Calculate the start and end dates of the current week
        $currentDate = date("Y-m-d");
        $startOfWeek = date("Y-m-d", strtotime("last sunday", strtotime($currentDate)));
        $endOfWeek = date("Y-m-d", strtotime("next saturday", strtotime($currentDate)));
        $user_id = $_POST["user_id"];


        $sql =  "SELECT 
            dailyplantbl.*,
            breakfast.recipe_name AS breakfast_name,
            lunch.recipe_name AS lunch_name,
            dinner.recipe_name AS dinner_name,
            breakfast.cooking_instructions AS breakfast_instructions,
            lunch.cooking_instructions AS lunch_instructions,
            dinner.cooking_instructions AS dinner_instructions,
            GROUP_CONCAT(DISTINCT 
                CONCAT(breakfast_ingredients.ingredient_name, ' - ', breakfast_recipe_ingredients.quantity) 
                ORDER BY breakfast_ingredients.ingredient_name ASC
            ) AS breakfast_ingredients,
            GROUP_CONCAT(DISTINCT 
                CONCAT(lunch_ingredients.ingredient_name, ' - ', lunch_recipe_ingredients.quantity) 
                ORDER BY lunch_ingredients.ingredient_name ASC
            ) AS lunch_ingredients,
            GROUP_CONCAT(DISTINCT 
                CONCAT(dinner_ingredients.ingredient_name, ' - ', dinner_recipe_ingredients.quantity) 
                ORDER BY dinner_ingredients.ingredient_name ASC
            ) AS dinner_ingredients,
            (
                SELECT SUM(price) FROM recipeingredientstbl 
                WHERE recipe_id = dailyplantbl.breakfast
            ) AS total_breakfast_Price,
            (
                SELECT SUM(price) FROM recipeingredientstbl 
                WHERE recipe_id = dailyplantbl.lunch
            ) AS total_lunch_Price,
            (
                SELECT SUM(price) FROM recipeingredientstbl 
                WHERE recipe_id = dailyplantbl.dinner
            ) AS total_dinner_Price,
            (
                SELECT SUM(price) FROM recipeingredientstbl 
                WHERE recipe_id = dailyplantbl.breakfast
            ) + (
                SELECT SUM(price) FROM recipeingredientstbl 
                WHERE recipe_id = dailyplantbl.lunch
            ) + (
                SELECT SUM(price) FROM recipeingredientstbl 
                WHERE recipe_id = dailyplantbl.dinner
            ) AS total_overall_Price
        FROM dailyplantbl
        INNER JOIN recipetbl AS breakfast ON dailyplantbl.breakfast = breakfast.recipe_id
        INNER JOIN recipetbl AS lunch ON dailyplantbl.lunch = lunch.recipe_id
        INNER JOIN recipetbl AS dinner ON dailyplantbl.dinner = dinner.recipe_id
        INNER JOIN recipeingredientstbl AS breakfast_recipe_ingredients ON breakfast.recipe_id = breakfast_recipe_ingredients.recipe_id
        INNER JOIN ingredienttbl AS breakfast_ingredients ON breakfast_recipe_ingredients.ingredient_id = breakfast_ingredients.ingredient_id
        INNER JOIN recipeingredientstbl AS lunch_recipe_ingredients ON lunch.recipe_id = lunch_recipe_ingredients.recipe_id
        INNER JOIN ingredienttbl AS lunch_ingredients ON lunch_recipe_ingredients.ingredient_id = lunch_ingredients.ingredient_id
        INNER JOIN recipeingredientstbl AS dinner_recipe_ingredients ON dinner.recipe_id = dinner_recipe_ingredients.recipe_id
        INNER JOIN ingredienttbl AS dinner_ingredients ON dinner_recipe_ingredients.ingredient_id = dinner_ingredients.ingredient_id
        WHERE dailyplantbl.date BETWEEN :startOfWeek AND :endOfWeek
        AND dailyplantbl.user_id = :user_id
        GROUP BY dailyplantbl.date, dailyplantbl.breakfast, dailyplantbl.lunch, dailyplantbl.dinner
        ORDER BY dailyplantbl.date ASC;
        ";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":startOfWeek", $startOfWeek);
        $stmt->bindParam(":endOfWeek", $endOfWeek);
        $stmt->bindParam(":user_id", $user_id);

        $stmt->execute();

        $returnValue = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $conn = null;
        $stmt = null;

        return json_encode($returnValue);
    }



//     function WeeklyRecord()
// {
//     include "connection.php";

//     // Define your SQL query to fetch weekly records
//     $sql = "SELECT weeklydaily_id, week_start, week_end FROM weekly_daily_tbl ORDER BY week_start DESC";

//     try {
//         // Prepare and execute the SQL statement
//         $stmt = $conn->prepare($sql);
//         $stmt->execute();

//         // Fetch the results and return them as JSON
//         $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
//         echo json_encode($results);
//     } catch (PDOException $e) {
//         echo "Error: " . $e->getMessage();
//     }
// }


    function deleteRecord($recordId)
    {
        include "connection.php"; // Include database connection

        $sql = "DELETE FROM dailyplantbl WHERE dailyplan_id = :recordId";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":recordId", $recordId);

        $stmt->execute();
        $returnValue = $stmt->rowCount() > 0 ? 1 : 0;

        return $returnValue;
    }

    
}

$json = isset($_POST['json']) ? $_POST['json'] : "";
$operation = $_POST['operation'];

$dailymeal = new DailyMeal();
switch ($operation) {
    // case "save":
    //     echo $dailymeal->save($json);
    //     break;
    case "getRecords":
        echo $dailymeal->getRecords();
        break;
    // case "WeeklyRecord":
    //     echo $dailymeal->WeeklyRecord();
    //     break;
    case "deleteRecord":
        $recordId = isset($_POST['recordId']) ? $_POST['recordId'] : 0;
        echo $dailymeal->deleteRecord($recordId);
        break;

}
?>
