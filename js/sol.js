var scene, camera;
var controls;
var renderer;
var sun, sunGeo, sunMat, sunTexture;
var earth, earthGeo, earthMat, earthTexture;
var moon, moonGeo, moonMat, moonTexture;
var ambientLight, pointLight, pointLight2;
var moonPivot, earthPivot, cameraPivot, pointLight2Pivot;


var init = function( ) {

  //Basic setup
  scene = new THREE.Scene( );

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000000 );
  renderer = new THREE.WebGLRenderer( );

  //Textures
  sunTexture = new THREE.TextureLoader().load('../assets/2k_sun.jpg');
  earthTexture = new THREE.TextureLoader().load('../assets/earthmap1k.jpg');
  moonTexture = new THREE.TextureLoader().load('../assets/moon.jpg');


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
  sunGeo = new THREE.SphereBufferGeometry( 695.700, 32, 32 );
  earthGeo = new THREE.SphereBufferGeometry( 63.78, 32, 32 );
  moonGeo = new THREE.SphereBufferGeometry( 17.36, 32, 32 );

  //Creating objects material
  sunMat = new THREE.MeshLambertMaterial({ map: sunTexture});
  earthMat = new THREE.MeshLambertMaterial({ map: earthTexture });
  moonMat = new THREE.MeshLambertMaterial({ map: moonTexture});


}

// Drawing scene
var draw = function( ) {
  ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.1);

  pointLight = new THREE.PointLight( 0xFFFFFF, 1);
  pointLight.add(new THREE.Mesh(sunGeo, new THREE.MeshBasicMaterial({
  map: sunTexture })));
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.shadow.camera.near = 1;
  pointLight.shadow.camera.far = 20000;

  pointLight2 = new THREE.PointLight( 0xFFFFFF, 1);
  pointLight2.castShadow = true;
  pointLight2.shadow.mapSize.width = 1024;
  pointLight2.shadow.mapSize.height = 1024;
  pointLight2.shadow.camera.near = 1;
  pointLight2.shadow.camera.far = 20000;

  sun = new THREE.Mesh( sunGeo, sunMat);
  sun.castShadow = false;
  sun.receiveShadow = false;

  earth = new THREE.Mesh( earthGeo, earthMat );
  earth.castShadow = true;
  earth.receiveShadow = false;

  moon = new THREE.Mesh( moonGeo, moonMat );
  moon.castShadow = true;
  moon.receiveShadow = false;

  moonPivot = new THREE.Object3D();
  earthPivot = new THREE.Object3D();
  cameraPivot = new THREE.Object3D();
  pointLight2Pivot = new THREE.Object3D();

  scene.add( ambientLight );
  scene.add( pointLight );
  scene.add( pointLight2 );
  scene.add( sun );
  scene.add( earth );
  scene.add( moon );
  scene.add( moonPivot );
  scene.add( earthPivot );
  scene.add( cameraPivot );
  scene.add( pointLight2Pivot );
  
  earth.position.set( 14690, 0, 0);
  moonPivot.add( moon );
  moon.position.set( 384, 0, 0 );
  earth.add( moonPivot );
  earthPivot.add( earth );
  sun.add( earthPivot );
  camera.position.set( 600, 200, 0);
  cameraPivot.add( camera );
  earth.add( cameraPivot );
  pointLight2.position.set( 1000, 0, 0 );
  pointLight2Pivot.add( pointLight2 );
  sun.add( pointLight2Pivot );

  controls.update( );
}

var updateScene = function( ) {
    earth.rotation.y += 0.0015;
    moonPivot.rotation.y += 0.001;
    earthPivot.rotation.y += 0.001;
    cameraPivot.rotation.y += 0.0005;
    pointLight2Pivot.rotation.y += 0.001;

    //earth.rotation.x = 0.035;
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
