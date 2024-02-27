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

        this.gui.add(this.scene, 'displayDiamond').name(' Diamond');

        // Controlador para a visibilidade do triângulo
        this.gui.add(this.scene, 'displayTriangle').name(' Triangle');

        // Controlador para a visibilidade do triângulo grande
        this.gui.add(this.scene, 'displayTriangleBig').name(' Triangle Big');

        // Controlador para a visibilidade do triângulo pequeno
        this.gui.add(this.scene, 'displayTriangleSmall').name(' Triangle Small');

        this.gui.add(this.scene, 'displayParalelogram').name('Paralelogram');

        this.gui.add(this.scene, 'displayTangram').name('Tangram');
        return true;
    }
}