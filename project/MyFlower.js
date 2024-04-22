import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyStem } from '../project/MyStem.js';
import {MyReceptacle} from '../project/MyReceptacle.js';
import {MyPetal} from '../project/MyPetal.js';
export class MyFlower extends CGFobject {
    constructor(scene, outer_radius,number_of_petals, receptacle_radius, receptacle_color , stem_radius ,stem_color, stem_slices, petal_color) {
        super(scene);
        this.number_of_petals = number_of_petals;
        this.outer_radius = outer_radius;
        this.petal_color = petal_color;
        this.stem_radius = stem_radius;
        this.stem_color = stem_color;
        this.stem_slices = stem_slices;
        this.receptacle_radius = receptacle_radius;
        this.receptacle_color = receptacle_color;
        this.petal_color = petal_color;
        this.stem = new MyStem(scene, stem_slices, 10, stem_radius);
        this.receptacle = new MyReceptacle(scene, receptacle_radius, 10, 0.1);
        // Material para as pétalas
        this.petalMaterial = new CGFappearance(this.scene);
        this.petalMaterial.setEmission(1, 1, 1, 1); // Emissão branca para uma aparência brilhante
        //this.petalMaterial.setAmbient(...petal_color); // Configurar a cor ambiente com base na cor das pétalas

        // Material para o coração
        this.receptacleMaterial = new CGFappearance(this.scene);
        this.receptacleMaterial.setEmission(1, 1, 1, 1); // Emissão branca para uma aparência brilhante
        //this.receptacleMaterial.setAmbient(...heart_color); // Configurar a cor ambiente com base na cor do coração

        // Material para o caule
        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setEmission(1, 1, 1, 1); // Emissão branca para uma aparência brilhante
        //this.stemMaterial.setAmbient(...stem_color); // Configurar a cor ambiente com base na cor do caule
        this.createPetals(number_of_petals);
    }
    
    display(){

        this.scene.pushMatrix();
        this.stem.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.receptacle.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0,1,0);
        this.sphere.display();

    }
}