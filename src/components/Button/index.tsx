import { useContext } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  bottom: 10%;
  left: 5%;
  
  user-select: none;

    overflow: hidden;
    transform: rotate(-0deg) skewX(25deg);
    border-radius: 4px;
    width: 342px;
    height: 112px;
`;


const StyledButton = styled.div` 
  width: 320px;
  height: 65px;;
  background-color: #2D2D2D;
  position: absolute;
  z-index: 1;
  color: #FFE500;
  display: flex;
  border-radius: 4px;
  font-size: 48px;
  align-items: center;
  justify-content: center;
  transition: all .2s;
  border: 2px solid white;
  &:hover {
      background-color: #323232;
    }
  &:before{
    content: '';
    position: absolute;
    top: 22px;
    left: -23px;
    background-color: #282727;
    height: 106%;
    width: 20px;
    transform: rotate(0deg) skewY(-65deg);
    border-top-left-radius: 3px;
    z-index: 0;
  }

  &:after{
    content: '';
    position: absolute;
    bottom: -46px;
    left: -12px;
    background-color: #2D2D2D;
    height: 44px;
    width: 101%;
    z-index: 0;
    transform: rotate(0deg) skewX(-25deg);
    border-bottom-right-radius: 2px;
  }
`



export const Button = ({disactive, click}: {disactive: boolean, click: () => void}) => {
  return (
    <Wrapper>
      <StyledButton onClick={click} style={{
          left: `${disactive ? 16: 21 }px`,
          top: `${disactive ? 16: 3 }px`,
      }}>
        Кнопка
      </StyledButton>
    </Wrapper>
  )
}
