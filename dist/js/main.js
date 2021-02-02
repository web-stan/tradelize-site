/*
 * ========================== FEATHER ICONS ================================= //
 */

$(document).ready(function () {
  feather.replace({
    'class': 'icon'
  });
});

/*
 * ============================ scroll mouse wheel =================================== //
 */

$(document).ready(function () {
  let videoWrapper = $('#video-scroll');

  $(videoWrapper).on('wheel', (event) => {
    if (event.originalEvent.wheelDelta > 0) {
      let currentScroll = $(videoWrapper).scrollLeft();
      $(videoWrapper).scrollLeft(currentScroll - 150);
      console.log(currentScroll);
    } else {
      let currentScroll = $(videoWrapper).scrollLeft();
      $(videoWrapper).scrollLeft(currentScroll + 150);
      console.log(currentScroll);

    }
  });
});

/*
 * ============================ calling videoModal in HOW-IT-WORKS =================================== //
 */

$('#videoModal').modal();

/*
 * ============================ Custom Modal Form =================================== //
 */

$(document).ready(function () {

  // $('#applyPosition').modal();

  $('#applyPosition').on('hidden.bs.modal', function (e) {
    document.querySelector('.custom-modal-form').reset();

    let draggedDiv = document.querySelector('.dragged');
    draggedDiv.style.background = null;
    draggedDiv.innerHTML = `
            <label class="drag-label" for="dragFile"></label>
             <div class="custom-modal-inner">
                <img src="./img/icons/drag-icon.svg" alt="Drag&Drop">
            <p class="custom-modal-description">Drag and drop your photo</p>
              <p class="custom-modal-description-small">Or browse to choose a file </p>
              <p class="custom-modal-description-small">(1600x1200 or larger recommended, up to 10MB
                    each) </p>
           </div>`;
  });

  $(document).on('dragover', '.dragged', function (event) {
    event.preventDefault();
  });
  $(document).on('dragleave', '.dragged', function (event) {
    event.preventDefault();
  });
  $(document).on('dragend', '.dragged', function (event) {
    event.preventDefault();
  });
  $(document).on('drop', '.dragged', function (event) {
    event.preventDefault();

    // let input = document.querySelector('#dragFile');
    let input = $('#dragFile');
    // console.log(event.originalEvent.dataTransfer.files);

    if (event.originalEvent.dataTransfer.files.length) {
      input[0].files = event.originalEvent.dataTransfer.files;

      updateImage('.dragged', event.originalEvent.dataTransfer.files[0])
    };

  });

  $('#dragFile').on('change', function () {
    this.files[0] !== undefined && updateImage('.dragged', this.files[0]);
    // updateImage('.dragged', this.files[0]);
  });

  function updateImage(dragged, files) {

    let draggedDiv = document.querySelector(dragged);

    if (files.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.readAsDataURL(files)

      reader.onload = function () {
        draggedDiv.innerHTML = `<label class="drag-label" for="dragFile"></label>`;
        draggedDiv.style.backgroundImage = `url('${reader.result}')`;
        draggedDiv.style.backgroundSize = 'contain';
        draggedDiv.style.backgroundPosition = 'center';
        draggedDiv.style.backgroundRepeat = 'no-repeat';
      }
    } else {
      draggedDiv.style.background = null;
      draggedDiv.innerHTML = `
              <label class="drag-label" for="dragFile"></label>
              <div class="custom-modal-inner">
                <img src="./img/icons/drag-icon.svg" alt="Drag&Drop">
                <p class="custom-modal-description">Drag and drop your photo</p>
                <p class="custom-modal-description-small">Or browse to choose a file </p>
                <p class="custom-modal-description-small">(1600x1200 or larger recommended, up to 10MB
                     each) </p>
              </div>`;
    }
  }


  //add Operator 
  $('.custom-modal-operator').click(function () {
    let textValue = $(this).text();
    $('.custom-modal-phone-value').val(textValue);
    $('#inputPhone').val(textValue);
  });

  //validation Phone for number
  $('#inputPhone').on('input', function () {
    $(this).val($(this).val().replace(/\D/, ''));

  });

  $("#apply").click(function () {
    $('#applyPosition').modal();
  })

  // ======================= Validation Form  on java-software-engineer.html ===============

  function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  $('.custom-modal-submit').click(function (event) {
    event.preventDefault();

    $customModalEmail = $('#inputEmail');
    $inputPhone = $('#inputPhone');
    $customModalTextarea = $('.custom-modal-textarea');
    $customModalLabel = $('.custom-modal-label');



    $customModalInputValue = $($inputPhone).val().length;
    $emailValue = validateEmail($.trim($($customModalEmail).val()));
    $textareaValue = $.trim($($customModalTextarea).val());

    // let input = $('#dragFile');
    let input = document.querySelector("#dragFile");

    if ((input.files.length !== 0 && input.files[0].type.startsWith('image/')) && $customModalInputValue === 9 && $emailValue &&  $textareaValue !== '') {
      $('#applyPosition').modal('hide')
      
    } 


    if (input.files.length === 0 || !input.files[0].type.startsWith('image/')) {
      $customModalLabel.addClass('error');
    } else {
      $customModalLabel.removeClass('error');
    }


    if ($customModalInputValue !== 9) {
      $inputPhone.addClass('error');
    } else {
      $inputPhone.removeClass('error');
    }

    if ($customModalInputValue !== 9) {
      $inputPhone.addClass('error');
    } else {
      $inputPhone.removeClass('error');
    }

    if (!$emailValue) {
      $customModalEmail.addClass('error');
    } else {
      $customModalEmail.removeClass('error');
    }

    if ($textareaValue === '') {
      $customModalTextarea.addClass('error');
    } else {
      $customModalTextarea.removeClass('error');
    }

  })// ======================= Validation Form  on java-software-engineer.html ===============

});

