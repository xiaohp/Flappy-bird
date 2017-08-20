class SceneEnd extends GuaScene {
    constructor(game, score) {
        super(game)
        this.score = score
        game.registerAction('r', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    static new(game, score) {
        var i = new this(game, score)
        return i
    }
    draw() {
        // draw labels
        this.game.context.fillText('得分: ' + this.score, 120, 200)
        this.game.context.fillText('游戏结束, 按 R 返回标题界面', 100, 290)
    }
}
