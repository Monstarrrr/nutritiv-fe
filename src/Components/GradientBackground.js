import { motion } from 'framer-motion';
import styled from '@emotion/styled'
import { tokens } from '../Helpers/styleTokens';

export const GradientBackground = ({ ...props }) => {
  const { 
    firstColor, secondColor, initial, exit, transition 
  } = props;
  
  const Background = styled(motion.div)`
    ${firstColor && secondColor && (`
      background-image: linear-gradient(
        180deg,
        ${tokens.color[`${firstColor}`]} 0px,
        ${tokens.color[`${firstColor}`]} 650px,
        ${tokens.color[`${secondColor}`]} 1250px
      );
    `)}
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  `
  return (
    <Background 
      initial={initial} 
      exit={exit} 
      transition={transition} 
    />
  )
}