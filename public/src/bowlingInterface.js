game = new Game();

function createPlayer(name) {
  name = new Player(name);
  game.addPlayer(name)
}

$(document).ready(function(){

  $('#players').change(function(){
    players = $(this).val();
    $(this).hide('slow');
    for(i=0; i<players; i++) {
      $('#player_names').prepend('<input class="player">')
    }
    $('#player_names').show('slow')
  })

  $('#start').click(function(e){
    $('input.player').each(function() {
      name = $(this).val()
      createPlayer(name)
    });
    game.start(Pins, Frames)
    $('#player_names').hide('slow')
    $('#bowling_controllers').show('slow')
  });




});