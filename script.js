document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for the scroll-down button
    document.querySelector('.scroll-down-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = document.querySelector('#importancia');
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Smooth scroll for mouse wheel
    document.addEventListener('wheel', function(e) {
        if (e.deltaY > 0) { // Scrolling down
            const currentScroll = window.scrollY;
            const windowHeight = window.innerHeight;
            const sections = document.querySelectorAll('section');
            
            for (let section of sections) {
                const sectionTop = section.offsetTop;
                if (sectionTop > currentScroll) {
                    e.preventDefault();
                    section.scrollIntoView({ behavior: 'smooth' });
                    break;
                }
            }
        }
    }, { passive: false });
});