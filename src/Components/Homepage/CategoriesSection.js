/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { css } from '@emotion/react';
import { tokens } from '../../Helpers/styleTokens';
import { AnimatePresence, motion } from 'framer-motion';
import { NutriButton } from '../NutriButton';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { SectionTitle } from './Homepage';

const categories = [
  {
    icon: "/brain",
    title: "Mental",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
  },
  {
    icon: "/arrowsUp",
    title: "Growth",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
  },
  {
    icon: "/Armor",
    title: "Resistance",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
  },
  {
    icon: "/plusSign",
    title: "Unique",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
  },
]

export const CategoriesSection = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState("")
  
  return (
    <div 
      css={css`
        display: flex; 
        flex-direction: column;
      `}
    >
      <SectionTitle>
          Categories
      </SectionTitle>
      <div
        css={css`
          display: flex;
          margin: ${tokens.spacing.lg} auto;
          margin-bottom: 300px; // temp
          width: 1100px;
        `}
      >
        {categories.map(category => (
          <motion.div
            onMouseEnter={() => setHovered(category.title)}
            // onMouseLeave={() => setHovered("")}
            onClick={() => navigate("/shop")}
            css={css`
              background: ${tokens.color.primary};
              border: 2px solid ${tokens.color.accentWeak};
              border-right: 0;
              display: flex;
              flex-direction: column;
              padding: ${tokens.spacing.xxl};
              position: relative;
              &:nth-last-of-type(1) {
                border-right: 2px solid ${tokens.color.accentWeak};
              }
            `}
            key={category.title}
          >
            <AnimatePresence>
              {category.title === hovered && (
                <motion.div
                  css={css`
                    align-items: center;
                    background: ${tokens.color.primary};
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    inset: 0;
                    justify-content: center;
                    position: absolute;
                  `}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <img
                    css={css`
                      background: deeppink;
                      height: 100px;
                      position: absolute;
                      inset: 0;
                      top: 50%;
                      transform: translateY(-50%);
                      z-index: 0;
                    `}
                    alt={category.icon}
                    src={category.icon} 
                  />
                  <NutriButton
                    label="SHOP"
                    style={{ boxShadow: "0 0 0" }}
                    css={css`
                      z-index: 1;
                    `}  
                    type="filled"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <img src={category.icon} alt={category.icon} />
            <h4 css={css`
              font-weight: ${tokens.font.fontWeight.medium};
              text-transform: uppercase;
            `}>
              {category.title}
            </h4>
            <p>
              {category.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}