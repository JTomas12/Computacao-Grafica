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
    //Action to pick pollen from the flower
    if (this.pollenPresentInFlower) {
      this.pollenPresentInFlower = false; // Activated when Pollen is picked from the flower
      return new MyPollen(this); 
    }
    return null; 
  }
  isPollenPresent() {
    return this.pollenPresentInFlower; // Returns if pollen is present in the flower
  }
  dropPollen() {
    this.pollenPresentInHive = true; // Activated when Pollen is dropped in the hive
  }
  isPollenPresentInHive() {
    return this.pollenPresentInHive; // Returns if pollen is present in the hive
  }
  resetPollen() { // Reset the pollen state
    this.pollenPresentInFlower = true;
    this.pollenPresentInHive = false;

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
    this.garden = new MyGarden(this, this.gardenRows, this.gardenCols); // Create a new garden with the updated number of rows and columns
  }
  updatePetal() {
    this.flower = new MyFlower(this,3,5,1.2,[128,0,0],0.3,[0,128,0],3,3,[0,0,128], this.rotationAngle, this.prismAngle,false, [0,255,0],5); // Create a new flower with the updated petal angles
    this.petal = new MyPetal(this, this.rotationAngle, this.prismAngle,this.flower.petal_color); // Create a new petal with the updated petal angles
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
    this.beescaleFactor = 1; //not used
    this.decelerationRate = 0.5; // value of the deceleration rate of the bee ( how fast the bee stops)
    this.accelerationRate = 0.5; // value of the acceleration rate of the bee (how fast the bee speeds up)
    this.rock = new MyRock(this, 16, 8); // Create a new rock
    this.garden = new MyGarden(this, 5, 5); // Create a new garden with 5 rows and 5 columns
    this.sphere = new MySphere(this, 1, 20,20,1, 1, 1); // Create a new sphere with radius 1 ( not used to the final scene)
    this.panoramTexture = new CGFtexture(this, "images/panoram2.jpg");
    this.earthTexture = new CGFtexture(this, "images/earth.jpg");
    this.panorama = new MyPanoram(this, this.panoramTexture);
    this.leaf= new MyLeaf(this); // Create a new leaf (not used to the final scene)
    this.bee = new MyBee(this, 0, 20, 0, false); // Create a new bee, and it's initial position is (0,20,0)
    this.hive = new MyHive(this, false); // Create a new hive (with no pollen in it)
    this.pollen = new MyPollen(this); // Create a new pollen
    this.material = new CGFappearance(this);
    this.material.setEmission(1, 1, 1, 1)
    this.material.setTexture(this.earthTexture)
    this.plane = new MyPlane(this,30);
    this.flower = new MyFlower(this,3,5,1.2,[128,128,0],0.3,[0,128,0],3,3,[0,0,128], this.rotationAngle, this.prismAngle, false, [0,255,0],5); // Create a new flower with the following parameters
    //(scene, outer_radius,number_of_petals, receptacle_radius, receptacle_color , stem_radius ,stem_color, stem_stacks,stem_height, petal_color) 
    //this.petal = new MyPetal(this, this.rotationAngle, this.prismAngle,this.flower.petal_color);
    //Objects connected to MyInterface
    this.terrain = new MyTerrain(this, 50); // Create a new terrain with 50 width
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

    this.setUpdatePeriod(50); // Set the update period to 50 ms ( calls update() every 50 ms)

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    //this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    
    this.shadersDiv = document.getElementById("shaders"); // Get the shaders div
		this.vShaderDiv = document.getElementById("vshader"); // Get the vertex shader div
		this.fShaderDiv = document.getElementById("fshader"); // Get the fragment shader div

    this.onShaderCodeVizChanged(this.showShaderCode); // Call the onShaderCodeVizChanged function with the showShaderCode value, when showShaderCode is true, the shader code is displayed
		//this.onSelectedShaderChanged(this.selectedExampleShader);
    
    this.starttime= Date.now(); // Get the start time of the application (repeated code, to be revised) 

    // list of extensible shaders
    this.testShaders = [
      new CGFshader(this.gl, "shaders/grass.vert", "shaders/grass.frag"), // Create a new shader with the grass vertex and fragment shaders
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
  /* never used
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  */
  update(time){
    //Update the bee position, as well as the shader update the oscilation of vertexes associated and time factor (randomOsilation is a random value between 0 and 1, but it is not used )
    let elapsed_time = (time- this.starttime)/1000.0;
    this.bee.update(elapsed_time, this.beescaleFactor ,this.speedFactor);
    this.testShaders[0].setUniformsValues({ timeFactor: time / 100 % 1000, randomOscilation: Math.random() });
  
  }
  
  onShaderCodeVizChanged(v) {
		if (this.shadersDiv) { // Check if shadersDiv is defined
      console.log("shadersDiv is defined");
      if (v){
        
        this.shadersDiv.style.display = "block"; // Display the shaders div
        this.vShaderDiv.innerHTML = "<xmp>" + getStringFromUrl(this.testShaders[0].vertexURL) + "</xmp>"; // Get the vertex shader code from the URL and display it
		    this.fShaderDiv.innerHTML = "<xmp>" + getStringFromUrl(this.testShaders[0].fragmentURL) + "</xmp>"; // Get the fragment shader code from the URL and display it
      
        } else
        {this.shadersDiv.style.display = "none";}
    } else {
      console.error("shadersDiv is not defined or accessible.");
    }
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
    //Display the sphere if checked
    if (this.displaySphere) {
     
      this.sphere.display();

    }
    //Display the panorama if checked
    if (this.displayPanorama) {
      this.panorama.display();
    }

    //Display the bee if checked
    if(this.displayBee){
      this.bee.display();
    }
    //Display the rock set if checked ( a composition of rocksets that is)
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
    //Display the hive if checked
    if(this.displayHive){
      this.hive.display();
    }
    //Display the Garden if checked
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
    //Display the Main Flower
    if(this.displayFlower){
      this.flower.display();
    }
    //Display the pollen if it is present in the hive
    if(this.pollenPresentInHive){
      this.pushMatrix();
      this.translate(-10.8, 4.7, 1.2);
      this.rotate(Math.PI/2, 1, 0, 0);
      this.scale(0.5, 0.5, 0.5);
      this.pollen.display();
      this.popMatrix();
    }
    
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
