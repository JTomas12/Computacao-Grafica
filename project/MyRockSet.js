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
        const rows = [2,1]; 
        let currentX = 0;
        let currentZ = 0;
        let zRows = 3; 
        let zDepth = 0.3; 
        let yOffset = 0.1; 
    
        for (let zRow = 0; zRow < zRows; zRow++) {
            currentX = 0; 
    
            for (let row = 0; row < rows.length; row++) {
                let numRocksInRow = rows[row];
                
    
                for (let i = 0; i < numRocksInRow; i++) {
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
                            x: 1 + currentX*0.1,
                            y: row * yOffset,          
                            z: currentZ                 
                        }
                    });
                }
                currentX += 1.0; 
            }
            currentZ += zDepth; 
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