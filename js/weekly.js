// const getRecords = () => {
//     const formData = new FormData();
//     formData.append("operation", "WeeklyRecord");

//     axios({
//         url: "http://localhost/weeklymealapplication/api/weeklymealplan.php",
//         method: "post",
//         data: formData,
//     })
//         .then((response) => {
//             if (response.data.length === 0) {
//                 alert("There are no records retrieved.");
//             } else {
//                 displayRecords(response.data);
//             }
//         })
//         .catch((error) => {
//             alert(error);
//         });
// };

// const displayRecords = (rsWeekly) => {
//     const weekBtn = document.getElementById("weekBtn");
//     let html = '';

//     rsWeekly.forEach((weekly) => {
//         html += `
//         <div class="p-3 text-center bg-sky-300 border border-2 border-sky-400 shadow-xl rounded-lg min-w-fit">
//             <button>${weekly.week_start} - ${weekly.week_end}</button>
//         </div>
//         `;
//     });

//     weekBtn.innerHTML = html;
// };

// getRecords();
