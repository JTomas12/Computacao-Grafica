import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MySphere } from '../project/MySphere.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanoram extends CGFobject {
    constructor(scene, texture, rockSet) {
        super(scene);
        this.sphere = new MySphere(scene, 200, 200, 1, 1, 1);
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setTexture(texture);
        this.rockSet = rockSet;

    }
		
    
    display() {
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.sphere.display();
        this.scene.scale(0.1, 0.1, 0.1);
        this.scene.translate(-5, -2, 0); 
        //this.rockSet.display();
        this.scene.popMatrix();
    
    }
    /*
    updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
    */
}