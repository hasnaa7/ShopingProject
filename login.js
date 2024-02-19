var username = document.getElementById('username').value;
var pass = document.getElementById('pass').value;



function isValidEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPassword(password) {
    var passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
    return passwordPattern.test(password);
}

function login(e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var pass = document.getElementById('pass').value;
    var storedPassword = sessionStorage.getItem(username);
    var result = document.getElementById('res');

    if (!isValidPassword(pass)) {
        result.innerHTML = 'Password must contain at least 8 characters at least one letter ';
        return;
    }

    if (storedPassword === null) {
        result.innerHTML = 'Invalid username or password';
    } else if (pass === storedPassword) {
        sessionStorage.setItem('currentUser', username);
        window.location.href = 'index.html';
    } else {
        result.innerHTML = "Wrong username or password";
    }
}


function signup(e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    var pass = document.getElementById('pass').value;
    var result = document.getElementById('res');

    var email = document.getElementById('email').value;
    if (!isValidEmail(email)) {
        result.innerHTML = 'Invalid email format';
        return;
    }

    if (!isValidPassword(pass)) {
        result.innerHTML = 'Password must contain at least 8 characters, including at least one letter and one number';
        return;
    }
    

    sessionStorage.setItem(username, pass);
    window.location.href = 'login.html';
}
var currentUser = sessionStorage.getItem('currentUser');
if (currentUser) {
    document.getElementById('greeting').innerHTML = "Hello " + currentUser;
}
var currentUser = sessionStorage.getItem('currentUser');
document.getElementById('greeting').innerHTML = "Hello " + currentUser;