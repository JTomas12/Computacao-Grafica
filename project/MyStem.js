import { CGFobject } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';

export class MyStem extends CGFobject {
    constructor(scene, slices, stacks, radius, height) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.height= height; 
        this.petal = new MyPetal(scene, Math.PI/12, Math.PI/12, [0,0,128]);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        let angle = 2 * Math.PI / this.slices;
        let offsets = [];  

        for (let i = 0; i <= this.stacks; i++) {
            let offsetX = (Math.random() - 0.5) * 0.1;  
            let offsetZ = (Math.random() - 0.5) * 0.1;  
            if (i > 0) {
    
                offsetX = offsets[i - 1].x * 0.6 + offsetX * 0.4;
                offsetZ = offsets[i - 1].z * 0.6 + offsetZ * 0.4;
            }
            offsets.push({x: offsetX, z: offsetZ});
        }

        for (let stack = 0; stack <= this.stacks; stack++) {
            let y = this.height * stack / this.stacks;

            for (let slice = 0; slice < this.slices; slice++) {
                let x = this.radius * Math.cos(slice * angle) + offsets[stack].x;
                let z = this.radius * Math.sin(slice * angle) + offsets[stack].z;

                this.vertices.push(x, y, z);
                let nx = Math.cos(slice * angle);
                let nz = Math.sin(slice * angle);
                this.normals.push(nx, 0, nz); 
                this.texCoords.push(slice / this.slices, stack / this.stacks);
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

        for (let j = 1; j < this.stacks; j++) {
            for (let k = 0; k < this.slices; k++) {
                if (j < this.stacks) {
                    let angle = 2 * Math.PI * k / this.slices;
                    this.addLeaf(j, angle);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    addLeaf(stackIndex, rotationAngle) {
        this.scene.pushMatrix();
        let y = this.height * stackIndex / this.stacks;
        this.scene.translate(0, y, 0);
        this.scene.rotate(rotationAngle, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0); // Orient the leaf correctly
        this.petal.display();
        this.scene.popMatrix();
    }
    
}