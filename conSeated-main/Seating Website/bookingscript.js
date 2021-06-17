const container = document.querySelector(".aeroplane");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
var SeatSelect = document.querySelectorAll("#Seat");
const seatsBought = document.querySelectorAll(".seat.occupied"); //
const seatInfo = document.querySelector(".seat-info");
const toggleBtn = document.querySelectorAll(".toggleBtn");
const blur = document.querySelector(".blur");
const saleBtn = document.querySelector(".purchaseBtn");
const checkoutForm = document.querySelector(".purchase-form");
const cinemaMap = document.querySelector(".cinema");
const aeroplaneMap = document.querySelector(".aeroplane");
const theatreMap = document.querySelector(".theatre");
const Map = document.querySelector(".seating-map");
const exit1 = document.querySelector(".close.closemap");
const exit2 = document.querySelector(".close:not(.closemap)");
const bookingDates = document.querySelectorAll("#day");
var qrcode = window.qrcode;
var elementIDs = [];
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
const cover = document.querySelectorAll(".cover");
const movie = document.querySelectorAll(".movie");
const productions = document.querySelectorAll(".prod");
const check = document.querySelectorAll(".check");
const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
outputData.innerText = null;
const btnScanQR = document.getElementById("btn-scan-qr");
const btnSubmit = document.querySelector(".btnCheckout");
var covidCheckboxes = document.querySelectorAll("#test");
const movieLabel = document.querySelector(".movie-selector");
const prodLabel = document.querySelector(".prod-selector");
const btnContainer = document.querySelectorAll(".btn-container");
const timebtnGrid = document.querySelectorAll(".time-grid");
const timebtn1 = document.querySelectorAll(".time1");
const timebtn2 = document.querySelectorAll(".time2");
const timebtn3 = document.querySelectorAll(".time3");
const timebtn4 = document.querySelectorAll(".time4");
const timebtn5 = document.querySelectorAll(".time5");
const timebtn6 = document.querySelectorAll(".time6");
const flightselector= document.querySelector(".selectedFlights")
var currentTime="";
var selectedTime="";
var chosenMovie = "";
var chosenPlay = "";
var selectedFlight=""
let scanning = false;
var selectedSeatsCount = 0;
var totalPrice = 0;
const d = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var targetSVG =
  "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
var planeSVG =
  "M19.671,8.11l-2.777,2.777l-3.837-0.861c0.362-0.505,0.916-1.683,0.464-2.135c-0.518-0.517-1.979,0.278-2.305,0.604l-0.913,0.913L7.614,8.804l-2.021,2.021l2.232,1.061l-0.082,0.082l1.701,1.701l0.688-0.687l3.164,1.504L9.571,18.21H6.413l-1.137,1.138l3.6,0.948l1.83,1.83l0.947,3.598l1.137-1.137V21.43l3.725-3.725l1.504,3.164l-0.687,0.687l1.702,1.701l0.081-0.081l1.062,2.231l2.02-2.02l-0.604-2.689l0.912-0.912c0.326-0.326,1.121-1.789,0.604-2.306c-0.452-0.452-1.63,0.101-2.135,0.464l-0.861-3.838l2.777-2.777c0.947-0.947,3.599-4.862,2.62-5.839C24.533,4.512,20.618,7.163,19.671,8.11z";

var day = d.getDate();
var month = d.getMonth();
var clickCount = "";

function load() {}

flightselector.addEventListener("select",(e)=>{
   selectedFlight=flightselector.value;
})

for (let i = 0; i <  timebtn1.length; i++) {
  timebtn1[i].addEventListener("click",(e) =>{
    selectedTime=e.target.innerText;
  })

  timebtn2[i].addEventListener("click",(e) =>{
    selectedTime=e.target.innerText;
  })

  timebtn3[i].addEventListener("click",(e) =>{
    selectedTime=e.target.innerText;
  })

  timebtn4[i].addEventListener("click",(e) =>{
    selectedTime=e.target.innerText;
  })

  timebtn5[i].addEventListener("click",(e) =>{
    selectedTime=e.target.innerText;
  })

  timebtn6[i].addEventListener("click",(e) =>{
    selectedTime=e.target.innerText;
  })
}

