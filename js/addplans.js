// const save = () => {
//     const startDate = document.getElementById("startDate").value;
//     const endDate = document.getElementById("lastDayOfWeek").value;

//     const ingredients = [];
//     const ingredientElements = document.querySelectorAll(".ingredient");

//     ingredientElements.forEach((ingredientElement) => {
//         const daydate = ingredientElement.querySelector(".daydate").value;
//         const dayname = ingredientElement.querySelector(".dayname").value;
//         const breakfast = ingredientElement.querySelector(".breakfast").value;
//         const lunch = ingredientElement.querySelector(".lunch").value;
//         const dinner = ingredientElement.querySelector(".dinner").value;
//         ingredients.push({ daydate, dayname, breakfast, lunch, dinner });
//     });

//     const json = {
//         startDate,
//         endDate,
//         ingredients
//     };

//     axios({
//         url: 'http://localhost/weeklymealapplication/api/mealplans.php',
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json' // Set Content-Type header for JSON data
//         },
//         data: {
//             json: JSON.stringify(json) // Convert JSON object to JSON string
//         }
//     })
//     .then(response => {
//         if (response.data.status === "success") {
//             alert('Recipe saved successfully!');
//         } else {
//             alert('Error saving recipe');
//         }
//     })
//     .catch(error => {
//         alert('An error occurred while saving the recipe.');
//         console.error(error);
//     });
// };

// document.getElementById("saveDeilyMeal").addEventListener("click", save);

