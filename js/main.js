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

  // Remove button focus
  $('button').focus(function() {
    this.blur();
  });

  // Send post request and update values
  function init() {
    $.post('search.php', function (response) {
      bandName = response.bandname;
      bandLink = response.bandlink;
      bandReal = parseInt(response.bandreal);
      $('#bandName').html(bandName);
    }, 'json');
  }

  // Reset the game by removing the message and play button and runs init()
  function reset() {
    $('#playButton').html('');
    $('#displayMessage').html('');
    $('#resetButton').hide();
    init();
  }

  // Hide reset button and run init on page load
  $('#resetButton').hide();
  init();

  $('#realButton').click(function() {
    if (bandReal) {
      $('#displayMessage').html(realPressAndReal);
      $('#playButton').html(spotStart + bandLink + spotEnd);
    } else {
      $('#displayMessage').html(realPressAndFake);
    }

    $('#resetButton').show();
  });

  $('#fakeButton').click(function() {
    if (bandReal) {
      $('#displayMessage').html(fakePressAndReal);
      $('#playButton').html(spotStart + bandLink + spotEnd);
    }
    else {
      $('#displayMessage').html(fakePressAndFake);
    }

    $('#resetButton').show();
  });

  // Reset game on space bar
  $('#resetButton').click(function() {
    reset();
  });

  // Reset game on space bar
  $(window).keypress(function(e) {
    if (e.keyCode === 32) {
      reset();
    }
  });
});
