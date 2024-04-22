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
    
        
        let curvature = 0.1; 
    
        for (let stack = 0; stack <= this.stacks; stack++) {
            let y = stack / this.stacks;
            
            let displacement = curvature * Math.sin(Math.PI * y); 
    
            for (let slice = 0; slice < this.slices; slice++) {
                let x = this.radius * Math.cos(slice * angle) + displacement; 
                let z = this.radius * Math.sin(slice * angle);
    
                this.vertices.push(x, y, z);
    
                
                let nx = Math.cos(slice * angle);
                let nz = Math.sin(slice * angle);
                this.normals.push(nx, 0, nz); 
            }
        }
    
        for (let j = 0; j < this.stacks; j++) {
            for (let k = 0; k < this.slices; k++) {
                let nextSlice = (k + 1) % this.slices;
                let current = j * this.slices + k;
                let next = j * this.slices + nextSlice;
                let currentAbove = (j + 1) * this.slices + k;
                let nextAbove = (j + 1) * this.slices + nextSlice;
    
                // These indices create quads as two triangles
                this.indices.push(current, next, currentAbove);
                this.indices.push(currentAbove, next, nextAbove);
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
}