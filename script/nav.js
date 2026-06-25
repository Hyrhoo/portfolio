document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navContainer = document.querySelector(".nav-container");
  const dropdownParents = document.querySelectorAll(
    ".nav-item:has(.dropdown-menu)",
  );
  const menuOverlay = document.querySelector(".menu-overlay");
  const navLinks = document.querySelectorAll(
    ".nav-item:not(:has(.dropdown-menu))",
  );

  function closeMenu() {
    navContainer.classList.remove("active");
    menuBtn.querySelector("i").classList.add("fa-bars");
    menuBtn.querySelector("i").classList.remove("fa-times");
    menuOverlay.classList.remove("active");

    dropdownParents.forEach((parent) => {
      const dropdown = parent.querySelector(".dropdown-menu");
      const caret = parent.querySelector(".fa-caret-down");
      dropdown.classList.remove("active");
      caret.classList.remove("rotate");
    });
  }

  // Toggle main menu
  menuBtn.addEventListener("click", () => {
    console.log("Menu button clicked");
    if (navContainer.classList.contains("active")) {
      closeMenu();
      return;
    }
    navContainer.classList.add("active");
    menuBtn.querySelector("i").classList.remove("fa-bars");
    menuBtn.querySelector("i").classList.add("fa-times");
    menuOverlay.classList.add("active");
  });

  // Handle dropdown menus
  dropdownParents.forEach((parent) => {
    const link = parent.querySelector("a");
    const dropdown = parent.querySelector(".dropdown-menu");
    const caret = parent.querySelector(".fa-caret-down");

    link.addEventListener("click", (e) => {
      // Always prevent default for the dropdown parent link

      if (window.innerWidth <= 780) {
        e.preventDefault();
        dropdown.classList.toggle("active");
        caret.classList.toggle("rotate");
      }
    });
  });

  // Close menu when clicking outside
  menuOverlay.addEventListener("click", closeMenu);

  // Close menu when resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 780) {
      closeMenu();
    }
  });

  // Close menu when clicking on navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Update footer year dynamically
  const footerYearElements = document.querySelectorAll(".footer-year");
  const currentYear = new Date().getFullYear();
  footerYearElements.forEach((el) => {
    el.textContent = currentYear;
  });

  // Calculate and update age dynamically (from birthdate 27/09/2005)
  const heroAgeEl = document.getElementById("hero-age");
  if (heroAgeEl) {
    const birthDate = new Date(2005, 8, 27); // September is index 8
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    heroAgeEl.textContent = age;
  }
});
