// Mobile menu toggle
const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active')
    });
}

// Dark mode theme toggle
const themeBtn = document.getElementById('theme-btn');

if(themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkmode = document.body.classList.contains('dark-mode');
        themeBtn.textContent = isDarkmode ? 'Light Mode' : 'Dark Mode';
    });
}


//Project modal for img gallery and video preview

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
const projectCards = document.querySelectorAll('.project-card[data-type]');

let currentImages = [];
let currentIndex = 0;

// Render active gallery image with wrap-around navigation buttons
function renderGalleryImage() {
    modalBody.innerHTML = `
        <button class="gallery-btn prev" aria-label="Previous image">&#10094;</button>
        <img src="${currentImages[currentIndex]}" alt="Reportage image ${currentIndex + 1}">
        <button class="gallery-btn next" aria-label="Next image">&#10095;</button>
        <div class="gallery-counter">${currentIndex + 1} / ${currentImages.length}</div>
    `;
    
    modalBody.querySelector('.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        renderGalleryImage();
    });

    modalBody.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentImages.length;
        renderGalleryImage();
    });
}
        if (modal && modalTitle && modalBody && modalClose) {
document.querySelectorAll('.project-card').forEach(card => {
        // Play silent video preview when hovering over card reset when leave
        const previewVideo = card.querySelector('video');
        if (previewVideo) {
            card.addEventListener('mouseenter', () => previewVideo.play());
            card.addEventListener('mouseleave', () => {
                previewVideo.pause();
                previewVideo.load();
        });

    }    
    // Open modal with gallery or video player
    card.addEventListener('click', () => {
        const type = card.dataset.type;
            if (!type) return;

            modalTitle.textContent = card.dataset.title || '';

            if (type === 'gallery') {
                currentImages = card.dataset.images.split(',').map(s => s.trim());
                currentIndex = 0;
                renderGalleryImage();
            } else if (type === 'video') {
                modalBody.innerHTML = `<video src="${card.dataset.src}" controls autoplay></video>`;
            }
            
            modal.showModal();
        });
    });

    // Close modal when clicking outside dialog content
    function closeModal() {
        modal.close();
        modalBody.innerHTML = '';
    }

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Enable Left and right arrow key navigation while gallery modal is open
    document.addEventListener('keydown', (e) => {
        if (!modal.open || currentImages.length === 0) return;
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % currentImages.length;
            renderGalleryImage();
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            renderGalleryImage();
        }
    });
}