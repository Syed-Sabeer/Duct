/**
 *
 * 
 * headerFixed
 * footer
 * video
 * counter
 * progresslevel
 * totalNumberVariant
 * deleteFile
 * datePicker
 * autoPopup
 * ajaxContactForm
 * gotop
 * preloader
 *
 **/

(function ($) {
    ("use strict");

    var headerFixed = function () {
        if ($("header").hasClass("header-fixed")) {
            var nav = $("#header_main");

            if (nav.length) {
                var offsetTop = nav.offset().top,
                    headerHeight = nav.height(),
                    injectSpace = $("<div>", {
                        height: headerHeight,
                    });
                injectSpace.hide();

                if ($("header").hasClass("style-absolute")) {
                    injectSpace.hide();
                } else {
                    injectSpace.insertAfter(nav);
                }

                $(window).on("load scroll", function () {
                    if ($(window).scrollTop() > offsetTop + headerHeight) {
                        nav.addClass("is-fixed");
                        injectSpace.show();
                    } else {
                        nav.removeClass("is-fixed");
                        injectSpace.hide();
                    }

                    if ($(window).scrollTop() > 400) {
                        nav.addClass("is-small");
                    } else {
                        nav.removeClass("is-small");
                    }
                });
            }
        }
    };
    var footer = function () {
        function checkScreenSize() {
            if (window.matchMedia("(max-width: 550px)").matches) {
                $(".tf-collapse-content").css("display", "none");
            } else {
                $(".footer-menu-list").siblings().removeClass("open");
                $(".tf-collapse-content").css("display", "unset");
            }
        }
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        var args = { duration: 250 };
        $(".title-mobile").on("click", function () {
            $(this).parent(".footer-col-block").toggleClass("open");
            if (!$(this).parent(".footer-col-block").is(".open")) {
                $(this).next().slideUp(args);
            } else {
                $(this).next().slideDown(args);
            }
        });
    };
    var video = function () {
        if (
            $("div").hasClass("wg-video") ||
            $("div").hasClass("post-format-video") ||
            $("div").hasClass("play-video")
        ) {
            $(".popup-youtube, .play-icon").magnificPopup({
                type: "iframe",
            });
        }
    };
    var counter = function () {
        if ($(document.body).hasClass("counter-scroll")) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = $(entry.target);

                        if (!element.hasClass("odometer-activated")) {
                            const to = element.data("to");
                            element.addClass("odometer-activated");

                            element.html(to);
                        }

                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            $(".counter .number").each(function () {
                observer.observe(this);
            });
        }
    };
    var progressLevel = function () {
        var bars = document.querySelectorAll(".progress-bars-line > div");

        var observer = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.9) {
                        var bar = entry.target;
                        var t1 = parseFloat(bar.dataset.progress);
                        var t2 = parseFloat(bar.dataset.max);
                        var targetWidth = (t1 / t2) * 100;
                        var currentWidth = 25;

                        function animate() {
                            if (currentWidth < targetWidth) {
                                currentWidth += 1;
                                bar.style.width = currentWidth + "%";
                                requestAnimationFrame(animate);
                            } else {
                                bar.style.width = targetWidth + "%";
                            }
                        }

                        animate();
                        observer.unobserve(bar);
                    }
                });
            },
            { threshold: 0.9 }
        );

        bars.forEach(function (bar) {
            bar.style.width = "0    %"; 
            observer.observe(bar);
        });
    };
    var totalNumberVariant = function () {
        $(".tf-product-info-quanlity,.tf-cart-item").each(function () {
            var productItem = $(this);
            var quantityInput = productItem.find(".quanlity-product");
            var quantityEl = productItem.find(".quanlity-product-2");
            var priceEl = productItem.find(".cart-price");
            var totalEl = productItem.find(".cart-total");

            var updateTotalPrice = function () {
                var currentQuantity = parseInt(quantityInput.val());
                var price = parseFloat(priceEl.text().replace("$", ""));
                var totalPrice = (currentQuantity * price).toFixed(2);
                totalEl.text("$" + totalPrice);
            };

            productItem.find(".btn-increase").on("click", function () {
                var currentQuantity = parseInt(quantityInput.val());
                quantityInput.val(currentQuantity + 1);
                quantityEl.val(currentQuantity + 1);
                updateTotalPrice();
            });

            productItem.find(".btn-decrease").on("click", function () {
                var currentQuantity = parseInt(quantityInput.val());
                if (currentQuantity > 1) {
                    quantityInput.val(currentQuantity - 1);
                    quantityEl.val(currentQuantity - 1);
                    updateTotalPrice();
                }
            });
        });
    };
    var deleteFile = function (e) {
        $(".remove").on("click", function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.closest(".file-delete").remove();
        });
        $(".clear-file-delete").on("click", function (e) {
            e.preventDefault();
            $(this).closest(".list-file-delete").find(".file-delete").remove();
        });
    };
    var datePicker = function () {
        if ($("#datepicker").length > 0) {
            $("#datepicker").datepicker({
                firstDay: 1,
                dateFormat: "dd/mm/yy",
            });
        }
        if ($("#datepicker2").length > 0) {
            $("#datepicker2").datepicker({
                firstDay: 1,
                dateFormat: "dd/mm/yy",
            });
        }
        if ($("#datepicker3").length > 0) {
            $("#datepicker3").datepicker({
                firstDay: 1,
                dateFormat: "dd/mm/yy",
            });
        }
    };
    var autoPopup = function () {
        if ($("body").hasClass("popup-loader")) {
            if ($(".auto-popup").length > 0) {
                let showPopup = sessionStorage.getItem("showPopup");
                if (!JSON.parse(showPopup)) {
                    setTimeout(function () {
                        $(".auto-popup").modal("show");
                    }, 3000);
                }
            }
            $(".btn-hide-popup").on("click", function () {
                sessionStorage.setItem("showPopup", true);
            });
        }
    };
    var ajaxContactForm = function () {
        $("#contactform,#commentform").each(function () {
            $(this).validate({
                submitHandler: function (form) {
                    var $form = $(form),
                        str = $form.serialize(),
                        loading = $("<div />", { class: "loading" });

                    $.ajax({
                        type: "POST",
                        url: $form.attr("action"),
                        data: str,
                        beforeSend: function () {
                            $form.find(".send-wrap").append(loading);
                        },
                        success: function (msg) {
                            var result, cls;
                            if (msg === "Success") {
                                result = "Message Sent Successfully To Email Administrator";
                                cls = "msg-success";
                            } else {
                                result = "Error sending email.";
                                cls = "msg-error";
                            }

                            $form.prepend(
                                $("<div />", {
                                    class: "flat-alert mb-20 " + cls,
                                    text: result,
                                }).append(
                                    $(
                                        '<a class="close mt-0" href="#"><i class="fa fa-close"></i></a>'
                                    )
                                )
                            );

                            $form.find(":input").not(".submit").val("");
                        },
                        complete: function (xhr, status, error_thrown) {
                            $form.find(".loading").remove();
                        },
                    });
                },
            });
        });
    };
    var handleSidebarFilter = function () {
        $("#filterShop,.sidebar-btn").on("click",function () {
          if ($(window).width() <= 1200) {
            $(".sidebar-filter,.overlay-filter").addClass("show");
          }
        });
        $(".close-filter,.overlay-filter").on("click",function () {
          $(".sidebar-filter,.overlay-filter").removeClass("show");
        });
    };
    var goTop = function () {
        if ($("div").hasClass("progress-wrap")) {
            var progressPath = document.querySelector(".progress-wrap path");
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition =
                "none";
            progressPath.style.strokeDasharray = pathLength + " " + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition =
                "stroke-dashoffset 10ms linear";
            var updateprogress = function () {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                var progress = pathLength - (scroll * pathLength) / height;
                progressPath.style.strokeDashoffset = progress;
            };
            updateprogress();
            $(window).scroll(updateprogress);
            var offset = 0;
            var duration = 0;
            jQuery(window).on("scroll", function () {
                if (jQuery(this).scrollTop() > offset) {
                    jQuery(".progress-wrap").addClass("active-progress");
                } else {
                    jQuery(".progress-wrap").removeClass("active-progress");
                }
            });
            jQuery(".progress-wrap").on("click", function (event) {
                event.preventDefault();
                jQuery("html, body").animate({ scrollTop: 0 }, duration);
                return false;
            });
        }
    };
    var preLoader = function () {
        setTimeout(function () {
            $(".preload-container").fadeOut("slow", function () {
                $(this).remove();
            });
        }, 400);
    };
    
    // Dom Ready
    $(function () {
        headerFixed();
        footer();
        video();
        counter();
        progressLevel();
        totalNumberVariant();
        deleteFile();
        datePicker();
        autoPopup();
        ajaxContactForm();
        handleSidebarFilter();
        goTop();
        preLoader();
    });
})(jQuery);
