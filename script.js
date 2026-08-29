document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navbar =
        document.querySelector(".navbar");

    const scrollProgress =
        document.getElementById("scrollProgress");

    const backToTop =
        document.getElementById("backToTop");

    const menuButton =
        document.getElementById("menuButton");

    const navMenu =
        document.getElementById("navMenu");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const revealElements =
        document.querySelectorAll(".reveal");

    const counters =
        document.querySelectorAll(".counter");

    const progressBars =
        document.querySelectorAll(".bar-fill");

    const typingText =
        document.getElementById("typingText");

    const contactForm =
        document.getElementById("contactForm");

    const formStatus =
        document.getElementById("formStatus");

    const currentYear =
        document.getElementById("currentYear");

    const filterButtons =
        document.querySelectorAll(".filter-button");

    const projects =
        document.querySelectorAll(".project");


    /* =====================================================
       YEAR
    ===================================================== */

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    if (typingText) {

        const phrases = [
            "AI / ML Developer",
            "Computer Vision Enthusiast",
            "Software Developer",
            "Open-Source Contributor"
        ];

        let phraseIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        const typeSpeed = 85;
        const deleteSpeed = 45;
        const holdTime = 1500;


        function typePhrase() {

            const phrase =
                phrases[phraseIndex];


            if (!deleting) {

                characterIndex++;

                typingText.textContent =
                    phrase.substring(
                        0,
                        characterIndex
                    );


                if (
                    characterIndex >=
                    phrase.length
                ) {

                    deleting = true;

                    setTimeout(
                        typePhrase,
                        holdTime
                    );

                    return;
                }


                setTimeout(
                    typePhrase,
                    typeSpeed
                );

            } else {

                characterIndex--;

                typingText.textContent =
                    phrase.substring(
                        0,
                        characterIndex
                    );


                if (characterIndex <= 0) {

                    deleting = false;

                    phraseIndex =
                        (phraseIndex + 1) %
                        phrases.length;

                    setTimeout(
                        typePhrase,
                        400
                    );

                    return;
                }


                setTimeout(
                    typePhrase,
                    deleteSpeed
                );
            }
        }


        typePhrase();
    }


    /* =====================================================
       SCROLL UI
    ===================================================== */

    function updateScrollUI() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (
            scrollProgress &&
            documentHeight > 0
        ) {

            const percentage =
                (scrollTop / documentHeight) *
                100;

            scrollProgress.style.width =
                `${percentage}%`;
        }


        if (navbar) {

            if (scrollTop > 30) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }


        if (backToTop) {

            if (scrollTop > 500) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }
        }
    }


    window.addEventListener(
        "scroll",
        updateScrollUI,
        { passive: true }
    );


    updateScrollUI();


    /* =====================================================
       MOBILE NAV
    ===================================================== */

    if (menuButton && navMenu) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    navMenu.classList.toggle(
                        "open"
                    );

                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );
            }
        );
    }


    navLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    if (!navMenu) {
                        return;
                    }

                    navMenu.classList.remove(
                        "open"
                    );

                    if (menuButton) {

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }
                }
            );
        }
    );


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );
                        }
                    }
                );
            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );
        }
    );


    /* =====================================================
       COUNTERS
    ===================================================== */

    const counterObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const element =
                            entry.target;

                        const target =
                            Number(
                                element.dataset.target
                            );

                        const decimals =
                            Number(
                                element.dataset.decimals ||
                                0
                            );

                        const suffix =
                            element.dataset.suffix ||
                            "";


                        const duration = 1200;

                        const start =
                            performance.now();


                        function animateCounter(
                            currentTime
                        ) {

                            const progress =
                                Math.min(
                                    (
                                        currentTime -
                                        start
                                    ) / duration,
                                    1
                                );


                            const value =
                                target *
                                progress;


                            element.textContent =
                                value.toFixed(
                                    decimals
                                ) +
                                suffix;


                            if (progress < 1) {

                                requestAnimationFrame(
                                    animateCounter
                                );
                            }
                        }


                        requestAnimationFrame(
                            animateCounter
                        );


                        counterObserver.unobserve(
                            element
                        );
                    }
                );
            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(
        (counter) => {

            counterObserver.observe(
                counter
            );
        }
    );


    /* =====================================================
       SKILL BAR ANIMATION
    ===================================================== */

    const barObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const bars =
                            entry.target.querySelectorAll(
                                ".bar-fill"
                            );


                        bars.forEach(
                            (bar, index) => {

                                setTimeout(
                                    () => {

                                        bar.style.width =
                                            `${bar.dataset.width}%`;

                                    },
                                    index * 120
                                );
                            }
                        );


                        barObserver.unobserve(
                            entry.target
                        );
                    }
                );
            },
            {
                threshold: 0.25
            }
        );


    document
        .querySelectorAll(".skill-card")
        .forEach(
            (card) => {

                if (
                    card.querySelector(
                        ".bar-fill"
                    )
                ) {

                    barObserver.observe(
                        card
                    );
                }
            }
        );


    /* =====================================================
       PROJECT FILTERS
    ===================================================== */

    filterButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    filterButtons.forEach(
                        (item) => {

                            item.classList.remove(
                                "active"
                            );
                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const filter =
                        button.dataset.filter;


                    projects.forEach(
                        (project) => {

                            const category =
                                project.dataset.category;


                            if (
                                filter === "all" ||
                                category === filter
                            ) {

                                project.classList.remove(
                                    "hidden"
                                );

                            } else {

                                project.classList.add(
                                    "hidden"
                                );
                            }
                        }
                    );
                }
            );
        }
    );


    /* =====================================================
       MAGNETIC BUTTON EFFECT
    ===================================================== */

    const magneticElements =
        document.querySelectorAll(
            ".magnetic"
        );


    magneticElements.forEach(
        (element) => {

            element.addEventListener(
                "mousemove",
                (event) => {

                    if (
                        window.innerWidth <= 800
                    ) {
                        return;
                    }


                    const rect =
                        element.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    element.style.transform =
                        `translate(
                            ${x * 0.08}px,
                            ${y * 0.08}px
                        )`;
                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    element.style.transform =
                        "";
                }
            );
        }
    );


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const nameInput =
                    document.getElementById(
                        "name"
                    );

                const emailInput =
                    document.getElementById(
                        "email"
                    );

                const messageInput =
                    document.getElementById(
                        "message"
                    );


                const name =
                    nameInput.value.trim();

                const email =
                    emailInput.value.trim();

                const message =
                    messageInput.value.trim();


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    if (formStatus) {

                        formStatus.textContent =
                            "Please complete all fields.";
                    }

                    return;
                }


                const subject =
                    encodeURIComponent(
                        `Portfolio message from ${name}`
                    );


                const body =
                    encodeURIComponent(
                        `Name: ${name}\nEmail: ${email}\n\n${message}`
                    );


                window.location.href =
                    `mailto:prachiagg7782@gmail.com?subject=${subject}&body=${body}`;


                if (formStatus) {

                    formStatus.textContent =
                        "Opening your email client...";
                }
            }
        );
    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );
    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                if (navMenu) {

                    navMenu.classList.remove(
                        "open"
                    );
                }

                if (menuButton) {

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }
            }
        }
    );

});