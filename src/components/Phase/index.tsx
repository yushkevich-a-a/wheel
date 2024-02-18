import styled, { css, keyframes } from 'styled-components';

const bgMain = keyframes`
  0%  {color: #8000FF;}
  19%  {color: #8000FF;}
  20% {color: #FF0000;}
  39% {color: #FF0000;}
  40% {color: #FF8A00;}
  59% {color: #FF8A00;}
  60% {color: #FFFFFF;}
  79% {color: #FFFFFF;}
  80% {color: #42FF00;}
  99% {color: #42FF00;}
`;
const bgSub = keyframes`
  0%  {color: #FF6B00;}
  19%  {color: #FF6B00;}
  20% {color: #8000FF;}
  39% {color: #8000FF;}
  40% {color: #FF0000;}
  59% {color: #FF0000;}
  60% {color: #FF8A00;}
  79% {color: #FF8A00;}
  80% {color: #FFFFFF;}
  99% {color: #FFFFFF;}
`;

const Container = styled.div`
    max-width: 340px;
    display: flex;
    flex-direction: column;
    pointer-events: none;
`
const Tit = styled.div<{$enable: boolean}>`
    color: #9EFF00;
    ${props => props.$enable && css`animation:  .2s ${bgMain} linear infinite;`}
    font-size: 48px;
    white-space: nowrap;
`
const STit = styled.div<{$enable: boolean}>`
    font-family: 'Poiret One', sans-serif;
    font-size: 48px;
    color: #00F0FF;

    ${props => props.$enable && css`animation:  .2s ${bgSub} linear infinite;`}
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

export const Phase = ({title, subTitle, enableTrigger}: {title:string, subTitle:string, enableTrigger?:boolean}) => {
    return (
    <Container>
        <Tit $enable={!!enableTrigger}>{title}</Tit>
        <STit $enable={!!enableTrigger}>{subTitle}</STit>
    </Container>
  )
}
