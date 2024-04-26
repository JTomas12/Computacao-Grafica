import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 * @param coords - Diamond texture coordinates
 */

export class MyTriangle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 0, 0,   // Vertex 0
            1, 0, 0,   // Vertex 1
            0.5, 1, 0, // Vertex 2

            // Additional vertices for the third dimension (z-direction)
            0, 0, 1,   // Vertex 3
            1, 0, 1,   // Vertex 4
            0.5, 1, 1, // Vertex 5
        ];

        this.indices = [
            0, 1, 2, // Base triangle indices
            3, 4, 5, // Top triangle indices

            // Side indices
            0, 1, 3,
            1, 4, 3,
            1, 2, 4,
            2, 5, 4,
            2, 0, 5,
            0, 3, 5
        ];

        this.normals = [
            0, 0, -1,  // Normals for the base triangle
            0, 0, 1,   // Normals for the top triangle

            // Side normals (assuming outward-facing)
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}