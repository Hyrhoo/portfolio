function toTheTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("top-button");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 100) {
            button.style.opacity = 1;
            button.style.visibility = "visible"
        } else {
            button.style.opacity = 0;
            button.style.visibility = "hidden"
        }
    });
});
