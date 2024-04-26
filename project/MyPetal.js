import { CGFobject } from "../../../lib/CGF.js";
import { MyTriangle } from "./MyTriangle.js";

/**
* MyPetal
* @constructor
* @param scene - Reference to MyScene object
*/

export class MyPetal extends CGFobject {
    constructor(scene, rotationAngle, prismAngle) {
        super(scene);
        this.rotationAngle = rotationAngle;
        this.prismAngle = prismAngle;
        this.triangle = new MyTriangle(scene);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.3, 1, 1);
        this.scene.rotate(this.rotationAngle, 1, 0, 0);
        this.scene.rotate(-Math.PI/6, 1, 0, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.3, 1, 1);
        this.scene.rotate(this.rotationAngle, 1, 0, 0);
        this.scene.rotate(this.prismAngle, 1, 0, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();
    }
}