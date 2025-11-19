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


document.addEventListener('DOMContentLoaded', function() {
    // Check if the contact form exists on the page
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); // Stop the default form submission (the one that takes you to the Formspree page)

            const statusElement = document.createElement('div');
            statusElement.textContent = 'Sending message...';
            statusElement.style.color = 'var(--primary-color)';
            form.append(statusElement);

            // Get the data from the form
            const formData = new FormData(form);
            const formURL = form.getAttribute('action');

            try {
                // Submit the data asynchronously to Formspree
                const response = await fetch(formURL, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // If submission is successful, redirect to your custom thank you page
                    window.location.href = 'thankyou.html'; 
                } else {
                    // Handle submission errors
                    statusElement.textContent = 'Oops! There was an issue submitting your form.';
                    statusElement.style.color = 'red';
                }
            } catch (error) {
                // Handle network errors
                statusElement.textContent = 'Network error. Please try again later.';
                statusElement.style.color = 'red';
            }
        });
    }
    
    // (Ensure your existing hamburger menu JS logic is still here)
    // ...
});

