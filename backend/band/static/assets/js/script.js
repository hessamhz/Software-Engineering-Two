
// production ###########################################################################################################################
// var product = new TimelineMax({ paused: true });
// product.to(
//   ".main",
//   0.5,
//   {
//     y: "-100%",
//     ease: Expo.easeInOut

//   },
//   "opac"
// );
// product.to(".product-overly", 0.5, {
//   bottom: "0%",
//   // onUpdate: productComplete,
//   ease: Expo.easeInOute
// });
// product.to(
//   ".slides",
//   0.5,
//   {
//     opacity: 0,
//     ease: Expo.easeInOut
//   },
//   "opac"
// );
// product.staggerFrom(
//   ".carousel-cell",
//   0.5,
//   { y: 500, opacity: 0, ease: Expo.easeOute },
//   0.08
// );
// // product.to(".product", 0.1, {
// //   x: -137,
// //   ease: Expo.easeInOut
// // });
// // product.to(".product", 0.8, {
// //   y: 116,
// //   ease: Expo.easeInOut
// // });
// // product.to(
// //   ".product-one",
// //   1,
// //   {
// //     y: "19",
// //     ease: Expo.easeInOut
// //   },
// //   "cc"
// // );
// // product.to(
// //   ".product-two",
// //   1,
// //   {
// //     height: "15px",
// //     // y: "-9",
// //     ease: Expo.easeInOut
// //   },
// //   "cc"
// // );
// product.to(
//   ".product-one",
//   0.5,
//   {
//     y: "13",
//     ease: Expo.easeInOut
//   },
//   "cc"
// );
// product.to(
//   ".product-two",
//   0.5,
//   {
//     opacity: 0,
//     ease: Expo.easeInOut
//   },
//   "cc"
// );
// product.to(
//   ".product-three",
//   0.5,
//   {
//     // y: "-10",
//     opacity: 0,
//     ease: Expo.easeInOut
//   },
//   "cc"
// );
// product.to(
//   ".product-four",
//   0.5,
//   {
//     y: "13",
//     ease: Expo.easeInOut
//   },
//   "cc"
// );
// product.reverse();
// $(document).on("click", ".product", function () {
//   product.reversed(!product.reversed());
// });
// collection ##############################################################################################################################
// var collection = new TimelineMax({ paused: true });
// collection.to(
//   ".main",
//   0.8,
//   {
//     y: "-100%",
//     ease: Expo.easeInOut
//   },
//   "opac"
// );
// collection.to(".collection-overly", 0.5, {
//   bottom: "0%",
//   // onUpdate: collectionComplete,
//   ease: Expo.easeInOute
// });
// collection.to(
//   ".slides",
//   0.5,
//   {
//     opacity: 0,
//     ease: Expo.easeInOut
//   },
//   "opac"
// );
// collection.from(".collection-info-bar", 0.5, { x: -500, ease: Expo.easeOute });
// collection.from(".collection-info-bar-description", 0.5, {
//   y: 500,
//   ease: Expo.easeOute
// });
// collection.staggerFrom(
//   ".carousel-cell-collection",
//   0.5,
//   { y: 500, opacity: 0, ease: Expo.easeOute },
//   0.08
// );

// // collection.to(".collection", 0.1, {
// //   x: 70,
// //   ease: Expo.easeInOut
// // });
// // collection.to(".collection", 0.8, {
// //   y: -800,
// //   ease: Expo.easeInOut
// // });
// // collection.to(
// //   ".collection-one",
// //   1,
// //   {
// //     y: "19",
// //     ease: Expo.easeInOut
// //   },
// //   "cc"
// // );
// // collection.to(
// //   ".collection-two",
// //   1,
// //   {
// //     height: "15px",
// //     // y: "-9",
// //     ease: Expo.easeInOut
// //   },
// //   "cc"
// // );
// collection.to(
//   ".collection-one",
//   1,
//   {
//     y: "13",
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
// collection.to(
//   ".collection-three",
//   1,
//   {
//     // y: "-10",
//     opacity: 0,
//     ease: Expo.easeInOut
//   },
//   "cc"
// );
// // collection.to(
// //   ".collection-four",
// //   1,
// //   {
// //     y: "-10",
// //     opacity: 0,
// //     ease: Expo.easeInOut
// //   },
// //   "cc"
// // );
// collection.reverse();
// $(document).on("click", ".collection", function () {
//   collection.reversed(!collection.reversed());
// });
// menu ######################################################################################################################################
var menuBtn = document.querySelector(".menu-btn");
var menuBtnContents = document.querySelectorAll(".menu-content-data li");
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
  { y: 20, opacity: 0, ease: Expo.easeOute },
  0.1
);
tlMenuBtn.reverse();
menuBtn.addEventListener("click", () => {
  tlMenuBtn.reversed(!tlMenuBtn.reversed());
});

