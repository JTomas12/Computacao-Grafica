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
        this.gui.add(this.scene, 'displayAxis').name('Display Axis'); // Adds a checkbox to activate/deactivate the axis

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor'); // Adds a slider to change the scale of the object
        
        this.gui.add(this.scene, 'beescaleFactor',0.5, 3).name('Bee Scale Factor') // Adds a slider to change the scale of the bee (not used)
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor'); // Adds a slider to change the speed of the bee movements (more noticiably the rotation of the bee)

        this.gui.add(this.scene, 'displayGarden').name('Display Garden'); // Adds a checkbox to activate/deactivate the garden visibility

        this.gui.add(this.scene, 'displaySphere').name('Display Sphere'); // Adds a checkbox to activate/deactivate the sphere visibility (not used to the final scene)
        this.gui.add(this.scene, 'displayPanorama').name('Display Panorama'); // Adds a checkbox to activate/deactivate the panorama visibility (not used to the final scene)
        this.gui.add(this.scene, 'displayRockSet').name('Display Rock Set');// Adds a checkbox to activate/deactivate the rock set visibility (not used to the final scene)
        this.gui.add(this.scene, 'displayHive').name('Display Hive'); // Adds a checkbox to activate/deactivate the hive visibility

        this.gui.add(this.scene, 'displayFlower').name('Display Flower');
        this.gui.add(this.scene, 'displayPetal').name('Display Petal');

        this.gui.add(this.scene, 'displayBee').name('Display Bee');
        this.gui.add(this.scene, 'displayTerrain').name('Display Terrain'); // Adds a checkbox to activate/deactivate the terrain visibility
        this.gui.add(this.scene, 'showShaderCode').name('Show Shader Code').onChange(this.scene.onShaderCodeVizChanged.bind(this.scene)); //Shows the shader code that is being used both for fragment shader and the vertex shader
        const beeFolder = this.gui.addFolder('Bee Settings');
        beeFolder.add(this.scene, 'decelerationRate', 0.1, 1).name('Deceleration Rate'); // Adds a slider to change the deceleration rate of the bee, that is, how fast the bee stops
        beeFolder.add(this.scene, 'accelerationRate', 0.1, 1).name('Acceleration Rate'); // Adds a slider to change the acceleration rate of the bee, that is, how fast the bee speeds up (reaches the max speed)
        beeFolder.add(this.scene, 'beemaxSpeed', 0.1, 5).name('Bee Max Speed'); // Adds a slider to change the max speed of the bee
        const gardenFolder = this.gui.addFolder('Garden Settings'); // Adds a folder to the GUI to group the garden settings
        gardenFolder.add(this.scene, 'gardenRows', 1, 10).step(1).name('Rows').onChange(() => {
          this.scene.updateGarden(); // Adds a slider to change the number of rows in the garden and updates the garden (more especifically the visibility of garden objects in rows)
        });
        
        gardenFolder.add(this.scene, 'gardenCols', 1, 10).step(1).name('Columns').onChange(() => {
          this.scene.updateGarden();// Adds a slider to change the number of rows in the garden and updates the garden (more especifically the visibility of garden objects in columns)
        });
        gardenFolder.open();
        const petalFolder = this.gui.addFolder('Petal Settings');
        petalFolder.add(this.scene, 'rotationAngle', -Math.PI, Math.PI).name('Rotation Angle').onChange(() => {
          this.scene.updatePetal(); // Adds a slider to change the rotation angle of the petal and updates the petal on the main flower
        });
        petalFolder.add(this.scene, 'prismAngle', -Math.PI, Math.PI).name('Prism Angle').onChange(() => {
          this.scene.updatePetal(); // Adds a slider to change the prism angle of the petal and updates the petal on the main flower
        });
        
        this.initKeys(); // Initializes the keys for the interface, initiating the keyboard keys processing
        return true;
    }
    initKeys(){
      this.scene.gui=this;
      this.processKeyboard=function(){};
      this.activeKeys={};
    }
    processKeyDown(event){
      this.activeKeys[event.code]=true; // When the key is pressed, the key is set to true
      console.log(event.code);
    }
    processKeyUp(event){
      this.activeKeys[event.code]=false; // When the key is released, the key is set to false
    }
    isKeyPressed(keyCode){
      return this.activeKeys[keyCode] || false; // Returns true if the key is pressed, false otherwise
    }
}