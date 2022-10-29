
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
    //Added in a scroll-to 390 pixels down functionality on-click.
    $("#btn").click(function(){
        window.scroll(0, 390);
    })
});
//Removing the inactive class assigned to the sticky bar element when the GET STARTED button is clicked. The inactive class simply hides the sticky bar element.
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
        //Declaring local storage variable to assign the text content/value of the textareas when reloading the page.
        let textData = localStorage.getItem("row " + i);
        textField.textContent = textData;
        //Assinging data-attribute to textarea elements to be used for the individual save button function.
        textField.setAttribute("data-field", i);
        //Assinging data-attribute to individual save button elements to be used for the individual save button function.
        saveButton.setAttribute("data-save", i);
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
    
    //Creating a reset button after the GET STARTED button is clicked, will allow the user to reset all fields.
    const resetButton = document.createElement("button");
    resetButton.setAttribute("class", "reset");
    resetButton.textContent = "RESET";
    barEl.appendChild(resetButton);
    
    //Creating a Save All button that will store all data into local storage
    const saveAll = document.createElement("button");
    saveAll.setAttribute("class", "saveAll");
    saveAll.textContent = "SAVE ALL";
    barEl.appendChild(saveAll);
    
    //Creating a Clear All button that will clear the text content of the textarea elements BUT not delete local storage.
    const clearAll = document.createElement("button");
    clearAll.setAttribute("class", "clearAll");
    clearAll.textContent = "CLEAR ALL";
    barEl.appendChild(clearAll);
    
    //Targeting the Reset, Clear All and Save All buttons in order to remove them when the user wants to reset the application.
    const resetButtonEl = document.querySelector(".reset");
    const saveAllEl = document.querySelector(".saveAll");
    const clearAllEl = document.querySelector(".clearAll");
    
    //Creating a function to reset the state of the webpage if the user decides to clear/start over.
    function reset(){
        for(let i=0; i<=15;i++){
            schedRow[i].remove();
        };
        resetButtonEl.remove();
        saveAllEl.remove();
        clearAllEl.remove();
        buttonEl.removeAttribute("disabled", "disabled");
        buttonEl.style.filter = "none";
        buttonEl.style.pointerEvents = "initial";
        window.scroll({top: 0, behavior: 'smooth'});
        barEl.classList.add("inactive")
        buttonEl.style.opacity= "100%";
        //Using clear method to clear all local storage when the user wants to reset the page.
        localStorage.clear();

    };
    resetButtonEl.addEventListener("click", reset);
    
    //Declaring a function to save all text fields into local storage
    function saveAllText(){
        const textAreaEl = document.querySelectorAll("textarea");
        console.log(textAreaEl);
        //Using a for loop to set the text information of each textarea element into a local storage key:value pair.
        for(let i=0; i<=15; i++){
            localStorage.setItem("row " + i, textAreaEl[i].value);
        };
    };
    saveAllEl.addEventListener("click", saveAllText);

    //Declaring a function to clear all text fields when the user clicks on the CLEAR ALL button, but will still preserve local storage.
    function clearAllText(){
        const textAreaEl = document.querySelectorAll("textarea");
        for(let i=0; i<=15; i++){
            textAreaEl[i].value = "";
        };
    };
    clearAllEl.addEventListener("click", clearAllText);
    
    //Lastly, declaring a function to save individual rows when user clicks on Save button within a row. This one took me a while for some reason. Couldn't get the logic behind it down for a while.
    const savebuttonsEl = document.querySelectorAll(".saveButtons");
    function saveIndividual(event){
        const textAreaEl = document.querySelectorAll("textarea");
        target = event.target;
        for(let i=0; i<savebuttonsEl.length; i++){
            if(target.dataset.save == i){
                localStorage.setItem("row "+ i, textAreaEl[i].value);
            };
        };
    };
    // Using the forEach() method to add the same event listener to all individual save buttons.
    savebuttonsEl.forEach(save=>{
        save.addEventListener("click", saveIndividual);
    });    
};
buttonEl.addEventListener("click", generateSchedule);

