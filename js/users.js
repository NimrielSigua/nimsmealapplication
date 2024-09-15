
// const setSessionToken = (token) => {
//     localStorage.setItem("sessionToken", token);
// };
// const getSessionToken = () => {
//     return localStorage.getItem("sessionToken");
// };

// const Login = () => {
//     const url = "http://localhost/weeklymealapplication/api/user.php";
//     const json = {
//         username: document.getElementById("inusername").value,
//         password: document.getElementById("inpassword").value,
//     };

//     const formData = new FormData();
//     formData.append("json", JSON.stringify(json));
//     formData.append("operation", "Login");

//     if(document.getElementById("inusername").value == "" &&
//        document.getElementById("inpassword").value == ""
//     ){
//         alert("Input Username and Password");
//         return;
//     }

//     axios({
//         url: url,
//         method: "post",
//         data: formData,
//     }).then((response) => {
//         if (response.data.user_id) {
//             // Store session token in cookies or localStorage
//             setSessionToken(response.data.token);
//             sessionStorage.setItem("fullname", returnValue.user_name);
//             sessionStorage.setItem("accId", returnValue.user_id);
//                 window.location = "index.html";    
//         } else {
//             alert("Login Failed, Wrong Username or Password");
//         }
//     });
// };













// const login = () => {
//     var url = "http://localhost/weeklymealapplication/api/user.php";

//     const username = document.getElementById("inusername").value;
//     const password = document.getElementById("inpassword").value;
//     if (username === '' || password === '') {
//       alert('Fill in both username and password fields');
//     } else {

//       const formData = new FormData();
//       formData.append("inusername", username);
//       formData.append("inpassword", password);

//       axios({
//         url: url,
//         method: "post",
//         data: formData
//       }).then(response => {
//         var returnValue = response.data;
//         console.log(returnValue); // Debugging: Check the structure of returnValue

//         if (returnValue.hasOwnProperty("error")) {
//           alert(returnValue.error); // Display the error message
//         } else {
//           console.log(returnValue.user_name);
//           sessionStorage.setItem("fullname", returnValue.family_name);
//           sessionStorage.setItem("acc_id", returnValue.user_id);
//           window.location.href = "wmp.html";
//         }
//       }).catch(error => {
//         console.error("Error:", error);
//         alert("An error occurred while making the API request.");
//       });
//     }
//   }


// your_script.js
// const login = () => {
//     var url = "http://localhost/weeklymealapplication/api/user.php";

//     const username = document.getElementById("inusername").value;
//     const password = document.getElementById("inpassword").value;
//     if (username === '' || password === '') {
//         alert('Fill in both username and password fields');
//     } else {

//         const formData = new FormData();
//         formData.append("username", username); // Match the field names with the PHP script
//         formData.append("password", password);

//         axios({
//             url: url,
//             method: "post",
//             data: formData
//         }).then(response => {
//             var returnValue = response.data;
//             console.log(returnValue); // Debugging: Check the structure of returnValue

//             if (returnValue.hasOwnProperty("error")) {
//                 alert(returnValue.error); // Display the error message
//             } else {
//                 console.log(returnValue.user_name);
//                 sessionStorage.setItem("fullname", returnValue.family_name);
//                 sessionStorage.setItem("acc_id", returnValue.user_id);
//                 window.location.href = "wmp.html";
//             }
//         }).catch(error => {
//             console.error("Error:", error);
//             alert("An error occurred while making the API request.");
//         });
//     }
// }

// // Add any additional JavaScript code as needed


// document.getElementById("btnLogin").addEventListener("click", () => { login(); });











const setEvenListeners = () => {
    document.getElementById("linkRegister").addEventListener("click", () => { register(); });
}



const getLocalServerUrlregister = async () => {
    try {
        const response = await fetch('./api/server_ip.php');
        if (!response.ok) {
            throw new Error('Failed to retrieve local server IP address');
        }

        const data = await response.json();
        const localServerIP = data.localServerIP;
        const apiPath = "/weeklymealapplication/api/user.php";
        if (localServerIP)
            return `http://${localServerIP}${apiPath}`;
    } catch (error) {
        console.error(error);
        return '';
    }
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("linkRegister").addEventListener("click", () => { register(); });
    const register = () => {
        document.getElementById("blankModalTitle").innerText = "Register";
        document.getElementById("blankModalMainDiv").innerText = "";
        document.getElementById("blankModalMainDiv2").innerText = "";
        document.getElementById("blankModalFooterDiv").innerText = "";

        var myHtml = `

    <label for="date" class="form-label mt-2 hidden">Registration date</label>
    <input type="date" id="date" class=" hidden form-control form-control-sm">

    <label for="familyname" class="form-label mt-2">Family Name</label>
    <input type="text" id="familyname" class="form-control form-control-sm">

    <label for="upusername" class="form-label mt-2">Username</label>
    <input type="text" id="upusername" class="form-control form-control-sm">

    <label for="uppassword" class="form-label mt-2">Password</label>
    <input type="password" id="uppassword" class="form-control form-control-sm">

    <label for="status" class="form-label hidden mt-2">Status</label>
    <select id="status" class="form-select hidden form-select-sm">
    <option value="" disabled selected>Select status</option>
    <option value="parent">Parent</option>
    <option value="child">Child</option>
    </select>

    <button id="registerBtn" class="bg-sky-800 text-white hover:bg-sky-900 p-1 mt-3 rounded-md w-300">Register</button>
    `;
        document.getElementById("blankModalMainDiv").innerHTML = myHtml;

        const btnRegister = document.getElementById("registerBtn");
        document.getElementById("registerBtn").addEventListener("click", () => {
            saveRegistration();
        })
        // btnRegister.classList.add("bg-sky-800","", "hover:bg-sky-900", "mt-3", "p-1", "rounded-md", "cursor-pointer", "w-300");
        // btnRegister.onclick = () => {
        //     saveRegistration();
        // };

        document.getElementById("blankModalMainDiv2").append(btnRegister);

        const myModal = new bootstrap.Modal(document.getElementById("blankModal"), {
            keyboard: true,
            backdrop: "static",
        });
        myModal.show();
    };

    const saveRegistration = async () => {
        const url = await getLocalServerUrlregister();//"http://localhost/weeklymealapplication/api/user.php";
        const currentDate = new Date().toISOString().slice(0, 10);
        const json = {
            familyname: document.getElementById("familyname").value,
            username: document.getElementById("upusername").value,
            password: document.getElementById("uppassword").value,
            //status: document.getElementById("status").value,
            date: currentDate
        };

        const formData = new FormData();
        formData.append("json", JSON.stringify(json));
        formData.append("operation", "Register");

        if (
            document.getElementById("familyname").value == "" &&
            document.getElementById("upusername").value == "" &&
            document.getElementById("uppassword").value == ""
        ) {
            alert("Input All Values");
            return;
        }

        axios({
            url: url,
            method: "post",
            data: formData,
        })
            .then((response) => {
                if (response.data === 1) {
                    alert("Successfully Registered");
                    const myModal = bootstrap.Modal.getInstance(
                        document.getElementById("blankModal")
                    );
                    myModal.hide();
                } else {
                    alert("Error: " + response.data);
                }
            })
            .catch((error) => {
                console.error("An error occurred while registering:", error);
            });
    };
});

setEvenListeners();