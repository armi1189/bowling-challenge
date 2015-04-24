describe('Game', function(){

  var game;
  var pins;
  var player;
  var frames;

  beforeEach(function(){
    game = new Game();

    pins = spyOn(window, 'Pins')
    frames = spyOn(window, 'Frames')

    player1 = jasmine.createSpyObj('player1', ['name', 'rolls']);
    player2 = jasmine.createSpyObj('player2', ['name', 'rolls']);

    player1.name = 'Bob'
    player2.name = 'John'

  });

  describe('when initialized', function() {

    it('can add a player', function(){
      game.addPlayer(player1)
      expect(game.players[0].name).toEqual("Bob")
    });

    it('can add two players', function(){
      game.addPlayer(player1)
      game.addPlayer(player2)
      expect(game.players[1].name).toEqual("John")
    });

    it('can be started', function(){
      game.addPlayer(player1)
      game.start(pins, frames)
      expect(game.play).toEqual(true);
    });

    it('cannot be started without a player', function(){
      error_msg = 'Can\'t start without a player'
      expect(function() { game.start(pins) }).toThrow(new Error(error_msg))
    });

  });

  describe('after been started', function(){

    beforeEach(function(){
      game.addPlayer(player1)
      game.addPlayer(player2)
      game.start(pins, frames)
    });

    it('knows who the current player is', function(){
      expect(game.currentPlayer).toEqual(player1)
    });

    it('player can perform a roll', function(){
      spyOn(game, "performRoll").and.callFake(function() {
        player1.rolls = [5]
      });
      game.performRoll(5)
      expect(player1.rolls).toEqual([5])
    }); 

    it('can switch turn', function(){
      spyOn(game, "performRoll").and.callFake(function() {
        player1.rolls = [2]
      });
      player1.frames.score = [4]
      game.performRoll(2);
      game.performRoll(2);
      expect(game.currentPlayer).toEqual(player2);
    })

    // it('can switch turns in the last frame', function(){

    // });

    // it('')

  });

});