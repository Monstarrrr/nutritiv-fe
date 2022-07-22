export const config = {
  primaryColor: "#020047",
  secondaryColor: "#147aa5",
  accentColorStrong: "#15f1ff",
  accentColorWeak: "#205088",
  
  lightContrastColor: "#F2F2F2",
  darkContrastColor: "#0e1014",
  lightTransparentColor: `rgba(255, 255, 255, 0.1)`,
  
  successColor: "#198754",
  infoColor: "#141270",
  inactiveColor: "#9d9ccc",
  warningColor: "#ffc107",
  errorColor: "#dc3545",

  xsFontsize: "12px",
  smFontsize: "14px",
  mdFontsize: "18px",
  lgFontsize: "24px",
  xlFontsize: "32px",
  
  xsSpacing: "4px",
  smSpacing: "8px",
  mdSpacing: "12px",
  lgSpacing: "16px",
  xlSpacing: "24px",
  xxlSpacing: "42px",
  
  xsRadius: "0px",
  smRadius: "4px",
  mdRadius: "8px",
  lgRadius: "12px",
  
  xsBorder: "1px solid",
  smBorder: "2px solid",
  mdBorder: "4px solid",
}

export const tokens = {
  color: {
    // GENERAL
    primary: `${config.primaryColor}`,
    secondary: `${config.secondaryColor}`,
    accentStrong: `${config.accentColorStrong}`,
    accentWeak: `${config.accentColorWeak}`,
    
    contrastLight: `${config.lightContrastColor}`,
    contrastDark: `${config.darkContrastColor}`,
    transparentLight: `${config.lightTransparentColor}`,
    transparent: `transparent`,
    
    success: `${config.successColor}`,
    info: `${config.infoColor}`,
    inactive: `${config.inactiveColor}`,
    warning: `${config.warningColor}`,
    error: `${config.errorColor}`,
        
    // SPECIFIC
    titleColor: `${config.lightContrastColor}`,
    paragraphColor: `${config.lightTransparentColor}`,
    buttonColorPrimary: `${config.buttonColorPrimary}`,
    buttonColorSecondary: `${config.buttonColorSecondary}`,
  },

  spacing: {
    xs: `${config.xsSpacing}`,
    sm: `${config.smSpacing}`,
    md: `${config.mdSpacing}`,
    lg: `${config.lgSpacing}`,
    xl: `${config.xlSpacing}`,
    xxl: `${config.xxlSpacing}`,
  },
  
  font: {
    fontSize: {
      xs: `${config.xsFontsize}`,
      sm: `${config.smFontsize}`,
      md: `${config.mdFontsize}`,
      lg: `${config.lgFontsize}`,
      xl: `${config.xlFontsize}`,
    },
    fontWeight: {
      thin: "100",
      light: "300",
      normal: "500",
      bold: "700",
      extrabold: "900",
    },
    fontFamily: {
      sans: ['"source sans pro"', "helvetica", "arial", "sans-serif"],
      mono: ['"source code pro"', "monospace"],
    },
  },
  
  letterSpacing: {
    normal: "0",
    wide: "0.2px",
  },
  lineHeight: {
    none: "1",
    tight: "1.25",
    normal: "1.5",
    loose: "2",
  },
  
  position: {
    static: "static",
    relative: "relative",
    absolute: "absolute",
    fixed: "fixed",
    sticky: "sticky",
  },
  positionValue: {
    top: "",
    bottom: "",
    left: "",
    right: "",
  },

  border: {
    xs: `${config.xsBorder}`,
    sm: `${config.smBorder}`,
    md: `${config.mdBorder}`,
  },
  borderRadius: {
    default: `${config.mdRadius}`,
    none: "0",
    xs: `${config.xsRadius}`,
    md: `${config.mdRadius}`,
    lg: `${config.lgRadius}`,
    round: "50%",
  },
  
  size: {
    large: "large",
    medium: "medium",
    small: "small",
  },
  maxWidth: {
    sm: "544px",
    md: "768px",
    lg: "1012px",
    xl: "1280px",
  },
  
  listStyleType: {
    none: "none",
    disc: "disc",
    decimal: "decimal",
  },

  // Specifics
  navHeight: "120px",
}