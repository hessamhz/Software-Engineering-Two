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
    // var carouselStatus = document.querySelectorAll('.carousel-status');
    // flkty.on( 'select', function( carousel ) {
    //   for (var j = 0; j < carouselStatus.length; j++) {
    //         carouselStatus[j].innerHTML = carousel+1;
    //   }
    // });

    // var carouselStatus = document.querySelector('.carousel-status');
    // flktyNav.on( 'select', function( carousel ) {
    //         carouselStatus.innerHTML = carousel+1;
    // });

    // var carouselStatus = document.querySelectorAll('.carousel-status');
    // flkty.on( 'select', function( index ) {
    //   console.log('Flickity select ' + index );
    //   for (var j = 0; j < carouselStatus.length; j++) {
    //         carouselStatus[j].innerHTML = index+1;
    //   }
    //
    // });

    // var carouselCunt = document.querySelectorAll('.carousel-cunt');
    // console.log(flkty.slides.length);
    // for (var r = 0; r < 2; r++) {
    // carouselCunt[r].innerHTML = carousel.length;
    // }

    // var carouselCunt = Array.prototype.slice.call( document.querySelectorAll ('.carousel-cunt') );
    //
    //
    //   carouselCunt[0].innerHTML = flkty.slides.length;
    //   console.log(carouselCunt);
    var carouselCunt = document.querySelectorAll(".carousel-cunt");
    var mm = flkty.cells.length;
    console.log(mm);
});

// var count = flkty.slides.length - 1;

// flkty.on('scroll', progress => {
//   moveParallaxLayer(background, bgRatio, progress);
// });

// flkty.on('change', index => {
//   highlightTitle(index);
// });

// trigger initial scroll
// flkty.reposition();
// highlightTitle(sliderIndex);

// function moveParallaxLayer(layer, layerRatio, progress) {
//   layer.style.left = (0.5 - (0.5 + progress * count) * cellRatio * layerRatio) * 100 + '%';
// }

// function scrollProgress(progress) {
//
// }

// function skewText(dragX) {
//   let dragStart = Math.round(dragX);
//   let windowWidth = window.innerWidth;
//   let percent = dragStart / windowWidth * 100;
//   let rounded = Math.round(percent);
//
//   if (percent > lastPercent) {
//     upDateTextSkew(Math.round(0.2 * rounded));
//   } else {
//     upDateTextSkew(Math.round(0.2 * (100 - rounded)) * -1);
//   }
//
//   lastPercent = percent;
// }

// function upDateTextSkew(skew) {
//   titleContain.style.transform = `skew(${skew}deg)`;
// }
// var carouselStatus = document.querySelector('.carousel-status');
// function updateStatus() {
//   var slideNumber = flkty.selectedIndex + 1;
//   carouselStatus.innerHTML = slideNumber + ' / ' + flkty.slides.length;
// }
// updateStatus();
// flkty.on( 'select', updateStatus );

// var progressBar = document.querySelector('.progress-bar');
// flkty.on( 'scroll', function( progress ) {
//   progress = Math.max( 0, Math.min( 1, progress ) );
//   progressBar.style.width = progress * 100 + '%';
// });