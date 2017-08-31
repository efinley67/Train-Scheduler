  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBL-EoJ6LZndNb2V5guZ-5qJWqvlvYW7dA",
    authDomain: "train-scheduler-f59fc.firebaseapp.com",
    databaseURL: "https://train-scheduler-f59fc.firebaseio.com",
    projectId: "train-scheduler-f59fc",
    storageBucket: "",
    messagingSenderId: "702890319362"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#add-pony-btn").on("click", function() {
  event.preventDefault();

  var ponyName = $("#pony-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstPonyTime = $("#first-time-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  var newPony = {
    name: ponyName,
    destination: destination,
    firstPony: firstPonyTime,
    frequency: frequency
  };

  database.ref().push(newPony);

  // console.log(ponyName);
  // console.log(destination);
  // console.log(firstPonyTime);
  // console.log(frequency);

  $("#pony-name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {
  // console.log(childSnapshot.val());

  var ponyName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstPonyTime = childSnapshot.val().firstPony;
  var frequency = childSnapshot.val().frequency;

  // console.log(ponyName);
  // console.log(destination);
  // console.log(firstPonyTime);
  // console.log(frequency);

  var currentTime = moment();
  var firstPony = moment(firstPonyTime, "hh:mm");
  var subtrTime = moment().diff(moment(firstPony), "minutes");
  var timeRemain = subtrTime % frequency;
  var minsAway = frequency - timeRemain;
  var nextArrival = moment().add(minsAway, "minutes");
  var nextArrivalConverted = moment(nextArrival).format("hh:mm A");



  $("#pony-table > tbody").append("<tr><td>" + ponyName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrivalConverted + "</td><td>" + minsAway + "</td></tr>");
});
