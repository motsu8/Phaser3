import Phaser from "phaser";

export default class Drop extends Phaser.Scene {
    constructor() {
        super({ key: "drop" });
    }
    preload() {
        this.load.setBaseURL("https://labs.phaser.io");
        this.load.atlas(
            "cards",
            "assets/atlas/cards.png",
            "assets/atlas/cards.json"
        );
    }

    create() {
        //  Create a stack of random cards

        const frames = this.textures.get("cards").getFrameNames();

        const x = 100;
        let y = 100;

        for (let i = 0; i < 64; i++) {
            const image = this.add
                .image(x, y, "cards", Phaser.Math.RND.pick(frames))
                .setInteractive();

            this.input.setDraggable(image);

            y += 6;
        }

        //  A drop zone positioned at 600x300 with a circular drop zone 128px in radius
        const zone = this.add
            .zone(600, 300, 200, 250)
            .setOrigin(0, 0)
            .setRectangleDropZone(200, 250);

        //  Just a visual display of the drop zone
        const graphics = this.add.graphics();

        graphics.lineStyle(2, 0xffff00);

        graphics.strokeRect(zone.x, zone.y, 200, 250);

        this.input.on(
            "dragstart",
            function (
                this: Phaser.Scene,
                pointer: Phaser.Input.Pointer,
                gameObject: Phaser.GameObjects.Image
            ) {
                console.log(pointer);
                this.children.bringToTop(gameObject);
            },
            this
        );

        this.input.on(
            "drag",
            (
                pointer: Phaser.Input.Pointer,
                gameObject: Phaser.GameObjects.Image,
                dragX: number,
                dragY: number
            ) => {
                console.log(pointer);
                gameObject.x = dragX;
                gameObject.y = dragY;
            }
        );

        this.input.on("dragenter", () => {
            graphics.clear();
            graphics.lineStyle(2, 0x00ffff);
            graphics.strokeRect(zone.x, zone.y, 200, 250);
        });

        this.input.on("dragleave", () => {
            graphics.clear();
            graphics.lineStyle(2, 0xffff00);
            graphics.strokeRect(zone.x, zone.y, 200, 250);
        });

        this.input.on(
            "drop",
            (
                pointer: Phaser.Input.Pointer,
                gameObject: Phaser.GameObjects.Image,
                dropZone: Phaser.GameObjects.Zone
            ) => {
                console.log(pointer);
                gameObject.x = dropZone.x + 100;
                gameObject.y = dropZone.y + 125;
                gameObject.input!.enabled = false;
                graphics.clear();
                graphics.lineStyle(2, 0xffff00);
                graphics.strokeRect(zone.x, zone.y, 200, 250);
            }
        );

        this.input.on(
            "dragend",
            (
                pointer: Phaser.Input.Pointer,
                gameObject: Phaser.GameObjects.Image,
                dropped: boolean
            ) => {
                console.log(pointer);
                if (!dropped) {
                    gameObject.x = gameObject.input!.dragStartX;
                    gameObject.y = gameObject.input!.dragStartY;
                }
            }
        );

        let change = this.add
            .text(400, 130, "Change Scene!")
            .setFontSize(20)
            .setFontFamily("Arial")
            .setOrigin(0.5)
            .setInteractive();

        change.on(
            "pointerdown",
            function (this: Phaser.Scene, pointer: Phaser.Input.Pointer) {
                console.log(pointer);
                this.scene.start("draw");
            },
            this
        );
    }
}
