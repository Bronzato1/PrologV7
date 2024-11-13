jQuery(document).ready(function () {

      jQuery(document).foundation(); 

  /*
    START STRICT MODE
  */
  'use strict';

  // ---
  // SCREENSHOTS SLIDER
  // ---
  $('.iad-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    dots: false,
    arrows: true,
    nextArrow: '<div class="slick-next"></div>',
    prevArrow: '<div class="slick-prev"></div>',
    autoplay: false,
    draggable: true
  });

  //refresh the slider when changing tabs
  $(".tabs").on('change.zf.tabs', function (event, tab) {
    $(".iad-slider").slick("setPosition");
  });


});
