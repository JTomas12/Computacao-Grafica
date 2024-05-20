import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./geometric/MyPlane.js";
import { MySphere } from "./geometric/MySphere.js";
import { MyPanoram } from "./objects/MyPanoram.js";
import { MyRock } from "./objects/MyRock.js";
import { MyRockSet } from "./objects/MyRockSet.js";
import { MyStem } from "./geometric/MyStem.js";
import { MyFlower } from './objects/MyFlower.js';
import { MyPetal } from './objects/MyPetal.js';
import { MyGarden } from "./objects/MyGarden.js";
import { MyBee } from "./objects/MyBee.js";
import { MyPollen } from "./objects/MyPollen.js";
import { MyHive } from "./objects/MyHive.js";
import { MyLeaf } from "./geometric/MyLeaf.js";

import { MyTerrain } from "./objects/MyTerrain.js";
/**
 * MyScene
 * @constructor
 */

/**
 * getStringFromUrl(url)
 * Function to load a text file from a URL (used to display shader sources)
 */

function getStringFromUrl(url) {
	var xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", url, false);
    xmlHttpReq.send();
    return xmlHttpReq.responseText;
}

export class MyScene extends CGFscene {
  constructor() {
    super();

    this.gardenRows = 5;
    this.gardenCols = 5;
    this.rotationAngle = Math.PI/12;
    this.prismAngle = Math.PI/12;
    this.pollenPresentInFlower = true;
    this.pollenPresentInHive = false;
    this.selectedExampleShader = 0;
    this.showShaderCode = false;
    
  }
  pickPollen() {

    if (this.pollenPresentInFlower) {
      this.pollenPresentInFlower = false;
      return new MyPollen(this); 
    }
    return null; 
  }
  isPollenPresent() {
    return this.pollenPresentInFlower;
  }
  dropPollen() {
    this.pollenPresentInHive = true;
  }
  isPollenPresentInHive() {
    return this.pollenPresentInHive;
  }
  resetPollen() {
    this.pollenPresentInFlower = true;
    this.pollenPresentInHive = false;

    this.selectedExampleShader = 0;
    this.showShaderCode = false;
  }
  checkkeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;
    if(this.gui.isKeyPressed("KeyW")){
      text += " W ";
      keysPressed = true;
    }
    if(this.gui.isKeyPressed("KeyS")){
      text += " S ";
      keysPressed = true;
    }
    if(this.gui.isKeyPressed("KeyA")){
      text += " A ";
      keysPressed = true;
    }
    if(this.gui.isKeyPressed("KeyD")){
      text += " D ";
      keysPressed = true;
    }
    if(keysPressed){
      console.log(text);
    }
  }
  updateGarden() {
    this.garden = new MyGarden(this, this.gardenRows, this.gardenCols);
  }
  updatePetal() {
    this.flower = new MyFlower(this,3,5,1.2,[128,0,0],0.3,[0,128,0],3,3,[0,0,128], this.rotationAngle, this.prismAngle,false, [0,255,0],5);
    this.petal = new MyPetal(this, this.rotationAngle, this.prismAngle,this.flower.petal_color);
  } 
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.disable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.sphere = new MySphere(this, 16, 8, 0, 1, 1);
    this.rockSet = new MyRockSet(this, 10);
    this.rockSet2 = new MyRockSet(this, 10);
    this.rockSet3 = new MyRockSet(this, 10);
    this.rockSet4 = new MyRockSet(this, 10);
    this.speedFactor = 1;
    this.beemaxSpeed = 1;
    this.beescaleFactor = 1;
    this.decelerationRate = 0.5;
    this.accelerationRate = 0.5;
    this.rock = new MyRock(this, 16, 8);
    this.garden = new MyGarden(this, 5, 5);
    this.sphere = new MySphere(this, 1, 20,20,1, 1, 1);
    this.panoramTexture = new CGFtexture(this, "images/panoram2.jpg");
    this.earthTexture = new CGFtexture(this, "images/earth.jpg");
    this.panorama = new MyPanoram(this, this.panoramTexture);
    this.leaf= new MyLeaf(this);
    this.bee = new MyBee(this, 0, 20, 0, false);
    this.hive = new MyHive(this, false);
    this.pollen = new MyPollen(this);
    this.material = new CGFappearance(this);
    this.material.setEmission(1, 1, 1, 1)
    this.material.setTexture(this.earthTexture)
    this.plane = new MyPlane(this,30);
    this.flower = new MyFlower(this,3,5,1.2,[128,128,0],0.3,[0,128,0],3,3,[0,0,128], this.rotationAngle, this.prismAngle, false, [0,255,0],5); 
    //this.garden = new MyGarden(this, this.speedFactor, this.speedFactor);
    //(scene, outer_radius,number_of_petals, receptacle_radius, receptacle_color , stem_radius ,stem_color, stem_stacks,stem_height, petal_color) 
    //this.petal = new MyPetal(this, this.rotationAngle, this.prismAngle,this.flower.petal_color);
    //Objects connected to MyInterface
    this.terrain = new MyTerrain(this, 50);
    this.displayAxis = true;
    this.displaySphere = false;
    this.displayPanorama = true;
    this.displayRockSet = false;
    this.displayPanorama = false;
    this.displayRockSet = false;
    this.displayPanorama = false;
    this.displayFlower = true;
    this.scaleFactor = 1;
    this.displayGarden = false;
    this.displayPetal = false;
    this.displayBee = false;
    this.displayHive = false;
    this.displayTerrain = true;
    //this.displayPetal=true;
    this.enableTextures(true);

    this.appStartTime = Date.now();
    this.setUpdatePeriod(50);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    //this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    
    this.shadersDiv = document.getElementById("shaders");
		this.vShaderDiv = document.getElementById("vshader");
		this.fShaderDiv = document.getElementById("fshader");

    this.onShaderCodeVizChanged(this.showShaderCode);
		//this.onSelectedShaderChanged(this.selectedExampleShader);
    
    this.starttime= Date.now();

    // shaders
    this.testShaders = [
      new CGFshader(this.gl, "shaders/grass.vert", "shaders/grass.frag"),
      //new CGFshader(this.gl, "shaders/flat.vert", "shaders/flat.frag"),
    ];
    this.setUpdatePeriod(50);
    
  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  update(time){
    let elapsed_time = (time- this.starttime)/1000.0;
    this.bee.update(elapsed_time, this.beescaleFactor ,this.speedFactor);
    this.testShaders[0].setUniformsValues({ timeFactor: time / 100 % 1000, randomOscilation: Math.random() });
  
  }
  
  onShaderCodeVizChanged(v) {
		if (this.shadersDiv) { // Check if shadersDiv is defined
      console.log("shadersDiv is defined");
      if (v){
        
        this.shadersDiv.style.display = "block";
        this.vShaderDiv.innerHTML = "<xmp>" + getStringFromUrl(this.testShaders[0].vertexURL) + "</xmp>";
		    this.fShaderDiv.innerHTML = "<xmp>" + getStringFromUrl(this.testShaders[0].fragmentURL) + "</xmp>";
      
        } else
        {this.shadersDiv.style.display = "none";}
    } else {
      console.error("shadersDiv is not defined or accessible.");
    }
	}
  // called when a new shader is selected, updated from the TP5 code, to be revised
	

	// called when the scale factor changes on the interface
	onScaleFactorChanged(v) {
		this.testShaders[this.selectedExampleShader].setUniformsValues({ normScale: this.scaleFactor });
	}




  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();
    // Draw objects

    if (!this.displayFlower) {
      this.pollenPresentInFlower = false;
    }

    if (this.displaySphere) {
     
      this.sphere.display();

    }

    if (this.displayPanorama) {
      this.panorama.display();
    }

    
    if(this.displayBee){
      this.bee.display();
    }

    if (this.displayRockSet) {
      this.rockSet.display();
      this.pushMatrix();
      this.translate(-23, 0, 0);
      this.rotate(Math.PI, 0, 1, 0);
      this.rockSet2.display();
      this.popMatrix();
      this.pushMatrix();
      this.translate(-12, 0, -12);
      this.rotate(Math.PI/2, 0, 1, 0);
      this.rockSet3.display();
      this.popMatrix();
      this.pushMatrix();
      this.translate(-12, 0, 12);
      this.rotate(-Math.PI/2, 0, 1, 0);
      this.rockSet4.display();
      this.popMatrix();
    }

    if(this.displayHive){
      this.hive.display();
    }

    if(this.displayFlower){
      this.flower.display();
    }

    if(this.displayGarden){
      this.garden.display();
    }
    if(this.pollenPresentInFlower){
      this.pushMatrix();
      this.translate(0, 3, 1.3);
      this.scale(0.5, 0.5, 0.5);
      this.pollen.display();
      this.popMatrix();
    }
    if(this.displayTerrain){
      this.terrain.display();
      
    }
    
    
    if(this.displayFlower){
      this.flower.display();
    }
    if(this.pollenPresentInHive){
      this.pushMatrix();
      this.translate(-10.8, 4.7, 1.2);
      this.rotate(Math.PI/2, 1, 0, 0);
      this.scale(0.5, 0.5, 0.5);
      this.pollen.display();
      this.popMatrix();
    }
    //this.leaf.display();
    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    // ---- END Primitive drawing section
    // restore default shader (will be needed for drawing the axis in next frame)
    this.setActiveShader(this.defaultShader);
  }

}
