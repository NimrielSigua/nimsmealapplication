// ...

// Vaccine Select 
// const customSelects = document.querySelectorAll(".custom-select");

// customSelects.forEach(select => {
//     const selectElement = select.querySelector("select");

//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", "getrecipe.php", true);
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             const data = JSON.parse(xhr.responseText);

//             // Create an empty option as the default option
//             const defaultOption = document.createElement("option");
//             defaultOption.textContent = "Select Recipe";
//             defaultOption.value = ""; 
//             selectElement.appendChild(defaultOption);

//             // Populate options from data
//             data.forEach(recipe => {
//                 const option = document.createElement("option");
//                 option.textContent = recipe.recipe_name; // Use recipe_name as the text content
//                 option.value = recipe.recipe_id; // Use recipe_id as the value
//                 selectElement.appendChild(option);
//             });
//         }
//     };
//     xhr.send();
// });

// ...
