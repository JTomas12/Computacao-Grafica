import { CGFobject } from "../lib/CGF.js";

export class MyParalelogram extends CGFobject{

    constructor(scene) {
		super(scene);
		this.initBuffers();
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
            0,3,2,
            4,5,7,
            7,6,4,
        ];

        this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
            0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
		]

        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
    }
}