var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Animation logic
var update = function() {

};
// Draw Scene
var render = function() {
  renderer.render(scene, camera);
};

var GameLoop = function() {
  requestAnimationFrame(GameLoop);
  update();
  render();
};

GameLoop();
