document.addEventListener('DOMContentLoaded', function() {
    const expandButton = document.querySelector('.expand-button');
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const lightboxMain = document.getElementById('lightbox-main');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxLink = document.getElementById('lightbox-link');
    const lightboxThumbnails = document.querySelector('.lightbox-thumbnails');
    const descriptionElement = document.querySelector('.image-description');
    let currentImageIndex = 0;
    let images = Array.from(document.querySelectorAll('.thumbnail'));
    
    if (thumbnailContainer.scrollHeight <= thumbnailContainer.clientHeight) {
        expandButton.style.display = 'none';
    }

    expandButton.addEventListener('click', function() {
        thumbnailContainer.classList.toggle('expanded');
        this.classList.toggle('expanded');
    });

    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightbox();
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
        
        const thumb = document.createElement('img');
        thumb.src = img.src;
        thumb.alt = img.alt;
        thumb.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightbox();
        })
        lightboxThumbnails.appendChild(thumb);
    });

    function updateLightbox() {
        const currentImg = images[currentImageIndex];
        lightboxLink.href = currentImg.src;
        lightboxImg.src = currentImg.src;
        descriptionElement.textContent = currentImg.alt;
        
        // Update thumbnails
        document.querySelectorAll('img.active').forEach((img) => {
            img.classList.remove('active');
        });

        lightboxThumbnails.children[currentImageIndex].classList.add('active')
    }

    document.getElementById('prev-btn').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightbox();
    });
    
    document.getElementById('next-btn').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightbox();
    });
    
    // Close lightbox
    document.getElementById('close-btn').addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', (e) => {
        console.log(e.target)
        if(e.target === lightboxMain || e.target === lightboxContent) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateLightbox();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateLightbox();
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
});