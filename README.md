# A-Frame Component: GLTF based Point Cloud Transitions
<img src="img/screenshot.gif" title="Video screen capture" alt="Video screen capture" height="400">

### **Description / Rationale**
This is an A-Frame component, which demonstrates GLTF based point cloud transitions. It was developed based on <a href="https://medium.com/@mahmed07041/3d-models-transitions-and-mouse-hovering-effects-threejs-664280bd8274">3D Models Transitions and Mouse Hovering Effects — ThreeJS</a> article on Medium.com and Austin Mayer's <a href="https://twitter.com/amayer_/status/1098662776929693706">portfolio project</a>.

### **Instructions**
In order to use the component attach "clipping-plane" to an entity. The component has the following attributes: 
* <b>clippingDirection: { type: 'string', default: 'top-to-bottom' }</b> - Direction of the clipping plane or from where it should move. Has the following options: "top-to-bottom" (on Y-axis), "bottom-to-top" (on Y-axis), "front-to-back" (on Z-axis), "back-to-front" (on Z-axis), "left-to-right" (on X-axis), "right-to-left" (on X-axis).  
* <b>materialSide: { type: 'boolean' }</b> - Whether mesh should have double sided material.
* <b>planeConstant: { type: 'float', default: 2.0 }</b> // Original clipping plane location on X or Y or Z axis depending on clipping plane direction. It is from where it starts.
* <b>minScrollValue: { type: 'float', default: -2.0 }</b> - Minimal value beyond which clipping plane will not go. X or Y or Z axis depending on clipping plane direction.
* <b>maxScrollValue: { type: 'float', default: 2.0 }</b> - Maximal value beyond which clipping plane will not go. X or Y or Z axis depending on clipping plane direction.
* <b>mouseScrollSpeed: { type: 'float', default: 0.0005 }</b> - Mouse scrolling speed or delta. 
* <b>touchScrollSpeed: { type: 'float', default: 0.01 }</b> - Touch based scrolling speed or delta.

The code below shows the sample implementation of the component. Please make sure to add 'a-camera' to enable scrolling/touch move events:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <title>A-Frame Component: Clipping Plane</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
    <script src="js/clipping-plane-component.js"></script>
</head>

<body>
    <a-scene>
        <a-entity position="0 1 -2" scale="50 50 50" gltf-model="src: url(models/toyCar.glb);"
            clipping-plane="clippingDirection: top-to-bottom;" class="clickable"></a-entity>
        <a-entity position="2 0.2 -2" scale="1 1 1" gltf-model="src: url(models/sheenChair.glb);"
            clipping-plane="clippingDirection: bottom-to-top;" class="clickable"></a-entity>
        <a-entity id="model" class="clickable" clipping-plane="clippingDirection: left-to-right; materialSide: true;"
            geometry="primitive: box" position="3 1 0" scale="1 1 1"></a-entity>
        <a-entity id="model2" class="clickable" clipping-plane="clippingDirection: right-to-left; materialSide: true;"
            geometry="primitive: box" position="-2 1 0"></a-entity>
        <a-plane position="0 0 -1" rotation="-90 0 0" width="8" height="8" color="#a4b6c9"
            shadow="receive: true"></a-plane>
        <a-camera position="0 2 2.5"></a-camera> <!-- Required for click events -->
        <a-sky color="#dfdfdf"></a-sky>
    </a-scene>
</body>

</html>
```
Clipping plane gets activated after clicking on GTLF/entity. Then use mouse scroller. For touch based devices, first touch the GLTF and then touch and move up or down (drag).

### **Tech Stack**
The project is powered by AFrame and Three.js. The models used in the example were taken from <a href="[https://media.w3.org/2010/05/sintel/](https://github.com/mrdoob/three.js/tree/master/examples/models/gltf)">Three.js library</a>.

### **Demo**
See demo of the component here: [Demo](https://c-plane.glitch.me/)
