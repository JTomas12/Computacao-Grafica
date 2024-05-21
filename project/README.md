# CG 2023/2024

## Group T06G05
| Name             | Number    | E-Mail             |
| ---------------- | --------- | ------------------ |
| André Silva        | 202108724 | up202108724@up.pt                |
| João Teixeira      | 202108738 | up202108738@up.pt                |

- Nos desenvolvimentos adicionais, tivemos dificuldade em implementar a trajetória parabólica nas subidas e descidas da abelha, uma vez que usamos um algoritmo de interpolação linear inicialmente para simular um moviemento ascendente e descendente mais realista, o que tornaria difícil adaptar um movimento parabólico com auxílio dos eixos x ou z em conformidade com o movimento no eixo y. Contudo, conseguimos fazer esta trajetória quando a abelha se dirige à colmeia.
- Nos shaders, houve dificuldade em introduzir aleatoriedade entre as oscilações ( deslocamentos ) dentro do próprio shader, uma vez que o mesmo valor estava sempre a ser aplicado a todos os vértices em simultâneo.