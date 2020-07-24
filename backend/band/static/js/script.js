// EXTEND jQuery
$.js = function(el) {
  return $("[data-js=" + el + "]");
};

/**
 *
 * @param d
 * @returns {string}
 * @private
 */
function _pad(d) {
  return d < 10 ? "0" + d.toString() : d.toString();
}

var _img;
function isImageOk(img) {
  _img = img.data("img");
  if (typeof _img === "undefined") {
    var _img = new Image();
    _img.src = img.attr("src");
    img.data("img", _img);
  }
  if (!_img.complete) {
    return false;
  }
  if (typeof _img.naturalWidth !== "undefined" && _img.naturalWidth === 0) {
    return false;
  }
  return true;
}
var imagesToLoad = null;

(function($) {
  $.fn.queueLoading = function() {
    var maxLoading = 2;
    var images = $(this);
    if (imagesToLoad === null || imagesToLoad.length === 0) {
      imagesToLoad = images;
    } else {
      imagesToLoad = imagesToLoad.add(images);
    }
    var imagesLoading = null;

    function checkImages() {
      imagesLoading = imagesToLoad.filter(".is-loading");
      imagesLoading.each(function() {
        var image = $(this);
        if (isImageOk(image)) {
          image.addClass("is-loaded").removeClass("is-loading");
          image.trigger("loaded");
        }
      });
      imagesToLoad = images.not(".is-loaded");
      loadNextImages();
    }

    function loadNextImages() {
      imagesLoading = imagesToLoad.filter(".is-loading");
      var nextImages = imagesToLoad.slice(0, maxLoading - imagesLoading.length);
      nextImages.each(function() {
        var image = $(this);
        if (image.hasClass("is-loading")) return;
        image.attr("src", image.attr("data-src"));
        image.addClass("is-loading");
      });
      if (imagesToLoad.length != 0) setTimeout(checkImages, 25);
    }

    checkImages();
  };
})(jQuery);

var slideshow,
  slideshowDuration = 4000,
  loaderAnim = true;

/**
 * cities slider - prev/next
 */
function sliderArrows() {
  $(".slideshow .arrows .arrow").on("click", function() {
    TweenMax.to($(".page.is-active i.is-animating"), 1, { x: "101%" });
    slideshowNext(
      $(this).closest(".slideshow"),
      $(this).hasClass("prev"),
      true
    );
    loaderAnim = true;
  });

  $(".slideshow").each(function() {
    var $this = $(this);
    var mc = new Hammer(this);
    mc.on("swipe", function(ev) {
      if (ev.direction === 4) {
        slideshowNext($(ev.target).closest(".slideshow"), true, true);
      } else if (ev.direction === 2) {
        slideshowNext($(ev.target).closest(".slideshow"), false, true);
      } else {
        return false;
      }
    });
  });
}

/**
 * cities slider - pages/nav
 */
function sliderPages() {
  $(".slideshow .pages .page").on("click", function() {
    TweenMax.to($(".page.is-active i.is-animating"), 1, { x: "101%" });
    slideshowSwitch($(this).closest(".slideshow"), $(this).index(), true);
    loaderAnim = true;
  });

  $(".slideshow .pages").on("check", function() {
    var pages = $(this).find(".page"),
      index = slideshow.find(".slides .is-active").index(),
      gg;
    count = index + 1;
    pages.removeClass("is-active");
    pages.eq(index).addClass("is-active");
    $(".textt").text(count);
    TweenMax.from(".textt", 0.5, {
      y: 15
    });
    // $(".image-container").addClass("img-scale-anim");
    sliderNavloader();
  });
}

/**
 * home slider
 */
function homeSlider() {
  /**
   * first call loader on slider navigation
   */
  sliderNavloader();

  /**
   * preload slider images
   */
  $("img.queue-loading").queueLoading();

  $('[data-js="city-slider"]').each(function() {
    slideshow = $(this);
    var images = slideshow.find(".image").not(".is-loaded");
    images.on("loaded", function() {
      var image = $(this);
      var slide = image.closest(".slide");
      slide.addClass("is-loaded");
    });
    images.queueLoading();
    var timeout = setTimeout(function() {
      slideshowNext(slideshow, false, true);
      loaderAnim = true;
    }, slideshowDuration);
    slideshow.data("timeout", timeout);
  });
}

