import Link from 'next/link'
import StyledLink from "./StyledLink"
import styled, { css } from 'styled-components'

const StyledLi = styled.li`
float: left;
`

function linksBar() {
    return (
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0, overflow: 'hidden', backgroundColor: '#333333' }}>
        <StyledLi>
          <StyledLink href='/' name='Home' />

        </StyledLi>
        <StyledLi>
          <StyledLink href='/report' name='Report' />
        </StyledLi>
      </ul>
    )
}

export default linksBar;