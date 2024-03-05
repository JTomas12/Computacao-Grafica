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
            1, -1, 0,    //0 (sqrt((1+1)^2 + (-1-1)^2))
			-1, 1, 0,	//1
			-1, -1, 0,	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
            2,1,0,
		];

		this.normals = [
            0, 0, 1,  // Normal for vertex 0
            0, 0, 1,  // Normal for vertex 1
            0, 0, 1,  // Normal for vertex 2
            
    
            0, 0, -1, // Normal for vertex 0, back face
            0, 0, -1, // Normal for vertex 1, back face
            0, 0, -1, // Normal for vertex 2, back face
            
        ];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}