/**
 *
 * @param slideshow
 * @param index
 * @param auto
 */
function slideshowSwitch(slideshow, index, auto) {
  if (slideshow.data("wait")) {
    return;
  }
  var slides = slideshow.find(".slide"),
    pages = slideshow.find(".pages"),
    activeSlide = slides.filter(".is-active"),
    activeSlideImage = activeSlide.find(".image-container"),
    newSlide = slides.eq(index),
    newSlideImage = newSlide.find(".image-container"),
    newSlideContent = newSlide.find(".slide__slide-content"),
    newSlideElements = newSlide.find(".slide__slide-content > *"),
    timeout = slideshow.data("timeout"),
    transition = slideshow.attr("data-transition");

  if (newSlide.is(activeSlide)) {
    return;
  }
  newSlide.addClass("is-new");
  clearTimeout(timeout);
  slideshow.data("wait", true);

  if (transition === "fade") {
    newSlide.css({ display: "block", zIndex: 0 });
    newSlideImage.css({ opacity: 0 });
    TweenMax.to(newSlideImage, 1, {
      alpha: 1,
      onComplete: function() {
        newSlide.addClass("is-active").removeClass("is-new");
        activeSlide.removeClass("is-active");
        newSlide.css({ display: "", zIndex: "" });
        newSlideImage.css({ opacity: "" });
        slideshow.find(".pages").trigger("check");
        slideshow.data("wait", false);
        if (auto) {
          timeout = setTimeout(function() {
            slideshowNext(slideshow, false, true);
          }, slideshowDuration);
          slideshow.data("timeout", timeout);
        }
      }
    });
  } else if (transition === "transform") {
    // TODO
  } else {
    if (newSlide.index() > activeSlide.index()) {
      var newSlideRight = 0,
        newSlideLeft = "auto",
        newSlideImageRight = -slideshow.width() / 8,
        newSlideImageLeft = "auto",
        newSlideImageToRight = 0,
        newSlideImageToLeft = "auto",
        newSlideContentLeft = "auto",
        newSlideContentRight = 0,
        activeSlideImageLeft = -slideshow.width() / 4;
    } else {
      var newSlideRight = "",
        newSlideLeft = 0,
        newSlideImageRight = "auto",
        newSlideImageLeft = -slideshow.width() / 8,
        newSlideImageToRight = "",
        newSlideImageToLeft = 0,
        newSlideContentLeft = 0,
        newSlideContentRight = "auto",
        activeSlideImageLeft = slideshow.width() / 4;
    }

    newSlide.css({
      display: "block",
      width: 0,
      right: newSlideRight,
      left: newSlideLeft,
      zIndex: 2
    });
    newSlideImage.css({
      width: slideshow.width(),
      right: newSlideImageRight,
      left: newSlideImageLeft
    });
    newSlideContent.css({
      width: slideshow.width(),
      left: newSlideContentLeft,
      right: newSlideContentRight
    });
    activeSlideImage.css({ left: 0 });

    TweenMax.set(newSlideElements, { y: 20, force3D: true });
    TweenMax.to(activeSlideImage, 1, {
      left: activeSlideImageLeft,
      ease: Expo.easeInOut
    });
    TweenMax.to(newSlide, 1, {
      width: slideshow.width(),
      ease: Expo.easeInOut
    });
    TweenMax.to(newSlideImage, 1, {
      right: newSlideImageToRight,
      left: newSlideImageToLeft,
      ease: Expo.easeInOut
    });
    // key
    // TweenMax.to(".image-containerr", 1, {
    //   left: slideshow.height(),

    //   onComplete: function() {
    //     TweenMax.to(".image-containerr", 1, {
    //       left: -slideshow.height()
    //     });
    //   },
    //   ease: Expo.easeInOut
    // });

    TweenMax.staggerFromTo(
      newSlideElements,
      0.8,
      { alpha: 0, y: 60 },
      {
        alpha: 1,
        y: 0,
        ease: Expo.easeOut,
        force3D: true,
        delay: 0.6
      },
      0.1,
      function() {
        newSlide.addClass("is-active").removeClass("is-new");
        activeSlide.removeClass("is-active");
        newSlide.css({ display: "", width: "", left: "", zIndex: "" });
        newSlideImage.css({ width: "", right: "", left: "" });
        newSlideContent.css({ width: "", left: "" });
        newSlideElements.css({ opacity: "", transform: "" });
        activeSlideImage.css({ left: "" });
        slideshow.find(".pages").trigger("check");
        slideshow.data("wait", false);
        if (auto) {
          timeout = setTimeout(function() {
            slideshowNext(slideshow, false, true);
          }, slideshowDuration);
          slideshow.data("timeout", timeout);
        }
      }
    );
  }

  /**
   * update counter
   */
  $.js("counter-from").html(_pad(newSlide.index() + 1));
}

