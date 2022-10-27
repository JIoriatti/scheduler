
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
        //Data attribute will be used for the isPastHour function
        schedRow.setAttribute("data-hour", i+7);
        schedRow.setAttribute("class", "row");
        scheduleContainer.appendChild(schedRow);
    };
    const currentTime = moment().hour();
    console.log(currentTime);
    const schedRow = document.querySelectorAll(".row");
    console.log($('.row').data().hour);
    //YES THIS WORKED!
    for(let i=0; i<13; i++){
        dataNum = $('.row').data().hour;
        console.log(dataNum);
        if(currentTime>dataNum){
            schedRow[i].classList.add("past");
            console.log("past");
        };
        if(currentTime===dataNum){
            schedRow[i].classList.add("present");            console.log("present");
        };
        if(currentTime<dataNum){
            schedRow[i].classList.add("future");
            console.log("future");
        };
    };

    buttonEl.setAttribute("disabled","disabled");
    buttonEl.style.pointerEvents = "none"
    buttonEl.style.filter = "grayscale(100%)";
    const resetButton = document.createElement("button");
    resetButton.setAttribute("class", "reset");
    resetButton.textContent = "RESET";
    headerEl.appendChild(resetButton);
    const htmlEl = document.querySelector("html");
    htmlEl.style.scrollBehavior="smooth";
    
    const resetButtonEl = document.querySelector(".reset");
//Creating a function to reset the state of the webpage if the user decides to clear/start over.
//May add in local storage to create a revert/history button.
    function reset(){
        for(let i=0; i<=12;i++){
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


