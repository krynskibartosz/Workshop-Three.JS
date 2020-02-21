# Workshop-Three.js

## Lien du site :
## https://bartoszkrynski.000webhostapp.com/

Les technologies utilisée sont:
 - HTML5
 - CSS 3D
 - SASS
 - Vanilla JavaScript
 - THREE.JS

Une amélioration du site aura lieu(responsivité, internavigation, more Animation, etc..)
Vous pourrez suivre l'évolution du site sur ce GitHub

Bienvenue dans notre workshop sur Three.js présenter par Issam Boumarouanne et Krynski Bartosz. On essayera de vous apprendre a :

+ Créer une geometrie dans le navigateur et pouvoir l'animer.

+ Implémenter des modeles 3D à partir de sketchfab

+ Implémenter un effet hover dans un site.

+ Utilisation CSS3D.

+ Utliser l'AR.

Ici nous allons détailler les étapes de chaque atelier pour que vous puissier suivre et pouvoir checker si le code corespond.


Présentation générale
========================

Three.js
--------

Three.js est une bibliothèque javascript qui permet la gestion de la 3D dans un navigateur web, elle permet de créer des rendus en WebGL, CSS2D , CSS3D, et SVG.  
Bien Sûr, utiliser WebGL sera plus efficace puisqu’il utilise l’accélération matérielle de la carte graphique.

Il a été publié pour la première fois par Ricardo Cabello sous le surnom de Mr.doob sur github en 2010, et maintenant nous en sommes à la version 113.

WebGL
--------

Webgl est baser OpenGl et javascript

C'est un langage de très bas niveau, il est très puissant mais mega compliquer à apprendre

Webgl ne fonctionne que grace à deux choses:
l'espace de projection (l'endroit ou la camera regarde)
les couleurs
Et c'est avec ses 2 données là qu'on fait tout en webGL

Et pour ses 2 on utilise les shaders.
C'est quoi les shaders? bah c un truc bcp trop complexe donc j'aurai du mal à vous expliquer précisement ce que c'est mais en gros
sa pixelise tout ce que voit la caméra et sa qui nous permet de faire de la 3D.
D'ailleurs c tellement complexe qu'il utilise un logiciel pour la simplicté

Donc en gros
WebGL n'est qu'une API de Rastéraisation dans des termes plus simple(pixelisation)
Du coup pour pouvoir faire de la 3d il faut des connaissance énorme en mathématique 3D

Je vais vous donner un aperçu de ce qu'il faut connaitre en webgl pour pouvoir faire de la 3d

Vous devez connaître les mathématiques matricielles, les coordonnées normalisées, les troncs, les produits croisés, les produits scalaires, l'interpolation variable, les calculs spéculaires d'éclairage et toutes sortes d'autres choses qui prennent souvent des mois ou des années à comprendre pleinement.

C'est pour sa qu'on utilise des bibliothèque 3D, car pour faire de la 3d dans le web bah tout les calculs complexe devrait etre effectuer pour nous, dans la mesure ou l'on devrait ne "devoir" passer que des paramètres pour gerer la matière, lumière, etc.. et que la bibliothèque s'occupe de dessiner le reste pour nous. P/ainsi pouvoir réellement se focaliser sur la 3d dans le web si non ça prendrait trop de temps

Biensur WebGL possède des fonctionnalitésqui vous aident à implémenter la 3D. Mais WebGl n'est qu'une bibliothèque de mathématique, Vous devez lui fournir des coordonnées qui représentent ce que vous voulez dessiner.

WebGl est une API JavaScript intégrée dans le navigateur web qui exploite la puissance de GPUSs 

Utiliser pour faire 
	de la visualisation de données,
	jeux,
	animation
	et meme du machine learning

	Un gros effort pour qu’ils soient accessible sur tout les navigateurs
	C'est juste une amélioration de webgl

Les avantages de webgpu comparer a webgl

Meilleure perfomance du cpu

Accès fonctionnel au calcul GPU

Mappe mieux au matériel

Très bon avec les process en paralax


Installation
--------

