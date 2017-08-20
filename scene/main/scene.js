class Scene extends GuaScene {
    constructor(game) {
        super(game)
        // bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 550
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4
        // bird
        this.birdSpeed = 2
        var b = Bird.new(game)
        b.x = 100
        b.y = 200
        this.bird = b
        this.addElement(b)

        this.setupInputs()
        // 得分
        this.score = 0
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    update() {
        super.update()
        // 检测碰撞水管 与 地面
        if (this.pipe.collide(this.bird) || this.bird.y >= 510) {
            // 跳转到 游戏结束 的场景
            // log('相撞了', this.score)
            var end = SceneEnd.new(this.game, this.score)
            this.game.replaceScene(end)
        }

        // 检测通过水管
        if (this.pipe.detectCross(this.bird)) {
            this.score++
            // log('score is', this.score)
        }

        // 地面移动
        this.skipCount--
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 30; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
    }
    draw() {
        super.draw()
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
            num.y = 40
            num.draw()
        }
    }
    setupInputs() {
        var self = this
        var b = this.bird
        self.game.registerAction('a', function(keyStatus) {
            b.move(-self.birdSpeed, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            b.move(self.birdSpeed, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus) {
            b.jump()
        })
    }
}
