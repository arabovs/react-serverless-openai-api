import * as React from "react";
import { Box, Button, MenuItem, TextField, Container } from "@mui/material";
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
      <Box sx={{ display: "flex", mt: 5 }}>
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
          sx={{ width: 200, mt: 5 }}
        >
          Submit
        </Button>
      </Box>
      <Box sx={{ display: "flex", mt: 5 }}>
        <TextField fullWidth disabled value={chat} multiline rows={16} />
      </Box>
      <Box>
        <StyledImg sx={{ mt: 5 }} src={image} />
      </Box>
    </Container>
  );
};

export default IndexPage;
