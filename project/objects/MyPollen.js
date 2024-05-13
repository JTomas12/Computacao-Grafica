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
        this.sphere = new MySphere(scene, 0.5, 20, 20, 0, 1, 1);
        this.initMaterials();
    }


    initMaterials() {

        this.pollenMaterial = new CGFappearance(this.scene);
        this.pollenMaterial.setAmbient(0.9, 0.9, 0.9, 1.0);
        this.pollenMaterial.setDiffuse(0.95, 0.95, 0.95, 1.0);
        this.pollenMaterial.setSpecular(1, 1, 1, 1.0);
        this.pollenMaterial.setShininess(10.0);
        this.pollenMaterial.setTexture(new CGFtexture(this.scene, "./images/pollen.jpg"));
        this.pollenMaterial.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

    }

    display() {
        this.scene.pushMatrix()
        this.scene.translate(0, 4, -1);
        this.scene.scale(0.5,1, 0.5);
        this.pollenMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix()
    }

}




