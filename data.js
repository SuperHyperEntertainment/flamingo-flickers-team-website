// Central Data Configuration

const USERS = [
    { username: 'director', password: 'password123', name: 'Alex Vance', role: 'Project Director' },
    { username: 'animator1', password: 'renderpass', name: 'Sam Miller', role: 'Lead Animator' },
    { username: 'lighter2', password: 'lightpass', name: 'Jordan Lee', role: 'Lighting Artist' }
];

const SCENES = [
    { id: 'SCN-001', title: 'Opening City Sweep', status: 'Rendering', assignee: 'lighter2' },
    { id: 'SCN-002', title: 'Cafe Dialogue', status: 'In Progress', assignee: 'animator1' },
    { id: 'SCN-003', title: 'Alley Chase', status: 'Review', assignee: 'director' },
    { id: 'SCN-004', title: 'Ending Credits', status: 'To Do', assignee: 'animator1' }
];
