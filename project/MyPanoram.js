import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MySphere } from '../project/MySphere.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanoram extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.sphere = new MySphere(scene, 20, 20, 1, 1);
        this.material = new CGFappearance(this.scene)
        this.material.setEmission(1, 1, 1, 1)
        this.material.setTexture(texture)
        
    }
		
    
    display() {
        this.scene.pushMatrix();
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();
    
    }
    /*
    updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
    */
}