/**
 *
 * @param slideshow
 * @param previous
 * @param auto
 */
function slideshowNext(slideshow, previous, auto) {
  var slides = slideshow.find(".slide"),
    activeSlide = slides.filter(".is-active"),
    newSlide = null;
  if (previous) {
    newSlide = activeSlide.prev(".slide");
    if (newSlide.length === 0) {
      newSlide = slides.last();
    }
  } else {
    newSlide = activeSlide.next(".slide");
    if (newSlide.length === 0) {
      newSlide = slides.filter(".slide").first();
    }
  }

  slideshowSwitch(slideshow, newSlide.index(), auto);
}

/**
 * loader on slider nav
 */
function sliderNavloader() {
  if ($(".page.is-active").length > 0) {
    var $self = $(".page.is-active i");
    $self.addClass("is-animating");

    TweenMax.fromTo(
      $self,
      4,
      { x: "-100%" },
      {
        x: "0%",
        onComplete: function() {
          if (loaderAnim === true) {
            TweenMax.to($self, 1, {
              x: "101%",
              onComplete: function() {
                // TweenMax.to($self, 0, { x: '-101%' });
                $self.removeClass("is-animating");
              }
            });
          }
        }
      }
    );
  }
}

TweenMax.to(".image-container", 4, {
  scale: (1.05, 1.05),
  yoyo: true,
  repeat: -1,
  repeatDelay: 1.5
  //   ease: Expo.easeBackOut
  // onComplete: function() {
  //   if (loaderAnim === true) {
  //     TweenMax.from(".image-container", 4, {
  //       scale: (1, 1.1),
  //       yoyo: true,
  //       repeat: -1,
  //       repeatDelay: 0.5,
  //       ease: Expo.easeOute
  //     });
  //   }
  // }
});
// $(".image-container").addClass("img-scale-anim");
$("body").mousemove(function(e) {
  parallaxIt(e, ".image-container", -50);
});
function parallaxIt(e, target, movement) {
  var $this = $("body");
  var relX = e.pageX - $this.offset().left;
  var relY = e.pageY - $this.offset().top;

  TweenMax.to(target, 1.5, {
    x: ((relX - $this.width() / 2) / $this.width()) * movement,
    y: ((relY - $this.height() / 2) / $this.height()) * movement
  });
}
//product
var product = new TimelineMax({ paused: true });
product.to(
  ".main",
  0.5,
  {
    y: "-100%",
    ease: Expo.easeInOut
  },
  "opac"
);
product.to(".product-overly", 0.5, {
  bottom: "0%",
  ease: Expo.easeInOute
});
product.to(
  ".slides",
  0.5,
  {
    opacity: 0,
    ease: Expo.easeInOut
  },
  "opac"
);
product.staggerFrom(
  ".carousel-cell",
  0.5,
  { y: 500, opacity: 0, ease: Expo.easeOute },
  0.08
);

// product.to(".product", 0.1, {
//   x: -137,
//   ease: Expo.easeInOut
// });
// product.to(".product", 0.8, {
//   y: 116,
//   ease: Expo.easeInOut
// });
// product.to(
//   ".product-one",
//   1,
//   {
//     y: "19",
//     ease: Expo.easeInOut
//   },
//   "cc"
// );
// product.to(
//   ".product-two",
//   1,
//   {
//     height: "15px",
//     // y: "-9",
//     ease: Expo.easeInOut
//   },
//   "cc"
// );
product.to(
  ".product-one",
  0.5,
  {
    y: "13",
    ease: Expo.easeInOut
  },
  "cc"
);
product.to(
  ".product-two",
  0.5,
  {
    opacity: 0,
    ease: Expo.easeInOut
  },
  "cc"
);
product.to(
  ".product-three",
  0.5,
  {
    // y: "-10",
    opacity: 0,
    ease: Expo.easeInOut
  },
  "cc"
);
product.to(
  ".product-four",
  0.5,
  {
    y: "13",
    ease: Expo.easeInOut
  },
  "cc"
);
product.reverse();
$(document).on("click", ".product", function() {
  product.reversed(!product.reversed());
});
//collection
var collection = new TimelineMax({ paused: true });
collection.to(
  ".main",
  0.8,
  {
    y: "-100%",
    ease: Expo.easeInOut
  },
  "opac"
);
collection.to(".collection-overly", 0.5, {
  bottom: "0%",
  ease: Expo.easeInOute
});

