document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingScreen);

    function showLoading() {
        loadingScreen.classList.add('active');
    }

    function hideLoading() {
        loadingScreen.classList.remove('active');
    }

    // Add loading screen for all navigation events
    window.addEventListener('beforeunload', function() {
        showLoading();
    });

    // Add loading screen when clicking on navigation links
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('#')) {
                e.preventDefault();
                showLoading();
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });

    // Hide loading screen when page loads
    window.addEventListener('load', hideLoading);
});