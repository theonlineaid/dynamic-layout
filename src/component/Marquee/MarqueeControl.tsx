import { useState } from "react";
import Marquee from "react-fast-marquee";
import ArrowLeftSharpIcon from "@mui/icons-material/ArrowLeftSharp";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import StopCircleSharpIcon from "@mui/icons-material/StopCircleSharp";
import PlayCircleFilledWhiteSharpIcon from "@mui/icons-material/PlayCircleFilledWhiteSharp";
import { Box, Typography, IconButton } from "@mui/material";
import { useMarket } from "../../context/MarketContext";

export default function MarqueeControl() {
  const { marketData } = useMarket(); // Access market data from context
  const [isPlaying, setIsPlaying] = useState(true); // Controls play/pause
  const [direction, setDirection] = useState<"left" | "right">("left"); // Controls direction

  // Toggle the play/pause state
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", backgroundColor: "#333", borderRadius: "8px" }}>
      {/* Marquee Component */}
      <Marquee
        pauseOnClick={true}
        pauseOnHover={true}
        play={isPlaying}
        direction={direction}
        loop={0}
        speed={100}
        style={{ flex: 1, color: "#fff", fontSize: "16px", marginRight: "16px" }}
      >
        {marketData.map((item, index) => (
          <Box sx={{ display: "inline-flex", alignItems: "center", marginRight: "40px" }} key={index}>
            {/* Change Icon */}
            <Typography sx={{ color: item.chg >= 0 ? "green" : "red", fontWeight: "bold", marginRight: "8px" }}>
              {item.chg >= 0 ? `▲ ${item.chg}` : `▼ ${item.chg}`}
            </Typography>

            {/* Ticker and Price */}
            <Typography sx={{ fontWeight: "bold", marginRight: "8px" }}>
              {item.ticker}: ${item.last}
            </Typography>

            {/* Percentage Change */}
            <Typography sx={{ color: item.chg >= 0 ? "green" : "red" }}>
              ({item.d}%)
            </Typography>
          </Box>
        ))}
      </Marquee>

      {/* Control Buttons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px", width: "auto" }}>
        {/* Left Arrow */}
        <IconButton onClick={() => setDirection("left")} sx={{ color: "#fff", padding: "4px" }}>
          <ArrowLeftSharpIcon />
        </IconButton>

        {/* Play/Pause Button */}
        <IconButton onClick={togglePlay} sx={{ color: "#fff", padding: "4px" }}>
          {isPlaying ? (
            <StopCircleSharpIcon />
          ) : (
            <PlayCircleFilledWhiteSharpIcon />
          )}
        </IconButton>

        {/* Right Arrow */}
        <IconButton onClick={() => setDirection("right")} sx={{ color: "#fff", padding: "4px" }}>
          <ArrowRightSharpIcon />
        </IconButton>
      </Box>
    </Box>
  );
}