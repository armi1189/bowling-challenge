describe('Frames', function(){

  var frames;
  var rolls;

  beforeEach(function(){
    frames = new Frames();
    rolls = [];
  });

  describe('when initialized', function(){

    it('has a default number of 10', function(){
      expect(frames.total).toEqual(10);
    });

  });

  describe('after been initialized', function(){

    it('can calculate the score for one normal frame', function(){
      rollTimes(2, 4)
      frames.calculate(rolls);
      expect(frames.score).toEqual([8]);
    });

    it('can calculate the score for one spare', function(){
      rollTimes(3, 5)
      frames.calculate(rolls);
      expect(frames.score).toEqual([15])
    });

    it('can calculate the score for one strike', function(){
      rolls.push(10)
      rollTimes(2, 2)
      frames.calculate(rolls);
      expect(frames.score).toEqual([14, 4])
    })

    it('can calculate the score for a perfect game', function(){
      rollTimes(12, 10);
      frames.calculate(rolls);
      var total = eval(frames.score.join('+'));
      expect(total).toEqual(300)
    })

    it('can calculate normal score on last frame', function(){
      rollTimes(18, 0);
      rollTimes(2, 2);
      frames.calculate(rolls);
      var total = eval(frames.score.join('+'));
      expect(total).toEqual(4)
    })

    it('can calculate a spare on the last frame', function(){
      rollTimes(18, 0);
      rollTimes(3, 5);
      frames.calculate(rolls);
      var total = eval(frames.score.join('+'));
      expect(total).toEqual(15);
    });

    it('knows if there\'s no bonus on the last frame', function(){
      rollTimes(18, 0);
      rollTimes(3, 2);
      frames.calculate(rolls);
      expect(frames.noBonus).toBe(true)
    });

    it('not calculate third roll on last frame if there\'s no bonus', function(){
      rollTimes(18, 0);
      rollTimes(3, 2);
      frames.calculate(rolls);
      var total = eval(frames.score.join('+'));
      expect(total).toEqual(4);
    })

    it('knows when the game is over', function(){
      rollTimes(20, 0);
      frames.calculate(rolls);
      expect(frames.over).toBe(true)
    });

  });

  function rollTimes(times, pins) {
    for(roll=0; roll<times; roll++){
      rolls.push(pins);
    };
  }
});
