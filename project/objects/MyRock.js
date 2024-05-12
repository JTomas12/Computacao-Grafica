import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';

/**
 * MyRock
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of slices
 * @param stacks - number of stacks
 */
export class MyRock extends CGFobject {
    constructor(scene, slices , stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
        this.initMaterials();
        
    }
		
    
    initBuffers() {
        this.vertices = [];
        this.texCoords = [];
        this.normals = [];
    
        var delta_alfa = 2 * Math.PI / this.slices;
        var delta_beta = Math.PI / (this.stacks );
    
        for (var i = 0; i <= this.stacks; i++) {
            var beta = -Math.PI / 2 + i * delta_beta;
            
    
            for (var j = 0; j <= this.slices; j++) {
                var alfa = j * delta_alfa ;
    
                var x = Math.cos(beta) * Math.cos(alfa);
                var y = Math.sin(beta);
                var z = Math.cos(beta) * Math.sin(alfa);

                var noise = 0.95 + Math.random() * 0.1; // Fator de irregularidade
                var x = x * noise;
                var y = y * noise;
                var z = z * noise;

                this.vertices.push(x, y, z);

                var noise = 0.5; 
                var normalX = x + (Math.random() * 2 - 1) * noise;
                var normalY = y + (Math.random() * 2 - 1) * noise;
                var normalZ = z + (Math.random() * 2 - 1) * noise;
                var length = Math.sqrt(normalX * normalX + normalY * normalY + normalZ * normalZ);
                normalX /= length;
                normalY /= length;
                normalZ /= length;

                this.normals.push(normalX, normalY, normalZ);
              
                this.texCoords.push((j / this.slices), (i / this.stacks));
                
                

            }
        }
    
        this.indices = [];
        var index = 0;
        for (var i = 0; i < this.stacks; i++) {
            for (var j = 0; j < this.slices; j++) {
                
                this.indices.push(index, index + this.slices + 1, index + 1);
                this.indices.push(index + 1, index + this.slices + 1, index + this.slices + 2);
                
                index++;
            }
            index++;
        }
    

    
        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;
    
        this.initGLBuffers();
    }

    initMaterials() {
        this.rockTexture = new CGFtexture(this.scene, "images/rock_texture.jpg");
        this.rockMaterial = new CGFappearance(this.scene);
        this.rockMaterial.setAmbient(0.5, 0.5, 0.5, 1.0);  
        this.rockMaterial.setDiffuse(0.7, 0.7, 0.7, 1.0); 
        this.rockMaterial.setSpecular(0.9, 0.9, 0.9, 1.0); 
        this.rockMaterial.setShininess(10.0); 
        this.rockMaterial.setTexture(this.rockTexture);             
    }
    display() {
        this.scene.pushMatrix()
        this.scene.scale(0.5, 0.5, 0.5);
        this.rockMaterial.apply()
        this.drawElements(this.primitiveType);
        this.scene.popMatrix()
    }
    /*
    updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
    */
}