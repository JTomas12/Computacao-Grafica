import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MyPrism } from '../geometric/MyPrism.js';
import { MyUnitCube } from '../geometric/MyUnitCube.js';
import { MyPollen } from './MyPollen.js';

/**
 * MyHive
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyHive extends CGFobject {
    constructor(scene, pollenPresent) {
        super(scene);
        this.texture1 = new CGFtexture(this.scene, "./images/white_wood.jpg");
        this.texture2 = new CGFtexture(this.scene, "./images/hive_texture.jpg");
        this.prim = new MyPrism(scene, 3, 1); 
        this.cube = new MyUnitCube(scene, this.texture2, this.texture1, this.texture1, this.texture1, this.texture1, this.texture1);
        this.pollenPresent = pollenPresent;
        this.pollen = new MyPollen(scene);

        this.initMaterials();
    }

    initMaterials() {

        this.cubeMaterial = new CGFappearance(this.scene);
        this.cubeMaterial.setAmbient(0.9, 0.9, 0.9, 1.0);
        this.cubeMaterial.setDiffuse(0.95, 0.95, 0.95, 1.0);
        this.cubeMaterial.setSpecular(1, 1, 1, 1.0);
        this.cubeMaterial.setShininess(10.0);

        this.prismMaterial = new CGFappearance(this.scene);
        this.prismMaterial.setAmbient(0.9, 0.9, 0.9, 1.0);
        this.prismMaterial.setDiffuse(0.95, 0.95, 0.95, 1.0);
        this.prismMaterial.setSpecular(1, 1, 1, 1.0);
        this.prismMaterial.setShininess(10.0);
        this.prismMaterial.setTexture(new CGFtexture(this.scene, "./images/white_wood.jpg"));
        this.prismMaterial.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

    }

    // Display the hive, including the cube, prism, and pollen if present
    display() {

        this.scene.pushMatrix();

        // Translate and scale the entire hive
        this.scene.translate(-11, 3, -0.2);
        this.scene.scale(3, 3, 3);

        // Display the prism part of the hive
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.scale(0.4, 0.7, 0.5);
        this.scene.translate(1.5, 0, -1);
        this.prismMaterial.apply();
        this.prim.display();
        this.scene.popMatrix();

        // Display the cube part of the hive
        this.scene.pushMatrix();
        this.cubeMaterial.apply();
        this.cube.display();
        this.scene.popMatrix();

        // Display the pollen if present
        if(this.pollenPresent){
            this.scene.pushMatrix();
            this.scene.translate(0, 0.6, 0.5);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.scene.scale(0.3, 0.3, 0.3);
            this.pollen.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }
}

