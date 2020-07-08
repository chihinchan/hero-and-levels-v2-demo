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
function nextLevel () {
    // maps[0] = 1st map maps[1] = 2nd map maps[2] = 3rd
    // map
    scene.setTileMap(maps[currentLevel])
    scene.placeOnRandomTile(hero, 7)
    // increase the level to prepare for the next time we
    // call nextLevel()
    currentLevel = currentLevel + 1
}
scene.onHitTile(SpriteKind.Player, 2, function (sprite) {
    nextLevel()
})
let currentLevel = 0
let maps: Image[] = []
let hero: Sprite = null
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
nextLevel()
