var scene, camera;
var controls;
var renderer;
var ambientLight;
var desert, desertGeo, desertMat, desertTexture;
var skySphere, skySphereGeo, skySphereMat, skySphereTexture;
var pyramid, pyramidGeo, pyramidMat, pyramidTexture;
var sandStormGeo, sandStormVertices, sandStormTexture, sandStormSprite, sandStormMaterials = [];


var init = function( ) {

  //Basic setup
  scene = new THREE.Scene( );
  scene.fog = new THREE.FogExp2( 0x221111, 0.0002);
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000000 );
  renderer = new THREE.WebGLRenderer( );


  //Textures
  desertTexture = new THREE.TextureLoader().load('../assets/sand.jpg');
  desertTexture.wrapS = THREE.RepeatWrapping;
  desertTexture.wrapT = THREE.RepeatWrapping;
  desertTexture.repeat.set(100, 100);

  skySphereTexture = new THREE.TextureLoader().load('../assets/sky03.jpg');
  sandStormTexture = new THREE.TextureLoader().load('../assets/sandgrain.png');
  pyramidTexture = new THREE.TextureLoader().load('../assets/pyramid.jpg');
  pyramidBump = new THREE.TextureLoader().load('../assets/pyramidbump.jpg');
Math.random() * 2000 - 1000;
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
    var height = window.innerHeight;color: 0xffffff
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  //Creating objects geometry
  desertGeo = new THREE.PlaneGeometry(12000, 12000, 19, 19);
  for (let i = 0; i < desertGeo.vertices.length; i++) {
      desertGeo.vertices[i].z = Math.random() * 100
  };

  skySphereGeo = new THREE.SphereBufferGeometry( 6000, 32, 32);

  pyramidGeo = new THREE.Geometry();
  pyramidGeo.vertices.push(new THREE.Vector3(0, 0, 0));
  pyramidGeo.vertices.push(new THREE.Vector3(500, 0, 0));
  pyramidGeo.vertices.push(new THREE.Vector3(500, 0, 500));
  pyramidGeo.vertices.push(new THREE.Vector3(0, 0, 500));
  pyramidGeo.vertices.push(new THREE.Vector3(250, 400, 250));
  pyramidGeo.faces.push(new THREE.Face3(0, 2, 3 ));
  pyramidGeo.faces.push(new THREE.Face3(0, 1, 4));
  pyramidGeo.faces.push(new THREE.Face3(1, 2, 4));
  pyramidGeo.faces.push(new THREE.Face3(3, 2, 4));
  pyramidGeo.faces.push(new THREE.Face3(0, 3, 4));


  for ( let i = 0; i < 10; i++ ) {
  pyramidGeo.faceVertexUvs[0].push([
     new THREE.Vector2(0, 0),
     new THREE.Vector2(1, 0),
     new THREE.Vector2(0, 1),
   ]);
  };



  pyramidGeo.normalsNeedUpdate = true;
  pyramidGeo.computeFaceNormals();
  pyramidGeo.computeVertexNormals();
  pyramidGeo.uvsNeedUpdate = true;

  //Sandstorm

  sandStormGeo = new THREE.BufferGeometry();
  sandStormVertices = [];
  sandStormSprite = sandStormTexture;

  for ( let i = 0; i < 50000; i++ ) {
      let x = Math.random() * 6000 - 1000;
      let y = Math.random() * 6000 - 1000;
      let z = Math.random() * 6000 - 1000;
      sandStormVertices.push ( x, y, z );
  }

  sandStormGeo.addAttribute( 'position', new THREE.Float32BufferAttribute( sandStormVertices, 3 ));
  parameters = [
      [[ 1, 0.9, 1 ], sandStormSprite, 20],
  ];

  for ( var i = 0; i < parameters.length; i ++ ) {
        var color = parameters[ i ][ 0 ];
		var sprite = parameters[ i ][ 1 ];
		var size = parameters[ i ][ 2 ];
		sandStormMaterials[ i ] = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } );
		sandStormMaterials[ i ].color.setHSL( color[ 0 ], color[ 1 ], color[ 2 ] );
		sandStorm = new THREE.Points( sandStormGeo, sandStormMaterials[ i ] );
		sandStorm.rotation.x = Math.random() * 6;
		sandStorm.rotation.y = Math.random() * 6;
		sandStorm.rotation.z = Math.random() * 6;
  }

  //Creating objects material
  desertMat = new THREE.MeshStandardMaterial({
      map: desertTexture,
      side: THREE.FrontSide,
  });

  skySphereMat = new THREE.MeshStandardMaterial({
      map: skySphereTexture,
      side: THREE.BackSide,
  });

  pyramidMat = new THREE.MeshStandardMaterial({
     map: pyramidTexture,
     bumpMap: pyramidBump,
     side: THREE.DoubleSide
  });
}


// Drawing scene
var draw = function( ) {color: 0xffffff
    ambientLight = new THREE.AmbientLight( 0xffdddd, 1);

    desert = new THREE.Mesh( desertGeo, desertMat );
    skySphere = new THREE.Mesh( skySphereGeo, skySphereMat );
    pyramid = new THREE.Mesh( pyramidGeo, pyramidMat );
    scene.add( desert );
    scene.add( ambientLight );
    scene.add( skySphere );
    scene.add( pyramid );
    scene.add( sandStorm );
    pyramid.position.set( 0, 0, 50 );
    pyramid.rotation.x = Math.PI / 2;
    pyramid.scale
    camera.position.set( 0, -900, 300 );
    controls.update( );
}

var updateScene = function( ) {

    sandStorm.rotation.y += 2.15;
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
