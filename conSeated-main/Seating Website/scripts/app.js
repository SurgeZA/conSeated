// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAezAyzM1KmI62Z8EOyuuI06AFJdpWA-Io",
    authDomain: "conseated-form.firebaseapp.com",
    projectId: "conseated-form",
    storageBucket: "conseated-form.appspot.com",
    messagingSenderId: "94120370760",
    appId: "1:94120370760:web:f59945b10d540c006e2e7d"
};

// Initialize firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore()

// Data collection

const db = firestore.collection("formData")

// Get Submit Form
let submitButton = document.getElementById('submit')

// Create event Listener to allow form submit
submitButton.addEventListener("click", (e) => {
    e.preventDefault()

    // get form value
    let firstName = document.getElementById('firstName').value
    let lastName = document.getElementById('lastName').value
    let vaccineNumber = document.getElementById('vaccineNumber').value
    let email = document.getElementById('email').value
    let area_code = document.getElementById('area_code').value
    let phone = document.getElementById('phone').value
    let status = document.getElementById('status').value

    //form validation


    //save form to firebase
    db.doc().set({
        firstName: firstName,
        lastname: lastName,
        vaccineNumber: vaccineNumber,
        email: email,
        area_code: area_code,
        phone: phone,

        status: status
    }).then(() => {
        console.log("Data Saved")
    }).catch((error) => {
        console.log(error)
    })

    //alert
    alert("Your Form Has been Submitted Successfully")
})