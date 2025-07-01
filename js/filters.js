document.addEventListener('DOMContentLoaded', function() {
    // Function to reset animations (kept for potential future use)
    function resetAnimations() {
        // Get all skill items
        const skillItems = document.querySelectorAll('.skills-list li');
        
        // Reset animations for skill items
        skillItems.forEach(item => {
            item.style.animation = 'none';
            item.offsetHeight; // Force reflow
            item.style.animation = '';
        });
    }

    // Project filtering
    const projectBtns = document.querySelectorAll('.category-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    projectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            projectBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                }
            });
        });
    });
    
    // Initially show all projects
    projectItems.forEach(item => {
        item.classList.add('show');
    });
}); 