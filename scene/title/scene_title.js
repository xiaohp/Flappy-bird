class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 地面
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 550
            this.addElement(g)
        }
        // 标题
        var title = GuaImage.new(game, 'title')
        title.x = 85
        title.y = 100
        this.addElement(title)
        // 小鸟
        var bird = GuaImage.new(game, 'b1')
        bird.x = 193
        bird.y = 230
        this.addElement(bird)

        game.registerAction('k', function(keyStatus){
            var s = Scene.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        super.draw()
        // draw labels
        var ctx = this.game.context

        ctx.font = "20px Arial"
        ctx.fillText('按 K 开始游戏，按 J 跳跃', 100, 320)
        ctx.font = "14px Arial"
    }
}
