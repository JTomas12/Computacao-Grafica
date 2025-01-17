import {CGFobject} from '../../lib/CGF.js';
import {MyRock} from './MyRock.js';

export class MyRockSet extends CGFobject {
    constructor(scene, numRocks) {
        super(scene);
        this.numRocks = numRocks;
        this.rocks = [];
        this.initRocks();
    }

    // Initialize the rocks in the set
    initRocks() {
        let levels = Math.ceil((Math.sqrt(this.numRocks) / 2));  // Compute levels to have a fuller base
        let currentX = 0;
        let currentZ = 0;
        let yOffset = 0.1; // Distance between levels
        let totalRocks = 0;
        let levelWidth = levels;  // Start with the full width for the base level

        for (let level = 0; level < levels && totalRocks < this.numRocks; level++) {
            let numRocksInLevel = levelWidth*2; // Each level has twice the width of the previous level
            currentX = -numRocksInLevel / 2 * 0.2;  // Center the rocks in the current level

            for (let i = 0; i < numRocksInLevel; i++) {
                if (totalRocks >= this.numRocks) {
                    break;
                }
                let slices = Math.floor(Math.random() * 5) + 5; // Random number of slices between 5 and 10
                let stacks = Math.floor(Math.random() * 5) + 5; // Random number of stacks between 5 and 10
                let rock = new MyRock(this.scene, slices, stacks); // Create a new rock

                this.rocks.push({
                    rock: rock,
                    scale: {
                        x: Math.random() * 0.3 + 0.1,
                        y: Math.random() * 0.3 + 0.1,
                        z: Math.random() * 0.3 + 0.1
                    },
                    rotation: Math.random() * Math.PI * 2, // Random rotation around the Y axis
                    position: {
                        x: currentX,
                        y: level * yOffset,
                        z: currentZ
                    }
                });

                currentX += 0.2;  // Increment x position for next rock
                totalRocks++; // Increment the total number of rocks created so far
            }

            levelWidth -= 1;  // Decrease the number of rocks for the next level up
            currentZ += 0.1;  // Increment Z for the next level
        }
    }

    // Display the rock set
    display() {

        this.scene.pushMatrix();
        this.scene.translate(-10, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.scale(4, 4, 4);

        // Display each rock in the set
        for (let {rock, scale, rotation, position} of this.rocks) {
            this.scene.pushMatrix();

            this.scene.translate(position.x, position.y, position.z);
            this.scene.rotate(rotation, 0, 1, 0);
            this.scene.scale(scale.x, scale.y, scale.z);

            rock.display();

            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }
}

