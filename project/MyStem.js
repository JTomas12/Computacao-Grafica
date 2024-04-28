import { CGFobject } from '../lib/CGF.js';

export class MyStem extends CGFobject {
    constructor(scene, slices, stacks, radius, height) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.height= height; 
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

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
}