function buildicecube() {
  var starsgeometry = new THREE.SphereGeometry( 30000, 32, 32 );
  var starstexture = new THREE.TextureLoader().load( 'images/stars2.jpg' );
  var starsmaterial = new THREE.MeshBasicMaterial( { map: starstexture,opacity: 1.0,transparent: true } );
  var starscube = new THREE.Mesh( starsgeometry, starsmaterial );
  starscube.scale.set(-1, 1, 1);  
  starscube.material.side = THREE.BackSide;
  starscube.position.set(0,0,0);
  explorescene.add( starscube );
  explorescene.background = new THREE.Color( 0xe0e0e0 );

  var groundgeometry = new THREE.BoxGeometry( 1500, 10, 1500 );
  var groundmaterial =  new THREE.MeshPhongMaterial( {color: 0xffffff}  );
  var ground = new THREE.Mesh( groundgeometry, groundmaterial );
  explorescene.add( ground );
  ground.position.set(0,540,0);
  if (vrviewers==2) {
//    ground.rotateX(1.571);
//    ground.rotateY(3.142);
//    ground.rotateX(1.571-0.786);
//    starscube.rotateX(1.571);
  }


  explorescene.add( explorecamera );
  explorecamera.position.set(-2000,1000,0); 
  explorecamera.add( explorecamera3d );
  explorecamera3d.position.set(50,0,0);



  var gridHelper = new THREE.GridHelper( 1500, 15 );
  ground.add( gridHelper );
  gridHelper.position.set(0,12,0);

  var cubegeometry = new THREE.BoxGeometry( 1500, 1080, 1500 );
  var cubematerial =  new THREE.MeshPhongMaterial( {color: 0xffffff}  );
  var cube = new THREE.Mesh( cubegeometry, cubematerial );
  ground.add( cube );
  cube.position.set(0,-540,0);
  cube.material.side = THREE.BackSide;


  var labbuildinggeometry = new THREE.BoxGeometry( 60, 60, 150 );
  var labbuildingmaterial =  new THREE.MeshPhongMaterial( {color: 0x408040}  );
  var labbuilding = new THREE.Mesh( labbuildinggeometry, labbuildingmaterial );
  ground.add( labbuilding );
  labbuilding.position.set(0,30,0);

  var tube1curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3( 0, -30, 0 ), new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 30, 0 ))
  var tube1geometry = new THREE.TubeGeometry(tube1curve, 10, 15, 8, false);
  var tube1material =  new THREE.MeshPhongMaterial( {color: 0xffffff}  );
  var tube1 = new THREE.Mesh( tube1geometry, tube1material );
  ground.add( tube1 );
  tube1.position.set(0,30,140);
  var tube2 = tube1.clone();
  ground.add( tube2 );
  tube2.position.set(0,30,-140);


  var detectorgeometry = new THREE.SphereGeometry(6, 12, 6);
  var sensors = stdata.split('\n');
  for (var i=0;i<sensors.length;i++) {
    var stfields = sensors[i].split(',');
    var detectormaterial = new THREE.MeshPhongMaterial( { color: 0x000000} );
//    if ((i % 60)==0) detectormaterial = new THREE.MeshPhongMaterial( { color: 0xffffff} );
    var sensor = new THREE.Mesh( detectorgeometry, detectormaterial );
    sensor.name = 's'+i;
    sensor.position.set(parseFloat(stfields[2]),parseFloat(stfields[3])-570,parseFloat(stfields[1]));
    ground.add(sensor);
    sensorarray.push(sensor);
    sensorlocation.push(parseFloat(stfields[2]).toFixed(0)+'/'+(parseFloat(stfields[3]).toFixed(0)-570)+'/'+parseFloat(stfields[1]).toFixed(0));
  }
  for (var i=0;i<sensorarray.length;i++) {
	var isedge = false;
	if ((i % 60)==0) isedge = true;
	if ((i % 60)==59) isedge = true;
	if ((i>0) && (i<60*7)) isedge = true;
	if ((i>60*12) && (i<60*14)) isedge = true;
	if ((i>60*20) && (i<60*22)) isedge = true;
	if ((i>60*29) && (i<60*31)) isedge = true;
	if ((i>60*39) && (i<60*41)) isedge = true;
	if ((i>60*49) && (i<60*51)) isedge = true;
	if ((i>60*58) && (i<60*60)) isedge = true;
	if ((i>60*66) && (i<60*68)) isedge = true;
	if ((i>60*72) && (i<60*78)) isedge = true;
	sensoronedge.push(isedge);
  }
  icecubedropdown('1');
}