for (let i = 0; i < movie.length; i++) {
  movie[i].addEventListener("mouseover", (e) => {
    cover[i].classList.remove("hidden");
  });

  /*prod[i].addEventListener("mouseover", (e) => {
    cover[i].classList.remove("hidden");
  });*/

  movie[i].addEventListener("click", (e) => {
    chosenMovie = movie[i].dataset.value;
    console.log(chosenMovie);
    cover[i].classList.add("hidden");
    check[i].classList.toggle("hidden");
    timebtnGrid[i].classList.add("grid");
    timebtnGrid[i].classList.remove("time-grid");
    timeButtons();
    movieLabel.innerHTML = `<h2>Movie selected: ${chosenMovie}  ${selectedTime}</h2>`;
    movieLabel.style.color = "black";
  });

  movie[i].addEventListener("mouseout", (e) => {
    cover[i].classList.add("hidden");
  });
}

function timeButtons(){
  for (let i = 0; i < timebtn1.length; i++) {
    var d = new Date();
    currentTime = d.getHours();
    console.log(currentTime);
    if (currentTime>8) {
      timebtn1[i].classList.add("hidden");
    }
    if (currentTime>12) {
      timebtn1[i].classList.add("hidden");
      timebtn2[i].classList.add("hidden");
    }
    if (currentTime>16 && currentTime<20) {
      timebtn1[i].classList.add("hidden");
      timebtn2[i].classList.add("hidden");
      timebtn3[i].classList.add("hidden");
    }
    if (currentTime>20 && currentTime<24) {
      timebtn1[i].classList.add("hidden");
      timebtn2[i].classList.add("hidden");
      timebtn3[i].classList.add("hidden");
      timebtn4[i].classList.add("hidden");
    }
    if (currentTime>4 && currentTime<8) {
      timebtn6[i].classList.add("hidden");
    } 
  }
}

for (let i = 0; i < productions.length; i++) {
  productions[i].addEventListener("mouseover", (e) => {
    cover[i + 8].classList.remove("hidden");
  });

  /*prod[i].addEventListener("mouseover", (e) => {
    cover[i].classList.remove("hidden");
  });*/

  productions[i].addEventListener("click", (e) => {
    chosenPlay = e.target.dataset.value;
    console.log(chosenPlay);
    cover[i + 8].classList.add("hidden");
    check[i + 8].classList.toggle("hidden");
    timebtnGrid[i+8].classList.add("grid");
    timebtnGrid[i+8].classList.remove("time-grid");
    timeButtons();
    prodLabel.innerHTML = `<h2>Production selected: ${chosenPlay}  ${selectedTime}</h2>`;
    prodLabel.style.color = "black";
  });

  productions[i].addEventListener("mouseout", (e) => {
    cover[i + 8].classList.add("hidden");
    timebtnGrid[i+8].classList.remove("time-grid");
    selectedTime="";
  });
}

for (let i = 0; i < bookingDates.length; i++) {
  if (day == 1) {
    bookingDates[i].innerHTML = `The ${day + i}st of ${months[month]}`;
  }
  if (day == 2) {
    bookingDates[i].innerHTML = `The ${day + i}nd of ${months[month]}`;
  }
  if (day == 3) {
    bookingDates[i].innerHTML = `The ${day + i}rd of ${months[month]}`;
  }
  if (day > 3) {
    bookingDates[i].innerHTML = `The ${day + i}th of ${months[month]}`;
  }
}

var e = document.getElementById("week");

function show() {
  var as = document.forms[0].week.value;
  var strUser = e.options[e.selectedIndex].value;
  console.log(as, strUser);
  return as, strUser;
}
e.onchange = show;
show();

populateUI();
let ticketPrice = +SeatSelect.value;
const seatForm = document.getElementsByClassName(".seatForm");

for (let i = 0; i < seatsBought.length; i++) {
  seatsBought[i].addEventListener("mouseover", (e) => {
    var seat = e.target.innerText;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var xmlDoc = this.responseXML;
        var x = xmlDoc.getElementsByTagName(seat);
        seatInfo.innerHTML = `${
          x[0].getElementsByTagName("username")[0].childNodes[0].nodeValue
        } <br/> CovidStatus: ${
          x[0].getElementsByTagName("covidStatus")[0].childNodes[0].nodeValue
        } <br/> Vaccinated: ${
          x[0].getElementsByTagName("vaxStatus")[0].childNodes[0].nodeValue
        }`;
      }
    };
    xhttp.open("GET", "database.xml", true);
    xhttp.send();
    var pos = e.target.getBoundingClientRect();
    seatInfo.classList.remove("hidden");
  });

  seatsBought[i].addEventListener("mouseout", (e) => {
    seatInfo.classList.toggle("hidden");
  });
}

