function Game() {
  this.players = []
  this.play = false
}

Game.prototype.addPlayer = function(player) {
  this.players.push(player)
}

Game.prototype.start = function(pins, frames) {
  if (this.players.length < 1) throw new Error('Can\'t start without a player')
  var game = this;
  setGame(pins);
  assignScoreboard(frames);

  function setGame(pins) {
    game.pins = new pins;
    game.currentPlayer = game.players[0]
    game.currentFrame = 1
    game.play = true
  }

  function assignScoreboard(frames) {
    for(player=0; player<game.players.length;player++) {
      game.players[player].frames = new frames;
    }
  }
};

Game.prototype.performRoll = function(pins) {
  var game = this;
  if (this.play) {
    roll();
    calculateScore();
  }

  function roll() {
    game.currentPlayer.roll(pins);
    game.pins.hit(pins);
  }

  function calculateScore() {
    var rolls = game.currentPlayer.rolls;
    game.currentPlayer.frames.calculate(rolls);
    game.switchTurn();
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