/*
 * ============================ CustomSELECT =================================== //
 */

$(document).ready(function () {

  function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function customSelect(selectText, dropdownModalMenu, dropdownModalItem, dropdownSelectInput, formButton) {
    $(dropdownModalMenu).click(function (event) {
      let $value = $(event.target).closest(dropdownModalItem).attr('data-value');
      $(selectText).text($value);
      $(dropdownSelectInput).attr('value', $value);
    });

    /*
     * ============================ ValidationFrom =================================== //
     */

    $(formButton).click(function (event) {
      event.preventDefault();

      $modalPostSelect = $('.modal-post-select');
      $formEmail = $('.form-email');
      $formTextarea = $('#form-textarea');

      $dropdownSelectInputVulue = $(dropdownSelectInput).attr('value');
      $formEmailValue = validateEmail($.trim($('.form-email').val()));
      $formTextareaValue = $.trim($('#form-textarea').val());

      if ($dropdownSelectInputVulue !== '' && $formEmailValue && $formTextareaValue !== '') {
        $('#formModal').modal();
        $(dropdownSelectInput).val('');
        $($formEmail).val('');
        $($formTextarea).val('');
        $(selectText).text('Subject');
      }

      if ($dropdownSelectInputVulue === '') {
        $modalPostSelect.addClass('error');
      } else {
        $modalPostSelect.removeClass('error');
      }

      if (!$formEmailValue) {
        $formEmail.addClass('error');
      } else {
        $formEmail.removeClass('error');
      }

      if ($formTextareaValue === '') {
        $formTextarea.addClass('error');
      } else {
        $formTextarea.removeClass('error');
      }
    })
  }

  customSelect('.dropdown-select-text', '.dropdown-modal-menu', '.dropdown-modal-item', '.dropdown-select-input', '.container-button .form-button');

  customSelect('.dropdown-code-text', '.dropdown-code-menu', '.dropdown-code-item', '.dropdown-code-input', '.container-button .info-button');
});

/*
 * ============================ DROPDOWNS =================================== //
 */

;
(function () {
  $(document).on('click', '[dropdown-toggle]', function (e) {
    e.preventDefault();
    $(this).closest('[dropdown-container]').toggleClass('show');
    $(this).siblings('[dropdown-menu]').toggle();
  });

  $(document).on('click', e => {
    e.stopPropagation();
    closeSiblings(e);
  });

  function closeSiblings(e) {
    $('[dropdown-container]').each(function () {
      if ($(this).has(e.target).length === 0) {
        $(this).removeClass('show');
        $(this).find('[dropdown-menu]').hide();
      }
    });
  }
})();


