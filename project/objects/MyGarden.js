import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, rows, cols) {
        super(scene);
        this.rows = rows;
        this.cols = cols;
        
        this.flowers = []; 

        this.createGarden(); 
    }

    createGarden() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const x = i; 
                const z = j; 
    
                
                const outer_radius = 0.4 + Math.random() * 0.2; // Raio externo das pétalas entre 0.4 e 0.6
                const number_of_petals = Math.floor(Math.random() * 5) + 5; // Número de pétalas entre 5 e 10
                const receptacle_radius = 0.15 + Math.random() * 0.15; // Raio do receptáculo entre 0.15 e 0.3
                const receptacle_color = [Math.random()*255, Math.random()*255 / 2, 0]; // Cor do receptáculo variando
                const stem_radius = 0.03 + Math.random() * 0.03; // Raio do caule entre 0.03 e 0.06
                const stem_color = [0, Math.random()*255, 0]; // Cor do caule com variação na intensidade de verde
                const stem_stacks = Math.floor(Math.random() * 5) + 5; // Quantidade de stacks no caule entre 5 e 10
                const stem_height = 0.5 + Math.random() * 0.5; // Altura do caule entre 0.5 e 1.0
                const petal_color = [Math.random()*255, 0, Math.random()*255]; // Cor das pétalas variando entre tons de magenta e roxo
                const rotationAngle = Math.random() * Math.PI; // Ângulo de rotação das pétalas entre 0 e PI
                const prismAngle = Math.random() * Math.PI / 6; // Ângulo de rotação do prisma entre 0 e PI/6
    
                
                const flower = new MyFlower(this.scene, outer_radius, number_of_petals, receptacle_radius, receptacle_color, stem_radius, stem_color, stem_stacks, stem_height, petal_color, rotationAngle, prismAngle);
                
                this.flowers.push({flower, x, z}); 
            }
        }
    }
    

    display() {

        this.scene.pushMatrix();

        this.scene.translate(-5, -1, 0);
        this.scene.scale(0.5, 0.5, 0.5);

        // Método para desenhar todas as flores no jardim
        this.flowers.forEach(({flower, x, z}) => {
            this.scene.pushMatrix();
            this.scene.translate(x, 0, z); // Posiciona cada flor de acordo com as coordenadas x e z
            flower.display(); // Desenha a flor
            this.scene.popMatrix();
        });

        this.scene.popMatrix();
    }
}