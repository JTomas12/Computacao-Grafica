import {CGFobject} from '../../lib/CGF.js';
import {CGFtexture} from '../../lib/CGF.js';
import {CGFappearance} from '../../lib/CGF.js';
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
        //this.initMaterials();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
    initBuffers() {
		this.vertices = [
			-1,-1,0,     //0
			-6/7,-6/7,0, //1
			-5/7,-5/7,0, //2
			-4/7,-4/7,0, //3
			-3/7,-3/7,0, //4
			-2/7,-2/7,0, //5
			-1/7,-1/7,0, //6
			0, 0, 0,     //7 
			0.08,-1/7,0,  //8
			0.16,-2/7,0,  //9 
			0.24,-3/7,0,  //10
			0.32,-4/7,0,  //11 
			0.40,-5/7,0,  //12 
			0.48,-6/7,0,  //13 
			1,-1,0,      //14
		];
		this.indices = [
			0,13,14, //check
			0,14,13, //check
			0,13,1, //check
			0,1,13, //check
			1,13,12, //check
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
        	0, 0, 1,   
        	0, 0, 1,   
        	0, 0, 1,
            0, 0, 1,  
        	0, 0, 1,  
        	0, 0, 1,  
			0, 0, 1,   
        	0, 0, 1,   
        	0, 0, 1,   
			0, 0, 1,   
        	0, 0, 1,   
        	0, 0, 1,   
			0, 0, 1,   
        	0, 0, 1,  
        	0, 0, 1,   
        	0, 0, -1, 
        	0, 0, -1, 
        	0, 0, -1, 
        	0, 0, -1,  
        	0, 0, -1,  
        	0, 0, -1,
			0, 0, -1, 
        	0, 0, -1, 
        	0, 0, -1, 
        	0, 0, -1,  
        	0, 0, -1,  
        	0, 0, -1,  
			0,0,-1,
			0, 0, -1,  
        	0, 0, -1,  
			0,0,-1,  
            
        ];
		this.texCoords = [
			0, 0,   // For vertex 0
			0.142, 0.142, // For vertex 1
			0.285, 0.285, // For vertex 2
			0.428, 0.428, // For vertex 3
			0.571, 0.571, // For vertex 4
			0.714, 0.714, // For vertex 5
			0.857, 0.857, // For vertex 6
			1, 1,   // For vertex 7
			0.857, 0.857, // For vertex 8
			0.714, 0.714, // For vertex 9
			0.571, 0.571, // For vertex 10
			0.428, 0.428, // For vertex 11
			0.285, 0.285, // For vertex 12
			0.142, 0.142, // For vertex 13
			0, 0    // For vertex 14
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
