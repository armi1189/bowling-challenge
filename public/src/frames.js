function Frames() {
  this.total = 10;
  this.score = [];
}

Frames.prototype.calculate = function(rolls) {
  var frames = this;
  this.score = [];
  lastFrameRoll = 0;
  for (roll=0; roll<rolls.length;) {
    if (isLastFrame()) getLastFrameScore();
    else if (isStrike()) getStrikeScore();
    else if (isSpare()) getSpareScore();
    else getNormalScore();
    if (gameIsOver()) break;
  }

  function gameIsOver() {
    if (lastFrameRoll > 2 || lastFrameRoll > 1 && noBonus()) return frames.over = true;
  }

  function noBonus(){
    if (rolls[roll - 1] + rolls[roll - 2] < 10) return frames.noBonus = true;
  }

  function getLastFrameScore() {
    frames.score[frames.total - 1] = frames.score[frames.total - 1] || 0
    frames.score.push(frames.score.pop() + rolls[roll])
    lastFrameRoll ++;
    roll++;
  }

  function getStrikeScore() {
    getBonusScore();
    roll++;
  }

  function getSpareScore() {
    getBonusScore();
    roll+=2;
  }

  function getBonusScore() {
    frames.score.push(rolls[roll] + rolls[roll + 1] + rolls[roll + 2])
  }

  function getNormalScore() {
    if (!isNaN(rolls[roll + 1])) frames.score.push(rolls[roll] + rolls[roll + 1]);
    roll+=2;
  }

  function isSpare() {
    return rolls[roll] + rolls[roll + 1] === 10;
  }

  function isStrike() {
    return rolls[roll] === 10;
  }

  function isLastFrame() {
    return frames.score.length >= frames.total - 1;
  }
};
