import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyStem } from '../project/MyStem.js';
import { MySphere } from '../project/MySphere.js';
import {MyPetal} from '../project/MyPetal.js';
export class MyFlower extends CGFobject {
    constructor(scene, outer_radius,number_of_petals, receptacle_radius, receptacle_color , stem_radius ,stem_color, stem_stacks,stem_height, petal_color) {
        super(scene);
        this.number_of_petals = number_of_petals;
        this.outer_radius = outer_radius;
        this.petal_color = petal_color;
        this.stem_radius = stem_radius;
        this.stem_color = stem_color;
        this.stem_stacks = stem_stacks;
        this.receptacle_radius = receptacle_radius;
        this.receptacle_color = receptacle_color;
        this.petal_color = petal_color;
        this.stem_height = stem_height;
        this.stem = new MyStem(scene, 20, stem_stacks, stem_radius,stem_height);
        this.sphere= new MySphere(scene, receptacle_radius, 30 , 20 ,20, 1,1,1);
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
        //this.createPetals(number_of_petals);
    }
    
    display(){

        this.scene.pushMatrix();
        this.stem.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0,this.stem_height,0);
        this.sphere.display();
        this.scene.popMatrix();
      
        
        

    }
    /*
    createPetals(number_of_petals){
        this.petals = [];
        for (let i = 0; i < number_of_petals; i++) {
            let angle = (2 * Math.PI * i) / number_of_petals; // Calculate angle for current petal
            let x = this.receptacle_radius * Math.cos(angle); // Calculate x-coordinate based on angle
            let z = this.receptacle_radius * Math.sin(angle); // Calculate z-coordinate based on angle
            this.petals.push(new MyPetal(this.scene, this.outer_radius, angle, this.petal_color)); // Create petal at calculated position
        }
    }
    */
}