function WriteToFile(passForm) {
  var fso = CreateObject("Scripting.FileSystemObject");
  var s = fso.CreateTextFile("seatList.txt", True);

  s.writeline("First Name :" + FirstName);

  s.Close();
}

for (let i = 0; i < btnContainer.length; i++) {
  btnContainer[i].addEventListener("mouseover", (e) => {
    btnContainer[i].classList.add("rotating");
  });

  btnContainer[i].addEventListener("mouseout", (e) => {
    btnContainer[i].classList.remove("rotating");
  });
}

function setSeatData(SeatIndex, SeatPrice) {
  localStorage.setItem("selectedSeatIndex", SeatIndex);
  localStorage.setItem("selectedSeatPrice", SeatPrice);
}

// Update total and count
function updateSelectedCount() {
  var selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  selectedSeatsCount = selectedSeats.length;
  totalPrice = selectedSeatsCount * ticketPrice;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
  localStorage.clear();
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedSeatIndex = localStorage.getItem("selectedSeatIndex");

  if (selectedSeatIndex !== null) {
    SeatSelect.selectedIndex = selectedSeatIndex;
  }
}

// Seat select evSeatSelectent

function occupySelected(
  selectedSeatID,
  username,
  password,
  covidStatus,
  vaxStatus,
  cardHolder,
  cardNo
) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var a, b, xmlDoc;
      xmlDoc = xml.responseXML;
      var newElement = xmlDoc.createElement(selectedSeatID);
      var newElement1 = xmlDoc.createElement("username");
      var newElement2 = xmlDoc.createElement("password");
      var newElement3 = xmlDoc.createElement("covidStatus");
      var newElement4 = xmlDoc.createElement("vaxStatus");
      var newElement5 = xmlDoc.createElement("cardholder");
      var newElement6 = xmlDoc.createElement("cardNo");
      a = xmlDoc.getElementsByTagName("theatre")[0].attributes;
      a.appendChild(newElement);
      b = xmlDoc.getElementsByTagName(selectedSeatID)[0].childNodes[0];
      b.appendChild(newElement1);
      b.appendChild(newElement2);
      b.appendChild(newElement3);
      b.appendChild(newElement4);
      b.appendChild(newElement5);
      b.appendChild(newElement6);
      b.setAttribute(0, username);
      b.setAttribute(1, password);
      b.setAttribute(2, covidStatus);
      b.setAttribute(3, vaxStatus);
      b.setAttribute(4, cardHolder);
      b.setAttribute(5, cardNo);
      console.log("XML success");
    }
  };
  xhttp.open("GET", "database.xml", true);
  xhttp.send();
}

/*for (let i = 0; i < SeatSelect.length; i++) {
  SeatSelect[i].addEventListener("click", (e) => {
    ticketPrice = +e.target.value;
    setSeatData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
  });
}*/

// Seat click event
aeroplaneMap.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    if (e.target.classList.contains("selected")) {
      for (let i = 0; i < elementIDs.length; i++) {
        if (elementIDs[i] == e.target.id) {
          elementIDs.splice(i, 1);
          console.log(elementIDs);
        }
      }
      e.target.classList.remove("selected");
    } else {
      e.target.classList.add("selected");
      elementIDs.push(e.target.id);
      console.log(elementIDs);
      ticketPrice = +e.target.dataset.value;
      console.log(e.target.dataset.value);
      setSeatData(e.target.selectedIndex, e.target.dataset.value);
      updateSelectedCount();
    }
  }
});

theatreMap.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    if (e.target.classList.contains("selected")) {
      for (let i = 0; i < elementIDs.length; i++) {
        if (elementIDs[i] == e.target.id) {
          elementIDs.splice(i, 1);
          console.log(elementIDs);
        }
      }
      e.target.classList.remove("selected");
    } else {
      e.target.classList.add("selected");
      elementIDs.push(e.target.id);
      console.log(elementIDs);
      ticketPrice = +e.target.dataset.value;
      console.log(e.target.dataset.value);
      setSeatData(e.target.selectedIndex, e.target.dataset.value);
      updateSelectedCount();
    }
  }
});

