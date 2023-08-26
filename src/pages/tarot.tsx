import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";

const cards = [
  { url: "TheWorld.jpg", name: "TheWorld" },
  { url: "Judgement.jpg", name: "Judgement" },
  { url: "TheSun.jpg", name: "TheSun" },
  { url: "TheMoon.jpg", name: "TheMoon" },
  { url: "TheStar.jpg", name: "TheStar" },
  { url: "TheTower.jpg", name: "TheTower" },
  { url: "TheDevil.jpg", name: "TheDevil" },
  { url: "Temperance.jpg", name: "Temperance" },
  { url: "Death.jpg", name: "Death" },
  { url: "TheHangedMan.jpg", name: "TheHangedMan" },
  { url: "Justice.jpg", name: "Justice" },
  { url: "WheelOfFortune.jpg", name: "WheelOfFortune" },
  { url: "TheHermit.jpg", name: "TheHermit" },
  { url: "Strength.jpg", name: "Strength" },
  { url: "TheChariot.jpg", name: "TheChariot" },
  { url: "TheLovers.jpg", name: "TheLovers" },
  { url: "TheHierophant.jpg", name: "TheHierophant" },
  { url: "TheEmperor.jpg", name: "TheEmperor" },
  { url: "TheEmpress.jpg", name: "TheEmpress" },
  { url: "TheHighPriestess.jpg", name: "TheHighPriestess" },
  { url: "TheMagician.jpg", name: "TheMagician" },
  { url: "TheFool.jpg", name: "TheFool" },
  { url: "Wands01.jpg", name: "Wands01" },
  { url: "Wands02.jpg", name: "Wands02" },
  { url: "Wands03.jpg", name: "Wands03" },
  { url: "Wands04.jpg", name: "Wands04" },
  { url: "Wands05.jpg", name: "Wands05" },
  { url: "Wands06.jpg", name: "Wands06" },
  { url: "Wands07.jpg", name: "Wands07" },
  { url: "Wands08.jpg", name: "Wands08" },
  { url: "Wands09.jpg", name: "Wands09" },
  { url: "Wands10.jpg", name: "Wands10" },
  { url: "Wands11.jpg", name: "Wands11" },
  { url: "Wands12.jpg", name: "Wands12" },
  { url: "Wands13.jpg", name: "Wands13" },
  { url: "Wands14.jpg", name: "Wands14" },
  { url: "Swords01.jpg", name: "Swords01" },
  { url: "Swords02.jpg", name: "Swords02" },
  { url: "Swords03.jpg", name: "Swords03" },
  { url: "Swords04.jpg", name: "Swords04" },
  { url: "Swords05.jpg", name: "Swords05" },
  { url: "Swords06.jpg", name: "Swords06" },
  { url: "Swords07.jpg", name: "Swords07" },
  { url: "Swords08.jpg", name: "Swords08" },
  { url: "Swords09.jpg", name: "Swords09" },
  { url: "Swords10.jpg", name: "Swords10" },
  { url: "Swords11.jpg", name: "Swords11" },
  { url: "Swords12.jpg", name: "Swords12" },
  { url: "Swords13.jpg", name: "Swords13" },
  { url: "Swords14.jpg", name: "Swords14" },
  { url: "Cups01.jpg", name: "Cups01" },
  { url: "Cups02.jpg", name: "Cups02" },
  { url: "Cups03.jpg", name: "Cups03" },
  { url: "Cups04.jpg", name: "Cups04" },
  { url: "Cups05.jpg", name: "Cups05" },
  { url: "Cups06.jpg", name: "Cups06" },
  { url: "Cups07.jpg", name: "Cups07" },
  { url: "Cups08.jpg", name: "Cups08" },
  { url: "Cups09.jpg", name: "Cups09" },
  { url: "Cups10.jpg", name: "Cups10" },
  { url: "Cups11.jpg", name: "Cups11" },
  { url: "Cups12.jpg", name: "Cups12" },
  { url: "Cups13.jpg", name: "Cups13" },
  { url: "Cups14.jpg", name: "Cups14" },
  { url: "Pentacles01.jpg", name: "Pentacles01" },
  { url: "Pentacles02.jpg", name: "Pentacles02" },
  { url: "Pentacles03.jpg", name: "Pentacles03" },
  { url: "Pentacles04.jpg", name: "Pentacles04" },
  { url: "Pentacles05.jpg", name: "Pentacles05" },
  { url: "Pentacles06.jpg", name: "Pentacles06" },
  { url: "Pentacles07.jpg", name: "Pentacles07" },
  { url: "Pentacles08.jpg", name: "Pentacles08" },
  { url: "Pentacles09.jpg", name: "Pentacles09" },
  { url: "Pentacles10.jpg", name: "Pentacles10" },
  { url: "Pentacles11.jpg", name: "Pentacles11" },
  { url: "Pentacles12.jpg", name: "Pentacles12" },
  { url: "Pentacles13.jpg", name: "Pentacles13" },
  { url: "Pentacles14.jpg", name: "Pentacles14" },
  { url: "CardBacks.jpg", name: "CardBacks" },
];

const TarotPage = () => {
  const [card, setCard] = React.useState("CardBacks.jpg");
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

  const URL = "https://cardsbg.s3.eu-north-1.amazonaws.com/tarot/";
  const cardbackUrl =
    "https://cardsbg.s3.eu-north-1.amazonaws.com/tarot/CardBacks.jpg";

  const pickRandomCard = async () => {
    setChat("");
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    setCard(randomCard.url);
    await fetchTextPrompt(
      "Tarot card meaning for the card: " + randomCard.name
    );
  };

  const getCardImage = (url) => {
    return URL + url;
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        backgroundColor: "#f8f9fa",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        sx={{
          fontSize: "2.5rem",
          marginBottom: "1rem",
        }}
      >
        Tarot Card Reader
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <Box>
          <img
            style={{
              width: "280px",
              borderRadius: "15px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            src={getCardImage(card)}
            alt="Tarot Card"
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "200px",
            fontSize: "1.2rem",
            fontWeight: "medium",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          onClick={async (e) => {
            if (!loading) {
              await pickRandomCard();
            }
          }}
        >
          Generate Card
        </Button>
        <Box
          sx={{
            marginTop: "1rem",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontStyle: "italic",
              whiteSpace: "pre-line",
            }}
          >
            {chat}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default TarotPage;
