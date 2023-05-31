// Importação da biblioteca
import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js";

// funções basicas para toda cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xB0C4DE, 1);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
const controlador = new OrbitControls(camera, renderer.domElement);
var loader = new THREE.TextureLoader();

let cubo, esfera, cilindro, plano, cone, bola;

function CriarBola(cor, raio, segLargura, segAltura) {
	var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura)
	var material = new THREE.MeshBasicMaterial(
		{ map: loader.load('data:image/png;base64,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') })

	bola = new THREE.Mesh(geometria, material); 
	scene.add(bola);
  

	bola.position.x = 6;

}

// cubo
function CriarCubo(cor, largura, altura, profundidade) {
	var geometria = new THREE.BoxGeometry(largura, altura, profundidade);
	var material = new THREE.MeshBasicMaterial({ map: loader.load('https://lh3.googleusercontent.com/T0oOA8YxcckPkQayuFVrwYrH61CIhtUT8yUn5aNzOxiDiAQ1I7T9JwC2zFhUoN2pdsgPU0ySkpiJhyhR_z51buPGcaC0faQeLHI') });
	material.flatShading = true;

	cubo = new THREE.Mesh(geometria, material); scene.add(cubo);
	cubo.position.x = 0;
}

function CriarCilindro(cor, raioCima, raioBaixo, altura) {
	var geometria = new THREE.CylinderGeometry(raioCima, raioBaixo, altura, 20);
	var material = new THREE.MeshBasicMaterial({ color: cor })

	cilindro = new THREE.Mesh(geometria, material); scene.add(cilindro);
	cilindro.position.x = 3;
}

function CriarEsfera(cor, raio, qtdSegLargura, qtdSegAltura) {
	var geometria = new THREE.SphereGeometry(raio, qtdSegAltura, qtdSegAltura)
	var material = new THREE.MeshBasicMaterial({ map: loader.load('https://lh3.googleusercontent.com/T0oOA8YxcckPkQayuFVrwYrH61CIhtUT8yUn5aNzOxiDiAQ1I7T9JwC2zFhUoN2pdsgPU0ySkpiJhyhR_z51buPGcaC0faQeLHI') })
	esfera = new THREE.Mesh(geometria, material); 
	scene.add(esfera);
	esfera.position.x = 6;
}

function CriarCone(cor, raio, altura, qtdDetalhes) {
	var geometria = new THREE.ConeGeometry(raio, altura, qtdDetalhes);
	var material = new THREE.MeshBasicMaterial({ color: cor });

	cone = new THREE.Mesh(geometria, material); scene.add(cone);
	cone.position.x = -2;
}

function CriarPlano(cor, altura, largura) {
	var geometria = new THREE.PlaneGeometry(altura, largura);
	var material = new THREE.MeshBasicMaterial({ color: cor });

	plano = new THREE.Mesh(geometria, material); scene.add(plano);
	plano.position.x = -5;
}


CriarCubo(1, 1, 1)
CriarCilindro(new THREE.Color(0x1E90FF), 1, 1, 2);
CriarEsfera(new THREE.Color(0xffab15), 1, 16, 16);
CriarCone(new THREE.Color(0xFF007F), 1, 2, 30);
CriarPlano(new THREE.Color(0x6A5ACD), 1, 2);

CriarBola(new THREE.Color(0xffab15), 1, 16, 16);

camera.position.z = 10;
const clock = new THREE.Clock();

function animate() {
	requestAnimationFrame(animate);

	const elapsedTime = clock.getElapsedTime()

	cubo.rotateZ(0.004);
	
	bola.position.x = Math.cos(elapsedTime) * 5;
	bola.position.y = Math.sin(elapsedTime) * 5;
	bola.rotation.x -= 0.01;

	plano.rotation.x += 0.01;
	plano.rotation.y -= 0.01;

	cone.rotation.z += 0.01;
	cone.rotation.y += 0.01;

	cilindro.rotation.x += 0.01;
	cilindro.rotation.y += 0.01;

	esfera.rotation.z -= 0.01;
	esfera.rotation.y += 0.01;

	console.log(esfera.scale.x);
	renderer.render(scene, camera);
}
animate();