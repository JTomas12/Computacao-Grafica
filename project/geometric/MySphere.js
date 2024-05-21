import {CGFobject} from '../../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySphere extends CGFobject {
    constructor(scene, radius,slices , stacks, inside, north, south) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.inside = inside; // 1 if the sphere is inside out, 0 otherwise
        this.north = north; // 1 if the north pole is flat, 0 otherwise
        this.south = south; // 1 if the south pole is flat, 0 otherwise
        this.radius = radius;
        this.initBuffers();
        
    }
		
    
    initBuffers() {
        this.vertices = [];
        this.texCoords = [];
        this.normals = [];
    
        //The number of divisions in the x and y axis
        var delta_alfa = 2 * Math.PI / this.slices;
        var delta_beta = Math.PI / (this.stacks );
    
        for (var i = 0; i <= this.stacks; i++) {
            var beta = -Math.PI / 2 + i * delta_beta;
            var radiusY = i < this.stacks / 2 ? this.radius * this.north : this.radius * this.south; // Radius of the sphere at the current height
            
    
            for (var j = 0; j <= this.slices; j++) {
                var alfa = j * delta_alfa ;
    
                var x = -this.radius*(Math.cos(beta) * Math.cos(alfa));
                var y = -radiusY*Math.sin(beta);
                var z =  this.radius*Math.cos(beta) * Math.sin(alfa);
    
                this.vertices.push(x, y, z);

                // If inside is 1, flip the normals
                if (this.inside === 1) {
                    this.normals.push(-x, -y, -z);
                } else {
                    this.normals.push(x, y, z);
                }
                this.texCoords.push((j / this.slices), (i / this.stacks));
                
                

            }
        }
    
        this.indices = [];
        var index = 0;
        for (var i = 0; i < this.stacks; i++) {
            for (var j = 0; j < this.slices; j++) {
                
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

