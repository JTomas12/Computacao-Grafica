import { CGFobject } from "../lib/CGF";
import { MyStem } from "./MyStem";
import { MySphere } from "./MySphere";
import { MyPetal } from "./MyPetal";
export class MyFlower extends CGFobject{

    constructor(scene){
        super(scene);
        this.initBuffers();
    }
}