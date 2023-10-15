const Router = {
    baseURL: "",
    currPage: "/HTML/home.html",
    changePage: function(href) {
        let main = document.querySelector("main");
        let nav = document.querySelector("nav");
        let shadow = document.querySelector("#menu-shadow");
        let plus = document.querySelector("#menu-plus");
        let close = document.querySelector("#menu-close");
        let navLinks = document.querySelectorAll("nav ul li a");
        let moon = document.querySelector("#moon");

        if (href == this.currPage) {
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

            nav.setAttribute("state", "minimized");
            delay(() => {shadow.style.visibility = "hidden";}, 1750);
        } else {
            // Trigger transition
            this.currPage = href;
            main.classList.add("main-hide");
            main.classList.remove("main-show");
            
            // Get the next page and plug into DOM
            fetch(this.baseURL + href)
            .then(response => response.text())
            .then(text => {
                main.innerHTML = text;
                window.scrollTo(0, 0);  // Scroll to top

                // Phase out the menu
                let changeTimeout = setTimeout(() => {
                    // Nav links
                    var i = 0;
                    let navLinkInterval = setInterval(() => {
                        navLinks.item(i).classList.add("nav-link-hide");
                        navLinks.item(i).classList.remove("nav-link-show");

                        if (++i > navLinks.length - 1) {
                            window.clearInterval(navLinkInterval);
                        }
                    }, 100);

                    // Minimize menu
                    main.classList.add("main-show");
                    main.classList.remove("main-hide");

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

                    // Clean up the viewport so shadow doesn't keep
                    // user from clicking
                    delay(() => {
                        nav.setAttribute("state", "minimized");
                        shadow.style.visibility = "hidden";
                    }, 1750);

                    // Clear timeout
                    window.clearTimeout(changeTimeout);
                }, 500);
            });
        }
    }
}

/////////////////////////////////////////////////
// Set the base URL
Router.baseURL = window.location.origin

/////////////////////////////////////////////////
// Restructure Nav Link Tags
document.querySelectorAll("nav a").forEach(tag => {
    tag.addEventListener("click", () => Router.changePage(tag.getAttribute("src")));
});
