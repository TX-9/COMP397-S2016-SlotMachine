﻿/* 
Author: Changbae Lee(300770812)
Service URL: http://changbaelee-slotmachine.azurewebsites.net/
Description: Web App called Slot machine is developed with CreateJS framework
Revision History: It is managed with GitHub (https://github.com/TX-9/COMP397-S2016-SlotMachine)
Last Modified by: Changbae Lee
Last Modified date: Jul 11, 2016
*/

//Includes resources shared with other components
// global variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;
var stats: Stats;

var currentScene: objects.Scene;
var scene: number;

// Game Scenes
var menu: scenes.Menu;
var slotMachine: scenes.SlotMachine;
var gameOver: scenes.GameOver;

//manages image files to be used 
var assetData:objects.Asset[] = [
    {id: "BackButton", src:"../../Assets/images/BackButton.png"},
    {id: "Nextbutton", src:"../../Assets/images/Nextbutton.png"},
    {id: "StartButton", src:"../../Assets/images/StartButton.png"},
    {id: "StartOverButton", src:"../../Assets/images/StartOverButton.png"},
    {id: "SlotMachine", src:"../../Assets/images/SlotMachine.png"},
    {id: "Bet10Button", src:"../../Assets/images/Bet10Button.png"},
    {id: "Bet50Button", src:"../../Assets/images/Bet50Button.png"},
    {id: "Bet100Button", src:"../../Assets/images/Bet100Button.png"},
    {id: "SpinButton", src:"../../Assets/images/SpinButton.png"},
    {id: "ResetButton", src:"../../Assets/images/ResetButton.png"},
    {id: "GameoverButton", src:"../../Assets/images/GameoverButton.png"},
    {id: "QuitButton", src:"../../Assets/images/QuitButton.png"},
    {id: "BlackBackground", src:"../../Assets/images/BlackBackground.png"},
    {id: "WhiteBackground", src:"../../Assets/images/WhiteBackground.png"},
    {id: "Blank", src:"../../Assets/images/Blank.png"},
    {id: "Grapes", src:"../../Assets/images/Grapes.gif"},
    {id: "Banana", src:"../../Assets/images/Banana.gif"},
    {id: "Cherry", src:"../../Assets/images/Cherry.gif"},
    {id: "Orange", src:"../../Assets/images/Orange.gif"},
    {id: "Bar", src:"../../Assets/images/Bar.gif"},
    {id: "Bell", src:"../../Assets/images/Bell.gif"},
    {id: "Seven", src:"../../Assets/images/Seven.gif"},
    {id: "SlotMachineLogo", src:"../../Assets/images/SlotMachineLogo.png"}
    
];

//load resources
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}

//initialize App 
function init(): void {
    // create a reference the HTML canvas Element
    canvas = document.getElementById("canvas");
    
    // create our main display list container
    stage = new createjs.Stage(canvas);
    
    // Enable mouse events
    stage.enableMouseOver(20);
    
    // set the framerate to 60 frames per second
    createjs.Ticker.setFPS(config.Game.FPS);
    
    // create an event listener to count off frames
    createjs.Ticker.on("tick", gameLoop, this);
    
    // sets up our stats counting workflow
    setupStats(); 
    
    // set initial scene
    scene = config.Scene.MENU;
    changeScene();
}

// Main Game Loop function that handles what happens each "tick" or frame
function gameLoop(event: createjs.Event): void {
    // start collecting stats for this frame
    stats.begin(); 
    
    // calling State's update method
    currentScene.update(); 
    
    // redraw/refresh stage every frame
    stage.update();
    
    // stop collecting stats for this frame
    stats.end();
}

// Setup Game Stats
function setupStats(): void {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}

// Finite State Machine used to change Scenes
function changeScene(): void {
    
    // Launch various scenes
    switch (scene) {
        case config.Scene.MENU:
            // show the MENU scene
            stage.removeAllChildren();
            menu = new scenes.Menu();
            currentScene = menu;
            console.log("Starting MENU Scene");
            break;
        case config.Scene.SLOT_MACHINE:
            // show the PLAY scene
            stage.removeAllChildren();
            slotMachine = new scenes.SlotMachine();
            currentScene = slotMachine;
            console.log("Starting SLOT_MACHINE Scene");
            break;
        case config.Scene.GAME_OVER:
            // show the game OVER scene
            stage.removeAllChildren();
            gameOver = new scenes.GameOver();
            currentScene = gameOver;
            console.log("Starting GAME_OVER Scene");
            break;
    }
    
    console.log(currentScene.numChildren);
}

//when html page loads, preload calls
window.onload = preload;