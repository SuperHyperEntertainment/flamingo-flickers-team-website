const SB_URL = "https://mrzrpfqwwmtvokwgrsmp.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yenJwZnF3d210dm9rd2dyc21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MjU4NzAsImV4cCI6MjA5MDMwMTg3MH0.7elt-Cn3Y0ZwoiXICkQQ_bJNhS3GWIXKGMxzy4t_whc";
const supabase = window.supabase.createClient(SB_URL, SB_KEY);

let myProfile = null;
const deviceId = getDeviceId();

// --- AUTH LOGIC ---

function getDeviceId() {
    let id = localStorage.getItem('ani_device_id');
    if (!id) {
        id = 'dev-' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('ani_device_id', id);
    }
    return id;
}

document.getElementById('btn-login').onclick = async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-pass').value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) return showError(error.message);

    // Fetch Profile
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();

    // Check Device Lock
    if (profile.device_id && profile.device_id !== deviceId) {
        await supabase.auth.signOut();
        return showError("Device mismatch. One account per device policy.");
    }

    if (!profile.device_id) {
        await supabase.from('profiles').update({ device_id: deviceId }).eq('id', data.user.id);
    }

    myProfile = profile;
    initApp();
};

function initApp() {
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('main-app').classList.add('active');
    
    document.getElementById('display-name').innerText = myProfile.username;
    document.getElementById('user-avatar').src = myProfile.pfp_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + myProfile.username;
    
    if (myProfile.role === 'admin') document.getElementById('admin-link').style.display = 'block';

    loadData();
    subscribeRealtime();
}

// --- NAVIGATION ---

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
}

// --- DATA & REALTIME ---

async function loadData() {
    // Load Announcement
    const { data } = await supabase.from('settings').select('announcement').eq('id', 1).single();
    if (data) document.getElementById('announcement-text').innerText = data.announcement;

    // Load Chat
    const { data: msgs } = await supabase.from('messages').select('*').order('created_at', { ascending: true }).limit(50);
    msgs.forEach(addMessageToUI);
}

function subscribeRealtime() {
    supabase.channel('room1')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        addMessageToUI(payload.new);
    })
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'settings' }, payload => {
        document.getElementById('announcement-text').innerText = payload.new.announcement;
    })
    .subscribe();
}

// --- CHAT & ACTIONS ---

document.getElementById('btn-send').onclick = async () => {
    const input = document.getElementById('msg-input');
    if (!input.value) return;

    await supabase.from('messages').insert([{ 
        sender_name: myProfile.username, 
        content: input.value 
    }]);
    input.value = "";
};

function addMessageToUI(msg) {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `msg ${msg.sender_name === myProfile.username ? 'me' : ''}`;
    div.innerHTML = `<strong>${msg.sender_name}</strong><br>${msg.content}`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

// --- SETTINGS & ADMIN ---

function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

document.getElementById('btn-update-pfp').onclick = async () => {
    const url = document.getElementById('new-pfp').value;
    await supabase.from('profiles').update({ pfp_url: url }).eq('id', myProfile.id);
    document.getElementById('user-avatar').src = url;
    alert("Profile updated!");
};

document.getElementById('btn-push-admin').onclick = async () => {
    const text = document.getElementById('new-announcement').value;
    await supabase.from('settings').update({ announcement: text }).eq('id', 1);
    alert("Global announcement updated!");
};

document.getElementById('btn-logout').onclick = () => location.reload();

function showError(msg) {
    document.getElementById('auth-error').innerText = msg;
}
