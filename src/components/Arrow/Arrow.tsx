import { ScaleContext } from 'app/ScaleContext';
import arrow from 'components/Arrow/arrow.svg';
import { useContext, useEffect, useRef } from 'react'
import styled, { css, keyframes } from 'styled-components';


const bounceInRight = keyframes`
  0%  { transform: rotate(0deg); }
  45% { transform: rotate(calc(720deg + 750deg)); }
  60% { transform: rotate(calc(720deg + 705deg)); }
  75% { transform: rotate(calc(720deg + 727deg)); }
  90% { transform: rotate(calc(720deg + 716deg)); } 
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
export const Arrow = ({start, disableAnimate, enableColor } : {start: boolean, disableAnimate : () => void, enableColor: () => void}) => {
  const refEl = useRef<HTMLDivElement>(null)
  const scale = useContext(ScaleContext);
  useEffect(() => {
    if (!refEl.current) {
      return
    }
    const funcReset = () => disableAnimate();

    const funcGlitch = () => {
      setTimeout(enableColor, 2000);
    };

    refEl.current.addEventListener('animationend', funcReset, false);
    refEl.current.addEventListener('animationstart', funcGlitch, false);
    return () => {
      refEl.current && refEl.current.removeEventListener('animationend', funcReset, false)
      refEl.current && refEl.current.removeEventListener('animationstart', funcGlitch, false)
    };
  }, [])
  return (
    <Container ref={refEl} $start={start} $scale={scale} id='arrow'/>
  )
}
