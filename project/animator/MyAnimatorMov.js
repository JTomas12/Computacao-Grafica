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
        
        const radius = 1;
        this.x = vector.x + radius * Math.cos(vector.orientation);
        this.z = vector.z + radius * Math.sin(vector.orientation);

        this.y = this.animVal + Math.sin(elapsedTime * 5) * 1;

        this.wingAngle = Math.PI / 4 * Math.sin(elapsedTime * vector.speed);
    }
}
