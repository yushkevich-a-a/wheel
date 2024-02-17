
import styled from "styled-components";
import { Button } from 'components/Button';
import { Dial } from 'components/Dial';
import { Title } from 'components/Title';
import { useEffect, useState } from 'react';
import { ScaleContext } from './ScaleContext';
import { PhasesBlock } from "components/PhasesBlock";
import fib from './fib.svg'



const Wrapper = styled.div`
position: relative;
  width: 100%;
  height: 100vh;
  background: #000;
  overflow: hidden;
`;
const Container = styled.div<{$scale: number}>`
  /* transform: scale(${props => props.$scale}); */
  /* transform: scale(0.8); */
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
`;

function App() {
  const [ startAnim, setStartAnim ] = useState<boolean>(false);
  const [ scale, setScale ] = useState<number>(1);
  const [ enableColor, setEnableColor ] = useState<boolean>(false);

  useEffect(() => {
    const resizeCompute = () => {
      const width= window.innerWidth;
      const height = window.innerHeight;
      const scaleX = width / 1920;
      const scaleY = height / 1080;
      const arr = [scaleX, scaleY];
      setScale(Math.min(...arr));
    }
    resizeCompute();
    document.addEventListener('resize', resizeCompute);
    return () => {
      document.removeEventListener('resize', resizeCompute);
    }
  },[])

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
      <ScaleContext.Provider value={scale}>
        <Container $scale={scale}>
          <Title/>
          {/* <Fibonachi/> */}
          <PhasesBlock enableTrigger={enableColor} />
          <Dial start={startAnim} disableAnimate={handleStopAnimate} enableColor={handleStartColor}/>
          <Button disactive={startAnim} click={handleStartClick}/>
        </Container>
      </ScaleContext.Provider>
    </Wrapper>
  )
}

export default App
