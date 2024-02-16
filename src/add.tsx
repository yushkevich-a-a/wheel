import { useEffect, useRef, useState } from 'react';
import './App.css';
import styled, { css, keyframes } from 'styled-components';


const Button = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #F00;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const Container = styled.div`
  width: 600px;
  height: 600px;
  overflow: hidden;
  border-radius: 50%;
`;
const Pie = styled.div`

`;

function App() {
  const [ offset, setOffset ] = useState<number>(100);
  const [ rotate, setRotate ] = useState<number>(90);
  const [ start, setStartAnimate] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    
    
    const setDeg = () => {
        setOffset(state => { 
          if (state > 80) {
          return state - 2
          } 
          return state;
        })
        setRotate(state => {
          if (state < 390) {
            return state + 8
          }
          return 0;
        });
      }

    const resetOffset = () => {
      setOffset(state => { 
        if (state < 100) {
        setTimeout(resetOffset, 40)
        return state + 1
        } 
        return state;
      })

    }

    
    // const 
    const timerId = setInterval(setDeg, 40);
    // let timerId1: any = null;
    // let timerId2: any = null;
    
    if(!start) {
      clearInterval(timerId);
      resetOffset()
    }
    // const startShadow = () => {
    //   setOffset(state => {
    //     if (state <= 60) {
    //       return 60;
    //     }
    //     return state - 2
    //   });
    //   timerId1 = setTimeout(startShadow, 40);
    // }

    // const endShadow = () => {
    //   const funcOffset = (id: any) => {
    //     if (offset >= 100) {
    //       clearInterval(id);
    //       return;
    //     }
    //     setOffset(state => state + 1)
    //   }
    //   const timerId2 = setInterval(() => {funcOffset(timerId2)}, 40);
    // }

    // ref.current.addEventListener( 'animationstart', startShadow )
    // ref.current.addEventListener( 'animationend', endShadow )


    return () => {
      clearInterval(timerId);
      // ref.current && ref.current.removeEventListener( 'animationstart', startShadow )
      // ref.current && ref.current.removeEventListener( 'animationend', endShadow )
    }
  },[start]);

  return (
    <Wrapper>
      <Button onClick={() => setStartAnimate(true)}/>
      <Container ref={ref}
        style={{
          "background": `conic-gradient(transparent ${offset + '%'}, rgb(38 212 250 / 23%) ${offset + 70 + '%'})`,
          "transform": `rotate(${rotate}deg)`
        }}
      >
        <Pie />
      </Container>

    </Wrapper>
  );
}

export default App;











function Pendulum(origin_, r_,m_) {
  // Fill all variables
  this.path = [];
  this.origin = origin_.copy();
  this.position = createVector();
  this.r = r_;
  this.angle = PI / 4;

  this.aVelocity = 0.0;
  this.aAcceleration = 0.0;
  this.damping = 0.995 - 0.0005* m;   // amortiguacion
  this.ballr = m_;      // radio bola masa

  this.dragging = false;


  this.go = function () {
      // secuencia principal de la simulacion
      this.update();  //calcula y actualiza
      this.drag();    //eventos usuario
      this.display(); // dibuja
  };

  // Function to update position
  this.update = function () {
    this.damping = 0.995 - 0.0003* m/3;   // amortiguacion
      // Mientras no se sostenga el pendulo con mouse sigue girando
      if (!this.dragging) {
          var gravity = 0.1 * g;                                           // gravedad
          this.aAcceleration = (-1 * gravity / this.r) * sin(this.angle);  // Calcular aceleracion
          this.aVelocity += this.aAcceleration;                            // Incremento de velocidad
          this.aVelocity *= this.damping;                                  // amortiguacion
          this.angle += this.aVelocity;                                    // Incrementar angulo
      }
  };

  this.display = function () {
    
      this.position.set(l * sin(this.angle),  l*cos(this.angle), 0); // conversion cartesiano -> polar
      this.position.add(this.origin);                                       //ref origen pendulo

      stroke('#e0ad16');
      strokeWeight(2);
      // dibujar brazo
      line(this.origin.x, this.origin.y, this.position.x, this.position.y);

      ellipseMode(CENTER); //configurar p5 para generar desde el centro circunferencias

     this.path.push(new Punto(this.position.x, this.position.y));
      if(this.path.length > 100){ this.path.splice(0,1);}
      var c = 0;
     for(i in this.path){
         fill(color(25, 25+c++, 205));
         stroke(color(25, 25+c++, 205));
         ellipse(this.path[i].x, this.path[i].y, 5, 5);
         }

      stroke('#e0ad16');
      fill('#9b9888');
      if (this.dragging) fill('#c66a0d');
      // Dibujar bola
      ellipse(this.position.x, this.position.y, m, m);

  };


  ///////////////////////////////////NO METICHAR ///////////////////////////
  // interaccion drag con el mouse
  // si esta tomando al pendulo

  this.clicked = function (mx, my) {
      var d = dist(mx, my, this.position.x, this.position.y);
      if (d < this.ballr) {
          this.dragging = true;
      }

  };

  // si ya no se esta tomando al pendulo
  this.stopDragging = function () {
      this.aVelocity = 0; // velocidad es 0 al soltarlo
      this.dragging = false;
  };

  this.drag = function () {
      // mientras se sostiene el pendulo
      // calcular angulo entre
      // origen y mouse
      if (this.dragging) {
          var diff = p5.Vector.sub(this.origin, createVector(mouseX, mouseY));      // Diferencia entre  puntos
          this.angle = atan2(-1 * diff.y, diff.x) - radians(90);                   // angulo relativo (vertical)
      }
  };
}


function Punto(x,y) {
  this.x = x;
  this.y = y;
}




// Angulo theta (0 que es el pendulo en descanso) y un radio (r)
// Fueza de Gravedad   = Masa * Constante gravitacional;
// Fuerza del Pendulo  = Fuerza de Gravedad * seno(theta)
// Aceleracióń Angular = Fuerza del Pendulo / Masa

// Basado en:
// http://www.myphysicslab.com/pendulum1.html


const p;           //instancia pendulo
const g = 20;    //gravedad promedio en la tierra
const m = 50.0;    //masa bola
const l = 400.0;   //longitud brazo

goingup = false;
function draw() {

  background('#1c2438');
  p.go();
  stroke(51);
  fill(255);
  text('fps: ' + getFrameRate().toFixed(2), width -80, 20);
  text('g  : ' + g.toFixed(2), width -80, 35);
  text('L  : ' + l.toFixed(2), width -80, 50);
  text('m  : ' + m.toFixed(2), width -80, 65);
  text('You can Drag and Drop the pendulum', width -600, 570);

  text('Angular Vel : ' + p.aVelocity.toFixed(2), width -120, 105);
  text('Damping     : ' + p.damping.toFixed(3), width -120, 120);
  text('Copyright (c) 2017 Diego Vallejo', width -200, 620);
}

function mousePressed() {
  p.clicked(mouseX,mouseY); 
}

function mouseReleased() {
  p.stopDragging();
}
