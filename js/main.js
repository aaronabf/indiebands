$(document).ready(function(){
  // Spotify play button
  var spotStart = '<iframe src="https://embed.spotify.com/?uri=spotify:track:';
  var spotEnd = '" width="300" height="300" frameborder="0" allowtransparency="true"></iframe>';

  // Display messages for button press
  var realPressAndReal = 'Nice job! Check out this song by them:';
  var realPressAndFake = 'Wrong! They\'re fakers!';
  var fakePressAndReal = 'They\'re actually real! Check out this song by them:';
  var fakePressAndFake = 'Nice Job! They\'re fakers!';

  var bandName;
  var bandLink;
  var bandReal;

  // Send post request and update values
  function init() {
    $.post('main.php', function (response) {
      bandName = response.bandname;
      bandLink = response.bandlink;
      bandReal = parseInt(response.bandreal);
      $('#bandName').html(bandName);
    }, 'json')
    .fail(function() {
      console.error('php error');
    });
  }

  // Reset the game by removing the message and play button and runs init()
  function reset() {
    $('#playButton').html('');
    $('#displayMessage').html('');
    $('#resetButton').hide();
    init();
  }

  function real() {
    if (bandReal) {
      $('#displayMessage').html(realPressAndReal);
      $('#playButton').html(spotStart + bandLink + spotEnd);
    } else {
      $('#displayMessage').html(realPressAndFake);
    }

    $('#resetButton').show();
  }

  function fake() {
    if (bandReal) {
      $('#displayMessage').html(fakePressAndReal);
      $('#playButton').html(spotStart + bandLink + spotEnd);
    } else {
      $('#displayMessage').html(fakePressAndFake);
    }

    $('#resetButton').show();
  }

  // Remove button focus, hide reset button, and run init on page load
  $('button').focus(function() {
    this.blur();
  });
  $('#resetButton').hide();
  init();

  // Run reset, fake, and real functions on key presses
  $('#resetButton').click(function() {
    reset();
  });
  $('#realButton').click(function() {
    real();
  });
  $('#fakeButton').click(function() {
    fake();
  });

  // Run reset, fake, and real functions on key presses
  $(window).keydown(function(e) {
    switch (e.which) {
      case 32: // Space bar
        reset();
        break;
      case 39: // Right
      case 82: // R key
        real();
        break;
      case 37: // Left
      case 70: // F key
        fake();
        break;
    }
  });
});
