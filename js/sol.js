var scene, camera;
var controls;
var renderer;
var starField, starFieldGeo, starFieldMat, starFieldTexture;
var sun, sunGeo, sunMat, sunTexture;
var earth, earthGeo, earthMat, earthTexture;
var moon, moonGeo, moonMat, moonTexture;
var ambientLight, pointLight, spotLight;
var moonPivot, earthPivot, cameraPivot, spotLightPivot;



var init = function( ) {

  //Basic setup
  scene = new THREE.Scene( );

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000000 );
  renderer = new THREE.WebGLRenderer( );

  //Textures
  sunTexture = new THREE.TextureLoader().load('../assets/2k_sun.jpg');
  earthTexture = new THREE.TextureLoader().load('../assets/earthmap1k.jpg');
  moonTexture = new THREE.TextureLoader().load('../assets/moon.jpg');
  starFieldTexture = new THREE.TextureLoader().load('../assets/starfield.jpg');

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild( renderer.domElement );

  //OrbitControls setup
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  //controls.autoRotate = true;


  //Scene resizing for a viewport resizing
  window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  //Creating objects geometry
  starFieldGeo = new THREE.SphereBufferGeometry( 250000, 32, 32 );
  sunGeo = new THREE.SphereBufferGeometry( 695.700, 32, 32 );
  earthGeo = new THREE.SphereBufferGeometry( 63.78, 32, 32 );
  moonGeo = new THREE.SphereBufferGeometry( 17.36, 32, 32 );

  //Creating objects material
  starFieldMat = new THREE.MeshBasicMaterial({
      map: starFieldTexture,
      side: THREE.BackSide
  });
  sunMat = new THREE.MeshLambertMaterial({ map: sunTexture});
  earthMat = new THREE.MeshLambertMaterial({ map: earthTexture });
  moonMat = new THREE.MeshLambertMaterial({ map: moonTexture});



}

// Drawing scene
var draw = function( ) {
  //ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.1);

  pointLight = new THREE.PointLight( 0xFFFFFF, 1);
  pointLight.add(new THREE.Mesh(sunGeo, new THREE.MeshBasicMaterial({
  map: sunTexture })));
  pointLight.distance = 700;

  spotLight = new THREE.SpotLight( 0xFFFFFF, 2 );
  spotLight.distance = 10000
  spotLight.angle = Math.PI / 8;
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 512;
  spotLight.shadow.mapSize.height = 512;
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = spotLight.distance;





  starField = new THREE.Mesh( starFieldGeo, starFieldMat );

  sun = new THREE.Mesh( sunGeo, sunMat);
  sun.castShadow = false;
  sun.receiveShadow = false;

  earth = new THREE.Mesh( earthGeo, earthMat );
  earth.castShadow = true;
  earth.receiveShadow = true;

  moon = new THREE.Mesh( moonGeo, moonMat );
  moon.castShadow = true;
  moon.receiveShadow = true;

  moonPivot = new THREE.Object3D();
  earthPivot = new THREE.Object3D();
  cameraPivot = new THREE.Object3D();
  spotLightPivot = new THREE.Object3D();


  //scene.add( ambientLight );
  scene.add( pointLight );
  scene.add( spotLight );
  scene.add( starField );
  scene.add( sun );
  scene.add( earth );
  scene.add( moon );
  scene.add( moonPivot );
  scene.add( earthPivot );
  scene.add( cameraPivot );
  scene.add( spotLightPivot);


  earth.position.set( 14690, 0, 0);
  spotLight.rotation.z = Math.PI/2;
  spotLight.target = earth;
  spotLightPivot.add( spotLight );
  spotLight.position.set( 13500, 0, 0);
  moonPivot.add( moon );
  moon.position.set( 384, 0, 0 );
  earth.add( moonPivot );
  earthPivot.add( earth );
  sun.add( earthPivot );
  sun.add( spotLightPivot );

  camera.position.set( 600, 200, 0);
  cameraPivot.add( camera );
  earth.add( cameraPivot );

var lightHelper, shadowHelper;
  controls.update( );
}

var updateScene = function( ) {
    earth.rotation.y += 0.0015;
    moonPivot.rotation.y += 0.001;
    earthPivot.rotation.y += 0.001;
    spotLightPivot.rotation.y = earthPivot.rotation.y;
    cameraPivot.rotation.y += 0.0005;
    controls.update( );
    renderer.render( scene, camera );
}

var animateScene = function ( ) {
    requestAnimationFrame( animateScene );
    updateScene(  );
}

init( );
draw( );
animateScene( );