Vous pouvez cloner le code source et chercher les fichier dont vous avez besoins [github](https://github.com/mrdoob/three.js/),
à la base vous aurez besoin du fichier "three.min.js" et le charger dans votre HTML via un script pour pouvoir commencer votre projet.

Création d'un cube
========================
Vous pouvez commencer par ouvrir le fichier cube.html et à inclure dans le body une balise canvas contenant un id, puis charger le fichier "three.min.js" comme ci-dessous, voila à partir de maintenant vous pouvez commencer à coder en three.js.
```
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="cube.css">
    <title>Three.js</title>
</head>
<body>

    <canvas id="c"></canvas>

    <script src="three.min.js"></script>
    <script src="cube.js"></script>
</body>
</html>
```
Vous pouvez déclarer les variables dont on aura besoin dans notre projet. Ensuite on déclare une fonction init qui contiendra tous les elements à configurer pour afficher le rendu.

Premièrement on met dans une variable l'id du canvas, deuxiemement on configure le moteur de rendu dans la variable renderer.

```
// Variables
let scene, camera, renderer, material, geometry, mesh;

// ! initialisation
const init = () => {

    let canvas = document.querySelector('#c');

    // Configuration renderer
    renderer = new THREE.WebGLRenderer({canvas, antialias : true});
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvas = renderer.domElement;
}
```
Maintenant on va configurer la scene et la camera, toujours dans la fonction init.

```
    // Configuration Scene
    scene = new THREE.Scene();
    
    // Configuration camera
    let fov = 60;
    let aspect = 2;
    let near = 0.1;
    let far = 2000;
    camera = new THREE.PerspectiveCamera(fov,aspect, near, far);
    camera.position.set(0, 1, 20);  // (x, y, z)
    camera.lookAt(0, 0, 0);
}
```
Ensuite on construit notre objet tridimensionel mais il a besoin de deux parametres, une geometrie et une matiere. Puis on peut le rajouter à la scene. Enfin on ajoute la scene (contenant notre cube) et la camera dans le moteur de rendu qui va l'afficher dans le navigateur.

```
    // Configuration material
    material = new THREE.MeshNormalMaterial();
    
    //Configuration geometry 
    geometry = new THREE.BoxGeometry(6, 6, 6);

    // Configuration mesh et ajout dans la scene
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer.render(scene, camera);
}
init();
```

Mais nous ne le voyons pas en 3D donc on va l'animer. On créer un fonction animate contenant une boucle d'animation grace à `requestAnimationFrame` ensuite on prend notre objet et on le fait tourner sur son axe x, puis on supprime le code `renderer.render(scene, camera);` de la fonction init et on le rajoute dans la fonction animate. Voila votre cube devrais bouger. 

```
// ! Animation
const animate = () => {
    
    mesh.rotation.x += 0.2;
    
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
init();
animate();
```
Maintenant on va changer la matiere dans la fonction init.

```
// Configuration material
    material = new THREE.MeshPhongMaterial({color:0x098765});
```
Mais l'objet n'est plus visible ducoup vous devez rajouter des lumières comme ceci.(fonction init)

```
    //  Configuration de la lumière
    let lightTop = new THREE.DirectionalLight(0xFFFFFF, 1);
    lightTop.position.set(0, 10, 0);
    scene.add(lightTop);

    let lightBottom = new THREE.DirectionalLight(0xFFFFFF, 1);
    lightBottom.position.set(0, -10, 0);
    scene.add(lightBottom);
}
```
On va ajouter un controleur qui nous permettera de controler la camera et donc de pouvoir se balader dans la scene.(fonction init)

```
    // Configuration du controleur
    let control = new THREE.OrbitControls(camera, renderer.domElement);
}
```
Ensuite charger le fichier OrbitControls dans votre cube.html
```
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="cube.css">
    <title>Three.js</title>
</head>
<body>

    <canvas id="c"></canvas>

    <script src="three.min.js"></script>
    <script src="OrbitControls.js"></script>
    <script src="cube.js"></script>
</body>
</html>
```

Voici le code de cube.js au complet.

```
// Variables
let scene, camera, renderer, material, geometry, mesh;

// ! initialisation
const init = () => {

    let canvas = document.querySelector('#c');

    // Configuration renderer
    renderer = new THREE.WebGLRenderer({canvas, antialias : true});
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvas = renderer.domElement;

    // Configuration Scene
    scene = new THREE.Scene();
    
    // Configuration camera
    let fov = 60;
    let aspect = 2;
    let near = 0.1;
    let far = 2000;
    camera = new THREE.PerspectiveCamera(fov,aspect, near, far);
    camera.position.set(0, 1, 20);  // (x, y, z)
    camera.lookAt(0, 0, 0);

    // Configuration material
    material = new THREE.MeshPhongMaterial({color:0x098765});
    
    //Configuration geometry 
    geometry = new THREE.BoxGeometry(6, 6, 6);

    // Configuration mesh et ajout dans la scene
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //  Configuration de la lumière
    let lightTop = new THREE.DirectionalLight(0xFFFFFF, 1);
    lightTop.position.set(0, 10, 0);
    scene.add(lightTop);

    let lightBottom = new THREE.DirectionalLight(0xFFFFFF, 1);
    lightBottom.position.set(0, -10, 0);
    scene.add(lightBottom);

    // Configuration du controleur
    let control = new THREE.OrbitControls(camera, renderer.domElement);
}


// ! Animation
const animate = () => {
    
    mesh.rotation.x += 0.2;
    
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();
animate();
```
Importation d'un modele 3D
========================

On declare une variable contenant la méthode `Clock();`

```
let clock = new THREE.Clock();
```
On ajoute la fonction qui permet l'importation et l'animation de modele 3D dans le format GLTF.(fonction init)

```
    //  Ajout de l'import 3D
    let loader = new THREE.GLTFLoader();
    loader.load('fire_dragon/scene.gltf', function(object){
        modele = new THREE.AnimationMixer( object.scene );

        let action = modele.clipAction( object.animations[ 0 ] );
        action.play();
        object.scene.position.set(0,0,0)
        scene.add( object.scene );
    });
}
```
On déclare une variable delta qui contient le temps d'animation et on met une condition qui permet de lancer l'animation sur le modele 3D.(fonction animate)

```
    let delta = clock.getDelta()
    if ( modele ) modele.update( delta );
```
Après la fonction animate on rajoute une fonction qui permet au modèle 3D d'etre responsive.

```
// Fonction de responsivité
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);
```
Voici le code final du fichier import.js.

```
let clock = new THREE.Clock();

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
    //      ajout de l'import 3D
    let loader = new THREE.GLTFLoader();
    loader.load('fire_dragon/scene.gltf', function(object){
        modele = new THREE.AnimationMixer( object.scene );
    
        let action = modele.clipAction( object.animations[ 0 ] );
        action.play();
        object.scene.position.set(0,0,0)
        scene.add( object.scene );
    });



    let controls = new THREE.OrbitControls(camera, renderer.domElement)
}

let animate = () => {

    let delta = clock.getDelta()
    if ( modele ) modele.update( delta );

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
```

Exercice sur hover-effect animation:
Dans le fichier "distortion.html"
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./assets/css/style.css">
    <title>Document</title>
</head>
<body>
    
    <section class="first">
        <header class="header">
            <nav>
                <div class="logoContainer">
                    <span class="logo">ThreeLuminaty - Exercice Distiortion</span>
                </div>
                <div class="ulContainer">
                    <ul id="navigation">
                        <li id="link">Home</li>
                        <li id="link">About</li>
                        <li id="link">Shop</li>
                        <li id="link">Contact</li>
                    </ul>
                </div>
            </nav>
        </header>
        <h1>Distortion Effect</h1>
        <div class="wrapper"></div>
    </section>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"></script>
    <script src="./assetss/js/three.min.js"></script>
    <script src="./assetss/js/distortionEffect.js"></script>





                            <!--! EXERCICE HOVERDISTORTION-->

    <!--TODO 1) récuperer la class wrapper et l'assigner à la clefs "parents"
    <!--TODO 2) Déinir l'intensiter de l'animation et l'assigner à la clefs "intensity"
    <!--TODO 3) Mettre le chemin des 2 images dans les clefs "image1 & image2"
    <!--TODO 4) mettre le chemin de la 3e image qui va faire l'effet de distortion dans la clefs "displacementImage" -->

                            <!-- Les images sont dans le dossier assets>img-->

    <script>
        var hoverDistort = new hoverEffect({
        parent: ,
        intensity: ,
        image1: '',
        image2: '',
        displacementImage: ''
        });
    </script>



</body>
</html>
```




