import styled from "@emotion/styled";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../Helpers/styleTokens";

export const DelayLink = (props) => {
  const { label, delay, replace, to } = props;
  let timeout = null;
  let navigate = useNavigate();
  let location = useLocation();
  
  const NavLink = styled(({active, ...props }) => <Link {...props} />)`
    font-size: ${tokens.font.fontSize.sm};
    pointer-events: ${props => 
      props.active && `none`
    };
    user-select: none;
    z-index: 1;
  `
  
  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timeout]);
  
  const handleClick = e => {
    if (location?.pathname === to) return;
    if (e.defaultPrevented) return;
    e.preventDefault();

    timeout = setTimeout(() => {
      navigate(to, { replace })
    }, delay);
  };
  
  return (
    <NavLink to={to} onClick={handleClick}>
      {label}
    </NavLink>
  )
}