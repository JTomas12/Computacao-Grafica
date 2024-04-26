import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyStem } from '../project/MyStem.js';
import { MySphere } from '../project/MySphere.js';
import {MyPetal} from '../project/MyPetal.js';
export class MyFlower extends CGFobject {
    constructor(scene, outer_radius, number_of_petals, receptacle_radius, receptacle_color, stem_radius, stem_color, stem_stacks, stem_height, petal_color,rotationAngle,prismAngle) {
        super(scene);
        this.number_of_petals = number_of_petals;
        this.outer_radius = outer_radius;
        this.receptacle_radius = receptacle_radius;
        this.stem_height = stem_height;
        this.stem = new MyStem(scene, 20, stem_stacks, stem_radius, stem_height);
        // constructor(scene, slices, stacks, radius, height)
        this.sphere = new MySphere(scene, receptacle_radius, 30, 20, 20, 1, 1);
        //constructor(scene, radius,slices , stacks, inside, north, south) 
        this.petal_color = petal_color;
        this.petal = new MyPetal(scene, rotationAngle, prismAngle);
    }

    display() {
        // Display stem
        
        this.scene.pushMatrix();
        this.stem.display();
        this.scene.popMatrix();

        // Display receptacle (sphere)
        this.scene.pushMatrix();
        this.scene.translate(0, this.stem_height, 0);
        this.sphere.display();
        this.scene.popMatrix();
        
        for(let i = 0; i < this.number_of_petals; i++) {
            this.scene.pushMatrix();
            this.scene.translate(0, this.stem_height + this.receptacle_radius, 0);
            this.scene.rotate(i * 2 * Math.PI / this.number_of_petals, 0, 1, 0);
            this.scene.scale(this.outer_radius-this.receptacle_radius, this.outer_radius-this.receptacle_radius, this.outer_radius-this.receptacle_radius);
            //this.scene.petal_color.apply();
            this.petal.display();
            this.scene.popMatrix();
        }

    }
}