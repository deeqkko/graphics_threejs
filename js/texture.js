var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);

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
controls = new THREE.OrbitControls(camera, renderer.domElement);
// Create a qube
var cubeGeometry = new THREE.BoxGeometry(1,1,1);

// Create a texture map
var cubeMaterials = [
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('../assets/skull.jpg'), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('../assets/skull.jpg'), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('../assets/skull.jpg'), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('../assets/skull.jpg'), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('../assets/skull.jpg'), side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('../assets/skull.jpg'), side: THREE.DoubleSide})
];

// Create a material, color or image texture
var material = new THREE.MeshFaceMaterial(cubeMaterials);

var cube = new THREE.Mesh(cubeGeometry, material);
scene.add(cube);

camera.position.z = 3;

// Animation logic
var update = function() {
  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;
  controls.autoRotate = true;
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
