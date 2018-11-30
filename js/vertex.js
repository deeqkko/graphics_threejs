var scene, camera;
var controls;
var renderer;
var planeGeo, planeMaterial, planeTexture, plane;
var ambientLight;




var init = function( ) {

  //Basic setup
  scene = new THREE.Scene( );
  scene.fog = new THREE.FogExp2( 0xffffff, 0.0002);
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50000 );
  renderer = new THREE.WebGLRenderer( );

  //Textures


  planeTexture = new THREE.TextureLoader( ).load('../assets/Grass1.jpg');



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
  planeGeo = new THREE.PlaneGeometry(600, 600, 99, 99);

  //Creating objects material
  planeMaterial = new THREE.MeshPhongMaterial({
    map: planeTexture,
    wireframe: true,
  });




}

// Drawing scene
var draw = function( ) {
  ambientLight = new THREE.AmbientLight( 0xFFFFFF, 1);
  camera.position.set( 0, -100, 100);

  for (let i = 0; i < planeGeo.vertices.length; i++){
    planeGeo.vertices[i].z = 10 * Math.sin((i%100)/10);
  }


  plane = new THREE.Mesh(planeGeo, planeMaterial);


  scene.add(plane);
  scene.add(ambientLight);
  controls.update( );
}

var updateScene = function( ) {



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
