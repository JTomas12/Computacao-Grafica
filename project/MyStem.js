import { CGFobject } from '../lib/CGF.js';

export class MyStem extends CGFobject {
    constructor(scene, slices, stacks, radius) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius; // New parameter for radius
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        let angle = 2 * Math.PI / this.slices;

        for (let stack = 0; stack <= this.stacks; stack++) {
            let z = stack / this.stacks;
            for (let slice = 0; slice < this.slices; slice++) {
                let x = this.radius * Math.cos(slice * angle); // Multiply by radius
                let y = this.radius * Math.sin(slice * angle); // Multiply by radius
                
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
                this.indices.push(current, currentAbove, next);
                this.indices.push(currentAbove, nextAbove, next);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    setRadius(radius) {
        this.radius = radius;
        this.updateRadius();
    }

    updateRadius() {
        // Update vertices based on the new radius
        for (let i = 0; i <= this.stacks; i++) {
            let beta = -Math.PI / 2 + i * this.delta_beta;
            for (let j = 0; j <= this.slices; j++) {
                let alfa = j * this.delta_alfa;
                let x = -(this.radius * Math.cos(beta) * Math.cos(alfa));
                let y = -this.radius * Math.sin(beta);
                let z = this.radius * Math.cos(beta) * Math.sin(alfa);
                let index = (i * (this.slices + 1) + j) * 3;
                this.vertices[index] = x;
                this.vertices[index + 1] = y;
                this.vertices[index + 2] = z;
            }
        }
        this.updateVerticesGLBuffers();
    }
}