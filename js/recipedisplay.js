const getLocalServerUrldrecipe = async () => {
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

const getRecords = async () => {
    const url = await getLocalServerUrldrecipe(); // Correct function name
    const formData = new FormData();
    formData.append("operation", "getRecords");

    axios({
        url: url,
        method: "post",
        data: formData
    })
    .then(response => {
        if (response.data.length === 0) {
            alert("There are no records retrieved.");
        } else {
            displayRecords(response.data);
        }
    })
    .catch(error => {
        alert(error);
    });
}


const displayRecords = (rsRecipe) => {
    const recipeTable = document.getElementById("recipeTable");
    var html = `
    <table class="w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
        <tr class="sticky">
            <th scope="col" class="sticky top-0 px-6 py-3 text-left text-xs font-medium bg-gray-50 text-gray-500 uppercase tracking-wider">
                Recipes List
            </th>
        </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
    `;

    rsRecipe.forEach(recipe => {
        html += `
        <tr>
            <td class=" whitespace-nowrap hover:bg-sky-100">
                <button class="p-3 w-full whitespace-nowrap hover:bg-sky-100" id="recipeButton-${recipe.recipe_id}">
                    ${recipe.recipe_name}
                </button>
            </td>
        </tr>
        `;
    });

    recipeTable.innerHTML = html;

    // Attach click event listeners to buttons
    rsRecipe.forEach(recipe => {
        const recipeId = recipe.recipe_id;
        const button = document.getElementById(`recipeButton-${recipeId}`);
        
        button.addEventListener("click", () => {
            showRecipeDetails(recipeId, rsRecipe);
        });
    });
    
    // Function to display recipe details and open edit modal
    function showRecipeDetails(recipeId, rsRecipe) {
        const recipeTableAll = document.getElementById("recipeTableall");
        const recipe = rsRecipe.find(r => r.recipe_id === recipeId);
    
        if (recipe) {
            const recipeDetailsHtml = `
            <h1 class="text-center font-bold text-3xl uppercase" style="font-family: 'Caveat', cursive;
            ">${recipe.recipe_name}</h1>
            ${window.innerWidth <= 768?`
            <div class="h-[30rem]">
            <button class="p-2 bg-blue-500 w-20 text-white rounded mt-5  hover:bg-blue-600 edit-recipe-button-${recipe.recipe_id}">
                EDIT
            </button>
                <div class="flex justify-center content-center">
                <div class="flex flex-col justify-center content-center mt-5 gap-4">
                    <div class="w-[18rem] overflow-hidden bg-sky-400 rounded-lg p-2">
                        <h1 class="font-[500] uppercase" style="font-family: 'Francois One', sans-serif;">Description</h1>
                        <hr>
                        <textarea class="text-scroll-thin text-left font-semibold border-none h-full w-full" style="font-family: 'IBM Plex Serif', serif; background-color: transparent; scrollbar-width: thin; text-align: left; line-height: 1;" readonly>
                        ${recipe.recipe_description}
                    </textarea>                
                    </div>
            
                    <div class="w-[18rem] overflow-hidden h-[15rem] bg-sky-400 rounded-lg pb-2 p-2">
                        <h1 class="font-[500] uppercase"  style="font-family: 'Francois One', sans-serif;">Instruction</h1>
                        <hr>
                        <textarea class="text-scroll-thin font-semibold border-none h-full w-full"  style="font-family: 'IBM Plex Serif', serif; background-color: transparent; scrollbar-width: thin;" readonly>
                            ${recipe.cooking_instructions}
                        </textarea>
                    </div>
            
                    <div class="w-[18rem] bg-sky-400 rounded-lg p-2">
                        <h1 class="font-[500] uppercase"  style="font-family: 'Francois One', sans-serif;">Preparation Time</h1>
                        <hr>
                        <div class="font-semibold"  style="font-family: 'IBM Plex Serif', serif;">
                            ${recipe.prep_time}
                        </div>
                    </div>
            
                    <div class="w-[18rem] bg-sky-400 rounded-lg p-2">
                        <h1 class="font-[500] uppercase"  style="font-family: 'Francois One', sans-serif;">Cooking Time</h1>
                        <hr>
                        <div class="font-semibold"  style="font-family: 'IBM Plex Serif', serif;">
                            ${recipe.cooking_time}
                        </div>
                    </div>
                </div>
                </div>
                    <div class="w-full mt-5 bg-sky-400 rounded-lg p-2">
                        <h2 class="font-[500] uppercase"  style="font-family: 'Francois One', sans-serif;">Ingredients</h2>
                        <hr>
                            <ul style="font-family: 'IBM Plex Serif', serif; font-weight:700;">
                                ${recipe.ingredients.map(ingredient => `
                                    <li>${ingredient.ingredient_name} - <b> Quantity:</b> ${ingredient.quantity}, <b>Price: </b><b>₱</b>${ingredient.price}</li>
                                `).join('')}
                            </ul>
                    </div>
            </div>
            `: `
            <div class="h-[30rem]">
                <div class="flex justify-center mt-5 gap-4">
                    <div class="w-[18rem] overflow-hidden bg-sky-400 rounded-lg p-2">
                        <h1 class="font-[500] uppercase" style="font-family: 'Francois One', sans-serif;">Description</h1>
                        <hr>
                        <textarea class="text-scroll-thin text-left font-semibold border-none h-full w-full" style="font-family: 'IBM Plex Serif', serif; background-color: transparent; scrollbar-width: thin; text-align: left; line-height: 1;" readonly>
                        ${recipe.recipe_description}
                    </textarea>                
                    </div>
            
                    <div class="w-[18rem] overflow-hidden h-[15rem] bg-sky-400 rounded-lg pb-2 p-2">
                        <h1 class="font-[500] uppercase"  style="font-family: 'Francois One', sans-serif;">Instruction</h1>
                        <hr>
                        <textarea class="text-scroll-thin font-semibold border-none h-full w-full"  style="font-family: 'IBM Plex Serif', serif; background-color: transparent; scrollbar-width: thin;" readonly>
                            ${recipe.cooking_instructions}
                        </textarea>
                    </div>
            
                    <div class="w-[18rem] bg-sky-400 rounded-lg p-2">
                        <h1 class="font-[500] uppercase"  style="font-family: 'Francois One', sans-serif;">Preparation Time</h1>
                        <hr>
                        <div class="font-semibold"  style="font-family: 'IBM Plex Serif', serif;">
                            ${recipe.prep_time}
                        </div>
                    </div>
            
                    <div class="w-[18rem] bg-sky-400 rounded-lg p-2">
                        <h1 class="font-[500] uppercase"  style="font-family: 'Francois One', sans-serif;">Cooking Time</h1>
                        <hr>
                        <div class="font-semibold"  style="font-family: 'IBM Plex Serif', serif;">
                            ${recipe.cooking_time}
                        </div>
                    </div>
                </div>
                    <div class="w-full mt-5 bg-sky-400 rounded-lg p-2">
                        <h2 class="font-[500] uppercase"  style="font-family: 'Francois One', sans-serif;">Ingredients</h2>
                        <hr>
                            <ul style="font-family: 'IBM Plex Serif', serif; font-weight:700;">
                                ${recipe.ingredients.map(ingredient => `
                                    <li>${ingredient.ingredient_name} - <b> Quantity:</b> ${ingredient.quantity}, <b>Price: </b><b>₱</b>${ingredient.price}</li>
                                `).join('')}
                            </ul>
                    </div>
            </div>
            <button class="p-2 bg-blue-500 w-20 text-white rounded mt-5  hover:bg-blue-600 edit-recipe-button-${recipe.recipe_id}">
                EDIT
            </button>`}
            `;
    
            // Display the recipe details in the designated container
            recipeTableAll.innerHTML = recipeDetailsHtml;
    
            // Attach an event listener to the "Edit" button inside the displayed details
            const editButton = document.querySelector(`.edit-recipe-button-${recipe.recipe_id}`);
            editButton.addEventListener("click", () => {
                openEditModal(recipeId, rsRecipe);
            });
        }
    }
}    


// Call getRecords to load initial data
getRecords();

function openEditModal(recipeId, rsRecipe) {
    const editRecipeModal = document.getElementById("editRecipeModal");
    const recipe = rsRecipe.find(r => r.recipe_id === recipeId);

    if (recipe) {
        const editRecipeId = document.getElementById("editRecipeId");
        const editRecipeNameInput = document.getElementById("editRecipeName");
        const editDescriptionInput = document.getElementById("editDescription");
        const editCookingInstructionsInput = document.getElementById("editCookingInstructions");
        const editPrepTimeInput = document.getElementById("editPrepTime");
        const editCookingTimeInput = document.getElementById("editCookingTime");
        const editIngredientsContainer = document.getElementById("editIngredientsContainer"); 

        // Populate input fields with recipe data
        editRecipeId.value = recipe.recipe_id;
        editRecipeNameInput.value = recipe.recipe_name;
        editDescriptionInput.value = recipe.recipe_description;
        editCookingInstructionsInput.value = recipe.cooking_instructions;
        editPrepTimeInput.value = recipe.prep_time;
        editCookingTimeInput.value = recipe.cooking_time;

        // Clear previous ingredients
        editIngredientsContainer.innerHTML = "";

        // Populate ingredients
        recipe.ingredients.forEach((ingredient, index) => {
            const ingredientInput = document.createElement("div");
            ingredientInput.className = "ingredientedit";

            ingredientInput.innerHTML = `
            <div class="flex">
                <input type="text" id=editIngredientId-${index}" name="editIngredientId-${index}" required class="hidden border border-sky-300 mt-1 p-2 border rounded" value="${ingredient.ingredient_id}">
                
                <label for="editIngredient${index}">Ingredient:</label>
                <input type="text" id="editIngredient${index}" name="editIngredients-${index}" required class="border border-sky-300 mt-1 p-2 border rounded" value="${ingredient.ingredient_name}">
                
                <label for="editQuantity${index}">Quantity:</label>
                <input type="text" id="editQuantity${index}" name="editQuantities-${index}" class="border border-sky-300 mt-1 p-2 border w-14 rounded ingredient-quantity" required value="${ingredient.quantity}">
                
                <label for="editPrice${index}">Price:</label>
                <input type="text" id="editPrice${index}" name="editPrice-${index}" class="border border-sky-300  mt-1 p-2 border rounded w-14 ingredient-price" required value="${ingredient.price}">
                <button type="button" class="mt-2 font-semibold text-stone-500 hover:scale-75 hover:text-orange-800 w-10 rounded deleteEditIngredient">X</button>
            </div>
                `;

            editIngredientsContainer.appendChild(ingredientInput);
        });

        // Display the modal by removing the "hidden" class
        editRecipeModal.classList.remove("hidden");
    }
}

