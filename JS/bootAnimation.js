/************************************************
 * Script: Boot Animation
 * Author: Luke Loera
 * Purpose: House the functionality of the boot
 *          up animation.
 ************************************************/

/////////////////////////////////////////////////
// Helper functions

/************************************************
 * Uses timeout to delay a function by a given
 * amount of milliseconds.
 ************************************************/
const delay = function(callback, t_msecs) {
    let tempDelay = setTimeout(() => {
        callback();
        window.clearTimeout(tempDelay);
    }, t_msecs);
}

// Menu functionality
var handleMenu = function() {
    let nav = document.querySelector("nav");
    let shadow = document.querySelector("#menu-shadow");
    let plus = document.querySelector("#menu-plus");
    let close = document.querySelector("#menu-close");
    let navLinks = document.querySelectorAll("nav ul li a");
    let moon = document.querySelector("#moon");

    if (nav.getAttribute("state") == "expanded") {
        /////////////////////////////////////////////////////
        // Minimize menu
        plus.querySelectorAll("line").forEach((line) => {
            line.classList.add("menu-icon-show");
            line.classList.remove("menu-icon-hide");
        });

        close.querySelectorAll("line").forEach((line) => {
            line.classList.add("menu-icon-hide");
            line.classList.remove("menu-icon-show");
        });

        moon.classList.add("eclipse-exit");
        moon.classList.remove("eclipse-enter");
        shadow.style.opacity = "0.75";
        shadow.classList.add("menu-shadow-hide");
        shadow.classList.remove("menu-shadow-show");

        // Nav links
        var i = 0;
        let navLinkInterval = setInterval(() => {
            navLinks.item(i).classList.add("nav-link-hide");
            navLinks.item(i).classList.remove("nav-link-show");

            if (++i > navLinks.length - 1) {
                window.clearInterval(navLinkInterval);
            }
        }, 100);

        // Tie up loose ends
        delay(() => {
            nav.setAttribute("state", "minimized");
            shadow.style.visibility = "hidden";
        }, 1750);
    } else {
        /////////////////////////////////////////////////////
        // Expand menu
        
        // First make sure the shadow can be seen
        shadow.style.visibility = "";
        plus.querySelectorAll("line").forEach((line) => {
            line.classList.add("menu-icon-hide");
            line.classList.remove("menu-icon-show");
        });

        close.querySelectorAll("line").forEach((line) => {
            line.classList.add("menu-icon-show");
            line.classList.remove("menu-icon-hide");
        });

        moon.classList.add("eclipse-enter");
        moon.classList.remove("eclipse-exit");
        shadow.classList.add("menu-shadow-show");
        shadow.classList.remove("menu-shadow-hide");

        // Nav links
        var i = 0;
        let navLinkInterval = setInterval(() => {
            navLinks.item(i).classList.add("nav-link-show");
            navLinks.item(i).classList.remove("nav-link-hide");

            if (++i > navLinks.length - 1) {
                window.clearInterval(navLinkInterval);
            }
        }, 100);

        // Tie up loose end
        nav.setAttribute("state", "expanded");
    }
}

/* Use IIFE so any variables go out of scope after
 * execution. */
var bootAnim = setTimeout(() => {
    let canvas = document.querySelector(".startup-animation-canvas");
    let sun = canvas.querySelector("#sun");
    let moon = canvas.querySelector("#moon");
    let logoContainer = canvas.querySelector("#logo-container");
    let shadow = document.querySelector("#menu-shadow");

    // Set the end states
    canvas.style.backgroundColor = "black";
    sun.style.backgroundColor = "rgb(255, 208, 0)";
    sun.style.boxShadow = "0 0 64px 16px rgb(255, 208, 0)";
    moon.style.backgroundColor = "rgb(54, 54, 54)";
    moon.style.transform = "translate(-50%, -50%)";

    // Commence exit
    canvas.classList.add("exit-animation");
    sun.classList.add("exit-sun");
    moon.classList.add("exit-moon");
    logoContainer.querySelectorAll("svg").forEach((svg) => {
        svg.classList.add("exit-logo");
    });

    // Close out startup animation and initialize navbar
    var endStartupAnimation = setTimeout(() => {
        // Initialize menu
        let plus = document.querySelector("#menu-plus");
        canvas.classList.add("menu-icon");
        plus.querySelectorAll("line").forEach((line) => {
            line.classList.add("menu-icon-show");
        });
        plus.setAttribute("state", "shown");
        canvas.addEventListener("click", () => { handleMenu(); } );
        window.clearTimeout(bootAnim);
        window.clearTimeout(endStartupAnimation);
    }, 1750);

    // Show home page
    // Use window origin to facilitate local and production development
    let baseURL = window.location.origin;
    if (window.location == "https://lgloera2023.github.io/RanchWebsite/") {
        baseURL = "https://lgloera2023.github.io/RanchWebsite";
    }
    let main = document.querySelector("main");
    fetch(baseURL + "/HTML/home.html")
    .then(response => response.text())
    .then(text => {
        main.innerHTML = text;
    });

    // Clean up unnecessary DOM elements and classes
    let cleanup = setTimeout(() => {
        logoContainer.parentElement.removeChild(logoContainer);
        canvas.style.right = "64px";
        canvas.style.top = "64px";
        canvas.style.height = "80px";
        canvas.style.width = "80px";
        canvas.classList.remove("startup-animation-canvas");
        canvas.classList.remove("exit-animation");

        sun.style.height = "80px";
        sun.style.width = "80px";
        // sun.style.boxShadow = "0 0 16px 8px rgb(255, 94, 0)";
        sun.style.boxShadow = "0 0 16px 8px rgb(255, 208, 0)";
        sun.classList.remove("sun-startup");
        sun.classList.remove("exit-sun");
        sun.style.overflow = "hidden";

        moon.style.height = "72px";
        moon.style.width = "72px";
        moon.style.transform = "translate(-150%, 25%)";
        moon.classList.remove("moon-startup");
        moon.classList.remove("exit-moon");

        document.querySelector("body").classList.remove("startup-no-overflow");
        shadow.style.visibility = "hidden";
        window.clearTimeout(cleanup);
    }, 2500);
}, 5000);