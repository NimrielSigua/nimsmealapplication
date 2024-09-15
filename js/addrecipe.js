const getLocalServerUrlrecipe = async () => {
    try {
        const response = await fetch('./api/server_ip.php');
        if (!response.ok) {
            throw new Error('Failed to retrieve local server IP address');
        }

        const data = await response.json();
        const localServerIP = data.localServerIP;
        const apiPath = "/weeklymealapplication/api/recipe.php";
        if (localServerIP) {
            return `http://${localServerIP}${apiPath}`;
        } else {
            throw new Error('Local server IP not available');
        }
    } catch (error) {
        console.error(error);
        return ''; // Return a default value in case of an error
    }
}

const save = async () => {
    const url = await getLocalServerUrlrecipe();
    const recipeName = document.getElementById("recipeName").value;
    const description = document.getElementById("description").value;
    const cookingInstructions = document.getElementById("cookingInstructions").value;
    const prepTime = document.getElementById("prepTime").value;
    const cookingTime = document.getElementById("cookingTime").value;

    const validationErrors = [];

    if (!recipeName || !description || !cookingInstructions || prepTime < 0 || cookingTime < 0) {
        validationErrors.push('Please fill in all fields and ensure prep time and cooking time are non-negative.');
    }

    const ingredients = [];
    const ingredientElements = document.querySelectorAll(".ingredient");

    ingredientElements.forEach((ingredientElement) => {
        const ingredientName = ingredientElement.querySelector("input[name='ingredients']").value;
        const quantity = ingredientElement.querySelector(".ingredient-quantity").value;
        const price = ingredientElement.querySelector(".ingredient-price").value;

        if (!ingredientName || quantity === "" || quantity < 0 || price === "" || price < 0) {
            validationErrors.push('Please fill in all ingredient fields and ensure quantity and price are non-negative.');
        }

        ingredients.push({ ingredientName, quantity, price });
    });

    if (validationErrors.length > 0) {
        // Display all validation errors
        alert(validationErrors.join('\n'));
        return;
    }

    const json = {
        recipeName,
        description,
        cookingInstructions,
        prepTime,
        cookingTime,
        ingredients
    };

    const formData = new FormData();
    formData.append('operation', 'save');
    formData.append('json', JSON.stringify(json));

    axios({
        url: url,
        method: 'post',
        data: formData
    })
        .then(response => {
            if (response.data == 1) {
                alert('Successfully added');
            } else {
                alert('Error saving recipe');
            }
        })
        .catch(error => {
            alert('An error occurred while saving the recipe.');
            console.error(error);
        });
};


// Attach the save function to the "Save" button click event
document.getElementById("savetwo").addEventListener("click", save);

// document.getElementById("closeSuccessModal").addEventListener("click", () => {
//     window.location.reload();
// });



//Edit Recipe
async function updateRecipe() {
    // Retrieve form data
    const url = getLocalServerUrlrecipe();
    const recipeId = document.getElementById("editRecipeId").value;
    const recipeName = document.getElementById("editRecipeName").value;
    const description = document.getElementById("editDescription").value;
    const cookingInstructions = document.getElementById("editCookingInstructions").value;
    const prepTime = parseFloat(document.getElementById("editPrepTime").value);
    const cookingTime = parseFloat(document.getElementById("editCookingTime").value);

    // Validate input fields for blank values and negative numbers
    if (!recipeName || !description || !cookingInstructions || isNaN(prepTime) || isNaN(cookingTime) || prepTime < 0 || cookingTime < 0) {
        alert('Please fill in all fields and ensure prep time and cooking time are non-negative.');
        return;
    }

    const ingredients = [];
    const ingredientElements = document.querySelectorAll(".ingredientedit");

    ingredientElements.forEach((ingredientElement, index) => {
        const ingredientId = ingredientElement.querySelector(`input[name='editIngredientId-${index}']`).value;
        const ingredientName = ingredientElement.querySelector(`input[name='editIngredients-${index}']`).value;
        const quantity = parseFloat(ingredientElement.querySelector(`input[name='editQuantities-${index}']`).value);
        const price = parseFloat(ingredientElement.querySelector(`input[name='editPrice-${index}']`).value);

        // Validate ingredient fields for blank values and negative numbers
        if (!ingredientName || isNaN(quantity) || isNaN(price) || quantity < 0 || price < 0) {
            alert('Please fill in all ingredient fields and ensure quantity and price are non-negative.');
            return;
        }

        ingredients.push({ ingredientId, ingredientName, quantity, price });
    });

    const updatedRecipe = {
        recipeId: recipeId,
        editRecipeName: recipeName,
        editDescription: description,
        editCookingInstructions: cookingInstructions,
        editPrepTime: prepTime,
        editCookingTime: cookingTime,
        editIngredients: ingredients,
    };

    const formData = new FormData();
    formData.append('operation', 'update');
    formData.append('json', JSON.stringify(updatedRecipe));

    axios({
        url: url,
        method: 'post',
        data: formData,
    })
        .then((response) => {
            if (response.data === 1) {
                alert('Recipe updated successfully.');
                window.location.href = "http://localhost/weeklymealapplication/recipe.html";
            } else {
                alert('Error updating recipe.');
            }
        })
        .catch((error) => {
            // Handle error
            alert('An error occurred while updating the recipe.');
            console.error(error);
        });
}

document.getElementById("editSave").addEventListener("click", updateRecipe);

document.getElementById("closeSuccessModal").addEventListener("click", () => {
    window.location.href = "http://localhost/weeklymealapplication/recipe.html";
});
