// contactFormBtn ########################################################################################################################################

var contactFormBtn = document.querySelector(".contact-form-btn");
var contactFormOverlyClose = document.querySelector(".img-map");
// var contactFormoOverlySize = parseInt($(".contact-form-overly").css("bottom"));

var tlContactFormBtn = new TimelineMax({ paused: true });
// tlCartBtn.to(
//   ".cart-btn-one",
//   0.2,
//   { y: 7, transformOrigin: "50% , 50%", rotation: 45, ease: Expo.easeInOut },
//   0.1
// );
tlContactFormBtn.to(".contact-form-overly", 0.5, {
    bottom: "0%",
    ease: Expo.easeInOute
}, 0.2);
// tlContactFormBtn.staggerFrom(
//   ".cart-overly ul li",
//   0.8,
//   { x: -200, opacity: 0, ease: Expo.easeOute },
//   0.2
// );

// bodyyy.addEventListener("click", () => {
//     tlContactFormBtn.reversed(!tlContactFormBtn.reversed());
// });
tlContactFormBtn.reverse();
contactFormBtn.addEventListener("click", () => {
    tlContactFormBtn.reversed(!tlContactFormBtn.reversed());
    console.log(contactFormoOverlyComplete());
    TweenMax.to(contactFormBtn, 0.5, {
        bottom: "-150px", ease: Expo.easeInOute
    });
    TweenMax.to(socialMedia, 0.5, {
        bottom: "-150px", ease: Expo.easeInOute
    });
});

function contactFormoOverlyComplete() {
    var contactFormoOverlySize = parseInt($(".contact-form-overly").css("bottom"));
    return contactFormoOverlySize;
}

contactFormOverlyClose.addEventListener("click", () => {
    if ((contactFormoOverlyComplete() == 0)) {
        tlContactFormBtn.reversed(!tlContactFormBtn.reversed());
        console.log(contactFormoOverlyComplete());
        TweenMax.to(contactFormBtn, 0.5, {
            bottom: "25px", ease: Expo.easeInOute
        });
        TweenMax.to(socialMedia, 0.5, {
            bottom: "25px", ease: Expo.easeInOute
        });
    }
});


// if ((contactFormoOverlyComplete() == 0)) {
//     TweenMax.to(contactFormBtn, 1, {
//         bottom: "100%", ease: Expo.easeInOute
//     });
// }








var contactFormCarouseluUtils = window.fizzyUIUtils;
// contactFormCarousel ########################################################################################################################################
var contactFormCarouselMain = document.querySelector(".contact-form-carousel-main");
var flktyContactFormCarouselMain = new Flickity(contactFormCarouselMain, {
    contain: true,
    draggable: false,
    fade: true,
    selectedAttraction: 0.2,
    friction: 0.8,
    prevNextButtons: false,
    pageDots: false
});

var contactFormCarouselProgressBar = document.querySelector(".contact-form-carousel-progress-bar");
flktyContactFormCarouselMain.on("scroll", function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    contactFormCarouselProgressBar.style.width = progress * 100 + "%";
});





var contactFormCarouselStatus = document.querySelector(".contact-form-carousel-status");
var contactFormCarouselMainSizeFl = flktyContactFormCarouselMain.cells.length;
// console.log(contactFormCarouselMainSizeFl);
flktyContactFormCarouselMain.on("select", function (index) {
    // console.log(index);
    contactFormCarouselStatus.innerHTML = index + 1;
    if (index > 0) {
        TweenMax.to(".contact-form-carousel-left-icon", 0.3, {
            opacity: 1
        });
    }
    if (index == 0) {
        TweenMax.to(".contact-form-carousel-left-icon", 0.3, {
            opacity: 0.2
        });
    }
    if (index == contactFormCarouselMainSizeFl - 1) {
        TweenMax.to(".contact-form-carousel-finish-icon", 0.3, {
            opacity: 1,
            top: 0
        });
    }
    if (index < contactFormCarouselMainSizeFl - 1) {
        TweenMax.to(".contact-form-carousel-finish-icon", 0.3, {
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
var contactFormCarouselButtonGroupCells = document.querySelector(".contact-form-carousel-button-group-cells");
var contactFormCarouselCellsButtons = contactFormCarouseluUtils.makeArray(contactFormCarouselButtonGroupCells.children);

// update buttons on select
flktyContactFormCarouselMain.on("select", function () {
    var contactFormCarouselPreviousSelectedButton = contactFormCarouselButtonGroupCells.querySelector(".contact-form-carousel-is-selected");
    var contactFormCarouselSelectedButton = contactFormCarouselButtonGroupCells.children[flktyContactFormCarouselMain.selectedIndex];
    contactFormCarouselPreviousSelectedButton.classList.remove("contact-form-carousel-is-selected");
    contactFormCarouselSelectedButton.classList.add("contact-form-carousel-is-selected");
});

// cell select
contactFormCarouselButtonGroupCells.addEventListener("click", function (event) {
    if (!matchesSelector(event.target, ".contact-form-carousel-button")) {
        return;
    }
    var contactFormCarouselIndex = contactFormCarouselCellsButtons.indexOf(event.target);
    flktyContactFormCarouselMain.select(contactFormCarouselIndex);
});



// previous
var contactFormCarouselButtonPrevious = document.querySelector(".contact-form-carousel-button-previous");
contactFormCarouselButtonPrevious.addEventListener("click", function () {
    flktyContactFormCarouselMain.previous();
});
// next
var contactFormCarouselButtonNext = document.querySelector(".contact-form-carousel-button-next");
contactFormCarouselButtonNext.addEventListener("click", function () {
    flktyContactFormCarouselMain.next();
});