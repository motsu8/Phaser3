import Example from "./scene/draw";
import Drop from "./scene/drop";

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 300},
            debug: true,
        },
    },
    scene: [Example, Drop], 
};

new Phaser.Game(config);
