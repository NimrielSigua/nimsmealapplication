const getLocalServerUrlweek = async () => {
    try {
        const response = await fetch('./api/server_ip.php');
        if (!response.ok) {
            throw new Error('Failed to retrieve local server IP address');
        }

        const data = await response.json();
        const localServerIP = data.localServerIP;
        const apiPath = "/weeklymealapplication/api/dailymeal.php";
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
const getLocalServerUrlweekrecipe = async () => {
    try {
        const response = await fetch('./api/server_ip.php');
        if (!response.ok) {
            throw new Error('Failed to retrieve local server IP address');
        }

        const data = await response.json();
        const localServerIP = data.localServerIP;
        const apiPath = "/weeklymealapplication/api/weeklymealplan.php";
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
const getLocalServerUrlweekly = async () => {
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

// Function to collect form data
const collectFormData = () => {
    const startDate = document.getElementById("startDate").value;
    const lastDayOfWeek = document.getElementById("lastDayOfWeek").value;
    const user_id = document.getElementById("user_id").value

    const formData = {
        startDate: startDate,
        lastDayOfWeek: lastDayOfWeek,
        user_id: user_id,
    };

    // Loop through days and add meal data to formData
    for (let day = 0; day <= 7; day++) {
        if (day === 0) {

            document.getElementById(`breakfast${day}`).disabled = true;
            document.getElementById(`lunch${day}`).disabled = true;
            document.getElementById(`dinner${day}`).disabled = true;
        } else {
            // Handle other days normally
            formData[`breakfast${day}`] = document.getElementById(`breakfast${day}`).value;
            formData[`lunch${day}`] = document.getElementById(`lunch${day}`).value;
            formData[`dinner${day}`] = document.getElementById(`dinner${day}`).value;
        }
    }

    return formData;

};

const datePicker = document.getElementById('startDate');

const currentDate = new Date();

// Calculate the start of the current week (Sunday) based on the selected date
const startOfWeek = new Date(currentDate);
startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

// Format the start of the week as "YYYY-MM-DD"
const formattedStartOfWeek = startOfWeek.toISOString().split('T')[0];

// Set the minimum selectable date to the start of the week
datePicker.min = formattedStartOfWeek;
function calculateLastDayOfWeek() {
    const startDateInput = document.getElementById('startDate');
    const lastDayOfWeekInput = document.getElementById('lastDayOfWeek');

    // Get the selected date from the input field
    const startDateString = startDateInput.value;

    if (startDateString) {
        const startDate = new Date(startDateString);

        // Calculate the last day of the week (Sunday) based on the selected date
        const lastDayOfWeek = new Date(startDate);
        lastDayOfWeek.setDate(startDate.getDate() + (6 - startDate.getDay()));

        

        // Format the last day of the week as YYYY-MM-DD
        const formattedLastDayOfWeek = lastDayOfWeek.toISOString().split('T')[0];

        // Set the value of the last day of the week input field
        lastDayOfWeekInput.value = formattedLastDayOfWeek;
    } else {
        lastDayOfWeekInput.value = ''; // Clear the last day of the week input if no date is selected
    }
}


// Function to handle form submission
const handleSubmit = async () => {
    try {
        // Collect form data
        const json = collectFormData();

        // Create a FormData object and append JSON data
        const formData = new FormData();
        formData.append("json", JSON.stringify(json));
        formData.append("operation", "saveWeeklyPlan");

        const url = await getLocalServerUrlweekrecipe(); // Wait for the async function to complete

        // Send a POST request using Axios
        const response = await axios.post(url, formData);

        if (response.data !== "0") {
            document.getElementById("successModal").classList.remove("hidden");
        } else {
            alert("Failed to save weekly meal plan. Please try again.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred while saving the weekly meal plan. Please try again.");
    }
};


// Add a click event listener to the submit button
document.getElementById("saveWeeklyPlan").addEventListener("click", () => {
    handleSubmit();
});
document.getElementById("closeSuccessModal").addEventListener("click", () => {
    window.location.reload();
});



document.addEventListener("DOMContentLoaded", () => {
    let currentDay = 1;

    const showDay = (dayNumber) => {
        for (let day = 1; day <= 7; day++) {
            const dayElement = document.getElementById(`day${day}`);
            if (day === dayNumber) {
                dayElement.style.display = "block";
            } else {
                dayElement.style.display = "none";
            }
        }
    };

    const nextDay = () => {
        if (currentDay < 7) {
            currentDay++;
            showDay(currentDay);
        }
    };

    const previousDay = () => {
        if (currentDay > 1) {
            currentDay--;
            showDay(currentDay);
        }
    };

    document.getElementById("day2btn").addEventListener("click", nextDay);
    document.getElementById("day1btn").addEventListener("click", previousDay);
    document.getElementById("day3btn").addEventListener("click", nextDay);
    document.getElementById("day2backbtn").addEventListener("click", previousDay);
    document.getElementById("day4btn").addEventListener("click", nextDay);
    document.getElementById("day3backbtn").addEventListener("click", previousDay);
    document.getElementById("day5btn").addEventListener("click", nextDay);
    document.getElementById("day4backbtn").addEventListener("click", previousDay);
    document.getElementById("day6btn").addEventListener("click", nextDay);
    document.getElementById("day5backbtn").addEventListener("click", previousDay);
    document.getElementById("day7btn").addEventListener("click", nextDay);
    document.getElementById("day6backbtn").addEventListener("click", previousDay);

    document.getElementById("saveWeeklyPlan").addEventListener("click", saveWeeklyPlan);

    document.getElementById("closeWeeklyModal").addEventListener("click", () => {

    });

    showDay(currentDay);
});






// Function to update day name based on selected date
// function updateDayName() {
//     const dateInput = document.getElementById("date");
//     const dayInput = document.getElementById("day");

//     // Get the selected date value from the input
//     const selectedDate = new Date(dateInput.value);

//     // Array of day names
//     const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
//     const dayOfWeek = selectedDate.getDay();

//     // Set the day input field with the corresponding day name
//     dayInput.value = dayNames[dayOfWeek];
// }

// Function to save the daily meal plan
// const save = () => {
//     // Get the elements' values
//     const day = document.getElementById("day").value;
//     const date = document.getElementById("date").value;
//     const breakfast = document.getElementById("breakfast").value;
//     const lunch = document.getElementById("lunch").value;
//     const dinner = document.getElementById("dinner").value;

//     const json = {
//         day: day,
//         date: date,
//         breakfast: breakfast,
//         lunch: lunch,
//         dinner: dinner,
//     };

//     // Prepare data
//     const formData = new FormData();
//     formData.append("json", JSON.stringify(json));
//     formData.append("operation", "save");

//     // Use axios to send data to the API
//     axios({
//         url: "http://localhost/weeklymealapplication/api/dailymeal.php", // Adjust the URL
//         method: "post",
//         data: formData,
//     })
//         .then(response => {
//             if (response.data == 1) {
//                 alert("Record Successfully Saved!");
//             } else {
//                 alert("Record Not Saved!");
//             }
//         })
//         .catch(error => {
//             alert(error);
//         });
// }

document.addEventListener("DOMContentLoaded", () => {
    // Event delegation for the buttons
    document.getElementById("dailyplan").addEventListener("click", async (e) => {
        if (e.target) {
            const target = e.target;
            const recordId = target.getAttribute("data-id");

            if (target.classList.contains("guide-button")) {
                const guideContainer = document.getElementById("guideContainer_" + recordId);

                //show the guide container
                guideContainer.style.display = (guideContainer.style.display === "none" || guideContainer.style.display === "") ? "block" : "none";
            }
            if (target.classList.contains("closeGuideModalButton")) {
                const guideContainer = document.getElementById("guideContainer_" + recordId);
                guideContainer.style.display = "none";
            }
            
            if (target.classList.contains("shoppingButton")) {
                const shoppingContainer = document.getElementById("shoppingContainer_" + recordId);

                // Toggle the visibility of the shoppingContainer
                shoppingContainer.style.display = (shoppingContainer.style.display === "none" || shoppingContainer.style.display === "") ? "block" : "none";
            }
            if (target.classList.contains("closeShoppingModalButton")) {
                const shoppingContainer = document.getElementById("shoppingContainer_" + recordId);
                shoppingContainer.style.display = "none";
            }
        }
    });
})

// Function to fetch cooking instructions for a daily plan
const fetchCookingInstructionsForDailyPlan = async (dailyplanId) => {
    try {
        const url = await getLocalServerUrlweekrecipe(); // Wait for the async function to complete
        const formData = new FormData();
        formData.append("operation", "getInstructionsForDailyPlan");
        formData.append("dailyplan_id", dailyplanId);

        const response = await axios.post(url, formData); // Use the generated URL
        const cookingInstructions = response.data;
        console.log(cookingInstructions);

        return cookingInstructions;
    } catch (error) {
        console.error(error);
        return "";
    }
};


// Function to fetch Shopping List
const fetchShoppingList = async (dailyplanId) => {
    try {
        const url = await getLocalServerUrlweekrecipe(); // Wait for the async function to complete
        const formData = new FormData();
        formData.append("operation", "getIngredientslist");
        formData.append("dailyplan_id", dailyplanId);

        const response = await axios.post(url, formData); // Use the generated URL
        const shoppingList = response.data;
        console.log(shoppingList);

        return shoppingList;
    } catch (error) {
        console.error(error);
        return "";
    }
};


// Function to retrieve and display daily meal plan records
const getRecords = async () => {
    try {
        const url = await getLocalServerUrlweek(); // Wait for the async function to complete
        const formData = new FormData();
        formData.append("operation", "getRecords");
        formData.append("currentDate", new Date().toISOString().slice(0, 10)); // Pass the current date
        formData.append("user_id", sessionStorage.getItem("user_id"));

        const response = await axios({
            url: url, // Make sure `getLocalServerUrlweek` returns the correct server URL
            method: "post",
            data: formData,
        });

        if (response.data.length === 0) {
            alert("There are no records retrieved.");
            console.log(response.data);
        } else {
            displayRecords(response.data);
        }
    } catch (error) {
        alert(error);
    }
};

// Function to display daily meal plan records
const displayRecords = async (rsDaily) => {
    const dailyplan = document.getElementById("dailyplan");
    dailyplan.innerHTML = '';

    rsDaily.forEach(async (daily) => {
        const isToday = daily.date === new Date().toISOString().slice(0, 10);
        const opacityStyle = isToday ? '1' : '0.2';
        const creenSize = window.innerWidth <= 768;
        const html = `
            <div class="p-3 text-center bg-sky-300 border border-2 border-sky-400 shadow-xl rounded-lg min-w-fit">
                <h1 class="text-orange-950" id="dayName"><b>${daily.day_name.toUpperCase()}</b></h1>
                ${isToday ? '<strong class="font-bold">Today\'s Meal</strong><p>Have a good day, here\'s the meal for today</p>' : ''}
                <hr>
                <div class="w-auto flex justify-center flex-col border border-2 border-sky-400 bg-sky-100 mt-4" style="opacity: ${opacityStyle}">
                    <div class="mr-2.5">
                        <h1 class="ml-3 text-center font-bold" style="font-family: 'Bebas Neue', sans-serif;">BREAKFAST:</h1>
                        <h1 class="p-2 font-semibold text-orange-700 rounded-lg">${daily.breakfast_name}</h1>
                    </div>
                    <div class="mr-2.5">
                        <h1 class="ml-3 text-center font-bold" style="font-family: 'Bebas Neue', sans-serif;">LUNCH:</h1>
                        <h1 class="p-2 font-semibold text-orange-700 rounded-lg">${daily.lunch_name}</h1>
                    </div>
                    <div class="mr-2.5">
                        <h1 class="ml-3 text-center font-bold" style="font-family: 'Bebas Neue', sans-serif;">DINNER:</h1>
                        <h1 class="p-2 font-semibold text-orange-700 rounded-lg">${daily.dinner_name}</h1>
                    </div>
                </div>
                ${isToday ? `<button class="mt-2 px-4 py-2 bg-green-500 m-3 hover:bg-green-600 text-white rounded guide-button" data-id="${daily.dailyplan_id}">Guide</button><button class="mt-2 m-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shoppingButton" data-id="${daily.dailyplan_id}">Shopping list</button>` : ''}
                <button class="mt-2 px-4 py-2 bg-red-500 m-3 hover:bg-red-600 text-white rounded delete-button" data-id="${daily.dailyplan_id}">Delete</button>
            </div>
            ${window.innerWidth <= 768?`
            <div class="fixed inset-0 z-50 bg-black bg-opacity-50" id="guideContainer_${daily.dailyplan_id}" style="display: none;">
            <div class="justify-center h-screen flex items-center content-center">
                <div id="cookinstruct" class="w-fit bg-sky-200  rounded-lg border border-1 w-[20rem] border-sky-500">
                    <div class="bg-sky-500 text-lg text-sky-50 p-3">
                        <h1><b>COOKING INSTRUCTION</b></h1>
                    </div>
                    <hr>
                    <div class="flex gap-3 p-3 overflow-hidden overflow-scroll w-[20rem]" id="cooking_instruction">
                        <div>
                            <h3><b>${daily.breakfast_name}:</b></h3>
                            <textarea readonly rows="10" cols="30" class=" rounded-lg text-center cooking-instructions">${daily.breakfast_instructions}</textarea>
                        </div>
                        <div>
                            <h3><b>${daily.lunch_name}</b></h3>
                            <textarea readonly rows="10" cols="30" class="rounded-lg text-center cooking-instructions">${daily.lunch_instructions}</textarea>
                        </div>
                        <div>
                            <h3><b>${daily.dinner_name}:</b></h3>
                            <textarea readonly rows="10" cols="30" class=" rounded-lg text-center cooking-instructions">${daily.dinner_instructions}</textarea>
                        </div>
                    </div>
                    <div class="bg-sky-500 p-3 flex justify-end">
                        <button class="text-xl bg-slate-500 hover:bg-red-600 font-simebold p-2 rounded-lg text-white closeGuideModalButton" data-id="${daily.dailyplan_id}">Close</button>
                    </div>
                </div>
                </div>
            </div>
            `: `<div class="fixed inset-0 z-50 bg-black bg-opacity-50" id="guideContainer_${daily.dailyplan_id}" style="display: none;">
            <div id="cookinstruct" class="w-fit bg-sky-200 mt-[14rem] ml-[25rem] rounded-lg border border-1 border-sky-500 overflow-hidden">
                <div class="bg-sky-500 text-lg text-sky-50 p-3">
                    <h1><b>COOKING INSTRUCTION</b></h1>
                </div>
                <hr>
                <div class="flex gap-3 p-3" id="cooking_instruction">
                    <div>
                        <h3 class="uppercase"><b>${daily.breakfast_name}:</b></h3>
                        <textarea readonly rows="10" cols="30" class=" rounded-lg text-center cooking-instructions">${daily.breakfast_instructions}</textarea>
                    </div>
                    <div>
                        <h3 class="uppercase"><b>${daily.lunch_name}</b></h3>
                        <textarea readonly rows="10" cols="30" class="rounded-lg text-center cooking-instructions">${daily.lunch_instructions}</textarea>
                    </div>
                    <div>
                        <h3 class="uppercase"><b>${daily.dinner_name}:</b></h3>
                        <textarea readonly rows="10" cols="30" class=" rounded-lg text-center cooking-instructions">${daily.dinner_instructions}</textarea>
                    </div>
                </div>
                <div class="bg-sky-500 p-3 flex justify-end">
                    <button class="text-xl bg-slate-500 hover:bg-red-600 font-simebold p-2 rounded-lg text-white closeGuideModalButton" data-id="${daily.dailyplan_id}">Close</button>
                </div>
            </div>
        </div>`}
        ${window.innerWidth <= 768?`
            <div class="fixed inset-0 z-50 bg-black bg-opacity-50 containershop hidden" id="shoppingContainer_${daily.dailyplan_id}">
            <div class="justify-center h-screen flex items-center content-center">   
            <div class="w-[20rem] min-w-[20rem] bg-sky-200 rounded-lg border border-1 border-sky-500 overflow-hidden">
                    <div class="flex justify-end content-end">
                    <button class="text-xl mt-[-6px] font-simebold fixed ml-auto text-slate-600 hover:text-slate-700 closeShoppingModalButton" data-id="${daily.dailyplan_id}">×</button>
                    </div>
                    <div class="bg-sky-500 text-lg text-sky-50 p-3">
                        <h1><b>SHOPPING LIST</b></h1>
                    </div>
                    <div class="p-3" id="Shopping_list">
                        <h3 class="uppercase"><b>${daily.breakfast_name}:</b></h3>
                        <p>${daily.breakfast_ingredients}</p>
                        <h3 class="uppercase"><b>${daily.lunch_name}:</b></h3>
                        <p>${daily.lunch_ingredients}</p>
                        <h3 class="uppercase"><b>${daily.dinner_name}:</b></h3>
                        <p>${daily.dinner_ingredients}</p>
                        <h1 class="mt-7 font-semibold uppercase">the total Price is: <b>₱</b><span class="font-bold">${daily.total_overall_Price}</span></h1>
                    </div>
                </div>
                </div>
            </div>`:` <div class="fixed inset-0 z-50 bg-black bg-opacity-50 containershop hidden" id="shoppingContainer_${daily.dailyplan_id}">
            <div class="w-[27rem] min-w-[27rem] bg-sky-200 mt-[14rem] ml-[39rem] rounded-lg border border-1 border-sky-500 overflow-hidden">
                <button class="text-2xl mt-[-6px] font-simebold fixed ml-[12rem] text-slate-600 hover:text-slate-700 closeShoppingModalButton" data-id="${daily.dailyplan_id}">×</button>
                <div class="bg-sky-500 text-lg text-sky-50 p-3">
                    <h1><b>SHOPPING LIST</b></h1>
                </div>
                <div class="p-3" id="Shopping_list">
                    <h3 class="uppercase"><b>${daily.breakfast_name}:</b></h3>
                    <p>${daily.breakfast_ingredients}</p>
                    <h3 class="uppercase"><b>${daily.lunch_name}:</b></h3>
                    <p>${daily.lunch_ingredients}</p>
                    <h3 class="uppercase"><b>${daily.dinner_name}:</b></h3>
                    <p>${daily.dinner_ingredients}</p>
                    <h1 class="mt-7 font-semibold uppercase">the total Price is: <b>₱</b><span class="font-bold">${daily.total_overall_Price}</span></h1>
                </div>
            </div>
        </div>`}
        `;
        dailyplan.innerHTML += html;


        // Add event listener for the delete button
        const deleteButton = document.querySelector(`.delete-button[data-id="${daily.dailyplan_id}"]`);
        deleteButton.addEventListener("click", () => {
            const recordId = deleteButton.getAttribute("data-id");
            deleteRecord(recordId);
        });
    });
};

getRecords();



// Function to delete a daily meal plan record
const deleteRecord = (recordId) => {
    const formData = new FormData();
    formData.append("operation", "deleteRecord");
    formData.append("recordId", recordId);

    getLocalServerUrlweek() // Fetch the server URL
        .then((url) => {
            axios({
                url: url, // Use the dynamically generated URL
                method: "post",
                data: formData,
            })
                .then((response) => {
                    alert("Record Deleted!");
                    getRecords();
                })
                .catch((error) => {
                    alert(error);
                });
        })
        .catch((error) => {
            alert(error);
        });
};



// const customSelects = document.querySelectorAll(".custom-select");

// customSelects.forEach(select => {
//     const selectElement = select.querySelector("select");

//     // Use Axios to make the GET request
//     axios.get("http://localhost/weeklymealapplication/api/recipe.php")
//         .then(response => {
//             const data = response.data;

//             // Create an empty option as the default option
//             const defaultOption = document.createElement("option");
//             defaultOption.textContent = "Select Recipe";
//             defaultOption.value = "";
//             selectElement.appendChild(defaultOption);

//             // Populate options from data
//             data.forEach(recipe => {
//                 const option = document.createElement("option");
//                 option.textContent = recipe.recipe_name;
//                 option.value = recipe.recipe_id;
//                 selectElement.appendChild(option);
//             });
//         })
//         .catch(error => {
//             console.error(error);
//         });
// });




document.addEventListener("DOMContentLoaded", function () {
    const customSelects = document.querySelectorAll('.custom-select');

   async function populateOptions(selectElement) {
        const url = await getLocalServerUrlweekly();
        if (!url) {
            console.error("No URL available.");
            return;
        }
        const formData = new FormData();
        formData.append("operation", "getRecords");

        try {
            const response = await axios.post(url, formData);
            const data = response.data;
                data.forEach(function (record) {
                    const option = document.createElement("option");
                    option.textContent = record.recipe_name;
                    option.value = record.recipe_id;
                    option.dataset.patientId = record.patient_id;
                    selectElement.appendChild(option);
                });
            } catch (error) {
                console.error(error);
            }
    }

    customSelects.forEach(function (select) {
        populateOptions(select.querySelector('select'));
    });
});
