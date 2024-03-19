import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 * @param coords - Diamond texture coordinates
 */


export class MyTriangleSmall extends CGFobject {

    constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}

    initBuffers() {
        this.vertices = [
            -1, 0, 0,    //0
            1, 0, 0,	//1
            0, 1, 0,    //2
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,
            2,1,0
        ];
        this.texCoords = [
            0,0,
            0.25,0.25,
            0,0.5
            
        ]
        this.normals = [
            0, 0, 1,  // Normal for vertex 0
            0, 0, 1,  // Normal for vertex 1
            0, 0, 1,  // Normal for vertex 2
            
        ];
        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
    updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}