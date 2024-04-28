import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');
        
        this.gui.add(this.scene, 'displayGarden').name('Display Garden');

        this.gui.add(this.scene, 'displaySphere').name('Display Sphere');
        this.gui.add(this.scene, 'displayPanorama').name('Display Panorama');
        this.gui.add(this.scene, 'displayRockSet').name('Display Rock Set');

        this.gui.add(this.scene, 'displayFlower').name('Display Flower');
        this.gui.add(this.scene, 'displayPetal').name('Display Petal');

        this.gui.add(this.scene, 'displayBee').name('Display Bee');
        const gardenFolder = this.gui.addFolder('Garden Settings');
        gardenFolder.add(this.scene, 'gardenRows', 1, 10).step(1).name('Rows').onChange(() => {
          this.scene.updateGarden();
        });
        
        gardenFolder.add(this.scene, 'gardenCols', 1, 10).step(1).name('Columns').onChange(() => {
          this.scene.updateGarden();
        });
        gardenFolder.open();
        const petalFolder = this.gui.addFolder('Petal Settings');
        petalFolder.add(this.scene, 'rotationAngle', -Math.PI, Math.PI).name('Rotation Angle').onChange(() => {
          this.scene.updatePetal();
        });
        petalFolder.add(this.scene, 'prismAngle', -Math.PI, Math.PI).name('Prism Angle').onChange(() => {
          this.scene.updatePetal();
        });
        return true;
    }
}