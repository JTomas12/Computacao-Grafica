import { CGFobject } from '../lib/CGF.js';

export class MyPetal extends CGFobject {
    constructor(scene, rotationAngle = 0) {
        super(scene);
        this.rotationAngle = rotationAngle;

        this.initBuffers();
    }

   initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    const numSegments = 3; 

   
    for (let i = 0; i <= numSegments; i++) {
        let angle = (i / numSegments) * Math.PI; 
        let radius = Math.sin(angle) * 0.5;
        let x = radius * Math.cos(angle);
        let y = 0;
        let z = radius * Math.sin(angle);
        
        
        let newX = x * Math.cos(this.rotationAngle) - z * Math.sin(this.rotationAngle);
        let newZ = x * Math.sin(this.rotationAngle) + z * Math.cos(this.rotationAngle);

        this.vertices.push(newX, y, newZ); 
        this.normals.push(0, 1, 0);
    }

    
    for (let i = 0; i < numSegments; i++) {
        let baseIndex = i; 
    
        
        this.indices.push(baseIndex, baseIndex + 1, (baseIndex + 2) % (numSegments + 1));
    }

    console.log(this.vertices);
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}

}