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

camera.position.set(-90,140,140);
controlador.update();
// camera.lookAt(0, 0, 0);

const luzAmbiente = new THREE.AmbientLight(0x333333);
scene.add(luzAmbiente);

let cubo, sol, cilindro, plano, cone, terra, lua;

function CriarSol(cor, raio, qtdSegLargura, qtdSegAltura) {
	var geometria = new THREE.SphereGeometry(raio, qtdSegAltura, qtdSegAltura)
	// var material = new THREE.MeshBasicMaterial({ map: loader.load('https://lh3.googleusercontent.com/T0oOA8YxcckPkQayuFVrwYrH61CIhtUT8yUn5aNzOxiDiAQ1I7T9JwC2zFhUoN2pdsgPU0ySkpiJhyhR_z51buPGcaC0faQeLHI') })
	var material = new THREE.MeshBasicMaterial({
		map: loader.load('sol.jpg')
	});
	var texturaFundo = loader.load('espaço.jpg'); 
		// var material = new THREE.MeshBasicMaterial({ color: cor });
	sol = new THREE.Mesh(geometria, material);
	sol.position.x = 0;
	scene.add(sol);
	scene.background = texturaFundo;
}

function CriarTerra(cor, raio, segLargura, segAltura) {
	var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura)
	var material = new THREE.MeshBasicMaterial({
		map: loader.load('terra.jpg')
	});
	terra = new THREE.Mesh(geometria, material);
	terra.translateX(20);
	scene.add(terra);
}

function CriarLua(cor, raio, segLargura, segAltura) {
	var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura)
	var material = new THREE.MeshBasicMaterial({
		map: loader.load('lua.jpg')
	});
	lua = new THREE.Mesh(geometria, material);
	lua.translateX(10);
	scene.add(lua);
	// lua.position.y = 60;
}

// // cubo
// function CriarCubo(cor, largura, altura, profundidade) {
// 	var geometria = new THREE.BoxGeometry(largura, altura, profundidade);
// 	var material = new THREE.MeshBasicMaterial({ map: loader.load('https://lh3.googleusercontent.com/T0oOA8YxcckPkQayuFVrwYrH61CIhtUT8yUn5aNzOxiDiAQ1I7T9JwC2zFhUoN2pdsgPU0ySkpiJhyhR_z51buPGcaC0faQeLHI') });
// 	material.flatShading = true;

// 	cubo = new THREE.Mesh(geometria, material); scene.add(cubo);
// 	cubo.position.x = 0;
// }

// function CriarCilindro(cor, raioCima, raioBaixo, altura) {
// 	var geometria = new THREE.CylinderGeometry(raioCima, raioBaixo, altura, 20);
// 	var material = new THREE.MeshBasicMaterial({ color: cor })

// 	cilindro = new THREE.Mesh(geometria, material); scene.add(cilindro);
// 	cilindro.position.x = 3;
// }


// function CriarCone(cor, raio, altura, qtdDetalhes) {
// 	var geometria = new THREE.ConeGeometry(raio, altura, qtdDetalhes);
// 	var material = new THREE.MeshBasicMaterial({ color: cor });

// 	cone = new THREE.Mesh(geometria, material); scene.add(cone);
// 	cone.position.x = -2;
// }

// function CriarPlano(cor, altura, largura) {
// 	var geometria = new THREE.PlaneGeometry(altura, largura);
// 	var material = new THREE.MeshBasicMaterial({
// 		color: cor
// 	});

// 	plano = new THREE.Mesh(geometria, material);
// 	scene.add(plano);
// 	plano.position.x = -5;
// }

// CriarCubo(1, 1, 1)
// CriarCilindro(new THREE.Color(0x1E90FF), 1, 1, 2);
// CriarCone(new THREE.Color(0xFF007F), 1, 2, 30);
// CriarPlano(new THREE.Color(0x6A5ACD), 1, 2);
// CriarTerra(new THREE.Color(0xffab15), 1, 16, 16);
CriarSol(new THREE.Color(0xD6D637 ), 10, 64, 64);
CriarTerra(new THREE.Color(0xffab15), 3, 20, 20);
CriarLua(new THREE.Color(0xffab15), 2, 20, 20);


const clock = new THREE.Clock();

function animate() {
	requestAnimationFrame(animate);
	const elapsedTime = clock.getElapsedTime()

	sol.rotation.y += 0.003;

	terra.position.x = Math.sin(elapsedTime * 0.18) * 30;
	terra.position.y = Math.cos(elapsedTime * 0.18) * 30;
	terra.rotation.z += 0.02;
	
	lua.position.x = Math.sin(elapsedTime * 0.08) * 25;
	lua.position.y = Math.cos(elapsedTime * 0.08) * 25;
	lua.rotation.z += 0.02;

	// cubo.rotateZ(0.004);
	// plano.rotation.x += 0.01;
	// plano.rotation.y -= 0.01;
	// cone.rotation.z += 0.01;
	// cone.rotation.y += 0.01;
	// cilindro.rotation.x += 0.01;
	// cilindro.rotation.y += 0.01;
	// esfera.rotation.y += 0.01;

	renderer.render(scene, camera);
}
animate();