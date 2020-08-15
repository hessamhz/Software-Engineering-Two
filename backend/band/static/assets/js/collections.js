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
