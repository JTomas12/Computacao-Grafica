import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySphere extends CGFobject {
    constructor(scene, slices , stacks, inside, north, south) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.inside = inside;
        this.north = north;
        this.south = south;
        this.initBuffers();
        
    }
		
    
    initBuffers() {
        this.vertices = [];
        this.texCoords = [];
        this.normals = [];
    
        var delta_alfa = 2 * Math.PI / this.slices;
        var delta_beta = Math.PI / (this.stacks );
    
        for (var i = 0; i <= this.stacks; i++) {
            var beta = -Math.PI / 2 + i * delta_beta;
            this.texCoords.push(0, 1 - i / this.stacks);
    
            for (var j = 0; j <= this.slices; j++) {
                var alfa = j * delta_alfa;
    
                var x = Math.cos(beta) * Math.cos(alfa);
                var y = Math.cos(beta) * Math.sin(alfa);
                var z = Math.sin(beta);
    
                this.vertices.push(x, y, z);
                this.normals.push(-x, -y, -z);
                this.texCoords.push(0, 1);
                

            }
        }
    
        this.indices = [];
        var index = 0;
        for (var i = 0; i < this.stacks; i++) {
            for (var j = 0; j < this.slices; j++) {
                this.texCoords.push(i / this.slices, 1 - j / this.stacks);
                if (this.inside == 1) {
                    this.indices.push(index, index + 1, index + this.slices + 1);
                    this.indices.push(index + 1, index + this.slices + 2, index + this.slices + 1);
                } else {
                    this.indices.push(index, index + this.slices + 1, index + 1);
                    this.indices.push(index + 1, index + this.slices + 1, index + this.slices + 2);
                }
                index++;
            }
            index++;
        }
    

    
        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;
    
        this.initGLBuffers();
    }
    /*
    updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
    */
}
