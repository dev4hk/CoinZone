import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    titleFontSize: string;
    subtitleFontSize: string;
    fontSize: string;
  }
}