cinemaMap.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    if (e.target.classList.contains("selected")) {
      for (let i = 0; i < elementIDs.length; i++) {
        if (elementIDs[i] == e.target.id) {
          elementIDs.splice(i, 1);
          console.log(elementIDs);
        }
      }
      e.target.classList.remove("selected");
    } else {
      e.target.classList.add("selected");
      elementIDs.push(e.target.id);
      console.log(elementIDs);
      ticketPrice = +e.target.dataset.value;
      console.log(e.target.dataset.value);
      setSeatData(e.target.selectedIndex, e.target.dataset.value);
      updateSelectedCount();
    }
  }
});

function covidCheck(temp) {
  var counter = 0;
  for (let i = 0; i < covidCheckboxes.length; i++) {
    if (covidCheckboxes[i].checked == true) {
      counter = counter + 1;
    }
  }
  if (counter > 0 || temp > 37) {
    return "Postive";
  } else {
    return "Negative";
  }
}

exit1.addEventListener("click", (e) => {
  Map.classList.toggle("hidden");
  blur.classList.toggle("hidden");
  cinemaMap.classList.add("hidden");
  theatreMap.classList.add("hidden");
  aeroplaneMap.classList.add("hidden");
});

exit2.addEventListener("click", (e) => {
  checkoutForm.classList.toggle("hidden");
});

toggleBtn[0].addEventListener("click", (e) => {
  Map.classList.remove("hidden");
  Map.classList.add("animate");
  blur.classList.remove("hidden");
  cinemaMap.classList.remove("hidden");
  theatreMap.classList.add("hidden");
  aeroplaneMap.classList.add("hidden");
  document.querySelector("#selected").style.backgroundColor = "#1d7cb3";
});

toggleBtn[1].addEventListener("click", (e) => {
  Map.classList.remove("hidden");
  Map.classList.add("animate");
  blur.classList.remove("hidden");
  theatreMap.classList.remove("hidden");
  cinemaMap.classList.add("hidden");
  aeroplaneMap.classList.add("hidden");
  document.querySelector("#selected").style.backgroundColor = "#1d7cb3";
});

toggleBtn[2].addEventListener("click", (e) => {
  Map.classList.remove("hidden");
  Map.classList.add("animate");
  blur.classList.remove("hidden");
  aeroplaneMap.classList.remove("hidden");
  cinemaMap.classList.add("hidden");
  theatreMap.classList.add("hidden");
  document.querySelector("#selected").style.backgroundColor = "#1d7cb3";
});

saleBtn.addEventListener("click", (e) => {
  checkoutForm.classList.remove("hidden");
});