/*
 * =========================== HEADER MENU ================================== //
 */

;
(function () {
  $(document).on('click', '.site-header .block-menu-item .menu-link', function (e) {
    e.preventDefault();

    let $parentMenuItem = $(this).closest('.block-menu-item');
    let $openMenuItems = $parentMenuItem.siblings('.block-menu-item.show');

    toggle($parentMenuItem);
    toggle($openMenuItems);

    adaptHeader($(this).closest('.site-header'));
  });

  $('.site-header .submenu-overlay').on('click', function () {
    toggle('.site-header .block-menu-item.show');
    adaptHeader($(this).closest('.site-header'));
  });

  $('.menu-burger').on('click', function () {
    $('.site-header').addClass('mobile-menu-shown');
  });

  $('.close-mobile').on('click', function () {
    $('.site-header').removeClass('mobile-menu-shown');
  });

  $('.submenu-link').on('click', function () {
    toggle('.site-header .block-menu-item.show');
    adaptHeader($(this).closest('.site-header'));
    $('.submenu-overlay').css('display', 'none');
    $('.site-header').removeClass('mobile-menu-shown');
  });

  function toggle(el) {
    let $el = (typeof el == 'string') ? $(el) : el;
    $el.toggleClass('show');
    $el.find('.submenu-block').toggle();
  }

  function adaptHeader($el) {
    var $header = $el || $('.site-header');
    var $overlay = $header.find('.submenu-overlay');
    var $openMenuItems = $header.find('.block-menu-item.show');

    if ($openMenuItems.length > 0) {
      $('body').addClass('submenu-shown');
      $header.addClass('submenu-shown');
      $overlay.fadeIn('fast');
    } else {
      $overlay.fadeOut('fast');
      $header.removeClass('submenu-shown');
      $('body').removeClass('submenu-shown');
    }
  }
})();


/*
 * ============================ CAROUSELS =================================== //
 */

$(document).ready(function () {

  $('.advantages-list').slick({
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
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          adaptiveHeight: true
        }
      }
    ]
  });


  $('.feedback-list').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    arrows: true,
    customPaging: function (slider, i) {
      return '<div class="dots-item" id=' + i + "></div>";
    },
    prevArrow: "<button type='button' class='slick-prev'><img src='img/icons/arrow-left.svg'/></button>",
    nextArrow: "<button type='button' class='slick-next'><img src='img/icons/arrow-right.svg'/></button>",
    responsive: [{
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false
      }
    }]
  });


  $('.trader-cards-list').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    arrows: false,
    centerMode: true,
    responsive: [{
      breakpoint: 1200,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 992,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }]
  });

  $('.team-list').slick({
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
      }
    ]
  });

  //-------------Show more btn------------

  $('.show-more-btn').on('click', function () {
    $(this).toggleClass('active');
  });



  //-------------------Reviews slider--------

  if ($(window).width() > 1200) {
    $('.reviews-list').slick({
      centerPadding: $('.slick').find('.slick-center').outerWidth() / 2,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      adaptiveHeight: true,
      dots: true,
      centerMode: true,
      arrows: false,
      customPaging: function (slider, i) {
        return '<div class="dots-item" id=' + i + "></div>";
      },
    });
  } else {
    $('.reviews-list').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      adaptiveHeight: true,
      dots: true,
      arrows: false,
      customPaging: function (slider, i) {
        return '<div class="dots-item" id=' + i + "></div>";
      },
    });
  }


  //-----------Academy modal in mobile----------

  $('#mobile-modal-btn').on('click', function () {
    $('#academy-form').fadeIn();
    $('body').addClass('submenu-shown');
  });

  $('.close-modal-btn').on('click', function () {
    $('#academy-form').fadeOut();
    $('body').removeClass('submenu-shown');
  });

  //--------------Plans slider-------------------

  $('.plans-list').slick({
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
      }
    ]
  });

});