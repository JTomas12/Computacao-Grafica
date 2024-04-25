import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MySphere } from '../project/MySphere.js';

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject {
    constructor(scene, x, y, z) {
        super(scene);
        this.head = new MySphere(scene, 16, 8, 0, 1, 1);
        this.body = new MySphere(scene, 16, 8, 0, 1, 1);
        this.abdomen = new MySphere(scene, 16, 8, 0, 1, 1);
        this.wing = new MySphere(scene, 16, 8, 0, 1, 1);
        this.eye = new MySphere(scene, 16, 8, 0, 1, 1);
        this.paw = new MySphere(scene, 16, 8, 0, 1, 1);
        this.initMaterials();
        
    }
		


    initMaterials() {

        // Paw material
        this.pawMaterial = new CGFappearance(this.scene);
        this.pawMaterial.setAmbient(0.2, 0.2, 0.2, 1.0); 
        this.pawMaterial.setDiffuse(0.2, 0.2, 0.2, 1.0); 
        this.pawMaterial.setSpecular(0.9, 0.9, 0.9, 1.0); 
        this.pawMaterial.setShininess(10.0); 

        // Eye material
        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.setAmbient(0.2, 0.2, 0.2, 1.0); 
        this.eyeMaterial.setDiffuse(0.2, 0.2, 0.2, 1.0); 
        this.eyeMaterial.setSpecular(0.9, 0.9, 0.9, 1.0); 
        this.eyeMaterial.setShininess(10.0); 




           
    }
    display() {
        this.scene.pushMatrix()
        this.drawElements();
        this.scene.popMatrix()
    }
    drawElements() {
        //Body
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.6, 0.9);
        this.body.display();
        this.scene.popMatrix();

        //Head
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.scene.rotate(-Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.6, 0.6, 0.4);
        this.head.display();
        this.scene.popMatrix();

        //Eyes
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.1, 1.1);
        this.scene.rotate(Math.PI / 3, 1, 0, 0);
        this.scene.scale(0.2, 0.2, 0.4);
        this.eyeMaterial.apply();
        this.eye.display();
        this.scene.translate(5, 0, 0);
        this.eye.display();
        this.scene.popMatrix();

        //Abdomen
        this.scene.pushMatrix();
        this.scene.translate(0, -0.2, -1.5);
        this.scene.rotate(-Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.8, 0.7, 1);
        this.abdomen.display();
        this.scene.popMatrix();

        //Wings
        this.scene.pushMatrix();
        this.scene.translate(1.2, 0.3, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.5, 0.1, 1.2);
        this.wing.display();
        this.scene.translate(0, 0, -2);
        this.wing.display();
        this.scene.popMatrix();

        //Paws
        this.scene.pushMatrix();
        this.scene.translate(0.3, -0.5, 0.5);
        this.scene.rotate(Math.PI / 3, 1, 0, 0);
        this.scene.scale(0.1, 0.1, 0.3);
        this.pawMaterial.apply();
        this.paw.display();
        this.scene.translate(0, 0, 1.8);
        this.paw.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.3, -0.5, -0.4);
        this.scene.rotate(-Math.PI / 3, 1, 0, 0);
        this.scene.scale(0.1, 0.1, 0.3);
        this.paw.display();
        this.scene.translate(0, 0, -1.8);
        this.paw.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.3, -0.5, 0.5);
        this.scene.rotate(Math.PI / 3, 1, 0, 0);
        this.scene.scale(0.1, 0.1, 0.3);
        this.paw.display();
        this.scene.translate(0, 0, 1.8);
        this.paw.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.3, -0.5, -0.4);
        this.scene.rotate(-Math.PI / 3, 1, 0, 0);
        this.scene.scale(0.1, 0.1, 0.3);
        this.paw.display();
        this.scene.translate(0, 0, -1.8);
        this.paw.display();
        this.scene.popMatrix();


    }
}