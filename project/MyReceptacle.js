import { MySphere } from './MySphere.js';

export class Receptacle extends MySphere {
    constructor(scene, radius, slices, stacks, inside) {
        super(scene, slices, stacks, inside);
        this.radius = radius;
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