import styled from "styled-components"

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom:  30px;
`

export const Footer = ({children}: {children: any}) => {
  return (
    <Container>
        {
            children
        }
    </Container>
  )
}
