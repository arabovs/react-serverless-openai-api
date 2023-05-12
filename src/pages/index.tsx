import * as React from "react";
import { Box, Button, MenuItem, TextField, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledImg = styled("img")({
  maxWidth: "100%",
  height: "auto",
});

const options = ["OpenAI", "MidJourney", "Stable Diffusion"];

export default function MyComponent() {
  const [selectedOption, setSelectedOption] = React.useState(options[0]);
  const [image, setImage] = React.useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/330px-Image_created_with_a_mobile_phone.png"
  );

  const handleImageChage = (event) => {
    setImage(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const fetchDalleImage = async () => {
    const result = await fetch("/api/dalle", {
      method: "POST",
      body: JSON.stringify({ prompt: "example data" }),
    })
      .then((response) => response.json())
      .then((data) => {
        const message = JSON.parse(data.message);
        setImage(message.data[0]?.url);
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
        <TextField fullWidth label="Enter prompt" multiline rows={4} />
      </Box>
      <Box sx={{ display: "flex", mt: 5 }}>
        <TextField fullWidth disabled label="haha" multiline rows={4} />
        <StyledImg sx={{ ml: 5 }} src={image} />
      </Box>
      <Button
        // onClick={fetchDalleImage}
        variant="contained"
        sx={{ width: 200, mt: 5 }}
      >
        Submit
      </Button>
    </Container>
  );
}
