var scene, camera;
var controls;
var renderer;
var sky, skyGeo, skyMat, skyMaterials = [];
var ground, groundGeo, groundMat;
var ambientLight, directionalLight1, spotLight1, spotLight2;
// var spotLight1Helper, spotLight2Helper;
var skyTexture, groundTexture, houseTexture, houseTexture2, roofTexture, roadTexture;
var bgHouse = [], bgHouseGeo = [], bgHouseMat = [], bgHouseMaterials1 = [], bgHouseMaterials2 = [];
var road = [], roadGeo = [], roadMat = [];
const bgAmount = 15;

var init = function( ) {

  //Basic setup
  scene = new THREE.Scene( );
  scene.fog = new THREE.FogExp2( 0xffffff, 0.0002);
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50000 );
  renderer = new THREE.WebGLRenderer( );

  //Textures
  skyTexture = new THREE.TextureLoader( ).load('../assets/sky03.jpg');

  groundTexture = new THREE.TextureLoader( ).load('../assets/Grass1.jpg');
  groundTexture.wrapS = THREE.RepeatWrapping;
  groundTexture.wrapT = THREE.RepeatWrapping;
  groundTexture.repeat.set( 1280, 1280 );

  houseTexture = new THREE.TextureLoader( ).load('../assets/skyscraper1.jpg');
  houseTexture.wrapS = THREE.RepeatWrapping;
  houseTexture.wrapT = THREE.RepeatWrapping;
  houseTexture.repeat.set( 4, 4 );
  houseTexture.offset.set( 0, 0.27 );

  houseTexture2 = new THREE.TextureLoader( ).load('../assets/skyscraper2.jpeg');
  houseTexture2.wrapS = THREE.RepeatWrapping;
  houseTexture2.wrapT = THREE.RepeatWrapping;

  roofTexture = new THREE.TextureLoader( ).load('../assets/Tiles_Roof.jpg');

  roadTexture = new THREE.TextureLoader( ).load('../assets/road.jpg');
  roadTexture.wrapS = THREE.RepeatWrapping;
  roadTexture.repeat.set(1, 1);


  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild( renderer.domElement );

  //OrbitControls setup
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.autoRotate = true;


  //Scene resizing for a viewport resizing
  window.addEventListener('resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  //Material arrays

    for (i = 0; i < 6; i++) {
      skyMaterials[i] = new THREE.MeshBasicMaterial( {
        map: skyTexture,
        side: THREE.DoubleSide,
      });
    }


    for (i = 0; i < 6; i++) {
      bgHouseMaterials1[i] = new THREE.MeshLambertMaterial({
        map: houseTexture,
        side: THREE.DoubleSide,
      });
      bgHouseMaterials2[i] = new THREE.MeshLambertMaterial({
        map: houseTexture2,
        side: THREE.DoubleSide,
      });
    }
    bgHouseMaterials1[2] = new THREE.MeshLambertMaterial({
      map: roofTexture,
    });
    bgHouseMaterials2[2] = new THREE.MeshLambertMaterial({
      map: roofTexture,
    });







  //Creating objects
  skyGeo = new THREE.BoxBufferGeometry( 10000, 10000, 10000 );
  skyMat = new THREE.MeshFaceMaterial( skyMaterials );

  groundGeo = new THREE.BoxBufferGeometry( 10000, 1, 10000 );
  groundMat = new THREE.MeshLambertMaterial( {
    map: groundTexture,
  } );

  //Houses
  for ( i = 0; i < bgAmount; i++ ) {
    if  ( i % 2 == 0 ) {
      bgHouseGeo[i] = new THREE.BoxBufferGeometry( 200, 800, 200);
      bgHouseMat[i] = new THREE.MeshFaceMaterial( bgHouseMaterials1 )
    } else {
      bgHouseGeo[i] = new THREE.BoxBufferGeometry( 200, 500, 200);
      bgHouseMat[i] = new THREE.MeshFaceMaterial( bgHouseMaterials2 )
    }
  }

  //Roads
  for ( i = 0; i < 28; i++ ) {
    roadGeo[i] = new THREE.BoxBufferGeometry( 180, 1, 5800 );
    roadMat[i] = new THREE.MeshBasicMaterial( {
      map: roadTexture,
    });
  }



}

// Drawing scene
var draw = function( ) {
  //ambientLight = new THREE.AmbientLight( 0xFFFFFF, 1);
  directionalLight1 = new THREE.DirectionalLight( 0xFFFFFF, 0.5, 100 );
  directionalLight1.castShadow = true;
  directionalLight1.shadow.mapSize.width = 512;
  directionalLight1.shadow.mapSize.height = 512;
  directionalLight1.shadow.camera.near = 0.5;
  directionalLight1.shadow.camera.far = 10000;
  scene.add( directionalLight1 );


  spotLight1 = new THREE.SpotLight( 0xffffff, 0.5 );
  spotLight1.castShadow = true;
  spotLight1.shadow.mapSize.width = 1024;
  spotLight1.shadow.mapSize.height = 1024;
  spotLight1.shadow.camera.near = 0.5;
  spotLight1.shadow.camera.far = 10000;
  spotLight1.shadow.camera.fov = 30;
  scene.add( spotLight1 );
  spotLight1.position.set( 0, 4000, 2000);

  spotLight2 = new THREE.SpotLight( 0xffffff, 0.5 );
  spotLight2.castShadow = true;
  spotLight2.shadow.mapSize.width = 1024;
  spotLight2.shadow.mapSize.height = 1024;
  spotLight2.shadow.camera.near = 0.5;
  spotLight2.shadow.camera.far = 10000;
  spotLight2.shadow.camera.fov = 30;
  scene.add( spotLight2 );
  spotLight2.position.set( 0, 4000, -2000);

  // spotLight1Helper = new THREE.SpotLightHelper( spotLight1 );
  // scene.add( spotLight1Helper );

  // spotLight2Helper = new THREE.SpotLightHelper( spotLight2 );
  // scene.add( spotLight2Helper );

  sky = new THREE.Mesh( skyGeo, skyMat );
  scene.add( sky );

  ground = new THREE.Mesh( groundGeo, groundMat );
  ground.receiveShadow = true;
  scene.add( ground );

  for ( j = 0; j < bgAmount; j++ ) {
    for ( i = 0; i < bgAmount; i++ ) {
      bgHouse[i] = new THREE.Mesh( bgHouseGeo[i], bgHouseMat[i] );
      bgHouse[i].castShadow = true;
      bgHouse[i].receiveShadow = true;
      bgHouse[i].position.set( (-3000 + 400 * j), 300, (2800 - 400 * i  ));
      scene.add( bgHouse[i]);

    }
  }

  for ( i = 0; i < 14; i++ ) {
    road[i] = new THREE.Mesh( roadGeo[i], roadMat[i] );
    road[i].position.set( ((-3000 + 400 * i) + 200), 2, 0 );
    scene.add( road[i] );
  }

  for ( i = 14; i < 28; i++ ) {
    road[i] = new THREE.Mesh( roadGeo[i], roadMat[i] );
    road[i].rotation.y = Math.PI / 2;
    road[i].position.set( -200, 2.5, (-8400 + (400 * i) + 200));
    scene.add( road[i] );
  }



  camera.position.set( 2000, 1000, 600);
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
