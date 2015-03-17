$(document).ready(function() {
  game = new Game();
    // setInterval(function() { game.loop(); }, 20);
    ['left', 'right', 'up', 'down'].forEach(function(direction) {
      Mousetrap.bind(direction, function() {
        game.chaChaSlide(direction);
      });
    });
});
