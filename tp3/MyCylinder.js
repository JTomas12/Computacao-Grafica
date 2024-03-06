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
            this.indices.push(this.stacks*k, this.stacks*k+this.stacks+1, this.stacks*k+1+2*this.stacks);
            this.indices.push(this.stacks*k+1+this.stacks, this.stacks*k+this.stacks+2, this.stacks*k+this.stacks+1);
        }
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}