collection.to(
  ".slides",
  0.5,
  {
    opacity: 0,
    ease: Expo.easeInOut
  },
  "opac"
);
collection.from(".collection-info-bar", 0.5, { x: -500, ease: Expo.easeOute });
collection.from(".collection-info-bar-description", 0.5, {
  y: 500,
  ease: Expo.easeOute
});
collection.staggerFrom(
  ".carousel-cell-collection",
  0.5,
  { y: 500, opacity: 0, ease: Expo.easeOute },
  0.08
);

// collection.to(".collection", 0.1, {
//   x: 70,
//   ease: Expo.easeInOut
// });
// collection.to(".collection", 0.8, {
//   y: -800,
//   ease: Expo.easeInOut
// });
// collection.to(
//   ".collection-one",
//   1,
//   {
//     y: "19",
//     ease: Expo.easeInOut
//   },
//   "cc"
// );
// collection.to(
//   ".collection-two",
//   1,
//   {
//     height: "15px",
//     // y: "-9",
//     ease: Expo.easeInOut
//   },
//   "cc"
// );
collection.to(
  ".collection-one",
  1,
  {
    y: "13",
    ease: Expo.easeInOut
  },
  "cc"
);
collection.to(
  ".collection-two",
  1,
  {
    height: "15px",
    // y: "-9",
    ease: Expo.easeInOut
  },
  "cc"
);
collection.to(
  ".collection-three",
  1,
  {
    // y: "-10",
    opacity: 0,
    ease: Expo.easeInOut
  },
  "cc"
);
// collection.to(
//   ".collection-four",
//   1,
//   {
//     y: "-10",
//     opacity: 0,
//     ease: Expo.easeInOut
//   },
//   "cc"
// );
collection.reverse();
$(document).on("click", ".collection", function() {
  collection.reversed(!collection.reversed());
});
//menubBtn
var menuBtn = document.querySelector(".menu-btn");
var tlMenuBtn = new TimelineMax({ paused: true });
tlMenuBtn.to(
  ".menu-btn-one",
  0.2,
  { y: 7, transformOrigin: "50% , 50%", rotation: 45, ease: Expo.easeInOut },
  0.1
);
tlMenuBtn.to(
  ".menu-btn-two",
  0.2,
  { y: -7, transformOrigin: "50% , 50%", rotation: -45, ease: Expo.easeInOut },
  0.1
);
tlMenuBtn.to(".menu-overly", 0.5, { top: "0%", ease: Expo.easeInOute }, 0.2);
tlMenuBtn.staggerFrom(
  ".menu-overly ul li",
  0.8,
  { x: -200, opacity: 0, ease: Expo.easeOute },
  0.2
);
tlMenuBtn.reverse();
menuBtn.addEventListener("click", () => {
  tlMenuBtn.reversed(!tlMenuBtn.reversed());
});
//cartBtn
var cartBtn = document.querySelector(".cart-btn");
var tlCartBtn = new TimelineMax({ paused: true });
// tlCartBtn.to(
//   ".cart-btn-one",
//   0.2,
//   { y: 7, transformOrigin: "50% , 50%", rotation: 45, ease: Expo.easeInOut },
//   0.1
// );
tlCartBtn.to(
  ".cart-btn-two",
  0.2,
  {
    y: -2,

    height: "15px",
    transformOrigin: "50% , 50%",
    ease: Expo.easeInOut
  },
  0.1
);
tlCartBtn.to(".cart-overly", 0.5, { top: "0%", ease: Expo.easeInOute }, 0.2);
// tlCartBtn.staggerFrom(
//   ".cart-overly ul li",
//   0.8,
//   { x: -200, opacity: 0, ease: Expo.easeOute },
//   0.2
// );
tlCartBtn.reverse();
cartBtn.addEventListener("click", () => {
  tlCartBtn.reversed(!tlCartBtn.reversed());
});
// logo-band

