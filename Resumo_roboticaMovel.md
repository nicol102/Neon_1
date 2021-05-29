# Resumo robótica móvel

>Conheça a história para não cometer os mesmos erros

Robótica móvel faz parte da automação. É importante estudar sensores de GPS e outros sensores

### Transformações homogêneas

#### Cinemática

Descrever um objeto conforme ele se move, em termos de trajetória percorrida na robótica, esta trajetória pode ser generalizada em um único ponto

- Sistema de coordenadas = frames (referenciais) (eixo x, y, z)

**Frame inercial serve de referência para os outros**

-Translação – deslocamento de um frame pelo espaço sem que ocorra alteração na orientação de seus eixos

-Rotação – operações matemáticas de mudança de orientação nos eixos cartesianos sem mudar o ponto de origem deste sistema de referência

>Roll- eixo x
>Pitch – eixo y
>Yall – eixo z

*Futebol de robôs é um modelo diferencial

Um robô diferencial possui rodas independentes, constituem uma “roda boba” não motorizada, utilizada apenas para sustentação. Cada roda possui uma velocidade angular

![image](https://user-images.githubusercontent.com/74978653/120084521-4a169f00-c0a7-11eb-8352-73406e4cbba4.png)

O robô será representado por apenas um ponto, no caso, o ponto médio do eixo das rodas, sendo um ponto de igual distribuição no nosso robô. 

![image](https://user-images.githubusercontent.com/74978653/120084528-54d13400-c0a7-11eb-93af-9182d9c58183.png)

Necessário transformar a velocidade angular em velocidade linear.

Existem duas maneiras de planejar o deslocamento do robô: 

1. planejar diretamente a velocidade das rodas esquerda e direita e então combinar ambas velocidades para obter as velocidades linear e angular do robô (ponto médio). 

2. Planeja a velocidade linear e angular do ponto médio e então converter para velocidades linear e angulares das rodas esquerda e direita

![image](https://user-images.githubusercontent.com/74978653/120084536-729e9900-c0a7-11eb-9f00-bb6ebc4353de.png)

