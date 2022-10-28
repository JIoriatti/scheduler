
const scheduleContainer = document.querySelector(".container");
const dateContainer = document.getElementById("currentDay");
const headerEl = document.querySelector("header");
const jumbotronEl = document.querySelector(".jumbotron");
//Function to display the date
function currentDate(){
    dateContainer.textContent = moment();
};
//Calling the currentDate function to run on startup
currentDate();
//Creating an interval with delay of 1 second to update the date/time (live seconds).
setInterval(currentDate, 1000);
//Changing the display of the date to 32px and bold.
dateContainer.style.fontSize = "32px";
dateContainer.style.fontWeight = "bold";

//Declaring a function to utilize the jquery fadeIn() and fadeOut() methods to manipulate elements come one screen when scrolling.
function fadeElements(){

};


const buttonEl = document.getElementById("btn");

function generateSchedule(){
    const currentHour = moment().hour();
    console.log(currentHour);
    for(let i=0; i<=15;i++){
        const schedRow = document.createElement('div');
        if((i+5)<=12){
            schedRow.textContent = (i+5) + " am";
        }
        if((i+5)===12){
            schedRow.textContent = (i+5) + " am (Noon)";
        }
        if((i+5)>12){
            schedRow.textContent = (i-3) + " pm";
        }
        //Giving each div row a data attribute refering to which hour it blongs to.
        schedRow.setAttribute("data-hour", i+5);
        schedRow.setAttribute("class", "row");
        scheduleContainer.appendChild(schedRow);
    };
    //Reassigning the shedRow variable to target all newly generated div rows.
    schedRow = document.querySelectorAll(".row");
    console.log($('.row').data().hour);
    //YES THIS WORKED! Had a lot of trouble trying to access the data- attribute, but noticed in objects of the schedRow array that the key:pair nomenclature was dataset:hour, not data:hour!
    console.log(schedRow);
    // debugger;
    for(let i=0; i<16; i++){
        console.log(schedRow[i].dataset.hour);
        if(currentHour>schedRow[i].dataset.hour){
            schedRow[i].classList.add("past");
            console.log("past");
        };
        if(currentHour==schedRow[i].dataset.hour){
            schedRow[i].classList.add("present");
            console.log("present");
        };
        if(currentHour<schedRow[i].dataset.hour){
            schedRow[i].classList.add("future");
            console.log("future");
        };
    };
    //Creating other schedule elements, the text fields and the save buttons.
    for(let i=0; i<=15;i++){
        const saveButton = document.createElement('button');
        schedRow[i].appendChild(saveButton);
        saveButton.textContent = "Save";
        saveButton.setAttribute("class", "saveBtn")
    };


    buttonEl.setAttribute("disabled","disabled");
    buttonEl.style.pointerEvents = "none"
    buttonEl.style.filter = "grayscale(100%)";
    const resetButton = document.createElement("button");
    resetButton.setAttribute("class", "reset");
    resetButton.textContent = "RESET";
    headerEl.appendChild(resetButton);
    const htmlEl = document.querySelector("html");
    //Adding a smooth scroll property to the entire HTML, planning on having the window scroll down to the schedule when the GET STARTED button is clicked.
    htmlEl.style.scrollBehavior="smooth";
    
    const resetButtonEl = document.querySelector(".reset");
//Creating a function to reset the state of the webpage if the user decides to clear/start over.
//May add in local storage to create a revert/history button.
    function reset(){
        for(let i=0; i<=15;i++){
            schedRow[i].remove();
        };
        resetButtonEl.remove();
        buttonEl.removeAttribute("disabled", "disabled");
        buttonEl.style.filter = "none";
        buttonEl.style.pointerEvents = "initial";
    };
    resetButtonEl.addEventListener("click", reset);
};


buttonEl.addEventListener("click", generateSchedule);


