import styled from "styled-components";
import tit from './tit.svg';
import { useContext } from "react";
import { ScaleContext } from "app/ScaleContext";

const Container = styled.div<{$scale: number}>`
    transform: scale(${props => props.$scale}); 
    margin: 16px auto 0;
    width:  1442px;
    height: 101px;
    background-image: url(${tit});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    pointer-events: none;
`;


export const Title = () => {
  const scale = useContext(ScaleContext);
  return (
    <Container $scale={scale}/>
  )
}
