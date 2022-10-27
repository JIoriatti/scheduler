
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

const buttonEl = document.getElementById("btn");

function generateSchedule(){
    for(let i=0; i<=12;i++){
        const schedRow = document.createElement('div');
        if((i+7)<=12){
            schedRow.textContent = (i+7) + " am";
        }
        if((i+7)===12){
            schedRow.textContent = (i+7) + " am (noon)";
        }
        if((i+7)>12){
            schedRow.textContent = (i-5) + " pm";
        }
        schedRow.setAttribute("class", "row");
        scheduleContainer.appendChild(schedRow);
        //Couldn't get the schedule-row class styles to apply from the CSS file, so I'm applying styles within the function itself
        // schedRow.style.margin = "5em";
    };
    buttonEl.setAttribute("disabled","disabled");
    buttonEl.style.pointerEvents = "none"
    buttonEl.style.filter = "grayscale(100%)";
    const resetButton = document.createElement("button");
    resetButton.textContent = "RESET";
    headerEl.appendChild(resetButton);
    const htmlEl = document.querySelector("html");
    htmlEl.style.scrollBehavior="smooth";
};




buttonEl.addEventListener("click", generateSchedule)

