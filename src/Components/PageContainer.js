import styled from "@emotion/styled";
import { tokens } from "../Helpers/styleTokens";

export const PageContainer = styled.div`
  box-sizing: border-box;
  height: auto;
  margin: 0 auto;
  min-height: calc(100vh - 205px); // header minus footer
  padding-top: ${tokens.navHeight.lg};
  width: 100%;
`