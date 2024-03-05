import { CGFobject, CGFappearance } from '../lib/CGF.js';
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
            this.initMaterials();

        }

        initMaterials() {
            this.purpleTriangleMaterial = new CGFappearance(this.scene);
            this.purpleTriangleMaterial.setAmbient(0.5, 0.5, 0.5, 1);
            this.purpleTriangleMaterial.setDiffuse(0.6, 0, 1, 1);
            this.purpleTriangleMaterial.setSpecular(0.7, 0.7, 0.7, 1);
            this.purpleTriangleMaterial.setShininess(120.0);

            this.redTriangleMaterial = new CGFappearance(this.scene);
            this.redTriangleMaterial.setAmbient(0.5, 0.5, 0.5, 1);
            this.redTriangleMaterial.setDiffuse(1, 0, 0, 1);
            this.redTriangleMaterial.setSpecular(0.7, 0.7, 0.7, 1);
            this.redTriangleMaterial.setShininess(120.0);

            this.yellowParallelogramMaterial = new CGFappearance(this.scene);
            this.yellowParallelogramMaterial.setAmbient(0.5, 0.5, 0.5, 1);
            this.yellowParallelogramMaterial.setDiffuse(1, 1, 0, 1);
            this.yellowParallelogramMaterial.setSpecular(0.7, 0.7, 0.7, 1);
            this.yellowParallelogramMaterial.setShininess(120.0);

            this.blueTriangleMaterial = new CGFappearance(this.scene);
            this.blueTriangleMaterial.setAmbient(0.5, 0.5, 0.5, 1);
            this.blueTriangleMaterial.setDiffuse(0, 0, 1, 1);
            this.blueTriangleMaterial.setSpecular(0.7, 0.7, 0.7, 1);
            this.blueTriangleMaterial.setShininess(120.0);

            this.pinkTriangleMaterial = new CGFappearance(this.scene);
            this.pinkTriangleMaterial.setAmbient(0.5, 0.5, 0.5, 1);
            this.pinkTriangleMaterial.setDiffuse(1, 0, 0.7, 1);
            this.pinkTriangleMaterial.setSpecular(0.7, 0.7, 0.7, 1);
            this.pinkTriangleMaterial.setShininess(120.0);

            this.orangeTriangleMaterial = new CGFappearance(this.scene);
            this.orangeTriangleMaterial.setAmbient(0.5, 0.5, 0.5, 1);
            this.orangeTriangleMaterial.setDiffuse(1, 0.5, 0, 1);
            this.orangeTriangleMaterial.setSpecular(0.7, 0.7, 0.7, 1);
            this.orangeTriangleMaterial.setShininess(120.0);

        }
    
    
        display() {
            this.scene.pushMatrix()
            let translationMatrix = [1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                2, 1, 0, 1
            ]
    
            this.scene.multMatrix(translationMatrix)
            this.scene.customMaterial.apply()
            this.diamond.display()
            this.scene.popMatrix()

            // Purple Triangle
            this.scene.pushMatrix()
            this.scene.translate(1, 0, 0)
            this.purpleTriangleMaterial.apply()
            this.triangleSmall.display()
            this.scene.popMatrix()

            //Parallelogram
            this.scene.pushMatrix()
            this.scene.translate(0, 0, 0);
            this.scene.scale(-1, 1, 1)
            this.scene.rotate(180 * Math.PI / 180, 0, 0, 1)
            this.yellowParallelogramMaterial.apply()
            this.paralelogram.display()
            this.scene.popMatrix()
            
            // Red Triangle
            this.scene.pushMatrix()
            this.scene.translate(3, 0, 0)
            this.scene.rotate( 90* Math.PI / 180, 0, 0, 1)
            this.redTriangleMaterial.apply()
            this.triangleSmall.display()
            this.scene.popMatrix()

            // Pink Triangle
            this.scene.pushMatrix()
            this.scene.translate(4, 0, 0)
            this.scene.rotate(0, 0, 0, 1)
            this.pinkTriangleMaterial.apply()
            this.triangle.display()
            this.scene.popMatrix()

            // Orange Triangle
            this.scene.pushMatrix()
            this.scene.translate(0.6,-0.6, 0)
            this.scene.scale(1.5, 1.5, 1.5)
            this.scene.rotate(135 * Math.PI / 180, 0, 0, 1)
            this.orangeTriangleMaterial.apply()
            this.triangleBig.display()
            this.scene.popMatrix()

            // Blue Triangle
            this.scene.pushMatrix()
            this.scene.translate(-3.64, -0.6, 0)
            this.scene.scale(1.5, 1.5, 1.5)
            this.scene.rotate(225 * Math.PI / 180, 0, 0, 1)
            this.blueTriangleMaterial.apply()
            this.triangleBig.display()
            this.scene.popMatrix()

        }

        enableNormalViz(){
                this.diamond.enableNormalViz()
                this.triangle.enableNormalViz()
                this.triangleBig.enableNormalViz()
                this.triangleSmall.enableNormalViz()
                this.paralelogram.enableNormalViz()
            };
        
        disableNormalViz(){
                this.diamond.disableNormalViz()
                this.triangle.disableNormalViz()
                this.triangleBig.disableNormalViz()
                this.triangleSmall.disableNormalViz()
                this.paralelogram.disableNormalViz()
        };
    
}