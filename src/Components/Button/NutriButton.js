import React from "react"
import { tokens } from "../../Helpers/styleTokens";
import styled from "@emotion/styled"
import { css } from "@emotion/react"

// Props:
// secondary ; disabled ; rounded ; 

const { 
  color, font, borderRadius, spacing
} = tokens;

const StyledButton = styled.button`
  border-radius: ${borderRadius.default};
  background-color: ${color.transparent};
  border: none;
  color: ${props => 
    props.secondary ? color.buttonColorSecondary : color.buttonColorPrimary
  };
  cursor: pointer;
  display: ${props => 
    props.block === "block" ? "block" : ""
  };
  font-size: ${props => 
    props.big ? "20px" : font.fontSize.default
  };
  outline: none;
  padding: ${spacing.default} ${spacing.lg};
  &:hover {
    box-shadow: inset 0 0 0 100em rgb(0 0 0 / 10%);
  }
  width: ${props => props.block === "block" ? "100%" : ""};
  
  /* disabled */;
  ${props => {
    return (
      props.disabled &&
      css`
        :disabled {
          opacity: 0.4;
          pointer-events: none;
        }
      `
    )
  }}
  
  /* rounded */
  ${props => {
    return (
      ((typeof props.rounded === "boolean") && props.rounded) ? (
        css`
          border-radius: ${borderRadius.default};
        `
      ) : (
        css`
          border-radius: ${props.rounded};
        `
      )
    )
  }}
  
  /* size */;
  ${props => {
    return (
      props.size === "small" &&
      css`
        padding: ${spacing.sm};
        font-size: ${font.fontSize.sm};
      `
    )
  }}
  ${props => {
    return (
      props.size === "medium" &&
      css`
        padding: ${spacing.lg};
        font-size: ${font.fontSize.lg};
      `
    )
  }}
  ${props => {
    return (
      props.size === "large" &&
      css`
        padding: ${spacing.xl};
        font-size: ${font.fontSize.xl};
      `
    )
  }}
  ${props => {
    return (
      props.size &&
      css`
        padding: ${props.size / 2 + "px"} ${props.size + "px"};
        font-size: ${props.size + "px"};
      `
    )
  }}
  
  /* accent */;
  ${props => {
    return (
      props.accent === "secondary" &&
      css`
        background: ${color.secondary};
        color: ${color.buttonColorSecondary};
      `
    )
  }};
  ${props => {
    return (
      props.accent === "primary" &&
      css`
        background: ${color.primary};
        color: #fff;
      `
    )
  }};
  ${props => {
    return (
      props.accent === "warning" &&
      css`
        background: ${color.warning};
        color: #fff;
      `
    )
  }};
  ${props => {
    return (
      props.accent === "success" &&
      css`
        background: ${color.success};
        color: #fff;
      `
    )
  }};
  ${props => {
    return (
      props.accent === "info" &&
      css`
        background: ${color.info};
        color: #fff;
      `
    )
  }};
  ${props => {
    return (
      props.accent === "error" &&
      css`
        background: ${color.error};
        color: #fff;
      `
    )
  }};

  /* type */;
  ${props => {
    return (
      props.type === "light" &&
      css`
        color: ${props.color ? props.color : "#fff"};
        border: 1px solid ${props.color ? props.color
          : props.accent === "secondary" ? color.secondary
          : props.accent === "error" ? color.error
          : props.accent === "info" ? color.info
          : props.accent === "warning" ? color.warning
          : props.accent === "success" ? color.success
          : color.primary
        };
      `
    )
  }};
  ${props => {
    return (
      props.type === "ghost" &&
      css`
        background: ${color.transaprantBackground};
        color: ${props.color ? props.color
          : props.accent === "secondary" ? color.secondary
          : props.accent === "error" ? color.error
          : props.accent === "info" ? color.info
          : props.accent === "warning" ? color.warning
          : props.accent === "success" ? color.success
          : color.primary
        };
        border: none;
      `
    )
  }};
  ${props => {
    return (
      props.type === "hallow" &&
      css`
        background: ${color.transparent};
        color: ${props.color ? props.color
          : props.accent === "secondary" ? color.secondary
          : props.accent === "error" ? color.error
          : props.accent === "info" ? color.info
          : props.accent === "warning" ? color.warning
          : props.accent === "success" ? color.success
          : color.primary
        };
        border: 1px solid ${props.color ? props.color
          : props.accent === "secondary" ? color.secondary
          : props.accent === "error" ? color.error
          : props.accent === "info" ? color.info
          : props.accent === "warning" ? color.warning
          : props.accent === "success" ? color.success
          : color.primary
        };
      `
    )
  }}
`

const NutriButton = ({ ...props }) => {
  return (
    <StyledButton
      {...props}
      style={{ ...props }}
      onClick={e => props.onClick(e)}
    >
      {props.label}
    </StyledButton>
  )
}

export default NutriButton