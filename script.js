document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const toggleButton = document.querySelector('.menu-toggle');

    toggleButton.addEventListener('click', () => {
        // 1. Toggle the 'active' class on the navigation element
        nav.classList.toggle('active');

        // 2. Accessibility: toggle aria-expanded
        const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true' || false;
        toggleButton.setAttribute('aria-expanded', !isExpanded);
        
        // 3. Simple hack to help the CSS selector for the 'X'
        // We temporarily add the 'active' class to the button when the nav is active
        toggleButton.classList.toggle('active', nav.classList.contains('active'));
    });
    
    // (Existing link closing functionality remains the same)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                nav.classList.remove('active');
                toggleButton.setAttribute('aria-expanded', false);
                toggleButton.classList.remove('active'); // Keep in sync
            }
        });
    });
});
