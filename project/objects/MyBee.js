import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from '../geometric/MySphere.js';
import { MyCone } from '../geometric/MyCone.js';
import { MyPollen } from './MyPollen.js';
import { MyAnimatorMovement } from '../animator/MyAnimatorMov.js';

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject {
    constructor(scene, x, y, z, pollenPresent) {
        super(scene);
        this.head = new MySphere(scene,1, 16, 8, 0, 1, 1);
        this.body = new MySphere(scene,1, 16, 8, 0, 1, 1);
        this.abdomen = new MySphere(scene,1, 16, 8, 0, 1, 1);
        this.wing = new MySphere(scene,1, 16, 8, 0, 1, 1);
        this.eye = new MySphere(scene,1, 16, 8, 0, 1, 1);
        this.paw = new MySphere(scene,1, 16, 8, 0, 1, 1);
        this.sting = new MyCone(scene, 16, 8);
        this.pollen = new MyPollen(scene);
        
        this.scale = 1;
        this.speed = 0;
        this.position = {x: x, y: y, z: z};
        this.defaultposition = {x: x, y: y, z: z};
        this.wingRotation = Math.PI / 8;
        this.oscillationOffset = 0;
        this.orientation = 1;
        this.lastOrientation = 1;
        this.speed = 0;
        this.lastSpeed = 0;
        this.lastSpeedFactor = 1;
        this.scale = 1;
        this.flowerPosition = {x: 0, y: 5, z: 0};
        this.hivePosition = {x: -10, y: 5, z: 2};
        this.descending = false;
        this.ascending = false;
        this.headingToHive = false;
        this.pollenPresent = pollenPresent;
        this.firstFKeyPress = false;
        this.firstOKeyPress = false;
        this.initMaterials();
        this.animator = new MyAnimatorMovement(1, 2*Math.PI, 100, true, true);

        
        
    }
		


    initMaterials() {

        // Paw material
        this.pawMaterial = new CGFappearance(this.scene);
        this.pawMaterial.setAmbient(0.2, 0.2, 0.2, 1.0); 
        this.pawMaterial.setDiffuse(0.2, 0.2, 0.2, 1.0); 
        this.pawMaterial.setSpecular(0.9, 0.9, 0.9, 1.0); 
        this.pawMaterial.setShininess(10.0); 

        // Eye material
        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.setAmbient(0.2, 0.2, 0.2, 1.0); 
        this.eyeMaterial.setDiffuse(0.2, 0.2, 0.2, 1.0); 
        this.eyeMaterial.setSpecular(0.9, 0.9, 0.9, 1.0); 
        this.eyeMaterial.setShininess(10.0); 

        // Abdomen material
        this.abdomenMaterial = new CGFappearance(this.scene);
        this.abdomenMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
        this.abdomenMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
        this.abdomenMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
        this.abdomenMaterial.setTexture(new CGFtexture(this.scene, "./images/bee_texture.png"));
        this.abdomenMaterial.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

        // Head material
        this.headMaterial = new CGFappearance(this.scene);
        this.headMaterial.setAmbient(1.0, 0.8, 0.0, 1.0); 
        this.headMaterial.setDiffuse(1.0, 0.8, 0.0, 1.0);  
        this.headMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);  
        this.headMaterial.setShininess(10.0);  

        // Body material
        this.bodyMaterial = new CGFappearance(this.scene);
        this.bodyMaterial.setAmbient(1.0, 0.8, 0.0, 1.0); 
        this.bodyMaterial.setDiffuse(1.0, 0.8, 0.0, 1.0);  
        this.bodyMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);  
        this.bodyMaterial.setShininess(10.0);  

        // Wings material
        this.wingsMaterial = new CGFappearance(this.scene);
        this.wingsMaterial.setAmbient(0.2, 0.2, 0.2, 0.0);  
        this.wingsMaterial.setDiffuse(0.7, 0.7, 0.8, 0.9);  
        this.wingsMaterial.setSpecular(1.0, 1.0, 1.0, 0.9);  
        this.wingsMaterial.setShininess(50.0);  
        this.wingsMaterial.setEmission(0.5, 0.5, 0.5, 0.0);  


        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
        this.scene.gl.enable(this.scene.gl.BLEND);

    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.drawElements();
        if(this.pollenPresent){
            this.scene.pushMatrix();
            this.scene.translate(0.2, -0.5, 0.5);
            this.scene.rotate(Math.PI / 3, 0, 0, 1);
            this.scene.scale(0.3, 0.3, 0.3);
            this.pollen.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix()
    }
    drawElements() {

        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);

        //Body
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.6, 0.9);
        this.bodyMaterial.apply();
        this.body.display();
        this.scene.popMatrix();

        //Head
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.scene.rotate(-Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.6, 0.6, 0.4);
        this.headMaterial.apply();
        this.head.display();
        this.scene.popMatrix();

        //Eyes
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.1, 1.1);
        this.scene.rotate(Math.PI / 3, 1, 0, 0);
        this.scene.scale(0.2, 0.2, 0.4);
        this.eyeMaterial.apply();
        this.eye.display();
        this.scene.translate(5, 0, 0);
        this.eye.display();
        this.scene.popMatrix();

        //Abdomen
        this.scene.pushMatrix();
        this.scene.translate(0, -0.2, -1.5);
        this.scene.rotate(Math.PI / 3, 1, 0, 0);
        this.scene.scale(0.8,1, 0.7);
        this.abdomenMaterial.apply();
        this.abdomen.display();
        this.scene.popMatrix();

        //Wings
        this.scene.pushMatrix();
        this.scene.translate(0.8, 0.1, 0); 
        this.scene.rotate(-Math.PI / 2, 0, 0, 1); 
        this.scene.rotate(this.wingRotation, 0, 0, 1); 
        this.scene.scale(0.1, 1.1, 0.5);
        this.wingsMaterial.apply();
        this.wing.display();
        this.scene.popMatrix();

        // Asa esquerda
        this.scene.pushMatrix();
        this.scene.translate(-0.8, 0.1, -0.1); 
        this.scene.rotate(Math.PI / 2, 0, 0, 1); 
        this.scene.rotate(-this.wingRotation, 0, 0, 1); 
        this.scene.scale(0.1, 1.1, 0.5);
        this.wingsMaterial.apply();
        this.wing.display();
        this.scene.popMatrix();

        //Paws
        this.scene.pushMatrix();
        this.scene.translate(0.3, -0.5, 0.5);
        this.scene.rotate(Math.PI / 3, 1, 0, 0);
        this.scene.scale(0.1, 0.1, 0.3);
        this.pawMaterial.apply();
        this.paw.display();
        this.scene.translate(0, 0, 1.8);
        this.paw.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.3, -0.5, -0.4);
        this.scene.rotate(-Math.PI / 3, 1, 0, 0);
        this.scene.scale(0.1, 0.1, 0.3);
        this.paw.display();
        this.scene.translate(0, 0, -1.8);
        this.paw.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.3, -0.5, 0.5);
        this.scene.rotate(Math.PI / 3, 1, 0, 0);
        this.scene.scale(0.1, 0.1, 0.3);
        this.paw.display();
        this.scene.translate(0, 0, 1.8);
        this.paw.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.3, -0.5, -0.4);
        this.scene.rotate(-Math.PI / 3, 1, 0, 0);
        this.scene.scale(0.1, 0.1, 0.3);
        this.paw.display();
        this.scene.translate(0, 0, -1.8);
        this.paw.display();
        this.scene.popMatrix();

        //Sting
        this.scene.pushMatrix();
        this.scene.translate(0, -0.65, -2.3);
        this.scene.rotate(-Math.PI / 1.6, 1, 0, 0);
        this.scene.scale(0.1, 0.5, 0.1);
        this.pawMaterial.apply();
        this.sting.display();
        this.scene.popMatrix();

        this.scene.popMatrix();


    }
    turn(v) {
        this.orientation += v
    }

    accelerate(v, maxSpeed,beeaccelerationRate,beedecelerationRate) {
    
        // Acceleration
        if (v > 0) {
            this.speed = Math.min(this.speed + v * beeaccelerationRate, maxSpeed);
        }
        // Deceleration
        else if (v < 0) {
            this.speed = Math.max(this.speed + v * beedecelerationRate, 0);
        }
    }
    reset() {
        this.speed = 0
        this.lastSpeed = 0
        this.orientation = 0
        this.lastOrientation = 0
        this.pollenPresent = false;
        this.ascending = false;
        this.descending = false;
        this.headingToHive = false;
        this.firstFKeyPress = false;
        this.firstOKeyPress = false;
        this.scene.resetPollen();
        this.position = {x: this.defaultposition.x, y: this.defaultposition.y, z: this.defaultposition.z}
    }
    
    handlekeys(factor /*, elapsedTime*/) {
        if (this.scene.gui.isKeyPressed("KeyW")) {
            this.accelerate(factor,this.scene.beemaxSpeed,this.scene.accelerationRate,this.scene.decelerationRate)
        }
        if (this.scene.gui.isKeyPressed("KeyS")) {
            this.accelerate(-factor,this.scene.beemaxSpeed,this.scene.accelerationRate,this.scene.decelerationRate)
        }
        if (this.scene.gui.isKeyPressed("KeyA")) {
            this.turn(factor/8)
        }
        if (this.scene.gui.isKeyPressed("KeyD")) {
            this.turn(-factor/8)
        }
        if (this.scene.gui.isKeyPressed("KeyR")) {
            this.reset()
        }
        if (this.scene.gui.isKeyPressed("KeyF")) {
            if (!this.firstFKeyPress) {
                this.firstFKeyPress = true;
                this.lastSpeed = this.speed;
                this.lastOrientation = this.orientation;
            }
            this.descending = true;
            this.descendToFlower();
        }
        if (this.scene.gui.isKeyPressed("KeyP")) {
            this.ascending = true;
            this.descending = false; 
            this.headingToHive = false;
            this.speed = this.lastSpeed;
            this.orientation = this.lastOrientation;
            this.ascendToDefault();
        }
        if (this.scene.gui.isKeyPressed("KeyO")) {

            if(!this.firstOKeyPress){
                this.firstOKeyPress = true;
                this.lastSpeed = this.speed;
                this.lastOrientation = this.orientation;
            }
            if(this.pollenPresent && this.speed != 0){
                this.headingToHive = true;
            }
        }
    }


    descendToFlower() {
        if (this.position.y > this.flowerPosition.y) {
            this.position.y = this.lerp(this.position.y, this.flowerPosition.y, 0.1);
            if(this.position.y < this.flowerPosition.y + 0.5 && this.position.z < this.flowerPosition.z + 1 && this.position.z > this.flowerPosition.z - 1 && this.position.x < this.flowerPosition.x + 1 && this.position.x > this.flowerPosition.x - 1){
                if (this.scene.isPollenPresent()) {
                    this.pollen = this.scene.pickPollen();
                    this.pollenPresent = !!this.pollen; 
                }
                this.speed = 0;
            }
        }
         else {
            this.position.y = this.flowerPosition.y;
        }
    }
    
    
    ascendToDefault() {
        if (this.position.y < this.defaultposition.y) {
            this.position.y = this.lerp(this.position.y, this.defaultposition.y, 0.1);
            if(this.position.y > this.defaultposition.y - 0.5){
                this.ascending = false;
            }
        } else {
            this.position.y = this.defaultposition.y;
            this.ascending = false;
        }
    }

    isFlowerOriented(){
        let z_dif= this.flowerPosition.z - this.position.z;
        let mod_orientation = this.orientation % (2*Math.PI);
        let bool_orientation = (mod_orientation >= 0 && mod_orientation <= Math.PI/2) || (mod_orientation >= 3*Math.PI/2 && mod_orientation <= 2*Math.PI);
        return ((bool_orientation)&&(z_dif>=0) ) || (!bool_orientation && z_dif<=0);
    }
    
    isHiveOriented(){
        let z_dif= this.hivePosition.z - this.position.z;
        let mod_orientation = this.orientation % (2*Math.PI);
        let bool_orientation = (mod_orientation >= 0 && mod_orientation <= Math.PI/2) || (mod_orientation >= 3*Math.PI/2 && mod_orientation <= 2*Math.PI);
        return ((bool_orientation)&&(z_dif>0) ) || (!bool_orientation && z_dif<0);
    }
    
    moveToHive() {

        if (this.headingToHive ) {
            const direction = {
                x: this.hivePosition.x - this.position.x,
                y: this.hivePosition.y - this.position.y,
                z: this.hivePosition.z - this.position.z
            };
            
            const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y + direction.z * direction.z);
            if (magnitude > 0) {
                direction.x /= magnitude;
                direction.y /= magnitude;
                direction.z /= magnitude;
            }
            this.orientation = 1/Math.atan2((direction.x), (direction.z));
            
            this.position.y += direction.y * this.speed;
            if(!this.isHiveOriented()){
                
                this.position.z += direction.z * this.speed*this.orientation;
                if(this.position.x >= this.hivePosition.x){
                    this.position.x += -direction.x * this.speed*this.orientation;
                } else{
                this.position.x += direction.x * this.speed*this.orientation; }
            } else {
             this.position.z -= direction.z * this.speed*this.orientation;
                if(this.position.x >= this.hivePosition.x){
                    this.position.x += -direction.x * this.speed*this.orientation;
                } else{
                    
                    this.position.x += direction.x * this.speed*this.orientation; }
            }
            this.scene.pushMatrix();    
            this.scene.rotate(Math.PI, 0, 1, 1);
            this.scene.popMatrix();
            //console.log(magnitude);


            if (magnitude < 1) {
                this.position.x = this.hivePosition.x;
                this.position.y = this.hivePosition.y;
                this.position.z = this.hivePosition.z;
                if(this.pollenPresent && !this.scene.isPollenPresentInHive()){
                    this.scene.dropPollen();
                    this.pollenPresent = false;
                }
                this.orientation = -2;
                this.speed = 0;
            }
        }
    }

    lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }
    update(elapsedTime, scaleFactor, speedFactor) {

        this.scale = scaleFactor;
        this.handlekeys(speedFactor, elapsedTime);

        if (speedFactor !== this.lastSpeedFactor && this.speed != 0) {
            this.speed += (speedFactor - this.lastSpeedFactor);
            this.lastSpeedFactor = speedFactor;
        }



        this.animator.update(elapsedTime, {x: this.position.x, y: this.position.y, z: this.position.z, speed: this.speed, orientation: this.orientation, wingAngle: this.wingRotation, descending : this.descending,
            ascending: this.ascending, headingToHive: this.headingToHive});


        this.updateParams();
        this.moveToHive();
        
    }

    updateParams() {

      
        if (!this.descending && !this.ascending) {  
            this.position.y = this.animator.y;
        }

        this.position.x = this.animator.x
        this.position.z = this.animator.z
        this.wingRotation = this.animator.wingAngle
    }
}