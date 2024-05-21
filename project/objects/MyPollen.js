import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from '../geometric/MySphere.js';

/**
 * MyPollen
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of slices
 * @param stacks - number of stacks
 */

export class MyPollen extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 0.5, 20, 20, 0, 2, 2); // Create a sphere with radius 0.5 and an enlongated shape
        this.initMaterials();
        this.randomAngle = Math.random() * 2 * Math.PI; // Random angle for the pollen to rotate
    }

    // Initializes the pollen material
    initMaterials() {

        this.pollenMaterial = new CGFappearance(this.scene);
        this.pollenMaterial.setAmbient(0.9, 0.9, 0.9, 1.0);
        this.pollenMaterial.setDiffuse(0.95, 0.95, 0.95, 1.0);
        this.pollenMaterial.setSpecular(1, 1, 1, 1.0);
        this.pollenMaterial.setShininess(10.0);
        this.pollenMaterial.setTexture(new CGFtexture(this.scene, "./images/pollen.jpg"));
        this.pollenMaterial.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

    }

    // Display the pollen
    display() {
        this.scene.pushMatrix()
        this.scene.rotate(this.randomAngle, 0, 0, 1); // Rotate the pollen
        this.pollenMaterial.apply(); // Apply the pollen material
        this.sphere.display();
        this.scene.popMatrix()
    }

}




