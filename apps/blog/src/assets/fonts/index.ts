import { Nunito_Sans, Montserrat } from "next/font/google";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito_sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const FONTS = {
  nunitoSans,
  montserrat,
  get variable() {
    return `${this.montserrat.variable} ${this.nunitoSans.variable}`;
  },
};

export default FONTS;
