// --- ADMIN CONTROL PANEL ---
const MASTER_KEY = "AdminRoot2026"; // Your secret master key

const USERS = [
    { name: "Felix", pass: "FlexAnim8", role: "Lead" },
    { name: "Sarah", pass: "LightPass99", role: "Artist" },
    { name: "Dave", pass: "RigidBody123", role: "Rigging" }
    // Add more here: { name: "Name", pass: "Password", role: "Role" }
];

const SCENES = [
    { id: "01", name: "The Opening Shot", status: "Done", assignee: "Felix" },
    { id: "02", name: "Character Walk Cycle", status: "In Progress", assignee: "Dave" },
    { id: "03", name: "Forest Lighting pass", status: "Pending", assignee: "Sarah" }
];

// --- LOGIN LOGIC ---
function checkLogin() {
    const userVal = document.getElementById('username-input').value.trim();
    const passVal = document.getElementById('pass-input').value;
    const errorMsg = document.getElementById('error');

    // 1. Check Master Key first
    if (passVal === MASTER_KEY) {
        return loginSuccess(userVal || "Admin");
    }

    // 2. Check individual user passwords
    const foundUser = USERS.find(u => u.name.toLowerCase() === userVal.toLowerCase());

    if (foundUser && passVal === foundUser.pass) {
        return loginSuccess(foundUser.name);
    } else {
        errorMsg.style.display = 'block';
        errorMsg.innerText = "Invalid Name or Password";
    }
}

function loginSuccess(name) {
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('main-app').classList.add('active');
    document.getElementById('welcome-msg').innerText = "Hi, " + name + "!";
    loadScenes();
}

// --- SCENE TRACKER LOGIC ---
function loadScenes() {
    const container = document.getElementById('scene-list');
    container.innerHTML = ""; // Clear list
    
    SCENES.forEach(scene => {
        const row = document.createElement('div');
        row.className = 'scene-item animate-slide';
        row.innerHTML = `
            <span><b>#${scene.id}</b> ${scene.name}</span>
            <span class="badge ${scene.status.replace(" ", "-").toLowerCase()}">${scene.status}</span>
            <span style="opacity:0.6; font-size: 13px;">Assignee: ${scene.assignee}</span>
        `;
        container.appendChild(row);
    });
}

// --- PAGE NAVIGATION ---
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
}

// --- CUSTOMIZATION ---
function toggleTheme() { document.body.classList.toggle('light-mode'); }
function changeAccent(colorCode) { document.documentElement.style.setProperty('--accent', colorCode); }
