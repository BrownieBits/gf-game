var playerSpeed = 400;
var jumpTimer = 0;
var g,globalGravity;
var map,blayer,glayer,wlayer,clayer,olayer,chestGroup1,chestGroup2,gOrbGroup,rOrbGroup,waterGroup1,waterGroup2,waterGroup3,waterGroup4,waterGroup5,waterGroup6;
var player,cursors,scoreText, score, playerJumped;
export default class extends Phaser.State{
    init(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignVertically = true;
        this.scale.pageAlignHorizontally = true;
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.stage.backgroundColor = '#3fa9f5';
    }
    preload(){
        this.load.tilemap('map', '/assets/Maps/1-1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('ground', '/assets/Maps/ground.png');
        this.load.spritesheet('water', '/assets/Maps/water.png',64,64);
        this.load.spritesheet('chest', '/assets/Maps/chest.png', 64,64);
        this.load.spritesheet('orbs', '/assets/Maps/orbs.png', 64,64);
        this.load.spritesheet('player', '/assets/player.png', 64,64);
    }
    create(){
        g = this;
        globalGravity = 2500;
        score = 0;
        map = g.add.tilemap('map');
        map.addTilesetImage('ground','ground');
        map.addTilesetImage('water','water');
        map.addTilesetImage('chest','chest');
        map.addTilesetImage('orbs','orbs');
        blayer = map.createLayer('Background Layer');
        glayer = map.createLayer('Ground Layer');
        wlayer = map.createLayer('Water Layer');
        clayer = map.createLayer('Chest Layer');
        olayer = map.createLayer('Orb Layer');
        blayer.resizeWorld();
        glayer.resizeWorld();
        wlayer.resizeWorld();
        clayer.resizeWorld();
        olayer.resizeWorld();
        map.setCollisionByExclusion([33,34,35], true, glayer);
        chestGroup1 = g.add.group();
        chestGroup1.enableBody = true;
        chestGroup1.physicsBodyType = Phaser.Physics.ARCADE;
        chestGroup2 = g.add.group();
        chestGroup2.enableBody = true;
        chestGroup2.physicsBodyType = Phaser.Physics.ARCADE;
        gOrbGroup = g.add.group();
        gOrbGroup.enableBody = true;
        gOrbGroup.physicsBodyType = Phaser.Physics.ARCADE;
        waterGroup1 = g.add.group();
        waterGroup1.enableBody = true;
        waterGroup1.physicsBodyType = Phaser.Physics.ARCADE;
        waterGroup2 = g.add.group();
        waterGroup2.enableBody = true;
        waterGroup2.physicsBodyType = Phaser.Physics.ARCADE;
        waterGroup3 = g.add.group();
        waterGroup3.enableBody = true;
        waterGroup3.physicsBodyType = Phaser.Physics.ARCADE;
        waterGroup4 = g.add.group();
        waterGroup4.enableBody = true;
        waterGroup4.physicsBodyType = Phaser.Physics.ARCADE;
        waterGroup5 = g.add.group();
        waterGroup5.enableBody = true;
        waterGroup5.physicsBodyType = Phaser.Physics.ARCADE;
        waterGroup6 = g.add.group();
        waterGroup6.enableBody = true;
        waterGroup6.physicsBodyType = Phaser.Physics.ARCADE;
        g.physics.arcade.gravity.y = globalGravity;
        g.physics.arcade.OVERLAP_BIAS = 128;
        clayer.layer.data.forEach(function(layer){
            layer.forEach(function(chest){
                if(chest.index == 90){
                    var c = chestGroup1.create(chest.worldX,chest.worldY, 'chest');
                    c.body.allowGravity = false;
                    chest.index = -1;
                }
                else if(chest.index == 92){
                    var c = chestGroup2.create(chest.worldX,chest.worldY, 'chest');
                    c.body.allowGravity = false;
                    chest.index = -1;
                }
            })
        })
        chestGroup1.callAll('animations.add', 'animations', 'closed', [0], 1, true);
        chestGroup1.callAll('animations.add', 'animations', 'open', [1], 1, true);
        chestGroup1.callAll('animations.play', 'animations', 'closed');
        chestGroup2.callAll('animations.add', 'animations', 'closed', [2], 1, true);
        chestGroup2.callAll('animations.add', 'animations', 'open', [3], 1, true);
        chestGroup2.callAll('animations.play', 'animations', 'closed');
        olayer.layer.data.forEach(function(layer){
            layer.forEach(function(orb){
                if(orb.index == 94){
                    var o = gOrbGroup.create(orb.worldX,orb.worldY, 'orbs');
                    o.body.allowGravity = false;
                    orb.index = -1;
                }
            })
        })
        gOrbGroup.callAll('animations.add', 'animations', 'gGlow', [0, 1, 2, 3, 4, 5, 4, 3, 2,1], 5, true);
        gOrbGroup.callAll('animations.play', 'animations', 'gGlow');
        wlayer.layer.data.forEach(function(layer){
            layer.forEach(function(water){
                if(water.index == 42){
                    var w = waterGroup1.create(water.worldX,water.worldY, 'water');
                    w.body.allowGravity = false;
                    water.index = -1;
                }
                else if(water.index == 43){
                    var w = waterGroup2.create(water.worldX,water.worldY, 'water');
                    w.body.allowGravity = false;
                    water.index = -1;
                }
                else if(water.index == 44){
                    var w = waterGroup3.create(water.worldX,water.worldY, 'water');
                    w.body.allowGravity = false;
                    water.index = -1;
                }
                else if(water.index == 45){
                    var w = waterGroup4.create(water.worldX,water.worldY, 'water');
                    w.body.allowGravity = false;
                    water.index = -1;
                }
                else if(water.index == 46){
                    var w = waterGroup5.create(water.worldX,water.worldY, 'water');
                    w.body.allowGravity = false;
                    water.index = -1;
                }
                else if(water.index == 47){
                    var w = waterGroup6.create(water.worldX,water.worldY, 'water');
                    w.body.allowGravity = false;
                    water.index = -1;
                }
            })
        })
        waterGroup1.callAll('animations.add', 'animations', 'water1', [6, 12, 18, 24, 30, 36, 42, 48, 54, 60], 10, true);
        waterGroup1.callAll('animations.play', 'animations', 'water1');
        waterGroup2.callAll('animations.add', 'animations', 'water1', [7, 13, 19, 25, 31, 37, 43, 49, 55, 61], 10, true);
        waterGroup2.callAll('animations.play', 'animations', 'water1');
        waterGroup3.callAll('animations.add', 'animations', 'water1', [8, 14, 20, 26, 32, 38, 44, 50, 56, 62], 10, true);
        waterGroup3.callAll('animations.play', 'animations', 'water1');
        waterGroup4.callAll('animations.add', 'animations', 'water1', [9, 15, 21, 27, 33, 39, 45, 51, 57, 63], 10, true);
        waterGroup4.callAll('animations.play', 'animations', 'water1');
        waterGroup5.callAll('animations.add', 'animations', 'water1', [10, 16, 22, 28, 34, 40, 46, 52, 58, 64], 10, true);
        waterGroup5.callAll('animations.play', 'animations', 'water1');
        waterGroup6.callAll('animations.add', 'animations', 'water1', [11, 17, 23, 29, 35, 41, 47, 53, 59, 65], 10, true);
        waterGroup6.callAll('animations.play', 'animations', 'water1');
        player = g.add.sprite(100,500, 'player');
        player.anchor.setTo(0.5);
        player.animations.add('idle', [0],1,false);
        player.animations.add('walk', [1,2],2,true);
        player.animations.add('jump', [4],1,false);
        playerJumped = 0;
        g.physics.arcade.enable(player);
        g.camera.follow(player);
        player.body.bounce.y = 0.1;
        player.body.linearDamping = 1;
        player.body.collideWorldBounds = true;
        player.body.deltaMax = 128;
        cursors = g.input.keyboard.createCursorKeys();
        scoreText = g.add.text(25, 25, "x - " + score, {
            font: "30px Arial",
            fill: "#ff0044",
            align: "left"
        });
        scoreText.fixedToCamera = true;
    }
    update(){
        this.physics.arcade.collide(player,glayer,TileCollide,null,this)
        this.physics.arcade.overlap(player, gOrbGroup, collectGreenOrb, null, this);
        this.physics.arcade.overlap(player, waterGroup1, playerDie, null, this);
        this.physics.arcade.overlap(player, chestGroup1, silverChestOpen, null, this);
        this.physics.arcade.overlap(player, chestGroup2, goldChestOpen, null, this);
        player.body.velocity.x = 0;
        
        player.animations.play('idle');
        if (cursors.left.isDown)
        {
            player.animations.play('walk');
            player.scale.setTo(-1,1);
            player.body.velocity.x -= playerSpeed;
        }
        else if (cursors.right.isDown)
        {
            player.animations.play('walk');
            player.scale.setTo(1,1);
            player.body.velocity.x += playerSpeed;
        }
        
        if (cursors.up.isDown && (player.body.onFloor())){   //player is on the ground, so he is allowed to start a jump
            playerJumped = 1;
            player.body.velocity.y = -500;
        } 
        else if (cursors.up.isDown && (playerJumped != 0) && (playerJumped < 5)){ //player is no longer on the ground, but is still holding the jump key
            playerJumped++;
        } 
        else if (cursors.up.isDown && (playerJumped != 0)){ //player is no longer on the ground, but is still holding the jump key
            if (playerJumped > 30) { // player has been holding jump for over 30 frames, it's time to stop him
                playerJumped = 0;
            } 
            else { // player is allowed to jump higher (not yet 30 frames of jumping)
                playerJumped++;
                player.body.velocity.y = -500;
            }
        } 
        else if (playerJumped != 0) { //reset jumptimer since the player is no longer holding the jump key
            playerJumped = 0;
        }

        if(player.body.onFloor() == false){
            player.animations.play('jump');
        }
    }
    
}
function TileCollide(p, t){   
    //if(t.index == 9 && (t.worldY + (t.height + 30)) < p.position.y && (t.worldX - ((p.body.width / 2) - 1)) < p.position.x && (t.worldX + t.width + ((p.body.width / 2) - 1)) > p.position.x){
    //    map.removeTile(t.x, t.y, layer).destroy();
    //}
    if(t.index == 12){
        console.log(t)
    }
}
function collectGreenOrb(p, t){    
    score += 50;
    scoreText.setText("x - " + score);
    t.kill();
}
function collectRedOrb(p, t){    
    score += 100;
    scoreText.setText("x - " + score);
    t.kill();
}
function playerDie(p, t){    
    p.kill();
    this.state.start('Level1')
}
function silverChestOpen(p, t){    
    t.animations.play('open');
}
function goldChestOpen(p, t){    
    t.animations.play('open');
}

