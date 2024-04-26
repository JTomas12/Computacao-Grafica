import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MySphere } from '../project/MySphere.js';
import { MyCone } from './MyCone.js';

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
        this.sting = new MyCone(scene, 16, 8);
        this.position = {x: x, y: y, z: z};
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

        // Abdomen material
        this.abdomenMaterial = new CGFappearance(this.scene);
        this.abdomenMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
        this.abdomenMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
        this.abdomenMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
        this.abdomenMaterial.setTexture(new CGFtexture(this.scene, "./images/bee_texture.png"));
        this.abdomenMaterial.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

        // Head material
        this.headMaterial = new CGFappearance(this.scene);
        this.headMaterial.setAmbient(1.0, 0.8, 0.0, 1.0); 
        this.headMaterial.setDiffuse(1.0, 0.8, 0.0, 1.0);  
        this.headMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);  
        this.headMaterial.setShininess(10.0);  

        // Body material
        this.bodyMaterial = new CGFappearance(this.scene);
        this.bodyMaterial.setAmbient(1.0, 0.8, 0.0, 1.0); 
        this.bodyMaterial.setDiffuse(1.0, 0.8, 0.0, 1.0);  
        this.bodyMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);  
        this.bodyMaterial.setShininess(10.0);  

        // Wings material
        this.wingsMaterial = new CGFappearance(this.scene);
        this.wingsMaterial.setAmbient(0.2, 0.2, 0.2, 0.0);  
        this.wingsMaterial.setDiffuse(0.7, 0.7, 0.8, 0.9);  
        this.wingsMaterial.setSpecular(1.0, 1.0, 1.0, 0.9);  
        this.wingsMaterial.setShininess(50.0);  
        this.wingsMaterial.setEmission(0.5, 0.5, 0.5, 0.0);  


        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
        this.scene.gl.enable(this.scene.gl.BLEND);

    }
    display() {
        this.scene.pushMatrix()
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.drawElements();
        this.scene.popMatrix()
    }
    drawElements() {

        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);

        //Body
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.6, 0.9);
        this.bodyMaterial.apply();
        this.body.display();
        this.scene.popMatrix();

        //Head
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.scene.rotate(-Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.6, 0.6, 0.4);
        this.headMaterial.apply();
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
        this.scene.rotate(Math.PI / 3, 1, 0, 0);
        this.scene.scale(0.8,1, 0.7);
        this.abdomenMaterial.apply();
        this.abdomen.display();
        this.scene.popMatrix();

        //Wings
        this.scene.pushMatrix();
        this.scene.translate(1.2, 0.3, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.5, 0.1, 1.2);
        this.wingsMaterial.apply();
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

        //Sting
        this.scene.pushMatrix();
        this.scene.translate(0, -0.65, -2.3);
        this.scene.rotate(-Math.PI / 1.6, 1, 0, 0);
        this.scene.scale(0.1, 0.5, 0.1);
        this.pawMaterial.apply();
        this.sting.display();
        this.scene.popMatrix();

        this.scene.popMatrix();


    }
}