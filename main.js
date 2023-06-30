// biblioteca Three, controles de orbita e carrgador de objtos 3D 
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"; 
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// deploy
// https://github.com/israelsilvaa/TreeJs

// funções basicas para toda cena
//cena, camera, renderizador, carregador de textura e controles de orbita
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // set tamanho da "tela"?
document.body.appendChild(renderer.domElement);
const loader = new THREE.TextureLoader();
// set posição da camera e "ativação" controles de orbita
camera.position.set(200, 200, 200);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// variaves que vão se tornar objetos
var sol,
  mercurio,
  venus,
  satelite,
  terra_lua,
  marte,
  jupiter,
  saturno,
  urano,
  netuno;

// fundo
var texturaFundo = loader.load("img/espaco.jpg");
scene.background = texturaFundo;

function CriarSol(cor, raio, qtdSegLargura, qtdSegAltura) {
  var geometria = new THREE.SphereGeometry(raio, qtdSegAltura, qtdSegAltura);
  var material = new THREE.MeshBasicMaterial({
    map: loader.load("img/sol.jpg"),
  });
  //justa material e textura
  sol = new THREE.Mesh(geometria, material);
  scene.add(sol);
}
function CriarMercurio(cor, raio, segLargura, segAltura) {
  var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura);
  var material = new THREE.MeshStandardMaterial({
    map: loader.load("img/mercurio.jpg"),
  });
  mercurio = new THREE.Mesh(geometria, material);
  scene.add(mercurio);
}
function CriarVenus(cor, raio, segLargura, segAltura) {
  var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura);
  var material = new THREE.MeshStandardMaterial({
    map: loader.load("img/venus.jpg"),
  });
  venus = new THREE.Mesh(geometria, material);
  scene.add(venus);
}
// 3D
function CriarSatelite() {
  new GLTFLoader().load("modelos/satelite/scene.gltf", function (gltf) {
    const model = gltf.scene;
    model.scale.set(5, 5, 5);
    model.traverse(function (object) {
      if (object.isMesh) object.receiveShadow = true;
    });
    satelite = model;
    scene.add(satelite);
  });
}
// 3D
function CriarTerraLua() {
  new GLTFLoader().load("modelos/terra_lua/scene.gltf", function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.03, 0.03, 0.03);
    model.traverse(function (object) {
      if (object.isMesh) object.receiveShadow = true;
    });
    terra_lua = model;
    scene.add(terra_lua);
  });
}
function CriarMarte(cor, raio, segLargura, segAltura) {
  var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura);
  var material = new THREE.MeshStandardMaterial({
    map: loader.load("img/marte.jpg"),
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
// 3D
function CriarSaturno() {
  new GLTFLoader().load("modelos/saturno/scene.gltf", function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.1, 0.1, 0.1);

    model.traverse(function (object) {
      if (object.isMesh) object.receiveShadow = true;
    });
    saturno = model;
    scene.add(saturno);
  });
}
// 3D
function CriarUrano() {
  new GLTFLoader().load("modelos/urano/scene.gltf", function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.1, 0.1, 0.1);

    model.traverse(function (object) {
      if (object.isMesh) object.receiveShadow = true;
    });
    urano = model;
    scene.add(urano);
  });
}
function CriarNetuno(cor, raio, segLargura, segAltura) {
  var geometria = new THREE.SphereGeometry(raio, segLargura, segAltura);
  var material = new THREE.MeshStandardMaterial({
    map: loader.load("img/netuno.jpg"),
  });
  netuno = new THREE.Mesh(geometria, material);
  scene.add(netuno);
}

// ----------fim  wesley---------

// instanciação dos objetos geometricos por meio da função
CriarSol(new THREE.Color(0xd6d637), 20, 64, 64);
CriarMercurio(new THREE.Color(0xffab15), 3, 64, 64);
CriarVenus(new THREE.Color(0xffab15), 6, 64, 64);
CriarSatelite();
CriarTerraLua();
CriarMarte(new THREE.Color(0xffab15), 7, 64, 64);
Criarjupiter(new THREE.Color(0xffab15), 15, 64, 64);
CriarSaturno();
CriarUrano();
CriarNetuno(new THREE.Color(0xffab15), 8, 64, 64);

// ponto de luz para simular luz do SOL
const PointLight = new THREE.PointLight(0xffffff, 8, 450);
scene.add(PointLight);

// auxiliar para fazer rotações a cada instante de tempo
var contador = 0;

function animate() {
  //para melhora de suavização ao processar os quadros
  requestAnimationFrame(animate); 
  contador += 0.01;

  //   sol
  sol.rotation.y += 0.002;

  //   mercurio              (velocidade orbita)    (distancia)
  mercurio.position.x = Math.sin(contador * 0.9) * 30;
  mercurio.position.z = Math.cos(contador * 0.9) * 30;
  mercurio.rotation.y += 0.03;

  //   venus
  venus.position.x = Math.sin(contador * 0.8) * 50;
  venus.position.z = Math.cos(contador * 0.8) * 50;
  venus.rotation.y += 0.02;

  // satelite
  satelite.position.x = Math.sin(contador * 0.7) * 85;
  satelite.position.z = Math.cos(contador * 0.7) * 85;
  satelite.rotation.x += 0.02;
  
  // terra e lua
  terra_lua.position.x = Math.sin(contador * 0.7) * 105;
  terra_lua.position.z = Math.cos(contador * 0.7) * 105;
  terra_lua.rotation.y += 0.03;

  //   marte
  marte.position.x = Math.sin(contador * 0.6) * 155;
  marte.position.z = Math.cos(contador * 0.6) * 155;
  marte.rotation.y += 0.02;

  //   jupiter
  jupiter.position.x = Math.sin(contador * 0.4) * 185;
  jupiter.position.z = Math.cos(contador * 0.4) * 185;
  jupiter.rotation.y += 0.02;

  //   saturno
  saturno.position.x = Math.sin(contador * 0.25) * 245;
  saturno.position.z = Math.cos(contador * 0.25) * 245;
  saturno.rotation.y += 0.02;

  //	urano
  urano.position.x = Math.sin(contador * 0.2) * 330;
  urano.position.z = Math.cos(contador * 0.2) * 330;
  urano.rotation.x = 2;

  // netuno
  netuno.position.x = Math.sin(contador * 0.1) * 390;
  netuno.position.z = Math.cos(contador * 0.1) * 390;
  netuno.rotation.y = 2;

  renderer.render(scene, camera);
}
animate();
