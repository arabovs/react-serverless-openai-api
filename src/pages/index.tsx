import * as React from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "gatsby";
import { styled } from "@mui/material/styles";

const getImageUrl = (index: number) => {
  return `https://cardsbg.s3.eu-north-1.amazonaws.com/zodiac-${index}.jpg`;
};

const star_signs = [
  { name: "Aries", date: "(March 21 - April 19)" },
  { name: "Taurus", date: "(April 20 - May 20)" },
  { name: "Gemini", date: "(May 21 - June 20)" },
  { name: "Cancer", date: "(June 21 - July 22)" },
  { name: "Leo", date: "(July 23 - August 22)" },
  { name: "Virgo", date: "(August 23 - September 22)" },
  { name: "Libra", date: "(September 23 - October 22)" },
  { name: "Scorpio", date: "(October 23 - November 21)" },
  { name: "Sagittarius", date: "(November 22 - December 21)" },
  { name: "Capricorn", date: "(December 22 - January 19)" },
  { name: "Aquarius", date: "(January 20 - February 18)" },
  { name: "Pisces", date: "(February 19 - March 20)" },
];

const StyledImg = styled("img")({
  maxWidth: "100%",
  height: "auto",
});

const IndexPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [chat, setChat] = React.useState("Please click on a zodiac sign :)");

  const fetchTextPrompt = async (prompt: string) => {
    setLoading(true);
    const result = await fetch("/api/chatgpt", {
      method: "POST",
      body: JSON.stringify({ prompt: prompt }),
    })
      .then((response) => response.json())
      .then((data) => {
        setChat(data.message);
        setLoading(false);
      })
      .catch((error) => console.error(error));
    return result;
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <Box display="flex" justifyContent="center" alignItems="center">
        {/* <Typography variant="h4" sx={{ color: "pink" }}>
          ♥ Цвети да оздравяваш бързо ♥
        </Typography> */}
      </Box>{" "}
      {loading && (
        <Typography variant="h4">
          Loading your daily choroscope please wait
        </Typography>
      )}
      <Box>
        <Grid container sx={{ display: "flex", margin: "normal" }} padding={1}>
          {star_signs.map((e, i) => {
            return (
              <Grid
                item
                xs={4}
                onClick={() => {
                  if (!loading) {
                    fetchTextPrompt(
                      "Today's astrological reading for the star sign " + e.name
                    );
                  }
                }}
              >
                <Typography variant="h5" sx={{ fontSize: 18 }}>
                  {e.name}
                </Typography>
                <img width={80} src={getImageUrl(i)}></img>
                <Typography sx={{ fontSize: 12 }}>{e.date}</Typography>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box sx={{ margin: "normal", mt: 2 }}>
        <Grid container sx={{ display: "flex", margin: "normal" }}>
          <Grid
            item
            xs={12}
            sx={{ flexWrap: "wrap", margin: "normal", display: "flex" }}
          >
            <img
              width={24}
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
            />
            <Typography sx={{ ml: 1 }}>Your daily horoscope:</Typography>
          </Grid>
          <Grid item xs={12} sx={{ flexWrap: "wrap", mt: 2 }}>
            <Typography>{chat}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", ml: 1, mt: 2 }}>
          <Typography>Authoured by:</Typography>
          <Box sx={{ ml: 1, mr: 1 }}>
            <img
              width={24}
              src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg"
            />
          </Box>
          <Link to="https://github.com/arabovs/">arabovs</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default IndexPage;
