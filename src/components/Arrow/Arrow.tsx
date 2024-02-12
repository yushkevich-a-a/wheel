import { ScaleContext } from 'app/ScaleContext';
import arrow from 'components/Arrow/arrow.svg';
import { useContext, useEffect, useRef } from 'react'
import styled, { css, keyframes } from 'styled-components';


const bounceInRight = keyframes`
  0%  { transform: rotate(0deg); }
  45% { transform: rotate(calc(720deg + 750deg)); }
  60% { transform: rotate(calc(720deg + 705deg)); }
  75% { transform: rotate(calc(720deg + 727deg)); }
  /* 85% { transform: rotate(calc(720deg + 710deg)); } */
  87% { transform: rotate(calc(720deg + 716deg)); }
  /* 97% { transform: rotate(717deg); }*/
  94% { transform: rotate(calc(720deg + 722deg)); } 
  100% { transform: rotate(calc(720deg + 720deg)); }
`;

const Container = styled.div<{$start: boolean, $scale: number}>`
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
export const Arrow = ({start, disableAnimate} : {start: boolean, disableAnimate : () => void}) => {
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
    <Container ref={refEl} $start={start} $scale={scale} id='arrow'/>
  )
}
