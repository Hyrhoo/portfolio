document.addEventListener("DOMContentLoaded", function () {
  const expandButton = document.querySelector(".expand-button");
  const thumbnailContainer = document.querySelector(".thumbnail-container");
  const lightbox = document.getElementById("lightbox");
  const lightboxContent = document.getElementById("lightbox-content");
  const lightboxMain = document.getElementById("lightbox-main");
  const lightboxImg = document.getElementById("lightbox-image");
  const lightboxLink = document.getElementById("lightbox-link");
  const lightboxThumbnails = document.querySelector(".lightbox-thumbnails");
  const descriptionElement = document.querySelector(".image-description");
  let currentImageIndex = 0;
  let images = Array.from(document.querySelectorAll(".thumbnail"));

  // Check or create lightbox video element dynamically
  let lightboxVideo = document.getElementById("lightbox-video");
  if (!lightboxVideo && lightboxImg) {
    lightboxVideo = document.createElement("video");
    lightboxVideo.id = "lightbox-video";
    lightboxVideo.controls = true;
    lightboxVideo.style.maxWidth = "100%";
    lightboxVideo.style.maxHeight = "75vh";
    lightboxVideo.style.borderRadius = "8px";
    lightboxVideo.style.display = "none";
    // Insert it right after lightboxImg inside lightboxLink
    lightboxImg.parentNode.insertBefore(lightboxVideo, lightboxImg.nextSibling);
  }

  if (thumbnailContainer.scrollHeight <= thumbnailContainer.clientHeight) {
    expandButton.style.display = "none";
  }

  expandButton.addEventListener("click", function () {
    thumbnailContainer.classList.toggle("expanded");
    this.classList.toggle("expanded");
  });

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentImageIndex = index;
      updateLightbox();
      lightbox.style.display = "block";
      document.body.style.overflow = "hidden";
    });

    const thumb = document.createElement("img");
    if (img.tagName === "VIDEO") {
      thumb.src = img.getAttribute("cover");
    } else {
      thumb.src = img.src;
    }
    thumb.alt = img.alt || img.getAttribute("alt");
    thumb.addEventListener("click", () => {
      currentImageIndex = index;
      updateLightbox();
    });
    lightboxThumbnails.appendChild(thumb);
  });

  function updateLightbox() {
    const currentImg = images[currentImageIndex];
    const isVideo = currentImg.tagName === "VIDEO" || currentImg.dataset.video;
    const videoSrc =
      currentImg.tagName === "VIDEO"
        ? currentImg.src
        : currentImg.dataset.video;

    if (isVideo) {
      // Hide image, show video
      lightboxImg.style.display = "none";
      lightboxVideo.style.display = "block";
      lightboxVideo.src = videoSrc ?? "";
      lightboxVideo.load();
      lightboxVideo.play().catch((e) => console.log("Autoplay prevented:", e));
      lightboxLink.removeAttribute("href");
      lightboxLink.style.cursor = "default";
      lightboxLink.onclick = (e) => e.preventDefault();
    } else {
      // Hide video, show image
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.style.display = "none";
        lightboxVideo.src = "";
      }
      lightboxImg.style.display = "block";
      lightboxImg.src = currentImg.src;
      lightboxLink.href = currentImg.src;
      lightboxLink.style.cursor = "pointer";
      lightboxLink.onclick = null;
    }

    descriptionElement.textContent =
      currentImg.alt || currentImg.getAttribute("alt");

    // Update thumbnails
    document
      .querySelectorAll(".lightbox-thumbnails img.active")
      .forEach((img) => {
        img.classList.remove("active");
      });

    if (lightboxThumbnails.children[currentImageIndex]) {
      lightboxThumbnails.children[currentImageIndex].classList.add("active");
    }
  }

  function closeLightbox() {
    if (lightboxVideo) {
      lightboxVideo.pause();
      lightboxVideo.src = "";
    }
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }

  function toggleVideo(e) {
    const currentImg = images[currentImageIndex];
    if (currentImg.tagName !== "VIDEO") return;
    e.preventDefault();
    if (lightboxVideo.paused) {
      lightboxVideo.play();
    } else {
      lightboxVideo.pause();
    }
  }

  document.getElementById("prev-btn").addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightbox();
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightbox();
  });

  // Close lightbox
  document.getElementById("close-btn").addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightboxMain || e.target === lightboxContent) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "block") {
      if (e.key === "ArrowLeft") {
        currentImageIndex =
          (currentImageIndex - 1 + images.length) % images.length;
        updateLightbox();
      } else if (e.key === "ArrowRight") {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightbox();
      } else if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === " ") {
        toggleVideo(e);
      }
    }
  });

  // Handle smooth scroll for gallery link without adding to history stack
  const galleryLink = document.querySelector('a[href="#gallery"]');
  if (galleryLink) {
    galleryLink.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.getElementById("gallery");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        // Update URL hash without adding to history
        history.replaceState(null, null, "#gallery");
      }
    });
  }

  // Handle return button click to go back in history if possible (to avoid reload/forward navigation)
  const returnBtn = document.querySelector(".project-links");
  if (returnBtn) {
    returnBtn.addEventListener("click", function (e) {
      const hasReferrer =
        document.referrer &&
        ((window.location.host &&
          document.referrer.includes(window.location.host)) ||
          document.referrer.includes("index.html"));
      if (hasReferrer) {
        e.preventDefault();
        history.back();
      }
    });
  }
});
