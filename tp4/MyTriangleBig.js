import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 * @param coords - Diamond texture coordinates
 */


export class MyTriangleBig extends CGFobject {

    constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
    initBuffers() {
        this.vertices = [
            -2, 0, 0,    //0
            2, 0, 0,	//1
            0, 2, 0,    //2
            -2, 0, 0,    //3
            2, 0, 0,	//4
            0, 2, 0,	//5
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,
            2,1,0
        ];

        this.normals = [
            0, 0, 1,  // Normal for vertex 0
            0, 0, 1,  // Normal for vertex 1
            0, 0, 1,  // Normal for vertex 2
            
    
            0, 0, -1, // Normal for vertex 0, back face
            0, 0, -1, // Normal for vertex 1, back face
            0, 0, -1, // Normal for vertex 2, back face
            
        ];
        this.texCoords = [
            0,0,
            0.5,0.5,
            0.5,0.5,
            1,0
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