import { ScaleContext } from 'app/ScaleContext'
import { useContext } from 'react'
import styled from 'styled-components'

// const Wrapper = styled.div<{$scale: number}>`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   padding: 60px 75px;
//   `;
const StyledButton = styled.div<{$scale: number}>` 
  transform: scale(${props => props.$scale});
  /* margin: ${props => props.$scale * 60 +'px'} ${props => props.$scale * 75 +'px'}; */
  /* margin: 5% 4%; */
  position: absolute;
  bottom: 4%;
  left: 5%;
  line-height: 1;
  color: #FFE500;
  font-size: 48px;
  padding: 40px 80px;
  border: 2px solid white;
  border-radius: 16px;
  background-color: #2D2D2D;
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: #323232;
  }
`

export const Button = ({click}: {click: () => void}) => {
  const scale = useContext(ScaleContext);
  return (
    // <Wrapper $scale={scale} >
      <StyledButton $scale={scale} onClick={click}>Кнопка</StyledButton>
    // </Wrapper>
  )
}
