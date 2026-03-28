document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const userInp = document.getElementById('login-username');
    const passInp = document.getElementById('login-password');
    const errorMsg = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');

    loginBtn.addEventListener('click', attemptLogin);

    function attemptLogin() {
        const username = userInp.value.trim();
        const password = passInp.value.trim();

        // Check individual users
        const validUser = USERS.find(u => u.username === username && u.password === password);

        if (validUser) {
            loginSuccess(validUser.username);
        } else {
            errorMsg.textContent = "Invalid username or password.";
            errorMsg.style.display = "block";
        }
    }

    function loginSuccess(username) {
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('app-screen').classList.add('active');
        document.getElementById('user-greeting').textContent = `Hi, ${username}`;
        
        // Initialize dashboard stats based on data.js
        document.getElementById('stat-team').textContent = USERS.length;
        document.getElementById('stat-scenes').textContent = SCENES.length;
        
        // Render scenes
        if(window.renderScenes) window.renderScenes();
    }

    logoutBtn.addEventListener('click', () => {
        document.getElementById('app-screen').classList.remove('active');
        document.getElementById('login-screen').classList.add('active');
        userInp.value = '';
        passInp.value = '';
        errorMsg.style.display = "none";
    });
});
