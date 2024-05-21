import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MySphere } from '../geometric/MySphere.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanoram extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.sphere = new MySphere(scene, 100, 200, 200, 1, 1, 1);
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setTexture(texture);

    }
		
    
    display() {
        this.scene.pushMatrix();

        this.material.apply(); // Apply the material , essentially the texture
    
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]); // Sets the position of the sphere to the camera position (perspectve on the center of the panoram, "diving into the panoram")
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