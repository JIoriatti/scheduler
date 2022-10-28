
const scheduleContainer = document.querySelector(".container");
const dateContainer = document.getElementById("currentDay");
const headerEl = document.querySelector("header");
const jumbotronEl = document.querySelector(".jumbotron");
const buttonEl = document.getElementById("btn");
const barEl = document.querySelector(".bar");
const htmlEl = document.querySelector("html");
//Adding a smooth scroll property to the entire HTML, planning on having the window scroll down to the schedule when the GET STARTED button is clicked.
htmlEl.style.scrollBehavior="smooth";

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

//Declaring a function to populate an array of interval times (in milliseconds) to be used in the fade-in function to assign progressively longer fade-in times for each row generated.
function setFadeInterval(){
    const intervalArray =[];
    for(let i=0; i<=15;i++){
        intervalArray[i] = ((i+1)*3000)/16;
        console.log(intervalArray[i]);
    }
    
    return intervalArray;
};
var fadeIntArray = setFadeInterval();
console.log(fadeIntArray);
//Using jQuery click method on the GET STARTED button to utilize the jquery fadeIn() method to fade the schedule rows in when the GET STARTED button is clicked.
//Assigning each row it's own fade-in interval time by using the coresponding index of fadeIntArray.
$(document).ready(function(){
    $("#btn").click(function(){
        for(let i=0; i<=15; i++){
            $(schedRow[i]).fadeIn(fadeIntArray[i]);
            console.log(fadeIntArray[i]);
        }
    });
    //Added in a scroll-to 470 pixels down functionality on-click.
    $("#btn").click(function(){
        window.scroll(0, 470);
    })
});

$(document).ready(function(){
    $("#btn").click(function(){
        barEl.classList.remove("inactive");
    });
});


function generateSchedule(){
    const currentHour = moment().hour();
    console.log(currentHour);
    for(let i=0; i<=15;i++){
        const schedRow = document.createElement('div');
        const timeDiv = document.createElement('div');
        if((i+5)<=12){
            timeDiv.textContent = (i+5) + " am";
        }
        if((i+5)===12){
            timeDiv.textContent = (i+5) + " am (Noon)";
        }
        if((i+5)>12){
            timeDiv.textContent = (i-3) + " pm";
        }
        //Giving each div row a data attribute refering to which hour it blongs to.
        schedRow.setAttribute("data-hour", i+5);
        schedRow.setAttribute("class", "row");
        schedRow.style.display = "none";
        scheduleContainer.appendChild(schedRow);
        schedRow.appendChild(timeDiv);
        timeDiv.setAttribute("class", "timeSlot");
    };
    //Reassigning the shedRow variable to target all newly generated div rows.
    schedRow = document.querySelectorAll(".row");
    //YES THIS WORKED! Had a lot of trouble trying to access the data- attribute, but noticed in objects of the schedRow array that the key:pair nomenclature was dataset:hour, not data:hour!
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
    //Creating and appending save buttons and textareas per row.
    for(let i=0; i<=15;i++){
        const saveButton = document.createElement('button');
        const textField = document.createElement('textarea');
        schedRow[i].appendChild(textField);
        schedRow[i].appendChild(saveButton);
        saveButton.textContent = "Save";
        saveButton.setAttribute("class", "saveButtons");
    };

    //Disabling GET STARTED button after being clicked.
    buttonEl.setAttribute("disabled","disabled");
    buttonEl.style.pointerEvents = "none"
    buttonEl.style.filter = "grayscale(100%)";
    buttonEl.style.opacity= "70%";
    
    //Creating a reset after the GET STARTED button is clicked, will allow the user to reset all fields.
    const resetButton = document.createElement("button");
    resetButton.setAttribute("class", "reset");
    resetButton.textContent = "RESET";
    barEl.appendChild(resetButton);
    //Creating a Save All button that will store all data into local storage
    const saveAll = document.createElement("button");
    saveAll.setAttribute("class", "saveAll");
    saveAll.textContent = "SAVE ALL";
    barEl.appendChild(saveAll);
    
    const resetButtonEl = document.querySelector(".reset");
    const saveAllEl = document.querySelector(".saveAll");
//Creating a function to reset the state of the webpage if the user decides to clear/start over.
//May add in local storage to create a revert/history button.
    function reset(){
        for(let i=0; i<=15;i++){
            schedRow[i].remove();
        };
        resetButtonEl.remove();
        saveAllEl.remove();
        buttonEl.removeAttribute("disabled", "disabled");
        buttonEl.style.filter = "none";
        buttonEl.style.pointerEvents = "initial";
        window.scroll({top: 0, behavior: 'smooth'});
        barEl.classList.add("inactive")
        buttonEl.style.opacity= "100%";

    };
    resetButtonEl.addEventListener("click", reset);
};


buttonEl.addEventListener("click", generateSchedule);


