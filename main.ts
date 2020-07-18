namespace myTiles {
    //% blockIdentity=images._tile
    export const tile0 = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `
}
scene.onHitTile(SpriteKind.Player, 5, function (sprite) {
    game.over(true)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
	sprites.createProjectileFromSprite(img`
     . . . . . . . . . . . . . . . .
     . . . 8 . . . . . . . . . . . .
     . . . . 8 . . . . . . . . . . .
     8 8 . . . 8 8 . . . . . . . . .
     . . . . . . 8 . . . . . . . . .
     . . . . . 8 8 8 8 8 8 8 8 8 . .
     . . 8 8 8 9 9 9 9 9 9 9 9 8 8 .
     . . 8 9 9 9 9 9 9 9 9 9 9 9 8 8
     . 8 8 9 9 9 9 9 9 9 9 9 9 9 8 8
     . . 8 9 9 9 9 9 9 9 9 9 9 8 8 .
     . . . 8 8 9 9 9 9 8 8 8 8 8 . .
     . 8 . . . 8 8 8 8 8 . . . . . .
     8 . 8 . . . . . . . . . . . . .
     . . 8 . . . . . . . . . . . . .
     . . . . . . . 8 . . . . . . . .
     . . . . . . 8 8 . . . . . . . .
 `, hero, 50, 0)
})

function nextLevel () {
    scene.setTileMap(maps[currentLevel])
    scene.placeOnRandomTile(hero, 7)
    // Make enemies for the level
    for (let index = 0; index < 3; index++) {
        enemy = sprites.create(enemyImgs[currentLevel], SpriteKind.Enemy)
        // Make sure you spawn enemy on "ground", which is "1"
        scene.placeOnRandomTile(enemy, 1)
        enemy.setFlag(SpriteFlag.BounceOnWall, true)
        enemy.setVelocity(20, 20)

        // Get enemy's life 
        let enemyLife = enemyLifePoints[currentLevel]

        // Give enemy some lifes
        sprites.setDataNumber(enemy, "life", enemyLife)

        // Give enemy total life points
        sprites.setDataNumber(enemy, "totalLife", enemyLife)
    }
    currentLevel = currentLevel + 1
}
scene.onHitTile(SpriteKind.Player, 2, function (sprite) {
    nextLevel()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player2, enemy) {
    info.changeLifeBy(-1)
    pause(1000)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (proj, enemy) {
    enemy.startEffect(effects.bubbles, 200)
    info.changeScoreBy(1)

    // kill the projectile
    proj.destroy()

    // read enemy data
    let enemyLife = sprites.readDataNumber(enemy, "life") - 1
    let totalEnemyLife = sprites.readDataNumber(enemy, "totalLife")

    // if life is 0, kill him off
    if(enemyLife == 0){
        enemy.destroy()
    } else {
        sprites.setDataNumber(enemy, "life", enemyLife)

        //Enemy say how much life he has left. 
        enemy.say(enemyLife + "/" + totalEnemyLife, 200)
    }
})

let enemy: Sprite = null
let currentLevel = 0
let enemyImgs: Image[] = []
let maps: Image[] = []
let hero: Sprite = null
let enemySprites: number[] = []
let text_list = 0
hero = sprites.create(img`
    . . . . . . f f f f . . . . . .
    . . . . f f f 2 2 f f f . . . .
    . . . f f f 2 2 2 2 f f f . . .
    . . f f f e e e e e e f f f . .
    . . f f e 2 2 2 2 2 2 e e f . .
    . . f e 2 f f f f f f 2 e f . .
    . . f f f f e e e e f f f f . .
    . f f e f b f 4 4 f b f e f f .
    . f e e 4 1 f d d f 1 4 e e f .
    . . f e e d d d d d d e e f . .
    . . . f e e 4 4 4 4 e e f . . .
    . . e 4 f 2 2 2 2 2 2 f 4 e . .
    . . 4 d f 2 2 2 2 2 2 f d 4 . .
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . .
    . . . . . f f f f f f . . . . .
    . . . . . f f . . f f . . . . .
`, SpriteKind.Player)
controller.moveSprite(hero)
scene.cameraFollowSprite(hero)
scene.setTile(15, img`
    . . . . . c c b b b . . . . . .
    . . . . c b d d d d b . . . . .
    . . . . c d d d d d d b b . . .
    . . . . c d d d d d d d d b . .
    . . . c b b d d d d d d d b . .
    . . . c b b d d d d d d d b . .
    . c c c c b b b b d d d b b b .
    . c d d b c b b b b b b b b d b
    c b b d d d b b b b b d d b d b
    c c b b d d d d d d d b b b d c
    c b c c c b b b b b b b d d c c
    c c b b c c c c b d d d b c c b
    . c c c c c c c c c c c b b b b
    . . c c c c c b b b b b b b c .
    . . . . . . c c b b b b c c . .
    . . . . . . . . c c c c . . . .
`, true)
scene.setTile(14, img`
    . . b d b . . . . . b b b b . .
    . c b d d b . . . b b d d d b .
    . b c c b . . . b c d d d d b .
    . . . . . . b b c c b d b b b .
    . . . . . b d d b c c b b b c .
    . . b b b c d d b b c c c c . .
    . b d d d b c b b c . . . . . .
    c b d d d d c c c c . b b b . .
    c c b b b b c c c . b d d d b .
    . c c c b b . . b c b b d d b b
    . b b . . . . . b c c b b b b .
    b d d b b . . . . . c c c b . .
    b b d d b c . . b b b b b b b .
    . b c c c b . b d d d b b c b .
    . . . . . . b d d d b c c b . .
    . . . . . . b b b c c c b . . .
`, true)
scene.setTile(1, img`
    d d d d d d d d d d d d d d d d
    d d d 1 1 d d d d d d d d b d d
    d d d 1 1 d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    d d b d d d d d d b b d d d d d
    d d d d d d d d d b b d d d d d
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    d d d d d b d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    1 1 d d d d d d d d d d d d d d
    1 1 d d d d d d d d d d b d d d
    d d d d d d 1 d d d d d d d d d
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d b d
`, false)
scene.setTile(2, img`
    c c c c c c c c c c c c c c c c
    c c c c c c c c c c c b b b b c
    c c c c c c c c c c c b b b b c
    c c c c c c c c c c c b b b b c
    c c c c c c b b b b c b b b b c
    c c c c c c b b b b c b b b b c
    c c c c c c b b b b c b b b b c
    c c c c c c b b b b c b b b b c
    c b b b b c b b b b c b b b b c
    c b b b b c b b b b c d d d d c
    c b b b b c b b b b b b b b b c
    c b b b b c d d d d b b b b b c
    c b b b b c b b b b b b b b b c
    c b b b b b b b b b b b b b b c
    c d d d d b b b b b b b b b b c
    c b b b b b b b b b b b b b b c
`, true)
scene.setTile(7, img`
    d d d d d d d d d d d d d d b c
    d d d d d d d d d d d d d d b c
    c c b c c b c c b c c b c c b c
    c b d c b d c b d c b d c b d c
    c b d c b d c b d c b d c b d c
    c b d c b d c b d c b d c b d c
    c b d c b d c b d c b d c b d c
    c b d c b d c b d c b d c b d c
    c b d c b d c b d c b d c b d c
    c b d c b d c b d c b d c b d c
    c b d c b d c b d c b d c b d c
    c b d c b d c b d c b d c b d c
    c b d c b d c b d c b d c b d c
    c c b c c b c c b c c b c c b c
    d d d d d d d d d d d d d d b c
    d d d d d d d d d d d d d d b c
`, false)
scene.setTile(5, img`
    . . b b b b b b b b b b b b . .
    . b e 4 4 4 4 4 4 4 4 4 4 e b .
    b e 4 4 4 4 4 4 4 4 4 4 4 4 e b
    b e 4 4 4 4 4 4 4 4 4 4 4 4 e b
    b e 4 4 4 4 4 4 4 4 4 4 4 4 e b
    b e e 4 4 4 4 4 4 4 4 4 4 e e b
    b e e e e e e e e e e e e e e b
    b e e e e e e e e e e e e e e b
    b b b b b b b d d b b b b b b b
    c b b b b b b c c b b b b b b c
    c c c c c c b c c b c c c c c c
    b e e e e e c b b c e e e e e b
    b e e e e e e e e e e e e e e b
    b c e e e e e e e e e e e e c b
    b b b b b b b b b b b b b b b b
    . b b . . . . . . . . . . b b .
`, true)
maps = [img`
    f f f f f f f f f f f f e f f f
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f
    7 1 1 1 1 1 1 1 1 f f f f f f f
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f
    f f f f f f 1 1 1 1 1 1 1 1 1 f
    e 1 1 1 1 1 f f f f f f 1 1 1 f
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 e
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f
    f 1 1 1 1 e 1 1 1 1 1 1 1 1 1 e
    e 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f
    f 1 1 1 1 1 1 1 f f f f f f f f
    f 2 1 1 1 1 1 1 1 1 1 1 1 1 1 e
`, img`
    1 1 1 1 1 1 1 1 1 1 1 1 f 1 1 1
    7 1 1 1 e e 1 1 1 1 1 1 f 1 1 1
    1 1 1 1 1 1 1 1 1 1 1 1 f 1 1 1
    f f f f f f f f f f 1 1 f 1 1 1
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 1 1 1 1 e e e 1 1
    1 e 1 1 1 f e 1 1 e e 1 1 1 1 1
    1 e 1 1 1 f 1 e 1 1 1 f f f f f
    1 1 1 1 1 1 f f 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 f 1 e 1 1 1 1 1 1
    f f f 1 1 1 1 1 1 e 1 1 1 e e 1
    1 1 1 1 1 1 1 1 1 e 1 f 1 1 1 1
    1 1 1 1 1 1 2 1 1 1 1 1 f 1 e 1
    1 1 1 1 1 1 1 1 1 1 1 1 f 1 e 1
    1 1 e e e e e e 1 1 1 1 f 1 1 1
    1 1 1 1 1 1 1 1 1 1 1 1 f 1 1 1
`, img`
    1 1 1 1 1 1 1 e e 1 1 1 1 1 1 1
    7 1 1 1 1 1 1 1 1 1 1 1 1 e 1 1
    1 1 1 1 1 1 1 e e 1 1 1 1 e 1 1
    1 1 e 1 1 1 1 1 e 1 1 f 1 e 1 1
    1 1 e 1 1 1 f 1 e e 1 1 f 1 1 1
    1 1 1 1 1 1 f f 1 1 1 1 f 1 1 1
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    f 1 1 1 1 1 e e e 1 1 1 1 1 e 1
    1 1 1 e 1 1 1 1 e e 1 1 f 1 e 1
    1 1 e e 1 1 1 1 1 1 1 1 f 1 1 1
    1 e e 1 1 1 1 1 1 1 1 1 f 1 1 1
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 1 1 1 1 1 1 e e 1
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 e 1
    1 1 1 1 1 1 1 1 1 1 f f 1 1 1 1
    1 f f f f f f 1 f f 1 1 1 5 1 1
`]
// There are 3 levels. We need 3 enemies
enemyImgs = [img`
    . . . . . . . . . . . . . .
    e e e . . . . e e e . . . .
    c d d c . . c d d c . . . .
    c b d d f f d d b c . . . .
    c 3 b d d b d b 3 c . . . .
    f b 3 d d d d 3 b f . . . .
    e d d d d d d d d e . . . .
    e d f d d d d f d e b f b .
    f d d f d d f d d f f d f .
    f b d d b b d d 2 b f d f .
    . f 2 2 2 2 2 2 d b d b f .
    . f d d d d d d d f f f . .
    . f d b d f f f d f . . . .
    . . f f f f . . f f . . . .
`, img`
    . . f f f . . . . . . . . f f f
    . f f c c . . . . . . f c b b c
    f f c c . . . . . . f c b b c .
    f c f c . . . . . . f b c c c .
    f f f c c . c c . f c b b c c .
    f f c 3 c c 3 c c f b c b b c .
    f f b 3 b c 3 b c f b c c b c .
    . c 1 b b b 1 b c b b c c c . .
    . c 1 b b b 1 b b c c c c . . .
    c b b b b b b b b b c c . . . .
    c b 1 f f 1 c b b b b f . . . .
    f f 1 f f 1 f b b b b f c . . .
    f f 2 2 2 2 f b b b b f c c . .
    . f 2 2 2 2 b b b b c f . . . .
    . . f b b b b b b c f . . . . .
    . . . f f f f f f f . . . . . .
`, img`
    . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . f f f f . . . . . . . . . .
    . . . . . . . . f f 1 1 1 1 f f . . . . . . . .
    . . . . . . . f b 1 1 1 1 1 1 b f . . . . . . .
    . . . . . . . f 1 1 1 1 1 1 1 1 f . . . . . . .
    . . . . . . f d 1 1 1 1 1 1 1 1 d f . . . . . .
    . . . . 7 . f d 1 1 1 1 1 1 1 1 d f . . . . . .
    . . . 7 . . f d 1 1 1 1 1 1 1 1 d f . . . . . .
    . . . 7 . . f d 1 1 1 1 1 1 1 1 d f . . . . . .
    . . . 7 . . f d d d 1 1 1 1 d d d f f . . . . .
    . . . 7 7 . f b d b f d d f b d b f c f . . . .
    . . . 7 7 7 f c d c f 1 1 f c d c f b f . . . .
    . . . . 7 7 f f f b d b 1 b d f f c f . . . . .
    . . . . f c b 1 b c f f f f f f . . . . . . . .
    . . . . f 1 c 1 c 1 f f f f f f . . . . . . . .
    . . . . f d f d f d f f f f f . . . . . . . . .
    . . . . . f . f . f . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . . . . . .
`]
//There are 3 enemies. We need 3 life points
let enemyLifePoints = [3,5,7]
nextLevel()
