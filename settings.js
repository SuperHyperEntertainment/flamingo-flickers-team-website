document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const colorBtns = document.querySelectorAll('.color-btn');

    // Toggle Light/Dark Mode
    themeToggle.addEventListener('click', () => {
        const body = document.body;
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
        } else {
            body.classList.replace('light-mode', 'dark-mode');
        }
    });

    // Update Accent Color CSS Variable
    colorBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const newColor = e.target.getAttribute('data-color');
            document.documentElement.style.setProperty('--accent', newColor);
        });
    });
});
