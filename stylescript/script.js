var currentURL = window.location.href;

var sidemenuLinks = document.querySelectorAll('.navigation a');

for (var i = 0; i < sidemenuLinks.length; i++) {
  var link = sidemenuLinks[i];

  if (link.href === currentURL) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
}

document.addEventListener("DOMContentLoaded", () => {
    setEventlistener();
});

const setEventlistener = () => {
    document.getElementById("weeklymeal").addEventListener("click", () => {
        WeeklyMeal();
    });
    // document.getElementById("addweeklyplan").addEventListener("click", () => {
    //     AddDialyPlan();
    //     alert('click')
    // });
    document.getElementById("closeModal").addEventListener("click", (event) => { 
        event.preventDefault();
        Close();
    });
}


const WeeklyMeal = () => {
    document.getElementById("weeklymealSection").style.display = 'block';
        document.getElementById('backopacity').style.background = '#000000'
        document.getElementById('backopacity').style.pointerEvents = 'none'
        document.getElementById('backopacity').style.opacity = '0.5'
        document.getElementById('opacolor').style.opacity = '0.5'
        document.getElementById('opacolor').style.background = '#000000'
    
}

    // document.getElementById("closeweeklymealSection").addEventListener("click", (event) => { 
    //     event.preventDefault();
    //     weeklymealSection();
    // });

const weeklymealSection = () => {
    document.getElementById("weeklymealSection").style.display = 'none';
    document.getElementById('backopacity').style.background = 'none'
    document.getElementById('backopacity').style.pointerEvents = 'auto'
    document.getElementById('backopacity').style.opacity = '1'
    document.getElementById('opacolor').style.opacity = '1'
    document.getElementById('opacolor').style.background = 'none'
}


// document.getElementById("addweeklyBtn").addEventListener("click", (event) => { 
//     event.preventDefault();
//     weeklymeal();
// });

// const weeklymeal = () => {
//     document.getElementById("addweeklyModal").style.display = 'block';
// }

// document.getElementById("CloseaddweeklyModal").addEventListener("click", (event) => { 
//     event.preventDefault();
//     Closeweeklymeal();
// });

// const Closeweeklymeal = () => {
//     document.getElementById("addweeklyModal").style.display = 'none';
// }

// JavaScript to open and close the modal
// const AddDialyPlan = () => {
//     document.getElementById("myModal").style.display = 'block';
//     document.getElementById('backopacity').style.background = '#000000'
//     document.getElementById('backopacity').style.pointerEvents = 'none'
//     document.getElementById('backopacity').style.opacity = '0.5'
//     document.getElementById('opacolor').style.opacity = '0.5'
//     document.getElementById('opacolor').style.background = '#000000'
// }
// const Close = () => {
//     document.getElementById("myModal").style.display = 'none';
//     document.getElementById('backopacity').style.background = 'none'
//     document.getElementById('backopacity').style.pointerEvents = 'auto'
//     document.getElementById('backopacity').style.opacity = '1'
//     document.getElementById('opacolor').style.opacity = '1'
//     document.getElementById('opacolor').style.background = 'none'
// }

//weekly meal add modal
// document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("DOMContentLoaded", function () {
        const addweeklyBtn = document.getElementById("addweeklyBtn");
        const Modalweekly = document.getElementById("myWeeklyModal");
        // const formrecfinding = document.getElementById("form-recfinding");

        addweeklyBtn.addEventListener("click", function (event) {
            event.preventDefault();
            toggleWeeklyAdd();
        });

        document.getElementById("closeWeeklyModal").addEventListener("click", function (event) {
            event.preventDefault();
            toggleWeeklyAdd();
        });

        function toggleWeeklyAdd() {
            if (Modalweekly.style.display === "none" || Modalweekly.style.display === "") {
                Modalweekly.style.display = "block";

                addweeklyBtn.classList.add("active");
            } else {
                Modalweekly.style.display = "none";
                addweeklyBtn.classList.remove("active");
            }
        }
    });


    
    
    
    