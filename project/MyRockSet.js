import {CGFobject} from '../lib/CGF.js';
import {MyRock} from './MyRock.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */


export class MyRockSet extends CGFobject {

    constructor(scene, numRocks) {
        super(scene);
        this.numRocks = numRocks;
        this.rocks = [];
        this.initRocks();
    }

    initRocks() {
        for (let i = 0; i < this.numRocks; i++) {
            let slices = Math.floor(Math.random() * 5) + 5;  
            let stacks = Math.floor(Math.random() * 5) + 5;  
            let rock = new MyRock(this.scene, slices, stacks);
            this.rocks.push({
                rock: rock,
                scale: {
                    x: Math.random() * 0.3 + 0.1,  
                    y: Math.random() * 0.3 + 0.1,  
                    z: Math.random() * 0.3 + 0.1   
                },
                rotation: Math.random() * Math.PI * 2, 
                position: {
                    x: Math.random() * 2 - 1,  // Narrower range for x (-1 to 1)
                    y: Math.random() * 0.5,    // Lower range for y to bring rocks closer vertically
                    z: Math.random() * 2 - 1   // Narrower range for z (-1 to 1)
                }
            });
        }
    }


    display() {

        this.scene.pushMatrix();

        this.scene.translate(-1, -1, 5);
        this.scene.scale(0.5, 0.5, 0.5);


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