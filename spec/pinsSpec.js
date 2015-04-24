describe('Pins', function(){
  
  var pins;

  beforeEach(function(){
    pins = new Pins()
  });

  describe('when initialized', function(){
    
    it('has a default number of 10', function(){
      expect(pins.defaultPins).toEqual(10);
    })

    it('has a standing pins number equal to the default number', function(){
      expect(pins.standing).toEqual(10);
    })

    it('can be hit', function(){
      pins.hit(3);
      expect(pins.standing).toEqual(7);
    });

    it('cannot be hit more than his value', function(){
      error_msg = 'Can\'t hit more pins than the standing ones'
      expect(function(){ pins.hit(11) }).toThrow(new Error(error_msg))
    });

  })

  describe('after been hit', function(){
    
    it('can reset standing pins value to default value', function(){
      pins.hit(8);
      pins.setPins();
      expect(pins.standing).toEqual(10)
    });

  });

});