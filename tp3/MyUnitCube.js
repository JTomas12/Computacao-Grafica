import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
        this.vertices = [
            -0.5, -0.5, -0.5,   //0
            -0.5, -0.5, 0.5,    //1
            -0.5, 0.5, 0.5,     //2
            -0.5, 0.5, -0.5,    //3
            0.5, -0.5, -0.5,    //4
            0.5, -0.5, 0.5,     //5
            0.5, 0.5, 0.5,      //6
            0.5, 0.5, -0.5,     //7
            -0.5, -0.5, -0.5,   //00
            -0.5, -0.5, 0.5,    //11
            -0.5, 0.5, 0.5,     //22
            -0.5, 0.5, -0.5,    //33
            0.5, -0.5, -0.5,    //44
            0.5, -0.5, 0.5,     //55
            0.5, 0.5, 0.5,      //66
            0.5, 0.5, -0.5,     //77
            -0.5, -0.5, -0.5,   //000
            -0.5, -0.5, 0.5,    //111
            -0.5, 0.5, 0.5,     //222
            -0.5, 0.5, -0.5,    //333
            0.5, -0.5, -0.5,    //444
            0.5, -0.5, 0.5,     //555
            0.5, 0.5, 0.5,      //666
            0.5, 0.5, -0.5      //777
        ];


		//Counter-clockwise reference of vertices
        this.indices = [

            0, 1, 2,
            2, 3, 0,

            5, 4, 7,
            7, 6, 5,

            1, 5, 6,
            6, 2, 1,

            4, 0, 3,
            3, 7, 4,

            6, 7, 3,
            3, 2, 6,

            4, 5, 1,
            1, 0, 4
        ];

        this.normals = [
            // Front face (+Z direction)
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            // Back face (-Z direction)
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            // Top face (+Y direction)
            0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
            // Bottom face (-Y direction)
            0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
            // Right face (+X direction)
            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
            // Left face (-X direction)
            -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0
        ];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}