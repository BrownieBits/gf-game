var playerSpeed = 300;
var jumpTimer = 0;
var map,layer,player,cursors;
export default class extends Phaser.State{
    init(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignVertically = true;
        this.scale.pageAlignHorizontally = true;
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.stage.backgroundColor = '#3fa9f5';
    }
    preload(){
        this.load.tilemap('map', '/assets/1-1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('1-1_1', '/assets/World1-1Ground.png');
        this.load.spritesheet('player', '/assets/player.png', 50,64);
    }
    create(){
        map = this.add.tilemap('map');
        map.addTilesetImage('1-1_1');
        map.setCollisionByExclusion([  7,8 ]);
        layer = map.createLayer('Tile Layer 1');
        layer.resizeWorld();
        
        this.physics.arcade.gravity.y = 900;
        
        player = this.add.sprite(100,100, 'player');
        player.anchor.setTo(0.5);
        player.animations.add('idle', [0],1,false);
        player.animations.add('walk', [0],1,false);
        player.animations.add('jump', [1],1,false);
        
        this.physics.arcade.enable(player);
        this.camera.follow(player);
        player.body.bounce.y = 0.1;
        player.body.linearDamping = 1;
        player.body.collideWorldBounds = true;
        cursors = this.input.keyboard.createCursorKeys();
    }
    update(){
        this.physics.arcade.collide(player,layer,TileCollide,null,this)
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

        if (cursors.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer)
        {
            player.animations.play('jump');
            player.body.velocity.y = -700;
            jumpTimer = this.time.now + 750;
        }

        if(player.body.onFloor() == false){
            player.animations.play('jump');
        }
    }
    
}
function TileCollide(p, t){    
    if(t.index == 9 && (t.worldY + (t.height + 30)) < p.position.y && (t.worldX - ((p.body.width / 2) - 1)) < p.position.x && (t.worldX + t.width + ((p.body.width / 2) - 1)) > p.position.x){
        map.removeTile(t.x, t.y, layer).destroy();
    }
}