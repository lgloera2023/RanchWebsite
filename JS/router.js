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
            
            // Transition pages
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

                // Show next page
                fetch(this.baseURL + href)
                .then(response => response.text())
                .then(text => {
                        main.innerHTML = text;
                        window.scrollTo(0, 0);  // Scroll to top
                        main.classList.add("main-show");
                        main.classList.remove("main-hide");

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
                });

                // Clear timeout
                window.clearTimeout(changeTimeout);
                
                delay(() => {
                    nav.setAttribute("state", "minimized");
                    shadow.style.visibility = "hidden";
                }, 1750);
            }, 500);
        }
    }
}

/////////////////////////////////////////////////
// Set the base URL
let _baseURL = window.location.href;
if (_baseURL[_baseURL.length - 1] == "/") {
    _baseURL = _baseURL.substring(0, _baseURL.length - 1);
}

Router.baseURL = _baseURL;

/////////////////////////////////////////////////
// Restructure Nav Link Tags
document.querySelectorAll("nav a").forEach(tag => {
    tag.addEventListener("click", () => Router.changePage(tag.getAttribute("src")));
});
