import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';

export class MyLeaf extends CGFobject {
    constructor(scene, coords) {
        super(scene);
        this.initBuffers();
        if (coords != undefined) this.updateTexCoords(coords);
    }

    initBuffers() {
        // Define vertices for a 3D flower leaf shape
        this.vertices = [
            // Front face vertices
            0, 0, 0,    // Vertex 0 - bottom center
            -0.2, 0.2, 0,  // Vertex 1 - bottom left
            0.2, 0.2, 0,   // Vertex 2 - bottom right
            -0.3, 0.5, 0,  // Vertex 3 - mid left
            0.3, 0.5, 0,   // Vertex 4 - mid right
            -0.1, 0.8, 0,  // Vertex 5 - top left
            0.1, 0.8, 0,   // Vertex 6 - top right
            0, 1, 0,    // Vertex 7 - top center

            // Back face vertices (mirrored z for thickness)
            0, 0, -0.1,    // Vertex 8 - bottom center
            -0.2, 0.2, -0.1,  // Vertex 9 - bottom left
            0.2, 0.2, -0.1,   // Vertex 10 - bottom right
            -0.3, 0.5, -0.1,  // Vertex 11 - mid left
            0.3, 0.5, -0.1,   // Vertex 12 - mid right
            -0.1, 0.8, -0.1,  // Vertex 13 - top left
            0.1, 0.8, -0.1,   // Vertex 14 - top right
            0, 1, -0.1    // Vertex 15 - top center
        ];

        // Define indices for the triangles
        this.indices = [
            // Front face
            0, 1, 2,
            1, 3, 4,
            1, 4, 2,
            3, 5, 4,
            4, 5, 6,
            5, 7, 6,

            // Back face
            8, 10, 9,
            9, 12, 11,
            9, 10, 12,
            11, 13, 12,
            12, 13, 14,
            13, 15, 14,

            // Connect front and back faces
            0, 8, 1,
            1, 8, 9,
            1, 9, 3,
            3, 9, 11,
            3, 11, 5,
            5, 11, 13,
            5, 13, 7,
            7, 13, 15,
            7, 15, 6,
            6, 15, 14,
            6, 14, 4,
            4, 14, 12,
            4, 12, 2,
            2, 12, 10,
            2, 10, 0,
            0, 10, 8
        ];

        // Define normals for lighting calculations
        this.normals = [
            // Front face normals
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,

            // Back face normals
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1
        ];

        // Define texture coordinates
        this.texCoords = [
            // Texture coordinates for front face
            0.5, 0,
            0.3, 0.2,
            0.7, 0.2,
            0.2, 0.5,
            0.8, 0.5,
            0.4, 0.8,
            0.6, 0.8,
            0.5, 1,

            // Texture coordinates for back face
            0.5, 0,
            0.3, 0.2,
            0.7, 0.2,
            0.2, 0.5,
            0.8, 0.5,
            0.4, 0.8,
            0.6, 0.8,
            0.5, 1
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateTexCoords(coords) {
        this.texCoords = [...coords];
        this.updateTexCoordsGLBuffers();
    }
}