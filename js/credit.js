Credit = function() {}

Credit.prototype = {

  preload: function() {},

  create: function() {

    var mid_x = this.game.width / 2;
    var mid_y = this.game.height / 2;
    var text_style = {
      font: "25px Arial",
      fill: "#71FFB8",
      align: "center"
    };
    var goBack_style = {
      font: "16px Arial",
      fill: "#ff0000",
      align: "center"
    }
    var names_text = game.add.text(mid_x, mid_y, "MEMBERS:\nTRENT KNIGHTON\nJOSHUA MATTHEWS\nMARIA PATTERSON\nSTEPHEN STUCKY", text_style);
    names_text.anchor.set(0.5, 0.5);
    names_text.addColor("#FF0000", 0);
    names_text.addColor("71FFB8", 8);

    var goBack_text = this.game.add.text(this.game.width / 2, this.game.height - 20, "press spacebar to go back to main menu", goBack_style);
    goBack_text.anchor.set(0.5, 0.5)

    goBack_button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    goBack_button.onDown.add(function() {
      game.state.start("menu", Menu);
    });
    create_star(game);
  },

  update: function() {},

  actionOnClick: function() {
    game.state.start("menu", Menu);
  }
};
