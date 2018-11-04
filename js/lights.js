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
var cubeGeometry = new THREE.BoxGeometry(2,2,2);
var floorGeometry = new THREE.BoxGeometry(2000, 2, 2000);

// Create a texture map
var cubeMaterials = [
  new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../assets/skull.jpg'), side: THREE.DoubleSide}),
  new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../assets/skull.jpg'), side: THREE.DoubleSide}),
  new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../assets/skull.jpg'), side: THREE.DoubleSide}),
  new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../assets/skull.jpg'), side: THREE.DoubleSide}),
  new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../assets/skull.jpg'), side: THREE.DoubleSide}),
  new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('../assets/skull.jpg'), side: THREE.DoubleSide})
];

// Create a material, color or image texture
var material = new THREE.MeshFaceMaterial(cubeMaterials);
var floorMaterial = new THREE.MeshBasicMaterial({color: 0x100030});

// Add cube to scene
var cube = new THREE.Mesh(cubeGeometry, material);
scene.add(cube);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
scene.add(floor);

camera.position.y = 1;
camera.position.z = 1;
//camera.position.x = 2;
floor.position.y = -10;
// Create ambient light and add it to scene
var ambientLight = new THREE.AmbientLight( 0xFFFFFF, 1.4 );
scene.add(ambientLight);

// Create point lights
var pointLight1 = new THREE.PointLight( 0xFF0000, 2, 50 );
pointLight1.position.set( 5, 5, 5);
scene.add(pointLight1);

var pointLight2 = new THREE.PointLight( 0xFF0000, 2, 50 );
pointLight2.position.set( -5, -5, -5);
scene.add(pointLight2);

var pointLight3 = new THREE.PointLight( 0xFF0000, 2, 50 );
pointLight3.position.set( -5, -5, 5);
scene.add(pointLight3);

// Animation logic
var update = function() {
  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;
  controls.autoRotate = true;
  var time = Date.now();

  pointLight1.position.x = Math.sin( time * 0.2 ) * 20;
  pointLight1.position.x = Math.cos( time * 0.4 ) * 50;
  pointLight1.position.z = Math.sin( time * 0.6 ) * 40;

  pointLight2.position.x = Math.sin( time * 0.6 ) * 50;
  pointLight2.position.x = Math.cos( time * 0.3 ) * 20;
  pointLight2.position.z = Math.cos( time * 0.1 ) * 30;

  pointLight3.position.x = Math.cos( time * 0.3 ) * 20;
  pointLight3.position.x = Math.cos( time * 0.2 ) * 50;
  pointLight3.position.z = Math.sin( time * 0.1 ) * 40;

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
