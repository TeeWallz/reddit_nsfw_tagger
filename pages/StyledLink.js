import styled, { css } from 'styled-components'
import Link from 'next/link'


const StyledLink = styled.a`
display: block;
color: white;
text-align: center;
padding: 16px;
text-decoration: none;
`

export default ({ href, name }) => (
  <Link href={href} passHref>
    <StyledLink>{name}</StyledLink>
  </Link>
)