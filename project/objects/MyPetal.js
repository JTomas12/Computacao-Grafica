import { CGFobject } from "../../../lib/CGF.js";
import { MyTriangle } from "../geometric/MyTriangle.js";
import { CGFappearance, CGFtexture } from '../../lib/CGF.js';

/**
* MyPetal
* @constructor
* @param scene - Reference to MyScene object
*/

export class MyPetal extends CGFobject {
    constructor(scene, rotationAngle, prismAngle, petalColor) {
        super(scene);
        this.rotationAngle = rotationAngle; //Angle that the petal is rotated , i.e. the angle between the petal and the surface of the flower
        this.prismAngle = prismAngle; //Angle between the two triangles that compose the petal (the names of the variables are switched, prism should be rotation and rotation should be prism)
        this.triangle = new MyTriangle(scene);
        this.texture = new CGFtexture(this.scene, 'images/petal_texture.jpg');
        this.initMaterials(petalColor);
    }
    initMaterials(petalColor) {
        this.petalMaterial = new CGFappearance(this.scene); // Create a new material for the petal
        this.petalMaterial.setAmbient(0.9,0.9,0.9,1); 
        this.petalMaterial.setDiffuse(petalColor[0]/255, petalColor[1]/255, petalColor[2]/255, 1.0);
        this.petalMaterial.setSpecular(petalColor[0]/255, petalColor[1]/255, petalColor[2]/255, 1.0);
        this.petalMaterial.setShininess(10.0);
        this.petalMaterial.setTexture(this.texture);
    }
    display() {
        //Display the first textured triangle that composes the petal
        this.scene.pushMatrix();
        this.scene.scale(0.3, 1, 1);
        this.scene.rotate(this.rotationAngle, 1, 0, 0);
        this.scene.rotate(-Math.PI/6, 1, 0, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.petalMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();
        //Display the second textured triangle that composes the petal
        this.scene.pushMatrix();
        this.scene.scale(0.3, 1, 1);
        this.scene.rotate(this.rotationAngle, 1, 0, 0);
        this.scene.rotate(this.prismAngle, 1, 0, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.petalMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();
    }
}