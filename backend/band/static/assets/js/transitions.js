// document.ready //
$(document).ready(function () {

    $('body').addClass('first-load');

    // Init Page-Transition Pre-Check
    transitionCheckupOutside(); // IS NOT re-initiated on page-transition
    transitionCheckupInside(); // IS re-initiated on page-transition

    // Init Page-Transition Function
    pageTransitions();


});
// document.ready //
// ... Page Transition Function - Barba.js .....................................................................
function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}
function pageTransition() {
    var tl = new TimelineMax();
    tl.to(".loading-screen", 1.2, {
        height: "100%",
        top: "0%",
        ease: "Expo.easeInOut",
    });

    tl.to(".loading-screen", 1, {
        height: "100%",
        top: "100%",
        ease: "Expo.easeInOut",
        delay: 0.3,
    });
    tl.set(".loading-screen", { top: "-100%" });
}

function contentAnimation() {
    var tl = new TimelineMax();
    tl.from(".animate-this", 1, { y: 30, opacity: 0, delay: 0.5 });
}

function pageTransitions() {


    barba.hooks.beforeEnter((data) => {

        var beforeEnterPromiseAll = new Promise(function (resolve) {

            // Change class on body
            if (!$('body').hasClass('first-load')) {
                $('body').addClass('' + data.next.namespace);
                $('body').removeClass('' + data.current.namespace);
            }

            resolve();

        });

        return beforeEnterPromiseAll;

    });


    barba.hooks.enter(({
        current,
        next
    }) => {

        var enterPromiseAll = new Promise(function (resolve) {

            current.container.remove();

            resolve();

        });

        return enterPromiseAll;

    });


    barba.hooks.afterEnter((data) => {

        var afterEnterPromiseAll = new Promise(function (resolve) {



            if (!$('body').hasClass('first-load')) {

                initRefireCallbacks();

                $('body').removeClass('is-transitioning');

            }

            resolve();

        });

        return afterEnterPromiseAll;

    });

    barba.init({

        prevent: ({
            el
        }) => el.classList && el.classList.contains('prevent-transition'),
        prevent: ({
            event
        }) => {
            if (event.type === 'click') {
                // Prevent the user to reload the site if a page transition is engaged.
                if (barba.transitions.isRunning) {

                    event.preventDefault();

                    return true;

                }
            }
        },


        cacheIgnore: true,
        prefetchIgnore: true,
        // timeout: 1000, // default: 2000
        sync: true,

        transitions: [
            {
                async leave(data) {
                    const done = this.async();

                    pageTransition();
                    await delay(1200);
                    done();
                },

                async enter(data) {
                },

                async once(data) {
                },
            },
        ],


        views: [

            // View Index .........................................................................................................................
            {
                // Actions taken when certain page is viewed.
                namespace: 'products',

                // Available hooks…

                beforeLeave(data) {

                },

                afterLeave(data) {

                },

                beforeEnter(data) {

                },

                afterEnter(data) {
                    // products-carousel #########################################################################################

                    var carouselMain = document.querySelector(".carousel-main");
                    var flktyMain = new Flickity(carouselMain, {
                        contain: true,
                        draggable: false,
                        pageDots: false,
                        fade: true,
                        prevNextButtons: false
                    });

                    var carouselNav = document.querySelector(".carousel-nav");
                    var flktyNav = new Flickity(carouselNav, {
                        asNavFor: ".carousel-main",
                        pageDots: false,
                        contain: true,
                        prevNextButtons: false
                    });


                    // var sliderIndex = 0;
                    // var cellRatio = 0.6;
                    // var bgRatio = 0.8;
                    // var background = document.querySelector('.parallax__layer--bg');
                    // var titles = [...document.querySelectorAll('[js-parallax="titles"]')];
                    // var titleContain = document.querySelector('[js-parallax="title-contain"]');
                    // var lastPercent = 0;
                    // var content = document.querySelectorAll('.parallax__layer__cell');
                    //
                    //
                    //
                    // var content = document.querySelectorAll('.parallax__layer__cell');
                    // document.querySelector('.cunt').innerHTML = content.length;
                    // for (var i = 1; i < content.length; i++) {
                    //   content[i].style.left += "60%";
                    // }
                    var carousel = Array.prototype.slice.call(
                        document.querySelectorAll(".carousel")
                    );
                    carousel.forEach(function (carousel) {
                        var flkty = new Flickity(carousel, {
                            // initialIndex: sliderIndex,
                            // prevNextButtons: true,
                            arrowShape: {
                                x0: 10,
                                x1: 60,
                                y1: 50,
                                x2: 65,
                                y2: 45,
                                x3: 20
                            }
                            // on: {
                            //   scroll: function (progress) {
                            //     scrollProgress(progress);
                            //   },
                            //   dragMove: function (event, pointer) {
                            //     skewText(event.pageX);
                            //   },
                            //   dragEnd: function (event, pointer) {
                            //     upDateTextSkew(0);
                            //   } }
                        });
                        // flkty.on("dragMove", function() {
                        //   TweenMax.to(".carousel-contain", 0.3, {
                        //     scale: (0.9, 0.9),
                        //     ease: Expo.easeInOute
                        //   });
                        // });
                        flkty.on("pointerDown", function () {
                            TweenMax.to(".carousel-contain", 0.5, {
                                scale: (0.95, 0.95),
                                opacity: 0.7,
                                ease: Expo.easeInOute
                            });
                            TweenMax.to(".carousel-content", 0.5, {
                                opacity: 0,
                                ease: Expo.easeInOute
                            });
                            TweenMax.to(".carousel-category-content-back", 0.5, {
                                opacity: 1,
                                ease: Expo.easeInOute
                            });
                            TweenMax.to(".dragge-1", 0.5, {
                                x: -5,
                                ease: Expo.easeInOute
                            });
                            TweenMax.to(".dragge-2", 0.5, {
                                x: 5,
                                ease: Expo.easeInOute
                            });
                        });
                        flkty.on("pointerUp", function () {
                            TweenMax.to(".carousel-contain", 0.5, {
                                scale: (1, 1),
                                opacity: 1,
                                ease: Expo.easeInOute
                            });
                            TweenMax.to(".carousel-content", 0.5, {
                                opacity: 1,
                                ease: Expo.easeInOute
                            });
                            TweenMax.to(".carousel-category-content-back", 0.5, {
                                opacity: 0.5,
                                ease: Expo.easeInOute
                            });
                            TweenMax.to(".dragge-1", 0.5, {
                                x: 0,
                                ease: Expo.easeInOute
                            });
                            TweenMax.to(".dragge-2", 0.5, {
                                x: 0,
                                ease: Expo.easeInOute
                            });
                        });

                        var carouselCunt = document.querySelectorAll(".carousel-cunt");
                        var mm = flkty.cells.length;
                        console.log(mm);
                    });


                },
            },










            {
                // Actions taken when certain page is viewed.
                namespace: 'collections',

                // Available hooks…

                beforeLeave(data) {

                },

                afterLeave(data) {

                },

                beforeEnter(data) {

                },

                afterEnter(data) {
                    // collections-carousel #########################################################################################

                    var duration = 6;
                    var interval = 6;
                    var elem = document.querySelector(".carousel-collection");

                    function updateStatus() {
                        var activeIndex = flktyCollection.slides.length;
                        var numSlides = flktyCollection.selectedIndex + 1;
                        var galleryStatus = document.querySelector(
                            ".collection-info-bar-carousel-cell-count"
                        );
                        // galleryStatus.textContent = "0" + numSlides + " / " + "0" + activeIndex;
                    }

                    var flktyCollection = new Flickity(elem, {
                        // cellAlign: "center",
                        // contain: true,
                        wrapAround: true,
                        // rightToLeft: false,
                        // selectedAttraction: 0.01,
                        // friction: 0.3,
                        // prevNextButtons: false,
                        // pageDots: true,
                        // percentPosition: false,
                        on: {
                            change: () => {
                                updateStatus();
                                resetProgressbar();
                                startProgressbar();
                            }
                        }
                    });

                    flktyCollection.on("pointerDown", function () {
                        TweenMax.to(".carousel-contain-collection", 0.5, {
                            scale: (0.95, 0.95),
                            ease: Expo.easeInOute
                        });
                        TweenMax.to(".carousel-content-collection", 0.5, {
                            opacity: 0,
                            ease: Expo.easeInOute
                        });
                        TweenMax.to(".dragge-1", 0.5, {
                            x: -5,
                            ease: Expo.easeInOute
                        });
                        TweenMax.to(".dragge-2", 0.5, {
                            x: 5,
                            ease: Expo.easeInOute
                        });
                    });
                    flktyCollection.on("pointerUp", function () {
                        TweenMax.to(".carousel-contain-collection", 0.5, {
                            scale: (1, 1),
                            ease: Expo.easeInOute
                        });
                        TweenMax.to(".carousel-content-collection", 0.5, {
                            opacity: 1,
                            ease: Expo.easeInOute
                        });
                        TweenMax.to(".dragge-1", 0.5, {
                            x: 0,
                            ease: Expo.easeInOute
                        });
                        TweenMax.to(".dragge-2", 0.5, {
                            x: 0,
                            ease: Expo.easeInOute
                        });
                    });
                    updateStatus();

                    const progressBar = document.querySelector(".collection-info-bar-progress");
                    var percentTime, step, tick;

                    function startProgressbar() {
                        resetProgressbar();
                        percentTime = 0;
                        isPaused = false;
                        tick = window.setInterval(increase, interval);

                        updateStatus();
                    }

                    function increase() {
                        if (!isPaused) {
                            step = (duration * 1000) / interval;
                            percentTime += 100 / step;
                            progressBar.style.width = percentTime + "%";
                            if (percentTime >= 100) {
                                flktyCollection.next();
                                startProgressbar();
                            }
                        }
                    }

                    function resetProgressbar() {
                        progressBar.style.width = 0 + "%";
                        clearTimeout(tick);
                        updateStatus();
                    }

                    startProgressbar();

                },
            },












            {
                // Actions taken when certain page is viewed.
                namespace: 'home',

                // Available hooks…

                beforeLeave(data) {

                },

                afterLeave(data) {

                },

                beforeEnter(data) {

                },

                afterEnter(data) {
                    // setUpCarousel########################################################################################################################
                    var homeCarouselMain = document.querySelector('.home-carousel-main');
                    var homeCarouselContent = document.querySelectorAll('.home-carousel-content');
                    var homeflkty = new Flickity(homeCarouselMain, {
                        imagesLoaded: true,
                        percentPosition: false,

                        cellAlign: 'center',
                        contain: true,
                        wrapAround: true,
                        accessibility: true,
                        pageDots: false,
                        prevNextButtons: false,

                        autoPlay: false,
                        pauseAutoPlayOnHover: false,
                        arrowShape: {
                            x0: 10,
                            x1: 60,
                            y1: 50,
                            x2: 60,
                            y2: 45,
                            x3: 15
                        }
                    });
                    // animatingCarousel########################################################################################################################
                    // animatingImgTransition---------------------------------------------------------------------
                    var homeCarouselCells = homeCarouselMain.querySelectorAll('.home-carousel-cell img');
                    var docStyle = document.documentElement.style;
                    var transformProp = typeof docStyle.transform == 'string' ?
                        'transform' : 'WebkitTransform';

                    homeflkty.on('scroll', function () {
                        var sumSlides = homeflkty.slides.length;
                        homeflkty.slides.forEach(function (homeCarouselCell, i) {
                            var imgCell = homeCarouselCells[i];
                            var calculatCell = (homeCarouselCell.target + homeflkty.x) * -1 / 2;
                            // imgCell.style[transformProp] = 'translateX(' + x + 'px)';
                            TweenMax.to(imgCell, 0, {
                                x: calculatCell
                            });
                        });
                    });
                    // animatingImgScala---------------------------------------------------------------------
                    // homeflkty.on('dragStart', function () {
                    //   TweenMax.to(homeCarouselCells, 1, {
                    //     scale: (1.1, 1.1)
                    //   });
                    // });
                    // homeflkty.on('dragEnd', function () {
                    //   TweenMax.to(homeCarouselCells, 1, {
                    //     scale: (1, 1)
                    //   });
                    // });
                    homeflkty.on('scroll', function () {
                        TweenMax.fromTo(homeCarouselCells, 3, {
                            scale: (1.1, 1.1)
                        },
                            {
                                scale: (1, 1)
                            });

                    });
                    // TweenMax.to(".home-carousel-main img", 4, {
                    //   scale: (1.1, 1.1),
                    //   yoyo: true,
                    //   repeat: -1,
                    //   repeatDelay: 1.5
                    // });
                    // animatingImgParallax---------------------------------------------------------------------
                    // $("body").mousemove(function (e) {
                    //   parallaxIt(e, ".home-carousel-main img", -50);
                    // });
                    // function parallaxIt(e, target, movement) {
                    //   var $this = $("body");
                    //   var relX = e.pageX - $this.offset().left;
                    //   var relY = e.pageY - $this.offset().top;

                    //   TweenMax.to(target, 1.5, {
                    //     x: ((relX - $this.width() / 2) / $this.width()) * movement,
                    //     y: ((relY - $this.height() / 2) / $this.height()) * movement
                    //   });
                    // }
                    // animating ImgContent---------------------------------------------------------------------
                    // if (homeflkty.selectedIndex + 1 == sumSlides) {
                    // } else {
                    // }

                    homeflkty.on('scroll', function () {
                        homeCarouselContent.forEach(function (homeCarouselContent, i) {
                            TweenMax.fromTo(homeCarouselContent, 0.5, {
                                opacity: 0,
                                y: 50
                            }, {
                                y: 0,
                                opacity: 1
                            });
                        });
                    });
                    // status####################################################################################################################################
                    var homeCarouselStatus = document.querySelector('.home-carousel-status');
                    var homeCarouselStatusLength = document.querySelector('.home-carousel-status-length');
                    function homeUpdateStatus() {
                        var homeslideNumber = homeflkty.selectedIndex + 1;
                        // homeCarouselStatus.textContent = homeslideNumber + '/' + homeflkty.slides.length;
                        homeCarouselStatus.textContent = homeslideNumber;
                        homeCarouselStatusLength.textContent = homeflkty.slides.length;
                        TweenMax.fromTo(homeCarouselStatus, 0.5, {
                            opacity: 0,
                            y: 5,
                        }, {
                            y: 0,
                            opacity: 1

                        });
                    }
                    homeUpdateStatus();
                    homeflkty.on('select', homeUpdateStatus);
                    // progressBar####################################################################################################################################
                    var homeDuration = 3;
                    var homeInterval = 3;
                    const homeCarouselProgressBar = document.querySelector('.home-carousel-progress-bar');
                    var homePercentTime, homeStep, homeTick;

                    function homeStartProgressbar() {
                        homeResetProgressbar();
                        homePercentTime = 0;
                        isPaused = false;
                        homeTick = window.setInterval(homeIncrease, homeInterval);

                        homeUpdateStatus();
                    };
                    function homeIncrease() {
                        if (!isPaused) {
                            homeStep = (homeDuration * 1000) / homeInterval;
                            homePercentTime += 100 / homeStep;
                            homeCarouselProgressBar.style.width = homePercentTime + "%";
                            if (homePercentTime >= 100) {
                                homeflkty.next();
                                homeStartProgressbar();
                            }
                        }
                    }
                    function homeResetProgressbar() {
                        homeCarouselProgressBar.style.width = 0 + '%';
                        clearTimeout(homeTick);
                        homeUpdateStatus();
                    }
                    homeStartProgressbar();
                    homeflkty.on('select', homeStartProgressbar);
                    // arrowButton####################################################################################################################################
                    var homeCarouselButtonPrevious = document.querySelector(".home-carousel-button-previous");
                    homeCarouselButtonPrevious.addEventListener("click", function () {
                        homeflkty.previous();
                    });
                    // next
                    var homeCarouselButtonNext = document.querySelector(".home-carousel-button-next");
                    homeCarouselButtonNext.addEventListener("click", function () {
                        homeflkty.next();
                    });











                },
            },









            // View Index .........................................................................................................................
            {
                // Actions taken when certain page is viewed.
                namespace: 'model',

                // Available hooks…

                beforeLeave(data) {

                },

                afterLeave(data) {

                },

                beforeEnter(data) {

                },

                afterEnter(data) {
                    // model-carousel #########################################################################################
                    var modelCarouselMain = document.querySelector(".model-carousel-main");
                    var flktyMain = new Flickity(modelCarouselMain, {
                        //   asNavFor: ".carousel-nav",
                        contain: false,
                        pageDots: true
                    });

                    var modelCarouselNav = document.querySelector(".model-carousel-nav");
                    var flktyNav = new Flickity(modelCarouselNav, {
                        asNavFor: ".model-carousel-main",
                        contain: false,
                        pageDots: false,
                        prevNextButtons: false
                    });




                    $(".model-plusminus").numberPicker();

                },
            },









            // View Index .........................................................................................................................
            {
                // Actions taken when certain page is viewed.
                namespace: 'cart',

                // Available hooks…

                beforeLeave(data) {

                },

                afterLeave(data) {

                },

                beforeEnter(data) {

                },

                afterEnter(data) {

                    // cart-carousel #########################################################################################

                    // var carouselMainCart = document.querySelector(".carousel-main-cart");
                    // var flktyMainCart = new Flickity(carouselMainCart, {
                    //   contain: true,
                    //   draggable: false,
                    //   pageDots: true,
                    //   fade: false,
                    //   prevNextButtons: true
                    // });

                    var utils = window.fizzyUIUtils;

                    var carouselMainCart = document.querySelector(".carousel-main-cart");
                    var flktyMainCart = new Flickity(carouselMainCart, {
                        contain: true,
                        draggable: false,
                        fade: true,
                        selectedAttraction: 0.2,
                        friction: 0.8,
                        prevNextButtons: false,
                        pageDots: false
                    });
                    var progressBarCart = document.querySelector(".progress-bar-cart");
                    flktyMainCart.on("scroll", function (progress) {
                        progress = Math.max(0, Math.min(1, progress));
                        progressBarCart.style.width = progress * 100 + "%";
                    });
                    var carouselStatus = document.querySelector(".carousel-status-cart");
                    var sizefl = flktyMainCart.cells.length;
                    // console.log(sizefl);
                    flktyMainCart.on("select", function (index) {
                        // console.log(index);
                        carouselStatus.innerHTML = index + 1;
                        if (index > 0) {
                            TweenMax.to(".left-icon", 0.3, {
                                opacity: 1
                            });
                        }
                        if (index == 0) {
                            TweenMax.to(".left-icon", 0.3, {
                                opacity: 0.2
                            });
                        }
                        if (index == sizefl - 1) {
                            TweenMax.to(".finish-icon", 0.3, {
                                opacity: 1,
                                top: 0
                            });
                        }
                        if (index < sizefl - 1) {
                            TweenMax.to(".finish-icon", 0.3, {
                                opacity: 0,
                                top: 100
                            });
                        }
                        // if (document.querySelector(".chekkk").value == "") {
                        //   TweenMax.to(".right-icon", 0.3, {
                        //     opacity: 0.2
                        //   })
                        // }
                        // if (document.querySelector(".chekkk").value != "") {
                        //   document.querySelector(".right-icon").disabled = true;
                        //   TweenMax.to(".right-icon", 0.3, {
                        //     opacity: 1
                        //   });
                        // }
                    });

                    // elements
                    var cellsButtonGroup = document.querySelector(".button-group-cells-cart");
                    var cellsButtons = utils.makeArray(cellsButtonGroup.children);

                    // update buttons on select
                    flktyMainCart.on("select", function () {
                        var previousSelectedButton = cellsButtonGroup.querySelector(".is-selected");
                        var selectedButton = cellsButtonGroup.children[flktyMainCart.selectedIndex];
                        previousSelectedButton.classList.remove("is-selected");
                        selectedButton.classList.add("is-selected");
                    });

                    // cell select
                    cellsButtonGroup.addEventListener("click", function (event) {
                        if (!matchesSelector(event.target, ".button-cart")) {
                            return;
                        }
                        var index = cellsButtons.indexOf(event.target);
                        flktyMainCart.select(index);
                    });
                    // previous
                    var previousButton = document.querySelector(".button-previous-cart");
                    previousButton.addEventListener("click", function () {
                        flktyMainCart.previous();
                    });
                    // next
                    var nextButton = document.querySelector(".button-next-cart");
                    nextButton.addEventListener("click", function () {
                        flktyMainCart.next();
                    });

                    // var carouselNavCart = document.querySelector(".carousel-nav-cart");
                    // var flktyNavCart = new Flickity(carouselNavCart, {
                    //   asNavFor: ".carousel-main-cart",
                    //   pageDots: false,
                    //   contain: true,
                    //   prevNextButtons: false
                    // });

                    var carouselCart = document.querySelector(".carousel-cart");
                    var flktyCart = new Flickity(carouselCart, {
                        // contain: true,
                        pageDots: false,
                        prevNextButtons: false
                    });
                    // var progressBarCart = document.querySelector(".progress-bar-cart");
                    // flktyCart.on("scroll", function(progress) {
                    //   progress = Math.max(0, Math.min(1, progress));
                    //   progressBarCart.style.width = progress * 100 + "%";
                    // });





                    //Number Picker Plugin - TobyJ

                    (function ($) {
                        $.fn.numberPicker = function () {
                            var dis = "disabled";
                            return this.each(function () {
                                var picker = $(this),
                                    p = picker.find("button:last-child"),
                                    m = picker.find("button:first-child"),
                                    input = picker.find("input"),
                                    min = parseInt(input.attr("min"), 10),
                                    max = parseInt(input.attr("max"), 10),
                                    inputFunc = function (picker) {
                                        var i = parseInt(input.val(), 10);
                                        if (i <= min || !i) {
                                            input.val(min);
                                            p.prop(dis, false);
                                            m.prop(dis, true);
                                        } else if (i >= max) {
                                            input.val(max);
                                            p.prop(dis, true);
                                            m.prop(dis, false);
                                        } else {
                                            p.prop(dis, false);
                                            m.prop(dis, false);
                                        }
                                    },
                                    changeFunc = function (picker, qty) {
                                        var q = parseInt(qty, 10),
                                            i = parseInt(input.val(), 10);
                                        if ((i < max && q > 0) || (i > min && !(q > 0))) {
                                            input.val(i + q);
                                            inputFunc(picker);
                                        }
                                    };
                                m.on("click", function () {
                                    changeFunc(picker, -1);
                                });
                                p.on("click", function () {
                                    changeFunc(picker, 1);
                                });
                                input.on("change", function () {
                                    inputFunc(picker);
                                });
                                inputFunc(picker); //init
                            });
                        };
                    });

                    // $(".plusminus").numberPicker();




                    // var fuc = document.querySelector(".chekkk");
                    // fuc.focus();







                    // contactFormBtn ########################################################################################################################################

                    var cartDiscountBtn = document.querySelector(".cart-discount-btn");
                    var cartOverlyClose = document.querySelector(".carousel-main-cart");
                    var cartOverlyFooter = document.querySelector(".cart-overly-footer");
                    // var contactFormoOverlySize = parseInt($(".contact-form-overly").css("bottom"));

                    var tlCartDiscountBtn = new TimelineMax({ paused: true });

                    tlCartDiscountBtn.to(".cart-discount-overly", 0.5, {
                        bottom: "0%",
                        ease: Expo.easeInOute
                    }, 0.2);


                    tlCartDiscountBtn.reverse();
                    cartDiscountBtn.addEventListener("click", () => {
                        tlCartDiscountBtn.reversed(!tlCartDiscountBtn.reversed());
                        console.log(cartDiscountOverlyComplete());
                        TweenMax.to(cartOverlyFooter, 0.5, {
                            bottom: "-150px", ease: Expo.easeInOute
                        });
                    });

                    function cartDiscountOverlyComplete() {
                        var cartDiscountOverlySize = parseInt($(".cart-discount-overly").css("bottom"));
                        return cartDiscountOverlySize;
                    }

                    cartOverlyClose.addEventListener("click", () => {
                        if ((cartDiscountOverlyComplete() == 0)) {
                            tlCartDiscountBtn.reversed(!tlCartDiscountBtn.reversed());
                            console.log(cartDiscountOverlyComplete());
                            TweenMax.to(cartOverlyFooter, 0.5, {
                                bottom: "0%", ease: Expo.easeInOute
                            });
                        }
                    });





                    // -------------------------------------------------------------
                    $(document).ready(function () {
                        $('.codeInput').codeInput({
                            number: 6
                        });
                    });

                    jQuery.fn.codeInput = function (options) {

                        var defaults = {
                            number: 4,
                            length: 1
                        };

                        var settings = $.extend({}, defaults, options);

                        return this.each(function () {

                            var self = $(this);
                            var placeholder = self.attr('placeholder');
                            var div = $('<div />').addClass('codeInput-container');

                            div.append($('<span />').text(placeholder));

                            self.replaceWith(div);

                            div.append(self);

                            var inputDiv = $('<div />').addClass('inputs');

                            for (var i = 1; i <= settings.number; i++) {
                                inputDiv.append($('<input />').attr({
                                    maxlength: settings.length
                                }));
                            }

                            div.prepend(inputDiv);

                            div.on('click touchstart', function (e) {
                                if (!div.hasClass('active')) {
                                    div.addClass('active');
                                    setTimeout(function () {
                                        div.find('.inputs input:first-child').focus();
                                    }, 400);
                                }
                            });

                            div.find('.inputs').on('keyup input', 'input', function (e) {
                                if ($(this).val().toString().length >= settings.length || e.keyCode == 39) {
                                    $(this).next().focus();
                                }
                                if (e.keyCode == 8 || e.keyCode == 37) {
                                    $(this).prev().focus();
                                }
                                var value = '';
                                div.find('.inputs input').each(function () {
                                    value = value + $(this).val().toString();
                                });
                                self.attr({
                                    value: value
                                });
                            });

                            $(document).on('click touchstart', function (e) {
                                if (!$(e.target).parent().is(div) && !$(e.target).parent().parent().is(div)) {
                                    var hide = true;
                                    div.find('.inputs input').each(function () {
                                        if ($(this).val().toString().length) {
                                            hide = false;
                                        }
                                    });
                                    if (hide) {
                                        div.removeClass('active');
                                        div.find('.inputs input').blur();
                                    } else {
                                        div.addClass('active');
                                    }
                                }
                            });

                        });

                    }
                },
            },


            // More cases here

        ],


        // transitions: [

        //   {
        //     name: 'default',

        //     // Available hooks…
        //     beforeOnce(current, next, trigger) {

        //     },

        //     once(current, next, trigger) {

        //     },

        //     afterOnce(current, next, trigger) {

        //     },

        //     beforeLeave(current, next, trigger) {

        //     },

        //     leave(current, next, trigger) {

        //       var leavePromise = new Promise(function (resolve) {

        //         // var outTransition = new TimelineMax();
        //         // outTransition
        //         //   .to('.transit-overlay-simple', 0.75, {
        //         //     scaleY: 1,
        //         //     ease: "power2.in"
        //         //   })
        //         //   .then(function () {
        //         //     resolve();
        //         //   })

        //         // var outTransition = new TimelineMax();
        //         // outTransition
        //         //   .to('.transit-overlay-simple', 0.75, {
        //         //     scaleY: 1,
        //         //     ease: "power2.in",
        //         //     onComplete: () => {
        //         //       resolve();
        //         //     }
        //         //   })
        //         //   .to('.transit-overlay-simple', 1, {
        //         //     scaleY: 0,
        //         //     ease: "power2.out",
        //         //     onComplete: () => {
        //         //       resolve();
        //         //     }
        //         //   })

        //         var tl = new TimelineMax();
        //         tl.to(".loading-screen", 1.2, {
        //           height: "100%",
        //           top: "0%",
        //           ease: "Expo.easeInOut",
        //           onComplete: () => {
        //             resolve();
        //           }
        //         });

        //         tl.to(".loading-screen", 1, {
        //           height: "100%",
        //           top: "100%",
        //           ease: "Expo.easeInOut",
        //           delay: 0.3,
        //           onComplete: () => {
        //             resolve();
        //           }
        //         });
        //         tl.set(".loading-screen", {
        //           top: "-100%",
        //           onComplete: () => {
        //             resolve();
        //           }
        //         });

        //       });

        //       return leavePromise;

        //     },

        //     afterLeave(current, next, trigger) {

        //     },

        //     beforeEnter(current, next, trigger) {

        //     },

        //     enter(current, next, trigger) {

        //     },

        //     afterEnter(current, next, trigger) {

        //       // var afterEnterPromise = new Promise(function (resolve) {

        //       //   var inTransition = new TimelineMax();
        //       //   inTransition
        //       //     .to('.transit-overlay-simple', 1, {
        //       //       scaleY: 0,
        //       //       ease: "power2.out",
        //       //       onComplete: () => {
        //       //         resolve();
        //       //       }
        //       //     })
        //       // });

        //       // return afterEnterPromise;

        //     },

        //   },

        //   // More cases here

        // ],









    });

}









