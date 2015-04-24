describe('Player', function(){

  var player;

  beforeEach(function(){
    player = new Player('Bob');
  });

  describe('when initialized', function(){

    it('has a name', function(){
      expect(player.name).toEqual('Bob');
    });

    it('knows his rolls', function(){
      expect(player.rolls).toEqual([]);
    })

  });

  describe('after been initialized', function(){

    it('can roll', function(){
      player.roll(3);
      expect(player.rolls).toEqual([3]);
    });

  });

});