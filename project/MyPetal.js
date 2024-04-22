import {CGFobject} from '../lib/CGF.js';

export class MyPetal extends CGFobject {
    
    constructor(scene, rotationAngle, minRotationAngle, maxRotationAngle) {
        super(scene);
        this.rotationAngle = rotationAngle || 0; // Definindo um ângulo padrão de rotação
        
        this.initBuffers();
    }
    
    initBuffers() {
        // Defina aqui os vértices e índices para desenhar o triângulo
        // Suponha que você tenha arrays vertices e indices preenchidos corretamente
        
        // Aplicar a rotação ao segundo triângulo
        let rotatedVertices = [];
        for (let i = 0; i < vertices.length; i += 3) {
            let x = vertices[i];
            let y = vertices[i + 1];
            let z = vertices[i + 2];
            
            // Aplicar a rotação em torno do eixo Z
            let newX = x * Math.cos(this.rotationAngle) - y * Math.sin(this.rotationAngle);
            let newY = x * Math.sin(this.rotationAngle) + y * Math.cos(this.rotationAngle);
            
            rotatedVertices.push(newX, newY, z);
        }
        
        // Usar os novos vértices para desenhar o segundo triângulo
        // Combine os vértices do segundo triângulo com os do primeiro para formar a pétala completa
        
        // Defina os buffers e outros passos necessários para desenhar a pétala
    }
}