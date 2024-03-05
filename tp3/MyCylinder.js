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
            let x2 = Math.cos((i+1)*angle);
            let y2 = Math.sin((i+1)*angle);
            let z_increment = 1 / this.stacks;
            for (let j = 0; j <= this.stacks; j++) {
                this.vertices.push(x1, y1, j*z_increment);
                this.vertices.push(x2, y2, j*z_increment);
                this.vertices.push(x1, y1, (j+1)*z_increment);
                this.vertices.push(x2, y2, (j+1)*z_increment);
                this.indices.push(index, index+1, index+2);
                this.indices.push(index+1, index+3, index+2);
                //this.normals.push(x1, y1, j*z_increment);
                index+=4;
            }
        }
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}