// sphere.js — Three.js animated particle sphere
function initSphere() {
  var canvas = document.getElementById('sphere-canvas');
  if (!canvas || typeof THREE === 'undefined') return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var W = canvas.clientWidth  || 500;
  var H = canvas.clientHeight || 500;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);

  var scene  = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
  camera.position.z = 3.2;

  // ── Particle cloud (Fibonacci sphere distribution) ──────────────
  var N   = window.innerWidth < 768 ? 700 : 1800;
  var geo = new THREE.BufferGeometry();
  var pos = new Float32Array(N * 3);
  var col = new Float32Array(N * 3);

  var PAL = [
    new THREE.Color('#00d4ff'),
    new THREE.Color('#7c5cfc'),
    new THREE.Color('#36f5c0'),
    new THREE.Color('#ff6b6b')
  ];

  for (var i = 0; i < N; i++) {
    var phi   = Math.acos(1 - 2 * (i + 0.5) / N);
    var theta = Math.PI * (1 + Math.sqrt(5)) * i;
    var r     = 1.6;
    pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i*3+2] = r * Math.cos(phi);
    var c = PAL[i % 4];
    col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));

  var ptsMat = new THREE.PointsMaterial({
    size: 0.028,
    vertexColors: true,
    transparent: true,
    opacity: 0.85
  });
  var pts = new THREE.Points(geo, ptsMat);
  scene.add(pts);

  // ── Wireframe shells ────────────────────────────────────────────
  var icoMesh = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.35, 1),
    new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.11 })
  );
  var octMesh = new THREE.Mesh(
    new THREE.OctahedronGeometry(1.0, 0),
    new THREE.MeshBasicMaterial({ color: 0x7c5cfc, wireframe: true, transparent: true, opacity: 0.17 })
  );
  scene.add(icoMesh);
  scene.add(octMesh);

  // ── Mouse tracking ──────────────────────────────────────────────
  var targetX = 0, targetY = 0;
  document.addEventListener('mousemove', function(e) {
    targetX = (e.clientX / window.innerWidth  - 0.5) * 1.2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 1.2;
  });

  // ── Resize ──────────────────────────────────────────────────────
  // ── Touch tracking
  canvas.addEventListener('touchmove', function (e) {
    if (e.touches.length) {
      targetX = (e.touches[0].clientX / window.innerWidth  - 0.5) * 1.2;
      targetY = (e.touches[0].clientY / window.innerHeight - 0.5) * 1.2;
    }
  }, { passive: true });
  canvas.addEventListener('touchend', function () { targetX = 0; targetY = 0; });

  window.addEventListener('resize', function() {
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // ── Render loop ─────────────────────────────────────────────────
  var t = 0;
  var animReqId = null;
  function animate() {
    animReqId = requestAnimationFrame(animate);
    t += 0.005;
    pts.rotation.y += (targetX * 0.06 - pts.rotation.y) * 0.04;
    pts.rotation.x += (-targetY * 0.06 - pts.rotation.x) * 0.04;
    pts.rotation.z  = Math.sin(t * 0.3) * 0.07;
    icoMesh.rotation.y = t * 0.28;
    icoMesh.rotation.x = t * 0.14;
    octMesh.rotation.y = -t * 0.38;
    octMesh.rotation.x =  t * 0.19;
    renderer.render(scene, camera);
  }
  animReqId = requestAnimationFrame(animate);

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (animReqId) { cancelAnimationFrame(animReqId); animReqId = null; }
    } else {
      if (!animReqId) animReqId = requestAnimationFrame(animate);
    }
  });
}
