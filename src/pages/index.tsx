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

const StyledImg = styled("img")({
  maxWidth: "100%",
  height: "auto",
});

const options = ["OpenAI", "MidJourney", "Stable Diffusion"];

const IndexPage = () => {
  const [selectedOption, setSelectedOption] = React.useState(options[0]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [image, setImage] = React.useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/330px-Image_created_with_a_mobile_phone.png"
  );

  const [chat, setChat] = React.useState("Please enter prompt :)");

  const [prompt, setPrompt] = React.useState("");
  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const fetchDalleImage = async (prompt: string) => {
    const result = await fetch("/api/dalle", {
      method: "POST",
      body: JSON.stringify({ prompt: prompt }),
    })
      .then((response) => response.json())
      .then((data) => {
        const message = JSON.parse(data.message);
        setImage(message.data[0]?.url);
      })
      .catch((error) => console.error(error));
    return result;
  };

  const fetchTextPrompt = async (prompt: string) => {
    const result = await fetch("/api/chatgpt", {
      method: "POST",
      body: JSON.stringify({ prompt: prompt }),
    })
      .then((response) => response.json())
      .then((data) => {
        const message = JSON.parse(data.message);
        setChat(message.choices[0].message?.content);
      })
      .catch((error) => console.error(error));
    return result;
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          select
          label="Select an option"
          value={selectedOption}
          margin="normal"
          sx={{ width: 200 }}
          onChange={handleOptionChange}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: "flex" }}>
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
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          fullWidth
          label="Enter Prompt"
          value={prompt}
          onChange={handlePromptChange}
          multiline
          rows={4}
        />
      </Box>
      <Box>
        <Button
          onClick={() => {
            fetchDalleImage(prompt);
            fetchTextPrompt(prompt);
          }}
          variant="contained"
          sx={{ width: 200, mt: 2 }}
        >
          Submit
        </Button>
      </Box>
      <Box sx={{ margin: "normal", mt: 2 }}>
        <Grid container sx={{ display: "flex", margin: "normal" }}>
          <Grid
            item
            xs={6}
            sx={{ flexWrap: "wrap", margin: "normal", display: "flex" }}
          >
            <img
              width={24}
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
            />
            <Typography sx={{ ml: 1 }}>OpenAI ChatGPT3.5:</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ flexWrap: "wrap", margin: "normal", display: "flex" }}
          >
            <img
              width={24}
              src="https://c.clc2l.com/c/thumbnail75webp/t/D/a/Dall-E-hXSMxM.png"
            />
            <Typography sx={{ ml: 1 }}>OpenAI D-alle:</Typography>
          </Grid>
          <Grid item xs={6} sx={{ flexWrap: "wrap", mt: 2 }}>
            <TextField fullWidth disabled value={chat} multiline rows={21} />
          </Grid>
          <Grid item xs={6} sx={{ flexWrap: "wrap", mt: 2 }}>
            <StyledImg sx={{ ml: 5 }} src={image} />
          </Grid>
        </Grid>
      </Box>
      <Typography marginTop={1}>Power by:</Typography>
      <StyledImg
        sx={{ mt: 1 }}
        src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg"
      />
    </Container>
  );
};

export default IndexPage;
