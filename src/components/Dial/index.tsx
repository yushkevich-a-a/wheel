import styled, { css, keyframes } from 'styled-components';
import dial from './dial.svg';
import arrow from './arrow.svg';
import { useContext, useEffect, useRef } from 'react';
import { ScaleContext } from 'app/ScaleContext';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div<{$scale: number}>`
  transform: scale(${props => props.$scale});
  width: 687px;
  height: 687px;
  background-image: url(${dial});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;  
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const bounceInRight = keyframes`
  0%  { transform: rotate(0deg); }
  45% { transform: rotate(calc(720deg + 750deg)); }
  60% { transform: rotate(calc(720deg + 705deg)); }
  75% { transform: rotate(calc(720deg + 727deg)); }
  /* 85% { transform: rotate(calc(720deg + 710deg)); } */
  87% { transform: rotate(calc(720deg + 716deg)); }
  /* 97% { transform: rotate(717deg); }*/
  94% { transform: rotate(calc(720deg +722deg)); } 
  100% { transform: rotate(calc(720deg + 720deg)); }
`

const Arrow = styled.div<{$start: boolean, $scale: number}>`
  position: relative;
  width: 600px;
  height: 687px;
  background-image: url(${arrow});
  background-size: 327px 280px;
  background-position: center right;
  background-repeat: no-repeat;  
  ${props => props.$start && css`animation:  3s ${bounceInRight} ease-in-out;`}
  display: flex;
  justify-content: center;
  align-items: center;
  &::after{
    content: '';
    display: block;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background-color: #358879;
  }
`;

export const Dial = ({ start, disableAnimate }: {start: boolean, disableAnimate: () => void}) => { 
  const refEl = useRef<HTMLDivElement>(null)
  const scale = useContext(ScaleContext);
  useEffect(() => {
    if (!refEl.current) {
      return
    }
    const funcReset = () => disableAnimate();
    refEl.current.addEventListener('animationend', funcReset, false);
    return () => {
      refEl.current && refEl.current.removeEventListener('animationend', funcReset, false)
    };
  }, [])

  return (
    <Wrapper>
      <Container $scale={scale}>
        <Arrow ref={refEl} $start={start} $scale={scale} id='arrow'/>
      </Container>
    </Wrapper>
  )
}


// let dotValue, nextStep;

// const speed = 0.005; // 0 < speed < 1
// const velocity = 2.5; // velocity > 0

// document.querySelector('.runAnimation').addEventListener('click', () => {
//     dotValue = 0 // Reset position
//     cancelAnimationFrame(nextStep);
//     elastic();
// });

// function elastic() {

//     const elesticPosition = (Math.pow(2, -10 * dotValue) * Math.sin((dotValue * 10 - 0.75) * velocity) + 1) * 100;
//     document.documentElement.style.setProperty("--dotLeft", elesticPosition + "%");

//     dotValue += speed;
//     if (dotValue <= 1) {
//         nextStep = requestAnimationFrame(elastic);
//     }
// }
