import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    contentBgColor: string;
    accentColor: string;
    titleFontSize: string;
    subtitleFontSize: string;
    fontSize: string;
    gainColor: string;
    loseColor: string;
    hoverColor: string;
    inputColor: string;
    titleColor: string;
  }
}
