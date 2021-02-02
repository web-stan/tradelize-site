$(document).ready(function () {

    $('.traders-list').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      dots: true,
      arrows: false,
      customPaging: function (slider, i) {
        return '<div class="dots-item" id=' + i + "></div>";
      },
      responsive: [{
        breakpoint: 9999,
        settings: "unslick"
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }]
    });
  
  });

  