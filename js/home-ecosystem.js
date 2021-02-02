/*
 * =========================== VIDEO PLAYER ================================= //
 */

$(document).ready(function() {
  try {
    videojs
  } catch (e) {
    return;
  }
  if (!videojs) return;

  let Button = videojs.getComponent('Button');
  let $videoWrapper = $('.head-section .video-wrapper');
  let $videoEl = $videoWrapper.find('.video-js');
  let player = videojs($videoEl[0]);

  player.removeChild('BigPlayButton');
  player.posterImage.off(['click', 'tap']);
  player.on('play', () => $videoWrapper.addClass('active'));

  let PlayButton = videojs.extend(Button, {
    constructor: function () {
      Button.apply(this, arguments);
      this.addClass('play-btn');
      this.controlText('Play');
    },
    handleClick: function () {
      player.play();
      this.dispose();
    }
  });

  videojs.registerComponent('PlayButton', PlayButton);

  let playBtn = player.addChild('PlayButton');

  $(playBtn.el())
    .append('<div class="play-btn-content"></div>')
    .find('.play-btn-content')
    .html('<span class="play-icon"></span>');

});


/*
 * ======================= PLATFORM TABS BUTTONS ============================ //
 */

(function() {
  $('.platform-tabs .nav-link').on('click', function() {
    let targetName = $(this).attr('href').slice(1);
    let $btnsContainer = $('.platform-actions-tab-content');
    let $activeBtns = $btnsContainer.find('.tab-pane.show.active');
    let $currentBtn = $btnsContainer.find(`.tab-pane.${targetName}`);

    console.log(`.tab-pane.${targetName}`)

    $activeBtns.removeClass('show active');
    $currentBtn.addClass('show active');

  });
})();