// --- ADMIN EDIT SECTION: ADD YOUR TEAM HERE ---
const TEAM_PASS = "AniTeam2026"; // Change this to your global password

const PROFILES = [
    { name: "Felix", role: "Lead Animator" },
    { name: "Sarah", role: "Lighting Artist" },
    { name: "Dave", role: "Rigging" }
    // To add more, just copy the line above!
];

// --- LOGIN LOGIC ---
function checkLogin() {
    const userVal = document.getElementById('username-input').value;
    const passVal = document.getElementById('pass-input').value;

    if (passVal === TEAM_PASS && userVal.trim() !== "") {
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('main-app').classList.add('active');
        document.getElementById('welcome-msg').innerText = "Hi, " + userVal + "!";
    } else {
        document.getElementById('error').style.display = 'block';
    }
}

// --- PAGE NAVIGATION ---
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
}

// --- CUSTOMIZATION ---
function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

function changeAccent(colorCode) {
    document.documentElement.style.setProperty('--accent', colorCode);
}
