import { CGFobject } from "../../lib/CGF.js";
import { MyGrassLeaf } from "./MyGrassLeaf.js";
export class MyTerrain extends CGFobject{
    constructor(scene, width, parts, notriangles){
        super(scene);
        this.width = width;
        this.parts = parts;
        this.notriangles = notriangles;
        this.mygrassLeaf = new MyGrassLeaf(scene, 1);
        this.initBuffers();
    }
    initBuffers(){
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        this.delta = this.width / this.parts;

        for(let i = 0; i <= this.parts; i++){
            for(let j = 0; j <= this.parts; j++){
                this.vertices.push(j*this.delta, 0, i*this.delta);
                this.normals.push(0, 1, 0);
                this.texCoords.push(j/this.parts, i/this.parts);
            }
        }

        for(let i = 0; i < this.parts; i++){
            for(let j = 0; j < this.parts; j++){
                this.indices.push(i*(this.parts+1) + j, i*(this.parts+1) + j+1, (i+1)*(this.parts+1) + j);
                this.indices.push(i*(this.parts+1) + j+1, (i+1)*(this.parts+1) + j+1, (i+1)*(this.parts+1) + j);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    display(){
        

        for(let i = 0; i < this.width; i+=1){
            for(let j = 0; j < this.width; j+=1){
                this.scene.pushMatrix();
                this.scene.translate(i, 0, j);
                this.mygrassLeaf.display();
                this.scene.popMatrix();
            }
            
        }
    }
}