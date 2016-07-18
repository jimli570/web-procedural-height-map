document.addEventListener("DOMContentLoaded", function () {

  var g_container = undefined;
  var g_renderer = undefined;
  var g_camera = undefined;
  var g_scene = undefined;
  var g_controls = undefined;

  var g_time = undefined;

  initScene('VisContainer');

  /* Objects  */
  var g_fullscreenQuad = { geo: undefined, mat: undefined, obj: undefined };
  initShader();

  /* Movement */
  g_controls = new THREE.OrbitControls(g_camera, g_renderer.domElement);

  window.addEventListener('resize', () => {
    var width = g_container.offsetWidth;
    var height = g_container.offsetHeight;

    g_camera.aspect = width / height;
    g_camera.updateProjectionMatrix();

    g_renderer.setSize(width, height);
  });

  function initScene(canvasDiv) {
    g_container = document.getElementById(canvasDiv);

    var width = g_container.offsetWidth;
    var height = g_container.offsetHeight;

    g_renderer = new THREE.WebGLRenderer({
      antialias: true, alpha: true, preserveDrawingBuffer: false
    });
    g_renderer.setClearColor(0x000000, 0); // the default
    g_renderer.setSize(width, height) //< Start the renderer
    g_renderer.gammaInput = true;
    g_renderer.gammaOutput = true;
    g_renderer.shadowMap.enabled = true;
    g_renderer.shadowMap.cullFace = THREE.CullFaceBack;

    // PerspectiveCamera(fov, aspect, near, far)
    g_camera = new THREE.PerspectiveCamera(65, width / height, 0.01, 10.0)

    g_camera.position.set(0, 0, -1.8);
    g_camera.lookAt(new THREE.Vector3(0, 0, 0))

    g_scene = new THREE.Scene()

    g_container.append(g_renderer.domElement)
  }


  function initShader() {
    var segmentsX = 150.0;
    var segmentsY = 150.0;

    var uniforms = {
      time: { type: 'i', value: g_time },
      maxHeight: { type: 'f', value: inputValues.Height },
      width: { type: 'f', value: g_container.offsetWidth },
      height: { type: 'f', value: g_container.offsetHeight },
      xSeg: { type: 'f', value: segmentsX },
      ySeg: { type: 'f', value: segmentsY },
      rainbow: {
        type: "fv", value: [
          0.0, 0.0, 1.0,
          0.0, 1.0, 1.0,
          0.0, 1.0, 0.0,
          1.0, 1.0, 0.0,
          1.0, 0.0, 0.0]
      },

      freqX: { type: 'f', value: inputValues.Frequency },
      freqY: { type: 'f', value: inputValues.Frequency },
      posX: { type: 'f', value: inputValues.PosX },
      posY: { type: 'f', value: inputValues.PosY },
      octaves: { type: 'i', value: inputValues.octaves },
    };

    var vertexShader = document.getElementById('vsMap').textContent;
    var fragmentShader = document.getElementById('fsMap').textContent;

    g_fullscreenQuad.geo = new THREE.PlaneGeometry(2, 2, segmentsX, segmentsY);
    g_fullscreenQuad.mat = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: uniforms,
      wireframe: false,
      side: THREE.DoubleSide
    });

    g_fullscreenQuad.obj = new THREE.Mesh(g_fullscreenQuad.geo, g_fullscreenQuad.mat);
    g_scene.add(g_fullscreenQuad.obj);
  }

  function visLoop() {
    requestAnimationFrame(visLoop)
    animationLoop();
  }

  function animationLoop() {
    var d = new Date();
    g_time = d.getTime();
    g_fullscreenQuad.mat.uniforms.time.value = g_time;
    g_fullscreenQuad.mat.uniforms.freqX.value = inputValues.Frequency;
    g_fullscreenQuad.mat.uniforms.freqY.value = inputValues.Frequency;
    g_fullscreenQuad.mat.uniforms.posX.value = inputValues.PositionX;
    g_fullscreenQuad.mat.uniforms.posY.value = inputValues.PositionY;
    g_fullscreenQuad.mat.uniforms.octaves.value = inputValues.Octaves;
    g_fullscreenQuad.mat.uniforms.maxHeight.value = inputValues.Crumple;
    g_controls.update();

    g_renderer.render(g_scene, g_camera)
  }

  window.addEventListener('load', (event) => {
    visLoop();
  });

});
