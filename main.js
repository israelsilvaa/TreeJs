// Importação da biblioteca
import * as THREE from "https://unpkg.com/three/build/three.module.js";
import {
  OrbitControls
} from "https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js";

// funções basicas para toda cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;

renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new THREE.TextureLoader();

// utilizar mouse para controlar orbita  

camera.position.set(200, 200, 200);

// const luzAmbiente = new THREE.AmbientLight(0x333333);
// const pontoDeLuz = new THREE.PointLight(0xffffff, 3, 300);
// scene.add(pontoDeLuz);

var sol,
  mercurio,
  venus,
  terra,
  marte,
  jupiter,
  saturno,
  urano,
  netuno,
  saturnoAnel,
  light,
  uranoAnel;

var texturaFundo = loader.load("img/espaco.jpg");
scene.background = texturaFundo;

function CriarSol(cor, raio, qtdSegLargura, qtdSegAltura) {
  var geometria = new THREE.SphereGeometry(raio, qtdSegAltura, qtdSegAltura);
  // var material = new THREE.MeshBasicMaterial({ map: loader.load('https://lh3.googleusercontent.com/T0oOA8YxcckPkQayuFVrwYrH61CIhtUT8yUn5aNzOxiDiAQ1I7T9JwC2zFhUoN2pdsgPU0ySkpiJhyhR_z51buPGcaC0faQeLHI') })
  var material = new THREE.MeshBasicMaterial({
    map: loader.load("img/sol.jpg"),
  });
  sol = new THREE.Mesh(geometria, material);
  scene.add(sol);
}


function CriarMercurio(cor, raio, segLargura, segAltura) {
  var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura);
  var material = new THREE.MeshStandardMaterial({
    map: loader.load("img/mercurio.jpg")
  });
  mercurio = new THREE.Mesh(geometria, material);
  scene.add(mercurio);
}

function CriarVenus(cor, raio, segLargura, segAltura) {
  var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura);
  var material = new THREE.MeshStandardMaterial({
    map: loader.load("img/venus.jpg")
  });
  venus = new THREE.Mesh(geometria, material);
  scene.add(venus);
}

function CriarTerra(cor, raio, segLargura, segAltura) {
  var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura);
  var material = new THREE.MeshStandardMaterial({
    map: loader.load("img/terra.jpg")
  });
  terra = new THREE.Mesh(geometria, material);
  scene.add(terra);
}

function CriarMarte(cor, raio, segLargura, segAltura) {
  var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura);
  var material = new THREE.MeshStandardMaterial({
    map: loader.load("img/marte.jpg")
  });
  marte = new THREE.Mesh(geometria, material);
  scene.add(marte);
}

function Criarjupiter(cor, raio, segLargura, segAltura) {
  var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura);
  var material = new THREE.MeshStandardMaterial({
    map: loader.load("img/jupiter.jpg"),
  });
  jupiter = new THREE.Mesh(geometria, material);
  scene.add(jupiter);
}

function CriarSaturno(cor, raio, segLargura, segAltura) {
  var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura);
  var material = new THREE.MeshStandardMaterial({
    map: loader.load("img/saturno.jpg"),
  });
  saturno = new THREE.Mesh(geometria, material);
  scene.add(saturno);
}

function CriarUrano(cor, raio, segLargura, segAltura) {
  var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura);
  var material = new THREE.MeshStandardMaterial({
    map: loader.load("img/urano.jpg"),
  });
  urano = new THREE.Mesh(geometria, material);
  scene.add(urano);
}

function CriarNetuno(cor, raio, segLargura, segAltura) {
  var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura);
  var material = new THREE.MeshStandardMaterial({
    map: loader.load("img/netuno.jpg"),
  });
  netuno = new THREE.Mesh(geometria, material);
  scene.add(netuno);
}

function CriarSaturnoAnel(cor, altura, largura) {
  var geometria = new THREE.PlaneGeometry(altura, largura);
  var material = new THREE.MeshStandardMaterial({
    map: loader.load("img/saturnoAnel.png"),
  });
  saturnoAnel = new THREE.Mesh(geometria, material);
  scene.add(saturnoAnel);
}

function CriarUranoAnel(cor, altura, largura) {
  var geometria = new THREE.PlaneGeometry(altura, largura);
  var material = new THREE.MeshStandardMaterial({
    map: loader.load("img/uranoAnel.png"),
  });
  uranoAnel = new THREE.Mesh(geometria, material);
  scene.add(uranoAnel);
}

