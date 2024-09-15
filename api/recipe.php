<?php
header("Content-Type: application/json");

class Recipes
{
    public function save($json)
    {
        include "connection.php";
        $json = json_decode($json, true);

        // Extract recipe data from JSON
        $recipeName = $json['recipeName'];
        $description = $json['description'];
        $cookingInstructions = $json['cookingInstructions'];
        $prepTime = $json['prepTime'];
        $cookingTime = $json['cookingTime'];
        $ingredients = $json['ingredients'];

        // Insert recipe data into recipetbl
        $sql = "INSERT INTO recipetbl(recipe_name, recipe_description, cooking_instructions, prep_time, cooking_time) ";
        $sql .= "VALUES(:recipeName, :description, :cookingInstructions, :prepTime, :cookingTime)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":recipeName", $recipeName);
        $stmt->bindParam(":description", $description);
        $stmt->bindParam(":cookingInstructions", $cookingInstructions);
        $stmt->bindParam(":prepTime", $prepTime);
        $stmt->bindParam(":cookingTime", $cookingTime);
        $returnValue = $stmt->execute();

        // if recipe succesfully save, then it proceed to getting the ingredients
        //kaning returnValue na variable ang akung gi butang kay mao mani sa ang variable sa execution
        if ($returnValue) {
            $recipeId = $conn->lastInsertId(); // then kuhaon nato ang katun lastInserted Id which is kaning sa first or kaning sa recipe na id

            // Loop through the ingredients and save them
            //nag gamit dayun ug loop para sa ingredients kaning "ingredients" mao ni sya ang key ug kaning "ingredient" kay ang ga hold sa atung value or placeholder
            foreach ($ingredients as $ingredient) {
                $ingredientName = $ingredient['ingredientName'];
                $price = $ingredient['price'];
                $quantity = $ingredient['quantity'];

                // e check dayun if ang kani na ingredients kay ga exist naba sa ingredientstbl
                $checkIngredientSql = "SELECT ingredient_id FROM ingredienttbl WHERE ingredient_name = :ingredientName";
                $checkIngredientStmt = $conn->prepare($checkIngredientSql);
                $checkIngredientStmt->bindParam(":ingredientName", $ingredientName);
                $checkIngredientStmt->execute();

                //nag gamit napud dayun ta ug if statement para mo handle sa condition
                // gi equal nato to 0 kung wala pa sy ang exist sa table 
                if ($checkIngredientStmt->rowCount() == 0) {
                    // kung wala pa nag exist so mao na ang time na eyang e add ang ingredients na imung gi input
                    $insertIngredientSql = "INSERT INTO ingredienttbl (ingredient_name) VALUES (:ingredientName)";
                    $insertIngredientStmt = $conn->prepare($insertIngredientSql);
                    $insertIngredientStmt->bindParam(":ingredientName", $ingredientName);
                    $insertIngredientStmt->execute();
                }

                // dri kay gi kuha na dayun ang id sa atung ingredients na atung gi add 
                $ingredientIdSql = "SELECT ingredient_id FROM ingredienttbl WHERE ingredient_name = :ingredientName";
                $ingredientIdStmt = $conn->prepare($ingredientIdSql);
                $ingredientIdStmt->bindParam(":ingredientName", $ingredientName);
                $ingredientIdStmt->execute();
                //naa na dayun tay ingredient_id 
                //mao ni sya atung tawagon napud para e insert sa next nato na table which is ang recipeingredientstbl
                $ingredientId = $ingredientIdStmt->fetch(PDO::FETCH_ASSOC)['ingredient_id'];

                // Insert recipe-ingredient association into recipeingredientstbl
                $ingredientAssociationSql = "INSERT INTO recipeingredientstbl (recipe_id, ingredient_id, price, quantity) ";
                $ingredientAssociationSql .= "VALUES (:recipeId, :ingredientId, :price, :quantity)";
                $ingredientAssociationStmt = $conn->prepare($ingredientAssociationSql);
                $ingredientAssociationStmt->bindParam(":recipeId", $recipeId);
                $ingredientAssociationStmt->bindParam(":ingredientId", $ingredientId);
                $ingredientAssociationStmt->bindParam(":price", $price);
                $ingredientAssociationStmt->bindParam(":quantity", $quantity);
                $ingredientAssociationStmt->execute();
            }
        }

        return $returnValue ? 1 : 0;
    }

    public function getRecords()
    {
        include "connection.php";

        $query = "SELECT
        recipetbl.recipe_id,
        recipetbl.recipe_name,
        recipetbl.recipe_description,
        recipetbl.cooking_instructions,
        recipetbl.prep_time,
        recipetbl.cooking_time,
        ingredienttbl.ingredient_id,
        ingredienttbl.ingredient_name,
        recipeingredientstbl.quantity,
        recipeingredientstbl.price
        FROM
        recipetbl
        INNER JOIN
        recipeingredientstbl ON recipetbl.recipe_id = recipeingredientstbl.recipe_id
        INNER JOIN
        ingredienttbl ON recipeingredientstbl.ingredient_id = ingredienttbl.ingredient_id;
        ";

        $stmt = $conn->prepare($query);
        $stmt->execute();

        // dri na part ga gamit ug while loop para mo check sa tanan na id
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            //ga gamit ta ug "$recipeId" variable para mag dala sa recipe_id nato na atung gi fetch 
            $recipeId = $row['recipe_id'];
            //nag gamit ta ug if statement para mo check if nag exist naba na nga id or wala pa
            //if wla pa naka set so dawaton niya ang new na gi input sa user pero ug naka set na iya nalang na e display 
            if (!isset($recipes[$recipeId])) {
                $recipes[$recipeId] = [
                    'recipe_id' => $recipeId,
                    'recipe_name' => $row['recipe_name'],
                    'recipe_description' => $row['recipe_description'],
                    'cooking_instructions' => $row['cooking_instructions'],
                    'prep_time' => $row['prep_time'],
                    'cooking_time' => $row['cooking_time'],
                    'ingredients' => [],
                ];
            }
            //same rana sila ani 
            if ($row['ingredient_name'] !== null) {
                $recipes[$recipeId]['ingredients'][] = [
                    'ingredient_name' => $row['ingredient_name'],
                    'quantity' => $row['quantity'],
                    'price' => $row['price'],
                ];
            }
        }

