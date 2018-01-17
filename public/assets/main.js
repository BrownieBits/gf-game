import Level1 from './level1_1.js'

class Game extends Phaser.Game{
    constructor(){
        const width = 1600
        const height = 900

        super(width,height,Phaser.AUTO);
        this.state.add('Level1', Level1)
        this.state.start('Level1')
    }
}

new Game();