export class MyAnimator {

    // Constructor to initialize the animation with start and end values, duration, loop flag, and active state
    constructor(startVal, endVal, animDurationSecs, loop, active) {
        this.startVal = startVal;
        this.endVal = endVal;
        this.animDurationSecs = animDurationSecs;
        this.length = (this.endVal - this.startVal);
        this.animVal = this.startVal;
        this.active = active;
        this.loop = loop;
        this.last = 0;
        this.lastIteration = false;
    }

    // Abstract method to be implemented by subclasses
    movementFunction(time) {
        throw new Error('Subclass must implement abstract method');
    }

    // Abstract method to be implemented by subclasses
    updatePositionObj(timeSinceAnimationStart, vector) {
        throw new Error('Subclass must implement abstract method');
    }

    // Enable the animation
    enable(timeSinceAppStart) {
        this.active = true;
        this.last = timeSinceAppStart;
        this.lastIteration = false;
    }

    // Disable the animation
    disable() {
        this.active = false;
    }

    // Update the animation based on elapsed time and update the position vector accordingly
    update(elapsedTimeSecs, vector) {

        if (this.active) {
            let timeSinceAnimationStart = elapsedTimeSecs - this.last;

            if (this.loop || (!this.loop && timeSinceAnimationStart <= this.animDurationSecs)) {
                let progress = timeSinceAnimationStart / this.animDurationSecs;
                this.animVal = this.startVal + this.movementFunction(progress) * this.length;
                this.updatePositionObj(timeSinceAnimationStart, vector);
            } else if (!this.loop && timeSinceAnimationStart > this.animDurationSecs) {
                this.animVal = this.startVal + this.movementFunction(1) * this.length;
                this.updatePositionObj(timeSinceAnimationStart, vector);
                this.lastIteration = true;
            }
        }
    }
}
