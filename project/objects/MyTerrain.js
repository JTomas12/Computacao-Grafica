import { CGFobject } from "../../lib/CGF.js";
import { MyGrassLeaf } from "./MyGrassLeaf.js";
export class MyTerrain extends CGFobject{
    constructor(scene, width, parts){
        super(scene);
        this.width = width;
        this.parts = parts;
        this.mygrassLeaf = new MyGrassLeaf(scene, 5);
        //this.initBuffers();
    }
    
    display(){
        

        for(let i = 0; i < this.width; i+=1){
            for(let j = 0; j < this.width; j+=1){
                this.scene.pushMatrix();
                this.scene.translate(i, 0, j);
                this.mygrassLeaf.display();
                this.scene.popMatrix();
                this.scene.setActiveShader(this.scene.testShaders[this.scene.selectedExampleShader]);
            }
            this.scene.setActiveShader(this.scene.defaultShader);
        }
        
    }
}