// Mark as read when clicked
document.querySelectorAll('.notif-card').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.remove('unread');
        const dot = this.querySelector('.status-dot');
        if (dot) dot.style.display = 'none';
    });
});

// Clear all notifications
document.getElementById('clearAll').addEventListener('click', function() {
    if (confirm("Clear all notifications?")) {
        document.querySelector('.content').innerHTML = `
            <div style="text-align:center; margin-top:100px; color:#999;">
                <p>No new notifications</p>
            </div>
        `;
    }
});