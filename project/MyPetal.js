import { CGFobject } from '../lib/CGF.js';

export class MyPetal extends CGFobject {
    constructor(scene, rotationAngle = 0) {
        super(scene);
        this.rotationAngle = rotationAngle;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];

        const numSegments = 3; // Number of segments to approximate the petal shape

        // Create vertices for the petal shape
        for (let i = 0; i <= numSegments; i++) {
            let angle = (i / numSegments) * Math.PI; // Angle for current segment
            let radius = Math.sin(angle) * 0.5; // Radius of the petal at current angle
            let x = radius * Math.cos(angle);
            let y = 0;
            let z = radius * Math.sin(angle);
            this.vertices.push(x, y, z);
            // Rotate vertices around the Z-axis
            let newX = x * Math.cos(this.rotationAngle) - z * Math.sin(this.rotationAngle);
            let newZ = x * Math.sin(this.rotationAngle) + z * Math.cos(this.rotationAngle);

            this.vertices.push(newX, y, newZ);
        }

        // Define indices to form triangles
        for (let i = 0; i < this.vertices.length / 6 - 1; i++) {
            let baseIndex = i * 2; // Base index for the current segment
        
            // First triangle
            this.indices.push(baseIndex, baseIndex + 1, baseIndex + 2);
            // Second triangle
            this.indices.push(baseIndex + 1, baseIndex + 3, baseIndex + 2);
        }
        console.log(this.vertices);
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}