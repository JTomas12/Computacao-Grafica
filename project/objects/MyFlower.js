import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyStem } from '../geometric/MyStem.js';
import { MySphere } from '../geometric/MySphere.js';
import { MyPetal } from './MyPetal.js';
import { MyPollen } from './MyPollen.js';
import { MyLeaf } from '../geometric/MyLeaf.js';
export class MyFlower extends CGFobject {
    constructor(scene, outer_radius, number_of_petals, receptacle_radius, receptacle_color, stem_radius, stem_color, stem_stacks, stem_height, petal_color, rotationAngle, prismAngle, pollenPresent, leaf_color, leaf_height) {
        super(scene);
        this.number_of_petals = number_of_petals; // Number of petals composing the flower
        this.outer_radius = outer_radius; // Outer radius of the flower (distance between the center and the petals)
        this.receptacle_radius = receptacle_radius; // Radius of the receptacle (center of the flower)
        this.stem_radius = stem_radius; // Radius of the stem of the flower
        this.stem_height = stem_height; // Height of the stem of the flower
        this.pollenPresent = pollenPresent; // Boolean to determine if the flower has pollen
        this.stem = new MyStem(scene, 20, stem_stacks, stem_radius, stem_height); // Create the stem of the flower
        this.sphere = new MySphere(scene, receptacle_radius, 30, 20, 20, 1, 1); // Create the sphere representing the receptacle of the flower
        this.petal_color = petal_color; // Color of the petals
        this.petal = new MyPetal(scene, rotationAngle, prismAngle, petal_color); // Create the petal of the flower
        this.pollen = new MyPollen(scene); // Create the pollen of the flower
        this.leaf= new MyLeaf(scene); // Create the leaf of the flower
        this.leaf_color = leaf_color; // Color of the leaf
        this.leaf_height = leaf_height;  // Height of the leaf
        this.initMaterials(receptacle_color, stem_color,leaf_color); // Initialize the materials of the flower
    }
    
    initMaterials(receptacle_color, stem_color,leaf_color) {
        this.receptacleMaterial = new CGFappearance(this.scene); // Create a new material for the receptacle
        const receptacle_texture = new CGFtexture(this.scene, 'images/flower_receptacle.jpg'); // Load the texture for the receptacle
        this.receptacleMaterial.setTexture(receptacle_texture); // Set the texture for the receptacle
        //this.receptacleMaterial.setTextureWrap('REPEAT', 'REPEAT'); // Set the texture wrapping for the receptacle
        this.receptacleMaterial.setAmbient(0.9, 0.9, 0.9, 1.0); // Default ambient color
        this.receptacleMaterial.setDiffuse(receptacle_color[0] / 255, receptacle_color[1] / 255, receptacle_color[2] / 255, 1.0); // Default diffuse color
        this.receptacleMaterial.setSpecular(receptacle_color[0] / 255, receptacle_color[1] / 255, receptacle_color[2] / 255, 1.0); // Default specular color
        this.receptacleMaterial.setShininess(10.0); // Default shininess

        this.stemMaterial = new CGFappearance(this.scene); // Create a new material for the stem
        const stem_texture = new CGFtexture(this.scene, 'images/stem_texture.jpg'); // Load the texture for the stem
        this.stemMaterial.setTexture(stem_texture); // Set the texture for the stem
        this.stemMaterial.setAmbient(0.9, 0.9, 0.9, 1.0); // Default ambient color
        this.stemMaterial.setDiffuse(stem_color[0] / 255, stem_color[1] / 255, stem_color[2] / 255, 1.0); // Default diffuse color
        this.stemMaterial.setSpecular(stem_color[0] / 255, stem_color[1] / 255, stem_color[2] / 255, 1.0); // Default specular color
        this.stemMaterial.setShininess(10.0); // Default shininess

        this.leafMaterial = new CGFappearance(this.scene); // Create a new material for the leaf
        const leaf_texture = new CGFtexture(this.scene, 'images/leaf_texture.jpg'); // Load the texture for the leaf
        this.leafMaterial.setAmbient(0.9, 0.9, 0.9, 1.0); // Default ambient color
        this.leafMaterial.setDiffuse(leaf_color[0]/255, leaf_color[1]/255, leaf_color[2]/255, 1.0); // Default diffuse color
        this.leafMaterial.setSpecular(leaf_color[0]/255, leaf_color[1]/255, leaf_color[2]/255, 1.0); // Default specular color
        this.leafMaterial.setShininess(10.0); // Default shininess
        this.leafMaterial.setTexture(leaf_texture); // Set the texture for the leaf
    }

    display() {
        
        let numLeaves = Math.ceil(this.stem.stacks / 2); // Number of leaves to place
        let stepSize = this.stem.stacks / numLeaves; // Number of stacks between each leaf
        let orientation = 1; // Initial orientation
        // Setup the leaves for a flower
        for (let i = 0; i < numLeaves-1; i++) {
            this.scene.pushMatrix();
            //this.scene.scale(this.leaf_height, this.leaf_height, 1 + this.leaf_height / 2,1);
            
            let yTranslation = (i + 1) * stepSize * this.stem_height / this.stem.stacks; // Calculate the y translation based on the step size (distance between each leaf)
            this.scene.translate(orientation * this.stem_radius, yTranslation, 0);
            this.scene.rotate(orientation * Math.PI / 2, 0, 0, 1);
            
            this.leafMaterial.apply();
            this.leaf.display();
    
            this.scene.popMatrix();
            orientation = -orientation; // Each leaf is placed on the opposite side of the stem sequencially
        }
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
        // Display pollen
        if(this.pollenPresent){
            this.scene.pushMatrix();
            this.scene.translate(0, this.stem_height, this.receptacle_radius);
            this.scene.scale(0.3, 0.3, 0.3);
            this.pollen.display();
            this.scene.popMatrix();
        }
        // Display petals
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

