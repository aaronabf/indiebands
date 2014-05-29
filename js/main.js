$(document).ready(function(){
  var bandName;
  var bandLink;
  var bandReal;

  function init() {
    $.post('search.php', function (response) {
      bandName = response.bandname;
      bandLink = response.bandlink;
      bandReal = response.bandreal;
      $('#bandName').html(bandName);
    }, 'json');
  }

  init();

  $('#realButton').click(function() {
    if (bandReal)
      console.log('YOU ARE A WINNER!');
    else
      console.log('LOSER!');

    init();
  });

  $('#fakeButton').click(function() {
    if (bandReal)
      console.log('LOSER!');
    else
      console.log('YOU ARE A WINNER!');

    init();
  });
});
