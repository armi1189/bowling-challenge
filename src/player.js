function Player(name) {
  this.name = name;
  this.rolls = [];
};

Player.prototype.roll = function(pins) {
  this.rolls.push(pins);
};