var logoBand = document.querySelector(".logo-band");
var tlLogoBand = new TimelineMax({ paused: true });

tlLogoBand.to(
  ".letter-b",
  0.3,
  {
    height: "20px",
    width: "20px",
    right: -30,
    opacity: 1,
    ease: Expo.easeInOute
  },
  "set"
);
tlLogoBand.to(
  ".point-b",
  0.3,
  {
    right: -24,
    top: 7,
    opacity: 1,
    ease: Expo.easeInOute
  },
  "set"
);
tlLogoBand.to(
  ".letter-d",
  0.3,
  {
    height: "20px",
    width: "20px",
    right: 30,
    opacity: 1,
    ease: Expo.easeInOute
  },
  "set"
);
tlLogoBand.to(
  ".letter-n",
  0.3,
  {
    height: "20px",
    width: "20px",
    right: 0,
    opacity: 1,
    ease: Expo.easeInOute
  },
  "set"
);

tlLogoBand.to(
  ".point-n",
  0.3,
  {
    right: 7,
    top: 7,
    opacity: 1,
    ease: Expo.easeInOute
  },
  "set"
);

// tllogo.from(".letter-b", 0.3, {
//   height: "25px",
//   width: "25px",
//   right:30,
//   opacity: 1,
//   ease: Expo.easeInOute
// },"set");
// tllogo.from(".letter-n", 0.3, {
//   height: "25px",
//   width: "25px",
//   right:30,
//   opacity: 1,
//   ease: Expo.easeInOute
// },"set");
// tllogo.from(".letter-d", 0.3, {
//   height: "25px",
//   width: "25px",
//   right:30,
//   opacity: 1,
//   ease: Expo.easeInOute
// },"set");
// tllogo.from(".point-b", 0.3, {
//   right:39.2,
//   top:9.2,
//   opacity: 1,
//   ease: Expo.easeInOute
// },"set");
// tllogo.from(".point-n", 0.3, {
//   right:39.2,
//   top:9.2,
//   opacity: 1,
//   ease: Expo.easeInOute
// },"set");

// tllogo.from(".letter-b", 0.3, {
//   height: "25px",
//   width: "25px",
//   right:0,
//   opacity: 1,
//   ease: Expo.easeInOute
// },"set");
// tllogo.from(".letter-n", 0.3, {
//   height: "25px",
//   width: "25px",
//   right:0,
//   opacity: 1,
//   ease: Expo.easeInOute
// },"set");
// tllogo.from(".letter-d", 0.3, {
//   height: "25px",
//   width: "25px",
//   right:0,
//   opacity: 1,
//   ease: Expo.easeInOute
// },"set");
// tllogo.from(".point-b", 0.3, {
//   right:9.2,
//   top:9.2,
//   opacity: 1,
//   ease: Expo.easeInOute
// },"set");
// tllogo.from(".point-n", 0.3, {
//   right:9.2,
//   top:9.2,
//   opacity: 1,
//   ease: Expo.easeInOute
// },"set");

// logo.on('mouseover', function(){
//     tllogo.reverse();
// }).on('mouseout', function(){
//     tllogo.play();
// });
logoBand.addEventListener("mouseover", () => {
  tlLogoBand.play();
});
logoBand.addEventListener("mouseout", () => {
  tlLogoBand.reverse();
});

//socialMedia
var socialMedia = document.querySelector(".social-media");
var tlsocialMedia = new TimelineMax({ paused: true });
tlsocialMedia.to(
  ".social-media-btn",
  0.2,
  {
    // y: 5,
    // x: -13,
    // rotation: 90,
    y: 7,
    x: -7,
    transformOrigin: "50% , 50%",
    rotation: 45,
    ease: Expo.easeInOut
  },
  0.1
);
tlsocialMedia.staggerTo(
  ".social-media-data a",
  0.5,
  { y: -235, opacity: 1, ease: Expo.easeOute },
  0.3
);
tlsocialMedia.reverse();
socialMedia.addEventListener("click", () => {
  tlsocialMedia.reversed(!tlsocialMedia.reversed());
});

