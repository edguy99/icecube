function buildlab() {
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
}
