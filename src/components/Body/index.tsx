import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 120px;
`

export const Body = ({children}: {children: any}) => {
  return (
    <Container>
        {
            children
        }
    </Container>
  )
}
