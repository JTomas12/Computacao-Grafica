import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyStem } from '../geometric/MyStem.js';
import { MySphere } from '../geometric/MySphere.js';
import { MyPetal } from './MyPetal.js';
import { MyPollen } from './MyPollen.js';
import { MyLeaf } from '../geometric/MyLeaf.js';
export class MyFlower extends CGFobject {
    constructor(scene, outer_radius, number_of_petals, receptacle_radius, receptacle_color, stem_radius, stem_color, stem_stacks, stem_height, petal_color, rotationAngle, prismAngle, pollenPresent) {
        super(scene);
        this.number_of_petals = number_of_petals;
        this.outer_radius = outer_radius;
        this.receptacle_radius = receptacle_radius;
        this.stem_height = stem_height;
        this.pollenPresent = pollenPresent;
        this.stem = new MyStem(scene, 20, stem_stacks, stem_radius, stem_height);
        this.sphere = new MySphere(scene, receptacle_radius, 30, 20, 20, 1, 1);
        this.petal_color = petal_color;
        this.petal = new MyPetal(scene, rotationAngle, prismAngle, petal_color);
        this.pollen = new MyPollen(scene);
        this.leaf= new MyLeaf(scene);
        this.initMaterials(receptacle_color, stem_color);
    }
    
    initMaterials(receptacle_color, stem_color) {
        this.receptacleMaterial = new CGFappearance(this.scene);
        const receptacle_texture = new CGFtexture(this.scene, 'images/flower_receptacle.jpg');
        this.receptacleMaterial.setTexture(receptacle_texture);
        this.receptacleMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.receptacleMaterial.setAmbient(0.9, 0.9, 0.9, 1.0); // Default ambient color
        this.receptacleMaterial.setDiffuse(receptacle_color[0] / 255, receptacle_color[1] / 255, receptacle_color[2] / 255, 1.0); // Default diffuse color
        this.receptacleMaterial.setSpecular(receptacle_color[0] / 255, receptacle_color[1] / 255, receptacle_color[2] / 255, 1.0); // Default specular color
        this.receptacleMaterial.setShininess(10.0);

        this.stemMaterial = new CGFappearance(this.scene);
        const stem_texture = new CGFtexture(this.scene, 'images/stem_texture.jpg');
        this.stemMaterial.setTexture(stem_texture);
        this.stemMaterial.setAmbient(0.9, 0.9, 0.9, 1.0); // Default ambient color
        this.stemMaterial.setDiffuse(stem_color[0] / 255, stem_color[1] / 255, stem_color[2] / 255, 1.0); // Default diffuse color
        this.stemMaterial.setSpecular(stem_color[0] / 255, stem_color[1] / 255, stem_color[2] / 255, 1.0); // Default specular color
        this.stemMaterial.setShininess(10.0);
    }

    display() {
        // Display stem
        this.scene.pushMatrix();
        this.stemMaterial.apply(); // Apply stem material
        this.stem.display();
        this.scene.popMatrix();

        // Display receptacle (sphere)
        this.scene.pushMatrix();
        this.scene.translate(0, this.stem_height, 0);
        this.receptacleMaterial.apply(); // Apply receptacle material
        this.sphere.display();
        this.scene.popMatrix();
        if(this.pollenPresent){
            this.scene.pushMatrix();
            this.scene.translate(0, this.stem_height, this.receptacle_radius);
            this.scene.scale(0.3, 0.3, 0.3);
            this.pollen.display();
            this.scene.popMatrix();
        }

        var angleIncrement = 2 * Math.PI / this.number_of_petals;
        // Loop through each petal
        for (let i = 0; i < this.number_of_petals; i++) {
            // Calculate the angle for this petal
            const angle = i * angleIncrement;
        
            // Calculate the position of the petal around the flower
            const x = Math.cos(angle) * this.receptacle_radius;
            const y = Math.sin(angle) * this.receptacle_radius;
        
            // Push a matrix for transformation
            this.scene.pushMatrix();
        
            // Translate to the position of the current petal relative to the flower's position
            this.scene.translate(x,  y +  this.stem_height, 0);
        
            // Rotate the petal to face outward from the center of the circle
            this.scene.rotate(angle + Math.PI / 2, 0, 0, 1);

            this.scene.scale(this.outer_radius - this.receptacle_radius, this.outer_radius - this.receptacle_radius, this.outer_radius - this.receptacle_radius);
        
            // Display the petal
            this.petal.display();
        
            // Pop the matrix to restore previous transformations
            this.scene.popMatrix();
        }
    }
}

