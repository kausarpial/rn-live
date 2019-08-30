// Preloader

function PageLoad() {
  $("body").removeClass("hidden");
  TweenMax.to($(".preloader-text"), 1, {
    force3D: true,
    opacity: 1,
    y: 0,
    delay: 0.2,
    ease: Power3.easeOut
  });

  var width = 100,
    perfData = window.performance.timing, 
    EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
    time = parseInt((EstimatedTime / 500) % 50) * 70;

  // Percentage Increment Animation
  var PercentageID = $("#precent"),
    start = 01,
    end = 99,
    durataion = time;
  animateValue(PercentageID, start, end, durataion);

  function animateValue(id, start, end, duration) {
    var range = end - start,
      current = start,
      increment = end > start ? 1 : -1,
      stepTime = Math.abs(Math.floor(duration / range)),
      obj = $(id);

    var timer = setInterval(function() {
      current += increment;
      $(obj).text(current);
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  console.log(window.location.pathname);

  if(window.location.pathname == '/' || window.location.pathname == '/index.html'){
    Hero Timeline
    var heroTimeline = new TimelineMax, 
        mySplitText = new SplitText(".splitFade", {type:"words"}), 
        chars = mySplitText.words; 
        heroTimeline.staggerFrom(chars, 1, 
          {
            opacity:0, 
            y:80,  ease:Power3.easeOut
          }, 0.2, "+=0");
    heroTimeline.pause();
    
    // Mountain Timeline
    var mountainTimeline = new TimelineMax();
    mountainTimeline.staggerFrom('.mountain', 0.8, 
      {
        opacity:0, 
        y:500,  ease:Power3.easeOut
      }, 0.3, "+=0");
    mountainTimeline.pause();
  }


  // Fading Out Loadbar on Finised
  setTimeout(function() {
    TweenMax.to($(".percentage, .preloader-text"), 0.7, {
      force3D: true,
      opacity: 0,
      yPercent: -101,
      ease: Power3.easeInOut
    });
    TweenMax.to($(".preloader-wrap"), 0.7, {
      force3D: true,
      yPercent: -150,
      delay: 0.2,
      ease: Power3.easeInOut
    });
    if ($(".main").length > 0) {
      $(".main").addClass("animate");
    }
    if ($(".site-navigation").length > 0) {
      $(".site-navigation").addClass("animate");
    }
    if ($(".follower-wrapper").length > 0) {
      $(".follower-wrapper").addClass("active");
    }
    TweenMax.from('.site-hero .magnetic', 1, {opacity:0, y: 100, delay: 2.2, ease: Power3.easeOut});
    TweenMax.from('.site-hero-image', 1.3, {opacity:0, y: 500, delay: 2, ease: Power3.easeOut});
    if(window.location.pathname == '/' || window.location.pathname == '/index.html' || window.location.pathname == '/rn-live/' || window.location.pathname == '/rn-live/index.html' ){
      setTimeout(() => {
        heroTimeline.restart();
        mountainTimeline.restart();
      }, 700);
    }
  }, time);
}

function smoothScroll() {
  $("a.page-scroll").on("click", function(event) {
    var $anchor = $(this);
    $("html, body")
      // .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top - 0
        },
        200
      );
    event.preventDefault();
  });
}

// var scrollElement = document.getElementById('hero');
// scrollElement.addEventListener('wheel', function(event){
//   var delta;
//   event.wheelDelta ? delta = event.wheelDelta : delta = -1 * event.deltaY;
//   if(delta < 0){
//     console.log('down')
//     // $("html, body")
//     //   .stop()
//     //   .animate({
//     //     scrollTop: $('#projects').offset().top - 0
//     //   }, 300);
//   } else {
//     console.log('up')
//   }
// });

$(document).ready(function() {
  "use strict";
  window.scrollTo(0,0);
  PageLoad();
  smoothScroll();
  $('a.new-location').on('click', function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    var currentUrl = window.location.pathname;
    if(currentUrl.indexOf(url) < 0){
      $('.main').removeClass('animate');
      $('.site-navigation').removeClass('animate');
      setTimeout(() => {
        location.href = url;
      }, 1000);
    }
  })
  // hotspot
  $(".hotspot").each(function() {
    var top = $(this).attr("data-top");
    var left = $(this).attr("data-left");
    $(this).css("top", top + "%");
    $(this).css("left", left + "%");
  });
  $(".hotspot .icon").on("click", function() {
    $(this)
      .parent()
      .toggleClass("active");
  });

  // Hover Effect
  Array.from(document.querySelectorAll(".site-service-list-item")).forEach(
    el => {
      const frame = el.querySelector(".site-service-image");
      console.log(frame);
      const imgs = Array.from(frame.querySelectorAll("img"));
      const hover = new hoverEffect({
        parent: frame,
        intensity: frame.dataset.intensity || undefined,
        speedIn: frame.dataset.speedin || undefined,
        speedOut: frame.dataset.speedout || undefined,
        easing: frame.dataset.easing || undefined,
        hover: frame.dataset.hover || undefined,
        image1: imgs[0].getAttribute("src"),
        image2: imgs[1].getAttribute("src"),
        displacementImage: frame.dataset.displacement,
        hover: false
      });
      el.addEventListener("mouseenter", () => {
        el.classList.add("visible");
        hover.next();
      });
      el.addEventListener("mouseleave", () => {
        el.classList.remove("visible");
        hover.previous();
      });
    }
  );
  if (document.querySelector(".site-service-list")) {
    document
      .querySelector(".site-service-list")
      .addEventListener("mouseleave", () => {
        document.querySelector(".first-item").classList.add("visible");
      });
  }

  // Megnet
  var magnets = document.querySelectorAll(".magnetic");
  var strength = 50;

  magnets.forEach(magnet => {
    magnet.addEventListener("mousemove", moveMagnet);
    magnet.addEventListener("mouseout", function(event) {
      TweenMax.to(event.currentTarget, 1.5, {
        x: 0,
        y: 0,
        ease: Power4.easeOut
      });
    });
  });

  var onHover = document.querySelectorAll(".onhover");
  onHover.forEach(hover => {
    hover.addEventListener("mouseout", function() {
      document.querySelector(".follower").classList.remove("big");
    });
    hover.addEventListener("mouseenter", function() {
      document.querySelector(".follower").classList.add("big");
    });
  });

  function moveMagnet(event) {
    var magnetButton = event.currentTarget;
    var bounding = magnetButton.getBoundingClientRect();
    TweenMax.to(magnetButton, 0.5, {
      x:
        ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
        strength,
      y:
        ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
        strength,
      ease: Power4.easeOut
    });
  }

  $(document).on("mousemove mouseenter", function(e) {
    const pointer = $(".pointer");
    const follower = $(".follower");
    TweenMax.to(pointer, 0.8, {
      left: e.clientX,
      top: e.clientY,
      ease: Expo.easeOut
    });
    TweenMax.to(follower, 1.5, {
      left: e.clientX,
      top: e.clientY,
      ease: Expo.easeOut
    });
  });
  
  // Mouse follower Reverted
  $('.reverted').on('mouseenter mouseleave', (e)=> {
    if(e.type == 'mouseenter'){
      $('.follower-wrapper').addClass('revert');
    } else{
      $('.follower-wrapper').removeClass('revert');
    }
  })
});
