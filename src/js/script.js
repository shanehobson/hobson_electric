//Define function to send form data to backend application
function sendData(data) {
    const XHR = new XMLHttpRequest();
    let urlEncodedData = "";
    let urlEncodedDataPairs = []; 

    // Turn the data object into an array of URL-encoded key/value pairs.
    for(let item in data) {
        urlEncodedDataPairs.push(encodeURIComponent(item) + '=' + encodeURIComponent(data[item]));
    }

    // Combine the pairs into a single string and replace all %-encoded spaces to 
    // the '+' character; matches the behaviour of browser form submissions.
    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    // Define what happens on successful data submission
    XHR.addEventListener('load', e => {
        console.log('Yeah! Data sent and response loaded.');
    });

    // Define what happens in case of error
    XHR.addEventListener('error', e => {
        alert('Oops! Something goes wrong.');
    });

    // Set up our request
    XHR.open('POST', 'https://gentle-savannah-37154.herokuapp.com/'); 

    // Add the required HTTP header for form data POST requests
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Finally, send our data.
    XHR.send(urlEncodedData);
}


//Event Listener for Form Submit
document.querySelector('.customer-contact-form').addEventListener('submit', e => {
    e.preventDefault();
    // console.log(e);
    
    //Create variables for form elements
    const nameInput = document.getElementById('form-name');
    const numberInput = document.getElementById('form-number');
    const emailInput = document.getElementById('form-email');
    const messageInput = document.getElementById('form-message');
    const submitButton = document.querySelector('.send-message-button');
    const formBody = document.getElementById('form-body');
    
    //Grab onto values of each form element
    const name = nameInput.value;
    const number = numberInput.value;
    const email = emailInput.value;
    const message = messageInput.value;

    //Insert success message in form body
    formBody.innerHTML = "<br><h4>Thank you for your message!</h4><br><h4>We'll get back to you as soon as possible. If this is an emergency, please call us at (765) 362-3756.</h4><br><br>";

    //call send data function, passing in object with form data
    sendData({
        name: name,
        number: number,
        email: email,
        message: message
    });    
});

//Handle Pop Up Contact Form on Home Page
// function handlePopUp (button) {
//     if (button) {
//         button.addEventListener('click', () => {
//             const contactForm = document.querySelector('.contact-form');
//             contactForm.classList.toggle('d-xl-block');
//             button.classList.toggle('d-xl-inline-block');
//         });
//     }
// }

// handlePopUp(document.getElementById('pop-up-opener'));




