import styled from 'styled-components';
import dial from './dial.svg';
import { Arrow } from 'components/Arrow/Arrow';

const Container = styled.div`
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
  return (
      <Container>
        <Arrow start={start} disableAnimate={disableAnimate} enableColor={enableColor}/>
      </Container>
  )
}
