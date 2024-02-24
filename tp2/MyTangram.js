import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParalelogram } from "./MyParalelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTangram extends CGFobject {
    
        constructor(scene) {
            super(scene);
            this.diamond = new MyDiamond(this.scene);
            this.paralelogram = new MyParalelogram(this.scene);
            this.triangle = new MyTriangle(this.scene);
            this.triangleBig = new MyTriangleBig(this.scene);
            this.triangleSmall = new MyTriangleSmall(this.scene);

        }
    
    
        display() {
            this.scene.pushMatrix()
            let translationMatrix = [1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                2, 1, 0, 1
            ]
    
            this.scene.multMatrix(translationMatrix)
            this.scene.setDiffuse(0, 255 / 255, 0, 0)
            this.diamond.display()
            this.scene.popMatrix()

            // Purple Triangle
            this.scene.pushMatrix()
            this.scene.translate(1, 0, 0)
            this.scene.setDiffuse(76 / 255, 0 / 255, 153 / 255, 0)
            this.triangleSmall.display()
            this.scene.popMatrix()

            //Parallelogram
            this.scene.pushMatrix()
            this.scene.translate(0, 0, 0);
            this.scene.scale(-1, 1, 1)
            this.scene.rotate(180 * Math.PI / 180, 0, 0, 1)
            this.scene.setDiffuse(1, 1, 0, 0)
            this.paralelogram.display()
            this.scene.popMatrix()
}
}