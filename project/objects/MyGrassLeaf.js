import { CGFobject } from "../../../lib/CGF.js";
import { MyGrassBlade } from "../geometric/MyGrassBlade.js";
import { CGFappearance, CGFtexture } from '../../lib/CGF.js';

export class MyGrassLeaf extends CGFobject{
    constructor(scene,height){
        super(scene);
        this.height = height;
        this.grassblade = new MyGrassBlade(this.scene);
        this.texture = new CGFtexture(this.scene, 'images/grass_texture.jpg');
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
    initBuffers(){
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

    }
    display() {
        // Aplica o material da relva
        this.grassMaterial.apply();

        // Desenha a relva composta por triângulos
           
        for (let i = 0; i < 10; i++) { // exemplo de loop para desenhar 10 triângulos (ajuste conforme necessário)
            for (let j = 0; j < 10; j++) {
                this.scene.pushMatrix();
                //this.scene.translate(i * 2, j * 2, 0); // ajuste conforme necessário
                this.scene.scale(1, this.height,1); // ajuste a altura conforme necessário
                this.grassblade.display(); // certifique-se de que MyTriangle tem um método de exibição adequado
                this.scene.scale(0.2, this.height,0.2); // ajuste a altura conforme necessário
                this.scene.translate(0, 0, 1); // ajuste conforme necessário
                this.scene.popMatrix();
            }
        }
        
    }
}