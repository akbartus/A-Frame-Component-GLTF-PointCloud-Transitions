# A-Frame Component: GLTF based Point Cloud Transitions
<img src="img/screenshot.gif" title="Video screen capture" alt="Video screen capture" height="400">

### **Description / Rationale**
This is an A-Frame component, which demonstrates GLTF based point cloud transitions. It was developed based on <a href="https://medium.com/@mahmed07041/3d-models-transitions-and-mouse-hovering-effects-threejs-664280bd8274">3D Models Transitions and Mouse Hovering Effects — ThreeJS</a> article on Medium.com and Austin Mayer's <a href="https://twitter.com/amayer_/status/1098662776929693706">portfolio project</a>.

### **Instructions**
In order to use the component attach "gltf-transitions" to an entity with "gltf-model" component. The component has the following attributes: 
* <b>pointSize: { type: "float", default: 0.2 }</b> - Size of the point cloud particles.
* <b>pointColor: { type: "color", default: "#ffffff" }</b> - Color of the point cloud particles.
* <b>pointOpacity: { type: "float", default: 1.0 }</b> - Opacity of the point cloud particles.
* <b>pointMovement: { type: "string", default: "none" }</b> - If enabled point cloud particles move randomly in place. Has the following attributes: "none", "slow", "faster" and "fastest". 
* <b>manualAnimation: { type: "boolean", default: false }</b> - If disabled it will be possible to move point cloud particles using mouse scroller. If enabled, it will play point cloud particles animation automatically. 
* <b>pauseTime: { type: "float", default: 5 }</b> - the time each point cloud will remain visible before it transitions to another one. 

The code below shows the sample implementation of the component:
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>A-Frame Component: GLTF Based PointCloud Transitions</title>
  <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
  <script src="js/gltf-transitions-component.js"></script>
</head>
<body>
  <a-scene>
    <a-entity visible="false" opacity="0" gltf-transitions="pointSize: 0.3; pointColor: #ffffff; pointOpacity: 0.5; pointMovement: slow; manualAnimation: false; pauseTime: 3"
      animation__rotate="property: rotation; dur: 30000; from: 0 0 0; to: 0 360 0; loop: true" id="origin"
      position="0 0 0" rotation="0 0 0" gltf-model="models/shoes.glb" scale="0.1 0.1 0.1"></a-entity>
    <a-entity visible="false" class="target" material="transparent: true; opacity: 0.1;"
      animation__rotate="property: rotation; dur: 30000; from: 0 0 0; to: 0 360 0; loop: true" gltf-model="models/horse.glb"
      scale="0.2 0.2 0.2"></a-entity>
      <a-entity visible="false" class="target" material="transparent: true; opacity: 0.1;"
      animation__rotate="property: rotation; dur: 30000; from: 0 0 0; to: 0 360 0; loop: true" gltf-model="models/stork.glb"
      scale="0.4 0.4 0.4"></a-entity>
      <a-entity visible="false" class="target" material="transparent: true; opacity: 0.1;"
      animation__rotate="property: rotation; dur: 30000; from: 0 0 0; to: 0 360 0; loop: true" gltf-model="models/house.glb"
      scale="1 1 1"></a-entity>
    <a-camera position="-20 20 30"></a-camera>
    <a-sky color="#000000"></a-sky>
  </a-scene>
</body>
</html>
```
Clipping plane gets activated after clicking on GTLF/entity. Then use mouse scroller. For touch based devices, first touch the GLTF and then touch and move up or down (drag).

### **Tech Stack**
The project is powered by AFrame and Three.js. The models used in the example were taken from <a href="[https://media.w3.org/2010/05/sintel/](https://github.com/mrdoob/three.js/tree/master/examples/models/gltf)">Three.js library</a>.

### **Demo**
See demo of the component here: [Demo](https://c-plane.glitch.me/)
