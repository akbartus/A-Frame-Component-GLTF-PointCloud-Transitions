let scene;
let pointCloud;
AFRAME.registerComponent("gltf-transitions", {
  schema: {
    pointSize: { type: "float", default: 0.2 }, // size of the pointCloud
    pointColor: { type: "color", default: "#ffffff" }, // min position on y axis
    pointOpacity: { type: "float", default: 1.0 }, // max position on y axis
    pointMovement: { type: "string", default: "none" },
    manualAnimation: { type: "boolean", default: false },
    pauseTime: { type: "float", default: 5 },
  },
  init: function () {
    scene = document.querySelector("a-scene").object3D;
    let originModel = document.querySelector("#origin");
    let targetModel = document.querySelectorAll(".target");
    let scrollStartTime = 0;
    let targetGeometryArray = [];
    let targetPositionsArray = [];
    let isAnimating = false;
    let direction = 1; // Animation direction, from 0 to ...
    let animationStart = 0; // Animation loop start time. If 0 starts from very beginning
    let animationEnd = targetModel.length;

    let pSize = this.data.pointSize;
    let pColor = this.data.pointColor;
    let pOpacity = this.data.pointOpacity;
    pMovement = this.data.pointMovement;
    let pTime = this.data.pauseTime;
    if (originModel.getAttribute("gltf-model")) {
      originModel.addEventListener("model-loaded", (e) => {
        const object = e.detail.model;
        object.traverse(function (child) {
          if (child.isMesh) {
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute(
              "position",
              new THREE.BufferAttribute(
                new Float32Array(child.geometry.attributes.position.array),
                3
              )
            );
            geometry.computeBoundingSphere();
            // Scale the initial positions
            const scale = originModel.object3D.scale.x;
            const initialPositions = geometry.attributes.position.array;
            for (let i = 0; i < initialPositions.length; i++) {
              initialPositions[i] *= scale;
            }
            geometry.setAttribute(
              "initialPosition",
              geometry.attributes.position.clone()
            ); // Store initial positions

            const material = new THREE.PointsMaterial({
              size: pSize,
              color: pColor,
              transparent: true,
              opacity: pOpacity,
            });
            pointCloud = new THREE.Points(geometry, material);

            pointCloud.position.set(
              originModel.object3D.position.x,
              originModel.object3D.position.y,
              originModel.object3D.position.z
            );
            pointCloud.rotation.set(
              originModel.object3D.rotation.x,
              originModel.object3D.rotation.y,
              originModel.object3D.rotation.z
            );

            scene.add(pointCloud);
          }
        });
      });
    }

    for (let j = 0; j < targetModel.length; j++) {
      if (targetModel[j].getAttribute("gltf-model")) {
        targetModel[j].addEventListener("model-loaded", (e) => {
          e.detail.model.traverse(function (child) {
            if (child.isMesh) {
              targetGeometryArray[j] = new THREE.BufferGeometry();
              targetGeometryArray[j].setAttribute(
                "position",
                new THREE.BufferAttribute(
                  new Float32Array(child.geometry.attributes.position.array),
                  3
                )
              );
              // Scale the target2 positions
              const scale = targetModel[j].object3D.scale.x;
              targetPositionsArray[j] =
                targetGeometryArray[j].attributes.position.array;
              for (let i = 0; i < targetPositionsArray[j].length; i++) {
                targetPositionsArray[j][i] *= scale;
              }
              pointCloud.geometry.setAttribute(
                "targetPosition" + [j],
                targetGeometryArray[j].attributes.position.clone()
              );
            }
          });
        });
      }
    }

    if (this.data.manualAnimation) {
      // Mouse Wheel based Animaton
      document.addEventListener("wheel", onMouseWheel);
    } else {
      // Automatic Animation
      setTimeout(() => {
        animateIt();
      }, 2000);
    }
    // Mouse Wheel Function
    function onMouseWheel(event) {
      scrollStartTime += event.deltaY * 0.0003;
      scrollStartTime = Math.max(0, Math.min(3, scrollStartTime));
      if (pointCloud) {
        const positions = pointCloud.geometry.attributes.position.array;
        const initialPositions =
          pointCloud.geometry.attributes.initialPosition.array;
        const numTargets = targetPositionsArray.length;
        const targetPositions = [initialPositions, ...targetPositionsArray];
        // Update scrollStartTime
        scrollStartTime += 0.01 * 1;
        scrollStartTime = Math.max(
          0,
          Math.min(targetModel.length, scrollStartTime)
        );
        // Interpolate between positions based on scrollStartTime
        for (let i = 0; i < positions.length; i++) {
          let currentTargetIndex = Math.floor(scrollStartTime);
          let nextTargetIndex = Math.min(currentTargetIndex + 1, numTargets);
          let currentTarget = targetPositions[currentTargetIndex];
          let nextTarget = targetPositions[nextTargetIndex];
          let interpolationFactor = scrollStartTime - currentTargetIndex;
          positions[i] =
            currentTarget[i] +
            (nextTarget[i] - currentTarget[i]) * interpolationFactor;
        }
        pointCloud.geometry.attributes.position.needsUpdate = true;
      }
    }
    // Animation Function
    function animateIt() {
      if (!isAnimating) {
        isAnimating = true;
        animate();
      }
    }
    function animate() {
      if (pointCloud) {
        const positions = pointCloud.geometry.attributes.position.array;
        const initialPositions =
          pointCloud.geometry.attributes.initialPosition.array;
        const numTargets = targetPositionsArray.length;
        const targetPositions = [initialPositions, ...targetPositionsArray];
        // Update scrollStartTime
        scrollStartTime += 0.01 * direction;
        if (
          scrollStartTime >= animationEnd ||
          scrollStartTime <= animationStart
        ) {
          direction = -direction;
        }
        scrollStartTime = Math.max(
          animationStart,
          Math.min(animationEnd, scrollStartTime)
        );
        // Interpolate between positions based on scrollStartTime
        for (let i = 0; i < positions.length; i++) {
          let currentTargetIndex = Math.floor(scrollStartTime);
          let nextTargetIndex = Math.min(currentTargetIndex + 1, numTargets);
          let currentTarget = targetPositions[currentTargetIndex];
          let nextTarget = targetPositions[nextTargetIndex];
          let interpolationFactor = scrollStartTime - currentTargetIndex;
          positions[i] =
            currentTarget[i] +
            (nextTarget[i] - currentTarget[i]) * interpolationFactor;
        }
        console.log();
        pointCloud.geometry.attributes.position.needsUpdate = true;

        if (
          scrollStartTime.toFixed(3) == animationStart ||
          scrollStartTime.toFixed(3) == animationEnd ||
          scrollStartTime.toFixed(3) == 1.0 ||
          scrollStartTime.toFixed(3) == 2.0 ||
          scrollStartTime.toFixed(3) == 3.0 ||
          scrollStartTime.toFixed(3) == 4.0 ||
          scrollStartTime.toFixed(3) == 5.0 ||
          scrollStartTime.toFixed(3) == 6.0 ||
          scrollStartTime.toFixed(3) == 7.0 ||
          scrollStartTime.toFixed(3) == 8.0
        ) {
          isAnimating = false;
          setTimeout(() => {
            isAnimating = true;
            animate();
          }, pTime * 1000);
        } else if (isAnimating) {
          requestAnimationFrame(animate);
        }
      }
    }
    this.tick = function () {
      let originModel = document.querySelector("#origin");
      if (pointCloud && originModel) {
        const positions = pointCloud.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          // Randomly move each particle
          if (pMovement == "none") {
            
          } else if (pMovement == "slow") {
            positions[i] += Math.random() * 0.04 - 0.02; // 0.08 - 0.4 = 0.04
            positions[i + 1] += Math.random() * 0.04 - 0.02;
            positions[i + 2] += Math.random() * 0.04 - 0.02;
          } else if (pMovement == "faster") {
            positions[i] += Math.random() * 0.1 - 0.05; // 0.08 - 0.4 = 0.04
            positions[i + 1] += Math.random() * 0.1 - 0.05;
            positions[i + 2] += Math.random() * 0.1 - 0.05;
          } else if (pMovement == "fastest") {
            positions[i] += Math.random() * 0.4 - 0.2; // 0.08 - 0.4 = 0.04
            positions[i + 1] += Math.random() * 0.4 - 0.2;
            positions[i + 2] += Math.random() * 0.4 - 0.2;
          }
        }
        pointCloud.geometry.attributes.position.needsUpdate = true;
        pointCloud.rotation.set(
          originModel.object3D.rotation.x,
          originModel.object3D.rotation.y,
          originModel.object3D.rotation.z
        );
      }
    };
  },
});