sliderArrows();
sliderPages();
homeSlider();

// product-carousel--------------------------------------------------------------------------------------------
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

var carouselNavMain = document.querySelector(".carousel-nav-main");
var flktyNav = new Flickity(carouselNavMain, {
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
carousel.forEach(function(carousel) {
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
  flkty.on("pointerDown", function() {
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
  flkty.on("pointerUp", function() {
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

var duration = 6;
var interval = 6;
var elem = document.querySelector(".carousel-collection");

function updateStatus() {
  var activeIndex = flktyCollection.slides.length;
  var numSlides = flktyCollection.selectedIndex + 1;
  var galleryStatus = document.querySelector(
    ".collection-info-bar-carousel-cell-count"
  );
  galleryStatus.innerHTML = "0" + numSlides + " / " + "0" + activeIndex;
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

flktyCollection.on("pointerDown", function() {
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
flktyCollection.on("pointerUp", function() {
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

//
var cursor = $(".main-cursor"),
  follower = $(".follow-cursor"),
  loadingC = $(".pace-activity"),
  dragge1 = $(".dragge-1"),
  dragge2 = $(".dragge-2");

var posX = 0,
  posY = 0;

var mouseX = 70,
  mouseY = 61.5;

TweenMax.to({}, 0.016, {
  repeat: -1,
  onRepeat: function() {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;

    TweenMax.set(follower, {
      css: {
        left: posX - 15,
        top: posY - 15
      }
    });

    TweenMax.set(cursor, {
      css: {
        left: mouseX,
        top: mouseY
      }
    });

    TweenMax.set(loadingC, {
      css: {
        left: posX - 15,
        top: posY - 15
      }
    });
    // TweenMax.set(dragge1, {
    //   css: {
    //     left: posX - 21,
    //     top: posY - 3
    //   }
    // });
    // TweenMax.set(dragge2, {
    //   css: {
    //     left: posX + 12,
    //     top: posY - 3
    //   }
    // });
    TweenMax.set(dragge1, {
      css: {
        left: posX - 28,
        top: posY - 6
      }
    });
    TweenMax.set(dragge2, {
      css: {
        left: posX + 20,
        top: posY - 6
      }
    });
  }
});

$(document).on("mousemove", function(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
});

$("a").on("mouseenter", function() {
  cursor.addClass("active-a");
  follower.addClass("active-a");
});
$("a").on("mouseleave", function() {
  cursor.removeClass("active-a");
  follower.removeClass("active-a");
});

$(".cursor-link").on("mouseenter", function() {
  cursor.addClass("active-a");
  follower.addClass("active-a");
});
$(".cursor-link").on("mouseleave", function() {
  cursor.removeClass("active-a");
  follower.removeClass("active-a");
});

$(".cursor-dragge").on("mouseenter", function() {
  dragge1.addClass("active-dragge");
  dragge2.addClass("active-dragge");
});
$(".cursor-dragge").on("mouseleave", function() {
  dragge1.removeClass("active-dragge");
  dragge2.removeClass("active-dragge");
});
//
//
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
flktyMainCart.on("scroll", function(progress) {
  progress = Math.max(0, Math.min(1, progress));
  progressBarCart.style.width = progress * 100 + "%";
});
var carouselStatus = document.querySelector(".carousel-status-cart");
var sizefl = flktyMainCart.cells.length;
// console.log(sizefl);
flktyMainCart.on("select", function(index) {
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
  //   });
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
flktyMainCart.on("select", function() {
  var previousSelectedButton = cellsButtonGroup.querySelector(".is-selected");
  var selectedButton = cellsButtonGroup.children[flktyMainCart.selectedIndex];
  previousSelectedButton.classList.remove("is-selected");
  selectedButton.classList.add("is-selected");
});

// cell select
cellsButtonGroup.addEventListener("click", function(event) {
  if (!matchesSelector(event.target, ".button-cart")) {
    return;
  }
  var index = cellsButtons.indexOf(event.target);
  flktyMainCart.select(index);
});
// previous
var previousButton = document.querySelector(".button-previous-cart");
previousButton.addEventListener("click", function() {
  flktyMainCart.previous();
});
// next
var nextButton = document.querySelector(".button-next-cart");
nextButton.addEventListener("click", function() {
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
