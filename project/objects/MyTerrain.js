import { CGFobject } from "../../lib/CGF.js";
import { MyGrassBlade } from "./MyGrassBlade.js";
import {CGFappearance} from '../../lib/CGF.js';
import {CGFtexture} from '../../lib/CGF.js';
export class MyTerrain extends CGFobject{
    constructor(scene, width){
        super(scene);
        this.width = width;
        
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
        const texture = new CGFtexture(this.scene, 'images/grass_texture.jpg');
        this.grassMaterial.setTexture(texture);
    }
       
       
    
    display(){
        
        this.scene.setActiveShader(this.scene.testShaders[this.scene.selectedExampleShader]);
        for(let i = 0; i < this.width; i+=1){
            for(let j = 0; j < this.width; j+=1){
                this.scene.pushMatrix();
                this.scene.translate(-25+i, 20, -25+j+1);
                this.scene.scale(0.2,20,1);
                this.grassMaterial.apply();
                this.mygrassLeaf.display();
                this.scene.popMatrix();
                
            }
            
        }
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.pushMatrix();
        this.scene.translate(-25, 0, -25);
        this.scene.popMatrix();
    }
}