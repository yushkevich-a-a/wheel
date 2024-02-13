import styled from 'styled-components';
import dial from './dial.svg';
import { useContext } from 'react';
import { ScaleContext } from 'app/ScaleContext';
import { Arrow } from 'components/Arrow/Arrow';

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

export const Dial = ({ start, disableAnimate, enableColor }: {start: boolean, disableAnimate: () => void, enableColor: () => void}) => { 
  const scale = useContext(ScaleContext);
  return (
    <Wrapper>
      <Container $scale={scale}>
        <Arrow start={start} disableAnimate={disableAnimate} enableColor={enableColor}/>
      </Container>
    </Wrapper>
  )
}