// ... Check if destination-page is same as origin-page before transitioning ..................................................................................

// DOES NOT need re-initiation on page-transition

function transitionCheckupOutside() {

    var links = document.querySelectorAll('a[href]:not([target="_blank"])');

    var cbk = function (e) {
        if (!$(this).parents("main").length > 0) {


            if (e.currentTarget.href === window.location.href) {

                e.preventDefault();
                e.stopPropagation();


            } else {
                if ($('body').hasClass('first-load')) {
                    $('body').removeClass('first-load');
                }
            }
        }
    };

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', cbk);
    }

}





// DOES NEED re-initiation on page-transition

function transitionCheckupInside() {

    var links = document.querySelectorAll('main a[href]:not([target="_blank"])');

    var cbk = function (e) {

        if (e.currentTarget.href === window.location.href) {

            e.preventDefault();
            e.stopPropagation();

        } else {
            if ($('body').hasClass('first-load')) {
                $('body').removeClass('first-load');
            }
        }
    };

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', cbk);
    }

}





// Refire- & Destroy-Functions on Page-Transit......................................................................................................................

// Refire functions that have to be refired for EVERY namespace ...........................................................

function initRefireCallbacks() {


    // transitionCheckupOutside();	// MUSTN'T Be re-initiated for e.g. Nav-Links that are being transferred over from before new-page-load
    transitionCheckupInside(); // NEEDS TO Be re-initiated for e.g. Text-Links in DOM that are being loaded fresh from scratch on page-load - DOES IT STILL !?

}
