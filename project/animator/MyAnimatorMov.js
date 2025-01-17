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

    // Define the movement function using a sine wave based on the elapsed time
    movementFunction(elapsedTime) {
        return Math.sin(elapsedTime / this.startVal);
    }

    // Update the object position based on the elapsed time and vector parameters
    updatePositionObj(elapsedTime, vector) {

        if (!vector.headingToHive ) {  
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


        // Update wing angle based on elapsed time to create a flapping motion
        this.wingAngle = Math.PI / 8 * Math.sin(elapsedTime * 10);
    }
}