        // Encode the recipes as JSON
        echo json_encode(array_values($recipes));

            }
        
    public function getInstructionsForDailyPlan($dailyplanId)
    {
        include "connection.php"; 

        // para ni sa pag retrieve sa cooking instructions for a specific dailyplan_id
        $sql = "SELECT dailyplantbl.dailyplan_id, 
                       dailyplantbl.day_name, 
                       recipetbl.recipe_id, 
                       recipetbl.recipe_name, 
                       recipetbl.cooking_instructions
                FROM dailyplantbl
                LEFT JOIN recipetbl ON dailyplantbl.breakfast = recipetbl.recipe_id
                   OR dailyplantbl.lunch = recipetbl.recipe_id
                   OR dailyplantbl.dinner = recipetbl.recipe_id
                WHERE dailyplantbl.dailyplan_id = :dailyplanId";

        // Prepare the SQL statement
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":dailyplanId", $dailyplanId, PDO::PARAM_INT);
        $stmt->execute();

        // Fetch the cooking instructions for each recipe as an associative array
        $cookingInstructions = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Close the database connection
        $conn = null;
        $stmt = null;

        return json_encode($cookingInstructions);
    }

    public function update($json)
    {
        include "connection.php"; // Include the database connection file
    
        $json = json_decode($json, true);
    
        // Extract recipe data from JSON
        $recipeId = $json['recipeId']; 
        $editRecipeName = $json['editRecipeName'];
        $editDescription = $json['editDescription'];
        $editCookingInstructions = $json['editCookingInstructions'];
        $editPrepTime = $json['editPrepTime'];
        $editCookingTime = $json['editCookingTime'];
    
        // Update recipe data in recipetbl
        $sql = "UPDATE recipetbl SET recipe_name = :editRecipeName, recipe_description = :editDescription, ";
        $sql .= "cooking_instructions = :editCookingInstructions, prep_time = :editPrepTime, cooking_time = :editCookingTime ";
        $sql .= "WHERE recipe_id = :recipeId";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":editRecipeName", $editRecipeName);
        $stmt->bindParam(":editDescription", $editDescription);
        $stmt->bindParam(":editCookingInstructions", $editCookingInstructions);
        $stmt->bindParam(":editPrepTime", $editPrepTime);
        $stmt->bindParam(":editCookingTime", $editCookingTime);
        $stmt->bindParam(":recipeId", $recipeId);
    
        $returnValue = $stmt->execute();
    
        // Handle ingredient data updates here
        if (is_array($json['editIngredients'])) {
            foreach ($json['editIngredients'] as $editIngredient) {
                $ingredientId = $editIngredient['ingredientId']; // This is the ID of the ingredient to update
                $ingredientName = $editIngredient['ingredientName'];
                $quantity = $editIngredient['quantity'];
                $price = $editIngredient['price'];
    
                // Update ingredient data in ingredientstbl
                $ingredientSql = "UPDATE ingredienttbl SET ingredient_name = :ingredientName WHERE ingredient_id = :ingredientId";
                $ingredientStmt = $conn->prepare($ingredientSql);
                $ingredientStmt->bindParam(":ingredientName", $ingredientName);
                $ingredientStmt->bindParam(":ingredientId", $ingredientId);
                $ingredientStmt->execute();
    
                // Update recipe-ingredient association data in recipeingredientstbl
                $associationSql = "UPDATE recipeingredientstbl SET quantity = :quantity, price = :price WHERE recipe_id = :recipeId AND ingredient_id = :ingredientId";
                $associationStmt = $conn->prepare($associationSql);
                $associationStmt->bindParam(":quantity", $quantity);
                $associationStmt->bindParam(":price", $price);
                $associationStmt->bindParam(":recipeId", $recipeId);
                $associationStmt->bindParam(":ingredientId", $ingredientId);
                $associationStmt->execute();
            }
        }
    
        // Return success (1) or failure (0)
        return $returnValue ? 1 : 0;
    }
    



}

$json = isset($_POST['json']) ? $_POST['json'] : "";
$operation = $_POST['operation'];

$recipe = new Recipes();
switch ($operation) {
    case "save":
        echo $recipe->save($json);
        break;
    case "getRecords":
        echo $recipe->getRecords();
        break;
    case "getInstructionsForDailyPlan":
        // Make sure $dailyplan_id is defined and set to a valid value
        $dailyplan_id = isset($_POST['dailyplan_id']) ? $_POST['dailyplan_id'] : null;
        if ($dailyplan_id !== null) {
            echo $recipe->getInstructionsForDailyPlan($dailyplan_id);
        } else {
            echo "Daily Plan ID is missing or invalid.";
        }
        break;
        case "update":
            echo $recipe->update($json);
            break;
        
        
}
