var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
//Creating controls

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Update viewport on resize
window.addEventListener('resize', function(){
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Set up controls
controls = new THREE.OrbitControls(camera, renderer.domElement);
// Define a qube
var cubeGeometry = new THREE.BoxGeometry(1,1,1);
// Define a material, color or image texture for the cube
var material = new THREE.MeshBasicMaterial( {
  color: 0xffffff,
  wireframe: true
});

//Create a cube and add it to scene
var cube = new THREE.Mesh(cubeGeometry, material);
scene.add(cube);
camera.position.z = 3;

// Animation logic
var update = function() {
  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.02;
  // controls.autoRotate = true;
  //controls.autoRotateSpeed = 30.0;
  //controls.dampingFactor = 2;
};
// Draw Scene
var render = function() {
  renderer.render(scene, camera);
};

var AnimationLoop = function() {
  requestAnimationFrame(AnimationLoop);
  update();
  controls.update();
  render();
};

AnimationLoop();