// iluminação
function CriarLuzAmbiente(cor, intensidade){
  light = new THREE.AmbientLight(cor, intensidade);
  scene.add(light)
}
function CriarLuzDirecional(cor, intensidade, x, y, z) {
  light = new THREE.DirectionalLight(cor, intensidade);
  light.position.set(x, y, z);
  light.target.position.set(0, 0, 0);
  light.castShadow = true;

  // configure directional light camera
  light.shadow.camera.zoom = .5;

  scene.add(light);
  scene.add(light.target);

  const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
  scene.add(cameraHelper);
}
function CriarLuzSpot(cor, intensidade, x, y, z) {
  light = new THREE.SpotLight(cor, intensidade);
  light.position.set(x, y, z);
  light.target.position.set(0, 0, 0);
  light.castShadow = true;

  var ajudante = new THREE.PointLightHelper(light);

  scene.add(light);
  scene.add(light.target);
  scene.add(ajudante);

  const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
  scene.add(cameraHelper);
}

CriarSol(new THREE.Color(0xd6d637), 20, 64, 64);
CriarMercurio(new THREE.Color(0xffab15), 3, 20, 20);
CriarVenus(new THREE.Color(0xffab15), 6, 20, 20);
CriarTerra(new THREE.Color(0xffab15), 9, 20, 20);
CriarMarte(new THREE.Color(0xffab15), 7, 20, 20);
Criarjupiter(new THREE.Color(0xffab15), 15, 20, 20);
CriarSaturno(new THREE.Color(0xffab15), 7, 20, 20);
CriarUrano(new THREE.Color(0xffab15), 6, 20, 20);
CriarNetuno(new THREE.Color(0xffab15), 10, 20, 20);
CriarSaturnoAnel(new THREE.Color(0x6a5acd), 30, 30);
CriarUranoAnel(new THREE.Color(0x6a5acd), 30, 30);

// CriarLuzAmbiente(new THREE.Color(0xFFFFFF), 1);
// CriarLuzDirecional(new THREE.Color(0xFFFFFF), 1, 5, -2, 0);
// CriarLuzSpot(new THREE.Color(0xFFFFFF), 1, 0, 10, 5);

var contador = 0;
const PointLight = new THREE.PointLight(0xFFFFFF, 2 , 300);
scene.add(PointLight);

function animate() {
  requestAnimationFrame(animate);
  contador += 0.02;


  // light.position.y = Math.sin(contador);
  // light.position.z = Math.cos(contador);

  //   sol
  sol.rotation.y += 0.002;

  //   mercurio
  mercurio.position.x = Math.sin(contador) * 25;
  mercurio.position.z = Math.cos(contador) * 25;
  mercurio.rotation.x -= 0.03;

  //   venus
  venus.position.x = Math.sin(contador * 1) * 56;
  venus.position.z = Math.cos(contador * 1) * 56;
  venus.rotation.y += 0.02;

  //   terra

  terra.position.x = Math.sin(contador * 0.8) * 75;
  terra.position.z = Math.cos(contador * 0.8) * 75;
  terra.rotation.y += 0.01;

  //   marte
  marte.position.x = Math.sin(contador * 0.6) * 95;
  marte.position.z = Math.cos(contador * 0.6) * 95;
  marte.rotation.y += 0.02;

  //   jupiter
  jupiter.position.x = Math.sin(contador * 0.4) * 125;
  jupiter.position.z = Math.cos(contador * 0.4) * 125;
  jupiter.rotation.y += 0.02;

  //   saturno
  saturno.position.x = Math.sin(contador * 0.25) * 155;
  saturno.position.z = Math.cos(contador * 0.25) * 155;
  saturno.rotation.y += 0.02;
  //	satunroAnel
  saturnoAnel.position.x = Math.sin(contador * 0.25) * 155;
  saturnoAnel.position.z = Math.cos(contador * 0.25) * 155;
  saturnoAnel.rotation.x = -8

  //	urano
  urano.position.x = Math.sin(contador * 0.2) * 180;
  urano.position.z = Math.cos(contador * 0.2) * 180;
  urano.rotation.y += 0.02;
  //	uranoAnel
  uranoAnel.position.x = Math.sin(contador * 0.2) * 180;
  uranoAnel.position.z = Math.cos(contador * 0.2) * 180;
  uranoAnel.rotation.x = -8

  // 	netuno
  netuno.position.x = Math.sin(contador * 0.1) * 195;
  netuno.position.z = Math.cos(contador * 0.1) * 195;
  netuno.rotation.y += 0.02;

  renderer.render(scene, camera);
}
animate();