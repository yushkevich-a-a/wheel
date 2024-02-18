
import styled from "styled-components";
import { Button } from 'components/Button';
import { Dial } from 'components/Dial';
import { Title } from 'components/Title';
import { useEffect, useState } from 'react';
import fib from './fib.svg'
import { Phase } from "components/Phase";
import { Footer } from "components/Footer";
import { Body } from "components/Body";

const Wrapper = styled.div`
position: relative;
  width: 100%;
  height: 100vh;
  background: #000;
  overflow: hidden;
`;
const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url(${fib});
  background-size: auto;
  background-position: center;
  background-repeat: no-repeat;  
  display:flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FlexBlock = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

function App() {
  const [ startAnim, setStartAnim ] = useState<boolean>(false);
  const [ enableColor, setEnableColor ] = useState<boolean>(false);

  const handleStartClick = () => {
    if(startAnim) {
      return
    }
    setStartAnim(true) ;
  }

  const handleStopAnimate = () => {
    setStartAnim(false)
  }
  const handleStartColor = () => {
    setEnableColor(true);
    setTimeout( () => setEnableColor(false),2000);
  }

  return (
    <Wrapper>
        <Container>
          <FlexBlock>
            <Title/>
          </FlexBlock>
          <Body>
            <Phase title={'Фаза №1'} subTitle={'Верхнеуровневый план'} />
            <Dial start={startAnim} disableAnimate={handleStopAnimate} enableColor={handleStartColor}/>
            <Phase title={'Фаза №2'} subTitle={'Есть слона по частям'} enableTrigger={enableColor}/>
          </Body>
          <Footer>
            <Button disactive={startAnim} click={handleStartClick}/>
            <Phase title={'Фаза №3'} subTitle={'Профит'} />
          </Footer>
        </Container>
    </Wrapper>
  )
}

export default App