function Occupy() {
  var Selected = document.querySelectorAll(".seat.selected");
  for (let i = 0; i < Selected.length; i++) {
    Selected[i].classList.remove("selected");
    Selected[i].classList.toggle("occupied");
  }
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

qrcode.callback = (res) => {
  if (res) {
    outputData.innerText = res;
    scanning = false;

    video.srcObject.getTracks().forEach((track) => {
      track.stop();
    });

    qrResult.hidden = false;
    btnScanQR.hidden = false;
    canvasElement.hidden = true;
  }
};

btnScanQR.onclick = (e) => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function onSubmit(token) {
  document.getElementsByClassName("payinfoForm").submit();
}

function onClick(e) {
  e.preventDefault();
  grecaptcha.ready(function () {
    grecaptcha
      .execute("6LepATgbAAAAAETuUNdy3hhamJ47wEkLpGUYnUgI", { action: "submit" })
      .then(function (token) {
        if (token == null || token == "" || token == " ") {
          return false;
        } else {
          return true;
        }
      });
  });
}

function authBar() {
  var userName = document.querySelector("#username").value;
  document.cookie = `username=${userName}`;
  var qrBarcode = outputData.innerText;
  if (qrBarcode !== null || qrBarcode !== "") {
    if (selectedSeatsCount == 0) {
      alert("No seats selected for checkout!");
      return false;
    } else {
      alert(
        `Hello, ${userName}! Vaccination status: vaccinated! Purchased ${selectedSeatsCount} seats for ${chosenMovie}${chosenPlay}${selectedFlight} ${selectedTime} for a total of R${totalPrice} on ${show()}!`
      );
      return "Yes";
    }
  } else {
    if (selectedSeatsCount == 0) {
      alert("No seats selected for checkout!");
      return false;
    } else {
      alert(
        `Hello, ${userName}! Vaccination status: unvaccinated! Purchased ${selectedSeatsCount} seats for ${chosenMovie}${chosenPlay}${selectedFlight} ${selectedTime} for for a total of R${totalPrice} on ${show()}!`
      );
      return "No";
    }
  }
}

btnSubmit.addEventListener("click", (e) => {
  var userName = document.querySelector("#username").value;
  var userPassword = document.querySelector("#password").value;
  var cardHolder = document.querySelector("#cardHolder").value;
  var cardNumber = document.querySelector("#cardNumber").value;
  var covidTemp = document.querySelector("#temp").value;
  var Nullcount = 0;
  if (userName == null || userName == "" || userName == " ") {
    Nullcount = Nullcount + 1;
  }

  if (userPassword == null || userPassword == "" || userPassword == " ") {
    Nullcount = Nullcount + 1;
  }

  if (cardHolder == null || cardHolder == "" || cardHolder == " ") {
    Nullcount = Nullcount + 1;
  }

  if (covidTemp == null || covidTemp == "" || covidTemp == " ") {
    Nullcount = Nullcount + 1;
  }

  if (cardNumber == null || cardNumber == "" || cardNumber == " ") {
    if (cardNumber.length !== 12) {
      alert("Incorrect Card Info");
      Nullcount = Nullcount + 1;
    } else {
      Nullcount = Nullcount + 1;
    }
  } else {
    if (cardNumber.length !== 12) {
      alert("Incorrect Card Info");
      Nullcount = Nullcount + 1;
    }
  }

  if (covidCheck(covidTemp) == "Negative") {
    if (Nullcount > 0) {
      alert("Missing info");
      e.preventDefault();
    } else {
      if (authBar() == false) {
        authBar();
        e.preventDefault();
      } else {
        authBar();
        Occupy();
      }
    }
  } else {
    alert("Cannot buy tickets due to covid status!");
    e.preventDefault();
  }

});

function addElement(user, covidStatus, vaxStatus) {
  var text, parser, xmlDoc;

  text =
    "<theatre><book>" +
    "<title>Everyday Italian</title>" +
    "<author>Giada De Laurentiis</author>" +
    "<year>2005</year>" +
    "</book></theatre>";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var xmlDoc = xml.responseXML;
      var x = xmlDoc.getElementsByTagName("theatre")[0].childNodes[0];
      x.insertData(0, text);
      console.log(x.data);
    }
  };
  xhttp.open("GET", "database.xml", true);
  xhttp.send();
}

