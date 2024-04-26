import { CGFobject } from "../../../lib/CGF.js";
import { MyTriangle } from "./MyTriangle.js";

/**
* MyPetal
* @constructor
* @param scene - Reference to MyScene object
*/

export class MyPetal1 extends CGFobject {
    constructor(scene, rotationAngle, prismAngle) {
        super(scene);
        this.rotationAngle = rotationAngle;
        this.prismAngle = prismAngle;
        this.triangle = new MyTriangle(scene);
    }

    display() {
        // First petal
        this.scene.pushMatrix();
        this.scene.scale(0.3, 1, 1);
        this.scene.rotate(0, 0, 0, 1); // Apply prism angle
        this.scene.rotate(this.rotationAngle, 0, 0, 1); // Apply rotation angle in relation to the receptacle
        this.triangle.display();
        this.scene.popMatrix();
    
        // Second petal
        this.scene.pushMatrix();
        this.scene.scale(0.3, 1, 1);
        this.scene.translate(0, 0, 1);
        this.scene.rotate(Math.PI , 0, 1, 0); // Apply prism angle
        this.scene.rotate(this.prismAngle , 0, 0, 1); // Apply prism angle (adjust as needed)
        this.scene.rotate(this.rotationAngle, 0, 0, 1); // Apply rotation angle in relation to the receptacle
        this.triangle.display();
        this.scene.popMatrix();
    }
}