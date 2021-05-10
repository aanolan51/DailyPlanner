//Set global variable to be used:
var currentDay;
var now = moment(); //Load in the full moment function
var hour = now.format("HH00"); //Add zeros to the end
var hourThirty = now.format("HH30");
var hourMinutes = now.format("HHmm"); //Use capital H in order to get into a 24 hour format
var tdID; //The id for each TD element in the html
var userInput = JSON.parse(localStorage.getItem("userInput")) || []; //Initilize an empty array to store input or take in values from local storage
var submitButton = $("#submitButton");
var eventText;
var startTime;
var endTime;
var ID;
var eventStart;
var clearButton = $("#clearButton");

//Use the moment function to create the current day and current time text content for the heading:
currentDay = setInterval(function () {
    $("#currentDay").text(now.format("dddd, MMMM Do YYYY"));
    $("#currentTime").text(now.format("HH:mm"));
  }, 1000);


//For loop to interate through each TD element by their specific ID, compare that ID value to the current 
//time, and add a class based on the comparison. Commented out all test console.logs.
for(i=0; i<24; i++){
  //Get the ID of each individual <td> element that has the class .rows:
  tdID = $(".rows")[i].id;
  //console.log(hourMinutes);
  //console.log("___below is TD:")
  //console.log(tdID);

  if (tdID == hour || tdID == hourThirty) {
    //console.log("Working");
    //console.log('TD of current selection');
    //console.log(tdID); 
    $('#' + tdID).addClass('present');
  } 

  if(tdID > hourMinutes){
    //console.log("add future class here")
    $('#' + tdID).addClass('future');
  }
  //Past condition is just part of the default class of rows on each TD element.
}


//Create the button clicks that will store user input from modal:
submitButton.on('click', function(){
  startTime = $("#startTimes").val().trim();
  endTime = $("#endTimes").val().trim();
  eventText = $("#eventText").val().trim();

  //console.log(eventText);
  //console.log(startTime);
  //console.log(endTime);

  //Push the variables to an array:
  userInput.push({start: startTime, end: endTime, text: eventText});

  //Set array into local storage:
  window.localStorage.setItem("userInput", JSON.stringify(userInput));

  //Original way to use local storage, but not saving when page refreshes:
  //Set to local storage with the key and value pair of the startTime variable and the eventText variable:
  //window.localStorage.setItem(startTime, eventText);
  //Push to an empty array userInput as an object with the following: {start: startTime variable, text: eventText variable}.
  //userInput.push({start: startTime, end: endTime, text: localStorage.getItem(startTime) });
  //console.log(userInput);
  //Array is updating with each submission, but not staying in local storage? Does the array need to somehow 
  //be updated outside the button click function?

  //For loop to ensure that new user data is being populated immediately without needing to perform a page reload to view:
  for(i=0; i<userInput.length; i++){
    eventStart = userInput[i].start;
    
     for(j=0; j<24; j++){
      ID = $(".rows")[j].id;      
      //console.log(eventStart);

      //if statement to now compare each of the 24 td elements to the one user input and see which one matches:
      if(eventStart == ID){
       //console.log("getting here!");
       $("#" + ID).text("TIME: " + userInput[i].start + " to " + userInput[i].end +"\nDESCRIPTION: " + userInput[i].text);
      }  
    }
  }

  //reset the modal form at the very end:
  $("#newEventForm").trigger('reset');
});

//FOR LOOP TO PUSH FROM ARRAY / LOCAL STORAGE TO THE TABLE IS OUTSIDE THE CLICK FUNCTION IN ORDER TO POPULATE ON PAGE LOAD!
//Push the text from the array to the corresponding <td> element matching the startTime.
//first for loop is for the user input that is being received from the modal. The nested for loop is to compare each td element 
//to the user input to see which one matches.
for(i=0; i<userInput.length; i++){
  eventStart = userInput[i].start;
  
   for(j=0; j<24; j++){
    ID = $(".rows")[j].id;      
    //console.log(eventStart);

    //if statement to now compare each of the 24 td elements to the one user input and see which one matches:
    if(eventStart == ID){
     //console.log("getting here!");
     $("#" + ID).text("TIME: " + userInput[i].start + " to " + userInput[i].end +"\nDESCRIPTION: " + userInput[i].text);
    }  
  }
}

//Clear the local storage and auto reload the page to reset the schedule:
clearButton.on('click', function(){
  window.localStorage.clear();
  location.reload(); 
});
