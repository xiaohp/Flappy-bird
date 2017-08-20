var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}


var __main = function() {
    var images = {
        // flappy bird images
        bg: 'img/bg.png',
        pipe: 'img/pipe.png',
        ground: 'img/ground.png',
        b1: 'img/b1.png',
        b2: 'img/b2.png',
        b3: 'img/b3.png',
        n0: 'img/0.png',
        n1: 'img/1.png',
        n2: 'img/2.png',
        n3: 'img/3.png',
        n4: 'img/4.png',
        n5: 'img/5.png',
        n6: 'img/6.png',
        n7: 'img/7.png',
        n8: 'img/8.png',
        n9: 'img/9.png',
    }
    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)

        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
