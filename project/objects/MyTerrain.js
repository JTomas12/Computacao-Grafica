import { CGFobject } from "../../lib/CGF.js";
import { MyGrassBlade } from "./MyGrassBlade.js";
import {CGFappearance} from '../../lib/CGF.js';
export class MyTerrain extends CGFobject{
    constructor(scene, width, parts){
        super(scene);
        this.width = width;
        this.parts = parts;
        this.mygrassLeaf = new MyGrassBlade(scene);
        //this.initBuffers();
        this.initMaterials();
    }
    initMaterials() {
        this.grassMaterial = new CGFappearance(this.scene);
        this.grassMaterial.setAmbient(0.9,0.9,0.9,1);
        this.grassMaterial.setDiffuse(0, 1, 0, 1.0);
        this.grassMaterial.setSpecular(0, 1, 0, 1.0);
        this.grassMaterial.setShininess(10.0);
        this.grassMaterial.setTexture(this.texture);
    }
    display(){
        

        for(let i = 0; i < this.width; i+=1){
            for(let j = 0; j < this.width; j+=1){
                this.scene.pushMatrix();
                this.grassMaterial.apply();
                this.scene.translate(i, 0, j+1);
                this.mygrassLeaf.display();
                this.scene.popMatrix();
                this.scene.setActiveShader(this.scene.testShaders[this.scene.selectedExampleShader]);
            }
            this.scene.setActiveShader(this.scene.defaultShader);
        }
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.scene.popMatrix();
    }
}