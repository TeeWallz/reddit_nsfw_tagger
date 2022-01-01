import TagSelecter from "./indexComponents/tagSelecter"
import LinksBar from "./linksBar"
import Link from 'next/link'
import StyledLink from "./StyledLink"
import styled, { css } from 'styled-components'




export default function yeet(tags) {

  return (
    <div>
      <link href="/styles/tags.css" rel="stylesheet" />
      <LinksBar />
      <div class="container">
        <h1>Reddit NSFW Tag Search</h1>
        <h2>For your aquired tastes</h2>
        <TagSelecter />
        {/* <hr/>
        <h3>Custom tags</h3>
        <CustomTags /> */}
      </div>
    </div>
  )

}