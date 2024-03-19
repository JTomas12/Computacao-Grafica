import { CGFobject } from "../lib/CGF.js";

export class MyParalelogram extends CGFobject{

    constructor(scene, coords) {
		super(scene);
		this.initBuffers();
        if (coords != undefined)
            this.updateTexCoords(coords);
	}

    initBuffers(){
        this.vertices = [
            0,0,0, //0
            2,0,0, //1
            1,1,0, //2
            3,1,0, //3
            0,0,0, //4
            2,0,0, //5
            1,1,0, //6
            3,1,0, //7
        ];
        this.indices =[
            0,1,3,
            3,2,0,
            0,3,1,
            2,3,0
        ];
        this.texCoords=[
            0.5,1,
            1,1,
            0.25,0.75,
            0.75,0.75,
            
        ]
        this.normals = [
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		]

        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
    }
    updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}