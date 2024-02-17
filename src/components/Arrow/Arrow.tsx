import { ScaleContext } from 'app/ScaleContext';
import arrow from 'components/Arrow/arrow.svg';
import { useContext, useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components';

// const Wrapper = styled.div`
//   position: absolute;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   border-radius: 50%;
//   overflow: hidden;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const Container = styled.div<{$scale: number}>`
  position: relative;
  width: 600px;
  height: 600px;
  overflow: hidden;
  border-radius: 50%;
  transition: transform 3s ease;
`;

const Pie = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  transform: rotate(-91deg);
  display: flex;
  justify-content: center;
  align-items: center;
  &::after{
    content: '';
    display: block;
    position: relative;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background-color: #358879;
  }  
  &::before{
    content: '';
    position: absolute;
    display: block;
    width: 325px;
    height: 42px;
    background-image: url(${arrow});
    background-size: contain;
    background-repeat: no-repeat;  
    right: 0;
  }`;

export const Arrow = ({start, disableAnimate, enableColor } : {start: boolean, disableAnimate : () => void, enableColor: () => void}) => {
  const [ offset, setOffset ] = useState<number>(100);
  const [ rotate, setRotate ] = useState<number>(90);
  const scale = useContext(ScaleContext);
  const ref=useRef<HTMLDivElement>(null);

  const stopTransition = () => {
    disableAnimate();
    enableColor();
    setRotate(90);
  }

  const resetOffsetShadow = () => {
    const timer = setTimeout(resetOffsetShadow, 400);
    setOffset(state => {
      if (state < 100) {
      return state + 1;
      } 
      clearTimeout(timer);
      return state;
    })
  }

  const setOffsetShadow = () => {
    setTimeout(resetOffsetShadow, 1500);
    const timer = setTimeout(setOffsetShadow, 40);
    setOffset(state => {
      if (state > 60) {
      return state - 3;
      } 
      clearTimeout(timer);
      return state;
    })

  }

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.addEventListener('transitionend', stopTransition);
    ref.current.addEventListener('transitionstart', setOffsetShadow);

    return () => {
      ref.current && ref.current.removeEventListener('transitionend', stopTransition);
      ref.current && ref.current.removeEventListener('transitionstart', setOffsetShadow);
    }
  },[]);


  useEffect(() => {
    if(start) {
      setRotate(810);
      return;
    }
  },[start]);

  return (
    <Container 
      ref={ref}
      $scale={scale}
      style={{
        "background": `conic-gradient(transparent ${offset + '%'}, rgb(38 212 250 / 100%) ${offset + 70 + '%'})`,
        "transition": `${start && "transform 3s"}`,
        "transform": `rotate(${rotate}deg)`,
      }}
    >
        <Pie />
    </Container>
  )
}
