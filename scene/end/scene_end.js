class SceneEnd extends GuaScene {
    constructor(game, score) {
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
        var over = GuaImage.new(game, 'over')
        over.x = 85
        over.y = 100
        this.addElement(over)

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
        super.draw()
        // draw labels
        this.game.context.fillText('score', 130, 247)
        this.game.context.fillText('Press R to continue', 100, 290)
        this.drawScore()
    }
    drawScore() {
        // 判断分数位数
        var digits = this.score.toString().length
        var numWidth = 25
        // 分数 x 基准坐标
        var offset = (400 - digits * numWidth) / 2
        for (var i = 0; i < digits; i++) {
            var name = 'n' + String(this.score).slice()[i]
            var num = GuaImage.new(this.game, name)
            num.x = offset + i * numWidth
            num.y = 200
            num.draw()
        }
    }
}
