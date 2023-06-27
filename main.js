// Importação da biblioteca
import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import {
	OrbitControls
} from "https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js";


// funções basicas para toda cena
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const controlador = new OrbitControls(camera, renderer.domElement);
var loader = new THREE.TextureLoader();

camera.position.set(30, -30, -480);
controlador.update();
// camera.lookAt(0, 0, 0);

const luzAmbiente = new THREE.AmbientLight(0x333333);
const pontoDeLuz = new THREE.PointLight(0xffffff, 3, 300)
scene.add(pontoDeLuz);

let sol, mercurio, venus, terra, marte, jupiter, saturno, urano, netuno;

function CriarSol(cor, raio, qtdSegLargura, qtdSegAltura) {
	var geometria = new THREE.SphereGeometry(raio, qtdSegAltura, qtdSegAltura)
	// var material = new THREE.MeshBasicMaterial({ map: loader.load('https://lh3.googleusercontent.com/T0oOA8YxcckPkQayuFVrwYrH61CIhtUT8yUn5aNzOxiDiAQ1I7T9JwC2zFhUoN2pdsgPU0ySkpiJhyhR_z51buPGcaC0faQeLHI') })
	var material = new THREE.MeshBasicMaterial({
		map: loader.load('img/sol.jpg')
	});
	var texturaFundo = loader.load('img/espaco.jpg');
	// var material = new THREE.MeshBasicMaterial({ color: cor });
	sol = new THREE.Mesh(geometria, material);
	sol.position.x = 0;
	scene.add(sol);
	scene.background = texturaFundo;
	scene.add(luzAmbiente);
}


function CriarMercurio(cor, raio, segLargura, segAltura) {
	var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura)
	var material = new THREE.MeshBasicMaterial({
		map: loader.load('img/mercurio.jpg')
	});
	mercurio = new THREE.Mesh(geometria, material);
	scene.add(mercurio);
}

function CriarVenus(cor, raio, segLargura, segAltura) {
	var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura)
	var material = new THREE.MeshBasicMaterial({
		map: loader.load('img/venus.jpg')
	});
	venus = new THREE.Mesh(geometria, material);
	scene.add(venus);
}

function CriarTerra(cor, raio, segLargura, segAltura) {
	var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura)
	var material = new THREE.MeshBasicMaterial({
		map: loader.load('img/terra.jpg')
	});
	terra = new THREE.Mesh(geometria, material);
	scene.add(terra);
}

function CriarMarte(cor, raio, segLargura, segAltura) {
	var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura)
	var material = new THREE.MeshBasicMaterial({
		map: loader.load('img/marte.jpg')
	});
	marte = new THREE.Mesh(geometria, material);
	scene.add(marte);
}

function Criarjupiter(cor, raio, segLargura, segAltura) {
	var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura)
	var material = new THREE.MeshBasicMaterial({
		map: loader.load('img/jupiter.jpg')
	});
	jupiter = new THREE.Mesh(geometria, material);
	scene.add(jupiter);
}

function CriarSaturno(cor, raio, segLargura, segAltura) {
	var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura)
	var material = new THREE.MeshBasicMaterial({
		map: loader.load('img/saturno.jpg')
	});
	saturno = new THREE.Mesh(geometria, material);
	scene.add(saturno);
}

function CriarUrano(cor, raio, segLargura, segAltura) {
	var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura)
	var material = new THREE.MeshBasicMaterial({
		map: loader.load('img/urano.jpg')
	});
	urano = new THREE.Mesh(geometria, material);
	scene.add(urano);
}

function CriarNetuno(cor, raio, segLargura, segAltura) {
	var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura)
	var material = new THREE.MeshBasicMaterial({
		map: loader.load('img/netuno.jpg')
	});
	netuno = new THREE.Mesh(geometria, material);
	scene.add(netuno);
}

CriarSol(new THREE.Color(0xD6D637), 20, 64, 64);
CriarMercurio(new THREE.Color(0xffab15), 3, 20, 20);
CriarVenus(new THREE.Color(0xffab15), 6, 20, 20);
CriarTerra(new THREE.Color(0xffab15), 9, 20, 20);
CriarMarte(new THREE.Color(0xffab15), 7, 20, 20);
Criarjupiter(new THREE.Color(0xffab15), 15, 20, 20);
CriarSaturno(new THREE.Color(0xffab15), 12, 20, 20);
CriarUrano(new THREE.Color(0xffab15), 10, 20, 20);
CriarNetuno(new THREE.Color(0xffab15), 10, 20, 20);

const clock = new THREE.Clock();

function animate() {
	requestAnimationFrame(animate);
	const elapsedTime = clock.getElapsedTime()

	sol.rotation.z -= 0.002;

	mercurio.rotation.y -= 0.03;
	mercurio.position.x = Math.sin(elapsedTime * 1.4) * 25;
	mercurio.position.y = Math.cos(elapsedTime * 1.4) * 25;

	venus.position.x = Math.sin(elapsedTime * 1) * 36;
	venus.position.y = Math.cos(elapsedTime * 1) * 36;
	venus.rotation.y -= 0.02;

	terra.rotation.y -= 0.02;
	terra.position.x = Math.sin(elapsedTime * 0.8) * 55;
	terra.position.y = Math.cos(elapsedTime * 0.8) * 55;

	marte.rotation.y -= 0.02;
	marte.position.x = Math.sin(elapsedTime * 0.60) * 75;
	marte.position.y = Math.cos(elapsedTime * 0.60) * 75;

	jupiter.rotation.y -= 0.02;
	jupiter.position.x = Math.sin(elapsedTime * 0.4) * 105;
	jupiter.position.y = Math.cos(elapsedTime * 0.4) * 105;

	saturno.rotation.y -= 0.02;
	saturno.position.x = Math.sin(elapsedTime * 0.25) * 135;
	saturno.position.y = Math.cos(elapsedTime * 0.25) * 135;

	urano.rotation.y -= 0.02;
	urano.position.x = Math.sin(elapsedTime * 0.2) * 160;
	urano.position.y = Math.cos(elapsedTime * 0.2) * 160;

	netuno.rotation.y -= 0.02;
	netuno.position.x = Math.sin(elapsedTime * 0.1) * 175;
	netuno.position.y = Math.cos(elapsedTime * 0.1) * 175;

	renderer.render(scene, camera);
}
animate();