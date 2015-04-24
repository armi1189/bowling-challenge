function Pins() {
  this.defaultPins = 10;
  this.setPins();
}

Pins.prototype.hit = function(quantity) {
  var error_msg = 'Can\'t hit more pins than the standing ones'
  if (this.standing - quantity < 0) throw new Error(error_msg)
  this.standing -= quantity;
};

Pins.prototype.setPins = function() {
  this.standing = this.defaultPins;
};
