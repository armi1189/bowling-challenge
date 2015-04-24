function Game() {
  this.players = []
}

Game.prototype.addPlayer = function(player) {
  this.players.push(player)
}

Game.prototype.start = function(pins, frames) {
  if (this.players.length < 1) throw new Error('Can\'t start without a player')
  this.pins = new pins;
  this.currentPlayer = this.players[0]
  this.currentFrame = 1
  for(player=0; player<this.players.length;player++) {
    this.players[player].frames = new frames;
  }
};

Game.prototype.performRoll = function(pins) {
  this.currentPlayer.roll(pins);
  this.pins.hit(pins)
  calculateScore();
  this.switchTurn();

  function calculateScore() {
    var rolls = this.currentPlayer.rolls
    this.currentPlayer.frames.calculate(rolls);
  }
}

Game.prototype.switchTurn = function() {
  var game = this;
  currentPlayerIndex = this.players.indexOf(this.currentPlayer);
  if (isLastFrame()) {
    if (hasLastFrameBonus()) this.pins.setPins();
    if (hasFinishedGame()) nextPlayer();
  } else if (hasFinishedFrame()) {
    if (wasLastPlayer()) incrementFrame();
    else nextPlayer();
    this.pins.setPins();
  }

  function isLastFrame() {
    return game.currentFrame === game.currentPlayer.frames.total;
  }

  function hasLastFrameBonus() {
    return !game.currentPlayer.frames.noBonus;
  }

  function hasFinishedGame() {
    return game.currentPlayer.frames.over;
  }

  function hasFinishedFrame() {
    return game.currentPlayer.frames.score.length > game.currentFrame - 1
  }

  function wasLastPlayer() {
    return game.currentPlayer === game.players[game.players.length -1]
  }

  function nextPlayer() {
    game.currentPlayer = game.players[currentPlayerIndex + 1];
  }

  function incrementFrame() {
    game.currentPlayer = game.players[0];
    game.currentFrame ++;
  }

};
