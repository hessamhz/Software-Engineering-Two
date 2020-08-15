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