class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(keyStatus){
            var s = Scene.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw labels
        var ctx = this.game.context
        ctx.font = "32px serif"
        ctx.fillText('Flappy Bird', 110, 100)

        ctx.font = "20px Arial"
        ctx.fillText('按 K 开始游戏', 120, 290)
        ctx.font = "14px Arial"
    }
}
