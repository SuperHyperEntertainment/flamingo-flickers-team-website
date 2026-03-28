window.renderDashboard = function(loggedInUsername) {
    // 1. Filter "My Assignments"
    const myAssignmentsList = document.getElementById('my-assignments-list');
    myAssignmentsList.innerHTML = ''; 
    
    // Find assignments where the assignee matches the logged-in user
    const myTasks = ASSIGNMENTS.filter(task => task.assignee === loggedInUsername);
    
    if (myTasks.length === 0) {
        myAssignmentsList.innerHTML = '<li><span style="color: var(--text-muted);">No active assignments! Take a breather. ☕</span></li>';
    } else {
        myTasks.forEach(task => {
            myAssignmentsList.innerHTML += `
                <li style="display: flex; flex-direction: column; align-items: flex-start; gap: 4px;">
                    <div style="display: flex; justify-content: space-between; width: 100%;">
                        <strong>${task.title}</strong>
                        <span class="due-date" style="color: #f43f5e; font-size: 0.8rem; font-weight: 600;">Due: ${task.dueDate}</span>
                    </div>
                    <span style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">
                        ${task.description}
                    </span>
                </li>`;
        });
    }

    // 2. Render Fake Activity Feed
    const activityFeed = document.getElementById('activity-feed');
    activityFeed.innerHTML = '';
    
    const activities = [
        "Director approved SCN-003",
        "Sam uploaded SCN-002_v04.blend",
        "Jordan started rendering SCN-001",
        "Farm node 4 restarted successfully"
    ];
    
    activities.forEach(act => {
        activityFeed.innerHTML += `<li>${act}</li>`;
    });
};