menuBtnContents.forEach(function (menuBtnContent, i) {
  menuBtnContents[i].addEventListener("click", () => {
    tlMenuBtn.reversed(!tlMenuBtn.reversed());
  });
});

// production / collection / menu ########################################################################################################
// function pComplete() {
//   var pOverlySize = parseInt($(".product-overly ").css("bottom"));
//   // console.log(pOverlySize);
//   return pOverlySize;
// }
// function cComplete() {
//   var cOverlySize = parseInt($(".collection-overly ").css("bottom"));
//   // console.log(cOverlySize);
//   return cOverlySize;
// }

// // var pOverlySize = parseInt($(".product-overly ").css("bottom"));
// // var cOverlySize = parseInt($(".collection-overly ").css("bottom"));

// // -------------------------------------------------------------------------------------------------

// // var pComplete = pComplete();
// // var cComplete = cComplete();

// // var pOS = pComplete();
// // var cOS = cComplete();
// $(document).on("click", ".pro", function () {
//   // console.log(pComplete());
//   if (pComplete() < 0) {
//     tlMenuBtn.reversed(!tlMenuBtn.reversed());
//     product.reversed(!product.reversed());
//     if (cComplete() == 0) {
//       collection.reversed(!collection.reversed());
//     }
//   } else
//     tlMenuBtn.reversed(!tlMenuBtn.reversed());
// });

// $(document).on("click", ".coll", function () {
//   // console.log(cComplete());
//   if (cComplete() < 0) {
//     tlMenuBtn.reversed(!tlMenuBtn.reversed());
//     collection.reversed(!collection.reversed());
//     if (pComplete() == 0) {
//       product.reversed(!product.reversed());
//     }
//   } else
//     tlMenuBtn.reversed(!tlMenuBtn.reversed());
// });
// cart ########################################################################################################################################
// var cartBtn = document.querySelector(".cart-btn");
// var tlCartBtn = new TimelineMax({ paused: true });
// // tlCartBtn.to(
// //   ".cart-btn-one",
// //   0.2,
// //   { y: 7, transformOrigin: "50% , 50%", rotation: 45, ease: Expo.easeInOut },
// //   0.1
// // );
// tlCartBtn.to(
//   ".cart-btn-two",
//   0.2,
//   {
//     y: -2,

//     height: "15px",
//     transformOrigin: "50% , 50%",
//     ease: Expo.easeInOut
//   },
//   0.1
// );
// tlCartBtn.to(".cart-overly", 0.5, { top: "0%", ease: Expo.easeInOute }, 0.2);
// // tlCartBtn.staggerFrom(
// //   ".cart-overly ul li",
// //   0.8,
// //   { x: -200, opacity: 0, ease: Expo.easeOute },
// //   0.2
// // );
// tlCartBtn.reverse();
// cartBtn.addEventListener("click", () => {
//   tlCartBtn.reversed(!tlCartBtn.reversed());
// });
// logo ########################################################################################################################################
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
// socialMedia ########################################################################################################################################
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





//
var cursor = $(".main-cursor"),
  follower = $(".follow-cursor"),
  loadingC = $(".pace-activity"),
  dragge1 = $(".dragge-1"),
  dragge2 = $(".dragge-2");

var posX = 0,
  posY = 0;

// var mouseX = 70,
//     mouseY = 51.5;

var mouseX = 0,
  mouseY = 0;

TweenMax.to({}, 0.016, {
  repeat: -1,
  onRepeat: function () {
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

$(document).on("mousemove", function (e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
});

$("a").on("mouseenter", function () {
  cursor.addClass("active-a");
  follower.addClass("active-a");
});
$("a").on("mouseleave", function () {
  cursor.removeClass("active-a");
  follower.removeClass("active-a");
});

$(".cursor-link").on("mouseenter", function () {
  cursor.addClass("active-a");
  follower.addClass("active-a");
});
$(".cursor-link").on("mouseleave", function () {
  cursor.removeClass("active-a");
  follower.removeClass("active-a");
});

$(".cursor-dragge").on("mouseenter", function () {
  dragge1.addClass("active-dragge");
  dragge2.addClass("active-dragge");
});
$(".cursor-dragge").on("mouseleave", function () {
  dragge1.removeClass("active-dragge");
  dragge2.removeClass("active-dragge");
});