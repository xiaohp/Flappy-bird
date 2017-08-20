class Pipes {
    constructor(game) {
        this.game  = game
        this.pipes = []
        this.pipeSpace = 150
        this.管子横向间距 = 200
        this.columnsOfPipe = 3
        this.addPipe()
    }
    static new(game) {
        return new this(game)
    }
    addPipe() {
        var game = this.game
        for (var i = 0; i < 3; i++) {
            var p1 = GuaImage.new(game, 'pipe')
            p1.x = 500 + i * this.管子横向间距
            p1.isCross = false

            var p2 = GuaImage.new(game, 'pipe')
            p2.flipY = true
            p2.x = p1.x
            p2.isCross = false

            this.resetPipesPositoin(p1, p2)

            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    resetPipesPositoin(p1, p2) {
        p1.y = randomBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    debug() {
        this.管子横向间距 = config.管子横向间距.value
        this.pipeSpace = config.pipe_space.value
    }
    detectCross(b) {
        // 判断穿过管子
        for (var i = 0; i < this.pipes.length; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i + 1]
            if (!p1.isCross && p1.x < b.x) {
                p1.isCross = true
                p2.isCross = true
                return true
            }
        }
        return false
    }
    collide(b) {
        for (var i = 0; i < this.pipes.length; i++) {
            var p = this.pipes[i]
            if (rectIntersects(p, b) || rectIntersects(b, p)) {
                return true
            }
        }
        return false
    }
    update() {

        for (var i = 0; i < this.pipes.length; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i + 1]
            p1.x -= 5
            p2.x -= 5

            if (p1.x < -100) {
                p1.x += this.管子横向间距 * this.columnsOfPipe
                p1.isCross = false
            }
            if (p2.x < -100) {
                p2.x += this.管子横向间距 * this.columnsOfPipe
                this.resetPipesPositoin(p1, p2)
                p2.isCross = false
            }
        }
    }
    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()

            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)

            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)

            context.drawImage(p.texture, 0, 0)
            context.restore()
        }
    }
}
