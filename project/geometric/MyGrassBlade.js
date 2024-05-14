import {CGFobject} from '../../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 * @param coords - Diamond texture coordinates
 */


export class MyGrassBlade extends CGFobject {

    constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}

    initBuffers() {
		this.vertices = [
   			-1,-1,0,
			-6/7,-6/7,0,
			-5/7,-5/7,0,
			-4/7,-4/7,0,
			-3/7,-3/7,0,
			-2/7,-2/7,0,
			-1/7,-1/7,0,
			0,0,0,
			1/7,-1/7,0,
			2/7,-2/7,0,
			3/7,-3/7,0,
			4/7,-4/7,0,
			5/7,-5/7,0,
			6/7,-6/7,0,
			1,-1,0,

		];
		this.indices = [
			0,13,14,
			0,14,13,
			0,13,1,
			0,1,13,
			1,13,12,
			1,12,13,
			1,12,2,
			1,2,12,
			2,12,11,
			2,11,12,
			2,11,3,
			2,3,11,
			3,11,10,
			3,10,11,
			3,10,4,
			3,4,10,
			4,10,9,
			4,9,10,
			4,9,5,
			4,5,9,
			5,9,8,
			5,8,9,
			5,8,6,
			5,6,8,
			6,8,7,
			6,7,8,

		];
		this.normals = [
        	0, 0, 1,  // Normal for vertex 0
        	0, 0, 1,  // Normal for vertex 1
        	0, 0, 1,  // Normal for vertex 2
            
    
        	0, 0, -1, // Normal for vertex 0, back face
        	0, 0, -1, // Normal for vertex 1, back face
        	0, 0, -1, // Normal for vertex 2, back face

        	0, 0, 1,  // Normal for vertex 3
        	0, 0, 1,  // Normal for vertex 4
        	0, 0, 1,  // Normal for vertex 5

        	0, 0, -1,  // Normal for vertex 3
        	0, 0, -1,  // Normal for vertex 4
        	0, 0, -1,  // Normal for vertex 5
            
        ];
		this.texCoords = [
			1, 1, // 0
			0, 0, // 1
			1, 0, // 2
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
