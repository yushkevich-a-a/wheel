import { ScaleContext } from 'app/ScaleContext';
import { Phase } from 'components/Phase';
import { useContext } from 'react';
import styled from 'styled-components';

const CenterBlocks = styled.div<{$scale: number}>`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0 150px;
        /* padding: 0 ${props => 150 * props.$scale + "px"}; */

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BottomBlock = styled.div`
    position: absolute;
    right: 0;
    bottom: 4%;
    left: 0;
    padding: 0 150px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const PhasesBlock = () => {
    const scale = useContext(ScaleContext);
  return (
    <>
        <CenterBlocks $scale={scale}>
            <Phase title={'Фаза №1'} subTitle={'Верхнеуровневый план'} />
            <Phase title={'Фаза №2'} subTitle={'Есть слона по частям'}/>
        </CenterBlocks>
        <BottomBlock >
            <Phase title={'Фаза №3'} subTitle={'Профит'} />
        </BottomBlock>

    </>
  )
}
