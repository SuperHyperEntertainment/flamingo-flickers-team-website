// --- ADMIN CONTROL ---
const MASTER_KEY = "AdminRoot2026"; 

const USERS = [
    { name: "Felix", pass: "Flex123" },
    { name: "Sarah", pass: "Light456" }
    // Add your team here!
];

const SCENES = [
    { id: "01", name: "Main Intro", status: "Done", user: "Felix" },
    { id: "02", name: "Walk Cycle", status: "Review", user: "Sarah" },
    { id: "03", name: "Final Render", status: "Pending", user: "Admin" }
];

// --- CORE LOGIC ---
function checkLogin() {
    const userVal = document.getElementById('username-input').value.trim();
    const passVal = document.getElementById('pass-input').value;
    const error = document.getElementById('error');

    // Check Master Key
    if (passVal === MASTER_KEY) return loginSuccess(userVal || "Admin");

    // Check User List
    const user = USERS.find(u => u.name.toLowerCase() === userVal.toLowerCase());
    if (user && passVal === user.pass) {
        loginSuccess(user.name);
    } else {
        error.style.display = 'block';
    }
}

function loginSuccess(name) {
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('main-app').classList.add('active');
    document.getElementById('welcome-msg').innerText = "Hi, " + name;
    loadScenes();
}

function showPage(pageId, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    btn.classList.add('active');
}

function loadScenes() {
    const list = document.getElementById('scene-list');
    list.innerHTML = SCENES.map(s => `
        <div class="scene-item">
            <span><b>#${s.id}</b> ${s.name}</span>
            <span style="color:var(--accent)">${s.status}</span>
            <span style="opacity:0.5">${s.user}</span>
        </div>
    `).join('');
}

function calculateRender() {
    const frames = document.getElementById('calc-frames').value;
    const sec = document.getElementById('calc-sec').value;
    const result = (frames * sec) / 60;
    document.getElementById('calc-result').innerText = `Estimated Time: ${result.toFixed(1)} minutes`;
}

function toggleTheme() { document.body.classList.toggle('light-mode'); }
function changeAccent(color) { document.documentElement.style.setProperty('--accent', color); }
