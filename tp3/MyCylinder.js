import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
        this.slices=slices;
        this.stacks=stacks;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		//Counter-clockwise reference of vertices
		this.indices = [];

        this.normals = [];

        let angle = 2*Math.PI/this.slices;
        let index =0;
        for(let i = 0; i < this.slices; i++){

            let x1 = Math.cos(i*angle);
            let y1 = Math.sin(i*angle);
            let modulo = Math.sqrt(x1*x1 + y1*y1);
            
            let z_increment = 1 / this.stacks;
            for (let j = 0; j <= this.stacks; j++) {
                this.vertices.push(x1, y1, j*z_increment);  //0
                this.normals.push(x1/modulo, y1/modulo, 0);
            }
            
        }
        for (let k = 0; k < this.slices; k++){
            for (let j = 0; j < this.stacks; j++) {
                // First triangle
                if (k != this.slices - 1){
                this.indices.push(index, index + this.stacks + 1, index + this.stacks);
                this.indices.push(index + 1, index + this.stacks + 1, index + this.stacks);
        
                this.indices.push(index+this.stacks, index + this.stacks + this.stacks + 1, index + this.stacks+1);
                this.indices.push(index + this.stacks + this.stacks + 1, index+this.stacks, index + this.stacks+1);
                // Second triangle (complementary)
                this.indices.push(index + this.stacks, index + this.stacks + 1, index);
                this.indices.push(index + 1, index + this.stacks + 1, index + this.stacks);
        
                index++;
                } else {
                    continue;
                }
            }
            // Move to the next slice
            index++;
        }
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}