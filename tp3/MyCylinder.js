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
        for (let stack = 0; stack <= this.stacks; stack++) {
            let z = stack / this.stacks;
            for (let slice = 0; slice < this.slices; slice++) {
                let x = Math.cos(slice * angle);
                let y = Math.sin(slice * angle);
                
                this.vertices.push(x, y, z);
                this.normals.push(x, y, 0);
            }
        }
        for (let j = 0; j < this.stacks; j++) {
            for (let k = 0; k < this.slices; k++) {
                let nextSlice = (k + 1) % this.slices;
                let current = j * this.slices + k;
                let next = j * this.slices + nextSlice;
                let currentAbove = (j + 1) * this.slices + k;
                let nextAbove = (j + 1) * this.slices + nextSlice;
                
                this.indices.push(current, next, currentAbove);
                this.indices.push(currentAbove, next, nextAbove);
            }
        }
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}