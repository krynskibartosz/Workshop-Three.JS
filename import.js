
// Clock

let modele, camera, canvas, renderer, scene;

let init = () => {
    
    canvas = document.querySelector('#import');
    renderer = new THREE.WebGLRenderer({canvas, alpha:true});
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    canvas = renderer.domElement;

    // on crée une scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(60, 2, 0.1, 10000);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    // ajout de la lumière
    let light = new THREE.DirectionalLight(0xFFFFFF, 2);
    light.position.set(-1, 2, 4);
    scene.add(light);



// L'importation 3D



    let controls = new THREE.OrbitControls(camera, renderer.domElement)
}

let animate = () => {
    
    // Delta

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

// Fonction de responsivité
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

init();
animate();