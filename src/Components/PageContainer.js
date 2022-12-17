import styled from "@emotion/styled";
import { mediaQueries, tokens } from "../Helpers/styleTokens";

export const PageContainer = styled.div`
  box-sizing: border-box;
  height: auto;
  margin: 0 auto;
  min-height: calc(100vh - 205px); // header minus footer
  width: 100%;
  ${mediaQueries({
    paddingTop: [tokens.navHeight.md,tokens.navHeight.md,tokens.navHeight.lg]
  })}
`