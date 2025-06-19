import { Nunito_Sans } from "next/font/google";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito_sans",
});

const FONTS = {
  nunitoSans,
};

export default FONTS;
