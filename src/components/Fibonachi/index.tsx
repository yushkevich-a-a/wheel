import styled from 'styled-components';
import fib from './fib.svg';
import { useContext } from 'react';
import { ScaleContext } from 'app/ScaleContext';

const Container = styled.div<{$scale: number}>`
    position: absolute;
    transform: scale(${props => props.$scale}) 
      translate(562px, -63px);
    width: 1359px;
    height: 841px;
    background-image: url(${fib});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    pointer-events: none;
`

export const Fibonachi = () => {
  const scale = useContext(ScaleContext);
  return (
    <Container $scale={scale}/>
  )
}
