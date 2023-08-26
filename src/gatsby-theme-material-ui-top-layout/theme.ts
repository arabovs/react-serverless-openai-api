// import { grey } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
  palette: {
    // mode: "dark",
    // primary: {
    //   main: "#d7210a",
    // },
  },
});

export default responsiveFontSizes(theme);
