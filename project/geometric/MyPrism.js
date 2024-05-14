import {CGFobject} from '../../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
        this.slices=slices;
        this.stacks=stacks;
		this.initBuffers();
	}
	
	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];  // Add this line to initialize texture coordinates array
    
        let angle = 2 * Math.PI / this.slices;
        let index = 0;
    
        for (let i = 0; i < this.slices; i++) {
            let x1 = Math.cos(i * angle);
            let y1 = Math.sin(i * angle);
            let x2 = Math.cos((i + 1) * angle);
            let y2 = Math.sin((i + 1) * angle);
    
            let x_normal = Math.cos(i * angle + angle / 2);
            let y_normal = Math.sin(i * angle + angle / 2);
    
            let z_increment = 1 / this.stacks;
    
            for (let j = 0; j <= this.stacks; j++) {
                // Add vertices for both the current and next slice at the current stack level
                this.vertices.push(x1, y1, j * z_increment);
                this.vertices.push(x2, y2, j * z_increment);
                this.vertices.push(x1, y1, (j + 1) * z_increment);
                this.vertices.push(x2, y2, (j + 1) * z_increment);
    
                // Define indices for two triangles per quad
                this.indices.push(index, index + 1, index + 2);
                this.indices.push(index + 1, index + 3, index + 2);
    
                // Normals for lighting calculations
                this.normals.push(x_normal, y_normal, 0);
                this.normals.push(x_normal, y_normal, 0);
                this.normals.push(x_normal, y_normal, 0);
                this.normals.push(x_normal, y_normal, 0);
    
                // Texture coordinates
                let u1 = i / this.slices;
                let u2 = (i + 1) / this.slices;
                let v1 = j / this.stacks;
                let v2 = (j + 1) / this.stacks;
    
                this.texCoords.push(u1, v1);
                this.texCoords.push(u2, v1);
                this.texCoords.push(u1, v2);
                this.texCoords.push(u2, v2);
    
                index += 4;
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
}    