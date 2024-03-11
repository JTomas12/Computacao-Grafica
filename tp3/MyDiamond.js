import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyDiamond extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [
            -1, 0, 0,    //0
            0, -1, 0,    //1
            0, 1, 0,    //2
            1, 0, 0,        //3
            -1, 0, 0,    //0
            0, -1, 0,    //1
            0, 1, 0,    //2
            1, 0, 0        //3
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0,1,2,
            1, 3, 2,
            2,1,0,
            2,3,1
        ];

        this.normals = [
            0, 0, 1,  // Normal for vertex 0
            0, 0, 1,  // Normal for vertex 1
            0, 0, 1,  // Normal for vertex 2
            0, 0, 1,  // Normal for vertex 3
    
            0, 0, -1, // Normal for vertex 0, back face
            0, 0, -1, // Normal for vertex 1, back face
            0, 0, -1, // Normal for vertex 2, back face
            0, 0, -1  // Normal for vertex 3, back face
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}
