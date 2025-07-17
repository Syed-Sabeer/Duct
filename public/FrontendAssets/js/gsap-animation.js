(function ($) {
    "use strict";
    var animateText = function () {
        if (window.innerWidth <= 550) {
            let animatedTextElements = document.querySelectorAll(".text-anime-wave, .text-anime-wave-1, .text-anime-wave-2");
    
            animatedTextElements.forEach((element) => {
                if (element.animation) {
                    element.animation.progress(1).kill();
                }
                gsap.set(element, { clearProps: "all" });
            });
    
            return;
        }
    
        if ($(".text-anime-wave, .text-anime-wave-1, .text-anime-wave-2").length > 0) {
            let animatedTextElements = document.querySelectorAll(".text-anime-wave, .text-anime-wave-1, .text-anime-wave-2");
    
            animatedTextElements.forEach((element) => {
                if (element.animation) {
                    element.animation.progress(1).kill();
                }
    
                let origin = "left center";
                let rotateStart = -90;
                let delay = parseFloat(element.getAttribute("data-delay")) || 0;
    
                if (element.classList.contains("text-anime-wave-1")) {
                    origin = "center center"; 
                } else if (element.classList.contains("text-anime-wave-2")) {
                    origin = "right center"; 
                    rotateStart = 90; 
                }
    
                gsap.set(element, {
                    opacity: 0,
                    rotateY: rotateStart, 
                    transformOrigin: origin,
                });
    
                element.animation = gsap.to(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 99%",
                        toggleActions: "play none none none",
                    },
                    opacity: 1,
                    rotateY: 0, 
                    duration: 2,
                    delay: delay,
                    ease: "back.out(1.7)", 
                });
            });
        }
    };
    
    var animateImgItem = function () {
        const isSmallScreen = window.matchMedia("(max-width: 550px)").matches;
    
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $(entry.target).addClass("active-animate");
                }
            });
        }, {
            threshold: isSmallScreen ? 0.05 : 0.1 
        });
    
        $(".tf-animate-1, .tf-animate-2, .tf-animate-3, .tf-animate-4").each(function () {
            observer.observe(this);
        });
    
        $(window).on("scroll", function () {
            $(".tf-animate-1, .tf-animate-2, .tf-animate-3, .tf-animate-4").each(function () {
                const sectionOffsetTop = $(this).offset().top;
                const sectionHeight = $(this).outerHeight();
                const scrollPosition = $(window).scrollTop();
                const windowHeight = $(window).height();
    
                if (isSmallScreen) {
                    if (scrollPosition + windowHeight > sectionOffsetTop + 20 && scrollPosition < sectionOffsetTop + sectionHeight - 20) {
                        $(this).addClass("active-animate");
                    }
                } else {
                    if (scrollPosition + windowHeight > sectionOffsetTop + 100 && scrollPosition < sectionOffsetTop + sectionHeight - 100) {
                        $(this).addClass("active-animate");
                    }
                }
            });
        });
    };
    
    var animateImgScroll = function () {
        if (window.matchMedia("(min-width: 768px)").matches) {
            if ($("div").hasClass("scroll-tranform")){
                gsap.to(".scroll-tranform", {
                    y: -50,
                    scrollTrigger: {
                        trigger: ".scroll-tranform-section",
                        start: "top center",
                        end: "bottom top",
                        scrub: 3,
                    },
                });
            }
            if ($("div").hasClass("scroll-tranform-up")){
                gsap.to(".scroll-tranform-up", {
                    y: 50,
                    scrollTrigger: {
                        trigger: ".scroll-tranform-section",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 3,
                    },
                });
            }
        }
    };
 
    var animateScrollRotate = function () {
        if (window.matchMedia("(min-width: 768px)").matches) {
            if ($("img").hasClass("logo-rotating")) {
                gsap.to(".logo-rotating", {
                    rotation: 360,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".logo-rotating",
                        start: "top 50%",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            }
        }
    };

    var animateParalaxImg = function () {
        if (window.matchMedia("(min-width: 768px)").matches) {
            if($("div").hasClass("img-paralax")){
                gsap.utils.toArray('.img-paralax').forEach(container => {
                    const img = container.querySelector('img');
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: container,
                            scrub: 3,
                            pin: false,
                        }
                    });
              
                    tl.fromTo(img, {
                        yPercent: 5,
                        ease: 'none',
                        
                    }, {
                        yPercent: -5,
                        ease: 'none'
                    });
                });
            }
        }
    }

    $(window).on("load", function () {
        animateText();
        animateImgItem();
        animateImgScroll();
        animateScrollRotate();
        animateParalaxImg();
    });
})(jQuery);