var map = AmCharts.makeChart("chartdiv", {
  type: "map",
  theme: "chalk",
  pathToImages: "https://www.amcharts.com/lib/3/images/",

  dataProvider: {
    map: "worldLow",
    linkToObject: "capeTown",
    images: [
      {
        id: "capeTown",
        color: "blue",
        svgPath: targetSVG,
        title: "Cape Town",
        latitude: -33.9249,
        longitude: 18.7166,
        scale: 1.5,
        zoomLevel: 2,
        zoomLongitude: -33.9249,
        zoomLatitude: 18.7166,

        lines: [
          {
            latitudes: [-33.9249, 50.4422],
            longitudes: [18.7166, 30.5367],
          },
          {
            latitudes: [-33.9249, 46.948],
            longitudes: [18.7166, 7.4481],
          },
          {
            latitudes: [-33.9249, 59.3328],
            longitudes: [18.7166, 18.0645],
          },
          {
            latitudes: [-33.9249, 40.4167],
            longitudes: [18.7166, -3.7033],
          },
          {
            latitudes: [-33.9249, -33.9399],
            longitudes: [18.7166, 151.1753],
          },
          {
            latitudes: [-33.9249, 22.308],
            longitudes: [18.7166, 113.9185],
          },
          {
            latitudes: [-33.9249, 44.8048],
            longitudes: [18.7166, 20.4781],
          },
          {
            latitudes: [-33.9249, 55.7558],
            longitudes: [18.7166, 37.6176],
          },
          {
            latitudes: [-33.9249, 38.7072],
            longitudes: [18.7166, -9.1355],
          },
          {
            latitudes: [-33.9249, 54.6896],
            longitudes: [18.7166, 25.2799],
          },
          {
            latitudes: [-33.9249, 40.43],
            longitudes: [18.7166, -74],
          },
          {
            latitudes: [-33.9249, 40.43],
            longitudes: [18.7166, -74.0],
          },
          {
            latitudes: [-33.9249, 25.2532],
            longitudes: [18.7166, 55.3657],
          },
          {
            latitudes: [-33.9249, 33],
            longitudes: [18.7166, -118.410042],
          },
          {
            latitudes: [-33.9249, 35.5494],
            longitudes: [18.7166, 139.7798],
          },
          {
            latitudes: [-33.9249, 48.8567],
            longitudes: [18.7166, 2.351],
          },
          {
            latitudes: [-33.9249, 50.8371],
            longitudes: [18.7166, 4.3676],
          },
          {
            latitudes: [-33.9249, 53.3441],
            longitudes: [18.7166, -6.2675],
          },
          {
            latitudes: [-33.9249, 50.0878],
            longitudes: [18.7166, 14.4205],
          },
          {
            latitudes: [-33.9249, 59.9138],
            longitudes: [18.7166, 10.7387],
          },
          {
            latitudes: [-33.9249, 28.5562],
            longitudes: [18.7166, 77.1],
          },
          {
            latitudes: [-30.1367, 30.1128],
            longitudes: [22.4781, 31.3998],
          },
          {
            latitudes: [-30.1367, 9.004],
            longitudes: [22.4781, 7.2578],
          },
          {
            latitudes: [-30.1367, -18.7994],
            longitudes: [22.4781, 47.4753],
          },
        ],

        images: [
          {
            label: "Flights from Cape Town",
            svgPath: planeSVG,
            left: 100,
            top: 45,
            labelShiftY: 5,
            color: "#FFF",
            labelColor: "#FFF",
            labelRollOverColor: "#FFF",
            labelFontSize: 20,
          },
          {
            label: "show flights from Cape Town Airpot",
            left: 106,
            top: 70,
            labelColor: "#FFF",
            labelRollOverColor: "#FFF",
            labelFontSize: 20,
            linkToObject: "vilnius",
          },
        ],
      },

      {
        id: "johannesburg",
        color: "#FFF",
        svgPath: targetSVG,
        title: "Johannesburg",
        latitude: -30.1367,
        longitude: 22.4781,
        scale: 1.5,
        zoomLevel: 2,
        zoomLongitude: -30.1367,
        zoomLatitude: 22.4781,

        lines: [
          {
            latitudes: [-30.1367, 50.4422],
            longitudes: [22.4781, 30.5367],
          },
          {
            latitudes: [-30.1367, 46.948],
            longitudes: [22.4781, 7.4481],
          },
          {
            latitudes: [-30.1367, 59.3328],
            longitudes: [22.4781, 18.0645],
          },
          {
            latitudes: [-30.1367, 40.4167],
            longitudes: [22.4781, -3.7033],
          },
          {
            latitudes: [-30.1367, -33.9399],
            longitudes: [22.4781, 151.1753],
          },
          {
            latitudes: [-30.1367, 22.308],
            longitudes: [22.4781, 113.9185],
          },
          {
            latitudes: [-30.1367, 44.8048],
            longitudes: [22.4781, 20.4781],
          },
          {
            latitudes: [-30.1367, 55.7558],
            longitudes: [22.4781, 37.6176],
          },
          {
            latitudes: [-30.1367, 38.7072],
            longitudes: [22.4781, -9.1355],
          },
          {
            latitudes: [-30.1367, 54.6896],
            longitudes: [22.4781, 25.2799],
          },
          {
            latitudes: [-30.1367, 40.43],
            longitudes: [22.4781, -74],
          },
          {
            latitudes: [-30.1367, 40.43],
            longitudes: [22.4781, -74.0],
          },
          {
            latitudes: [-30.1367, 25.2532],
            longitudes: [22.4781, 55.3657],
          },
          {
            latitudes: [-30.1367, 33],
            longitudes: [22.4781, -118.410042],
          },
          {
            latitudes: [-30.1367, 35.5494],
            longitudes: [22.4781, 139.7798],
          },
          {
            latitudes: [-30.1367, 48.8567],
            longitudes: [22.4781, 2.351],
          },
          {
            latitudes: [-30.1367, 50.8371],
            longitudes: [22.4781, 4.3676],
          },
          {
            latitudes: [-30.1367, 53.3441],
            longitudes: [22.4781, -6.2675],
          },
          {
            latitudes: [-30.1367, 50.0878],
            longitudes: [22.4781, 14.4205],
          },
          {
            latitudes: [-30.1367, 59.9138],
            longitudes: [22.4781, 10.7387],
          },
          {
            latitudes: [-30.1367, 28.5562],
            longitudes: [22.4781, 77.1],
          },
          {
            latitudes: [-30.1367, 30.1128],
            longitudes: [22.4781, 31.3998],
          },
          {
            latitudes: [-30.1367, 9.004],
            longitudes: [22.4781, 7.2578],
          },
          {
            latitudes: [-30.1367, -18.7994],
            longitudes: [22.4781, 47.4753],
          },
        ],

        images: [
          {
            label: "Flights from Vilnius",
            svgPath: planeSVG,
            left: 100,
            top: 45,
            labelShiftY: 5,
            color: "#FFF",
            labelColor: "#FFF",
            labelRollOverColor: "#FFF",
            labelFontSize: 20,
          },
          {
            label: "show flights from London",
            left: 106,
            top: 70,
            labelColor: "#FFF",
            labelRollOverColor: "#FFF",
            labelFontSize: 11,
            linkToObject: "london",
          },
        ],
      },
      {
        svgPath: targetSVG,
        title: "Brussels",
        latitude: 50.8371,
        longitude: 4.3676,
        events: {
          hit: function (ev) {
            console.log(`clicked on`);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Prague",
        latitude: 50.0878,
        longitude: 14.4205,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Athens",
        latitude: 37.9792,
        longitude: 23.7166,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Dublin",
        latitude: 53.3441,
        longitude: -6.2675,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Oslo",
        latitude: 59.9138,
        longitude: 10.7387,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Lisbon",
        latitude: 38.7072,
        longitude: -9.1355,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Moscow",
        latitude: 55.7558,
        longitude: 37.6176,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Belgrade",
        latitude: 44.8048,
        longitude: 20.4781,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Madrid",
        latitude: 40.4167,
        longitude: -3.7033,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Stockholm",
        latitude: 59.3328,
        longitude: 18.0645,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Bern",
        latitude: 46.948,
        longitude: 7.4481,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Kiev",
        latitude: 50.4422,
        longitude: 30.5367,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Paris",
        latitude: 48.8567,
        longitude: 2.351,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "New York",
        latitude: 40.43,
        longitude: -74,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Sydney",
        latitude: -33.9399,
        longitude: 151.1753,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Hong Kong",
        latitude: 22.308,
        longitude: 113.9185,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Tokyo",
        latitude: 35.5494,
        longitude: 139.7798,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Los Angeles",
        latitude: 33,
        longitude: -118.410042,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Dubai",
        latitude: 25.2532,
        longitude: 55.3657,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Delhi",
        latitude: 28.5562,
        longitude: 77.1,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Cairo",
        latitude: 30.1128,
        longitude: 31.3998,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Abuja",
        latitude: 9.004,
        longitude: 7.2578,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
      {
        svgPath: targetSVG,
        title: "Ivato",
        latitude: -18.7994,
        longitude: 47.4753,
        events: {
          hit: function (ev) {
            console.log("clicked on ", ev.target);
          },
        },
      },
    ],
  },

  areasSettings: {
    unlistedAreasColor: "#FFF",
  },

  imagesSettings: {
    color: "#FFF",
    rollOverColor: "#FFF",
    selectedColor: "#FFF",
  },

  linesSettings: {
    color: "#FFF",
    alpha: 0.4,
  },

  backgroundZoomsToTop: true,
  linesAboveImages: true,
});

updateSelectedCount();
