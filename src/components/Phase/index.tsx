import { ScaleContext } from 'app/ScaleContext';
import { useContext } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ $scale: number }>`
     transform: scale(${props => props.$scale}) ;
    max-width: 340px;
    display: flex;
    flex-direction: column;
    pointer-events: none;
`
const Tit = styled.div`
    color: #9EFF00;
    font-size: 48px;
    white-space: nowrap;
`
const STit = styled.div`
    font-family: 'Poiret One', sans-serif;
    font-size: 48px;
    color: #00F0FF;
    white-space: nowrap;
    text-align: center;
    &:before {
    content: "";
        margin-left: -100%;
    }
    &:after {
        content: "";
        margin-right: -100%;
    }
`

export const Phase = ({title, subTitle}: {title:string, subTitle:string}) => {
    const scale = useContext(ScaleContext);
  
    return (
    <Container $scale={scale}>
        <Tit>{title}</Tit>
        <STit>{subTitle}</STit>
    </Container>
  )
}
