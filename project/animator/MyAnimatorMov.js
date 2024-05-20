import { MyAnimator } from "./MyAnimator.js";

export class MyAnimatorMovement extends MyAnimator {
    constructor(startVal, endVal, animDurationSecs, loop, active) {
        super(startVal, endVal, animDurationSecs, loop, active);
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.tailAngle = 0;
        this.wingAngle = 0;
    }

    movementFunction(elapsedTime) {
        return Math.sin(elapsedTime / this.startVal);
    }

    updatePositionObj(elapsedTime, vector) {

        if (!vector.headingToHive && !vector.descending && !vector.ascending) {  
            this.x = vector.x + vector.speed * Math.sin(vector.orientation);
            this.z = vector.z + vector.speed * Math.cos(vector.orientation);
        }
        else{
            this.x = vector.x;
            this.z = vector.z;
        }
    

        if (!vector.descending && !vector.ascending && !vector.headingToHive) {  
            this.y = 20 + Math.sin(elapsedTime * 5) * 1;
        } else {
            this.y = vector.y;  
        }


        this.wingAngle = Math.PI / 8 * Math.sin(elapsedTime * 10);
    }
}
