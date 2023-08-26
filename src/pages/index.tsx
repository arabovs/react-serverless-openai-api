import * as React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "gatsby";
import { styled } from "@mui/material/styles";

const getImageUrl = (index: number) => {
  return `https://cardsbg.s3.eu-north-1.amazonaws.com/zodiac-${index}.jpg`;
};

const star_signs = [
  { name: "Aries", date: "(Mar 21 - Apr 19)" },
  { name: "Taurus", date: "(Apr 20 - May 20)" },
  { name: "Gemini", date: "(May 21 - Jun 20)" },
  { name: "Cancer", date: "(Jun 21 - Jul 22)" },
  { name: "Leo", date: "(Jul 23 - Aug 22)" },
  { name: "Virgo", date: "(Aug 23 - Sep 22)" },
  { name: "Libra", date: "(Sep 23 - Oct 22)" },
  { name: "Scorpio", date: "(Oct 23 - Nov 21)" },
  { name: "Sagittarius", date: "(Nov 22 - Dec 21)" },
  { name: "Capricorn", date: "(Dec 22 - Jan 19)" },
  { name: "Aquarius", date: "(Jan 20 - Feb 18)" },
  { name: "Pisces", date: "(Feb 19 - Mar 20)" },
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
        setChat(data.message.replace(/\n/g, ""));
        setLoading(false);
      })
      .catch((error) => console.error(error));
    return result;
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 1.2,
          maxWidth: 800,
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h4">Your daily choroscope</Typography>
        </Box>{" "}
        {loading && (
          <Typography variant="h4">
            Loading your daily choroscope please wait
          </Typography>
        )}
        <Box>
          <Grid
            container
            sx={{ display: "flex", margin: "normal" }}
            padding={0.5}
          >
            {star_signs.map((e, i) => {
              return (
                <Grid
                  item
                  xs={4}
                  sx={{
                    mt: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    if (!loading) {
                      fetchTextPrompt(
                        "Today's astrological reading for the star sign " +
                          e.name
                      );
                    }
                  }}
                >
                  <Box>
                    <Typography variant="h5" sx={{ fontSize: 18, mt: 1 }}>
                      {e.name}
                    </Typography>
                  </Box>
                  <img
                    style={{
                      borderRadius: "50%",
                      width: "75px",
                      height: "75px",
                      marginTop: "4px",
                    }}
                    src={getImageUrl(i)}
                  ></img>
                  <Typography sx={{ fontSize: 12, mt: 1 }}>{e.date}</Typography>
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
              <Typography sx={{ fontStyle: "Apple Color Emoji" }}>
                {chat}
              </Typography>
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
      </Box>
    </Container>
  );
};

export default IndexPage;
