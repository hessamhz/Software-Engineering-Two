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










