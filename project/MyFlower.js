import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MySphere } from '../project/MySphere.js';
import { MyStem } from '../project/MyStem.js';
import {MyReceptacle} from '../project/MyReceptacle.js';

export class MyFlower extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 1 ,200, 200, 1, 1, 1);
        this.stem = new MyStem(scene, 10, 10, 0.1);
        this.receptacle = new MyReceptacle(scene, 10, 10, 0.1);
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setTexture(texture);

    }
}