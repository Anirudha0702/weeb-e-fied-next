import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import TopSearchName from "./components/TopSearchName";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
export default function Root() {
  return (
    // <Box className=" font-[family-name:var(--font-cinzel)]">
    <Box
      sx={{
        width: "100svw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
        flexDirection: "column",
        gap: "1rem",
        paddingInline: "1rem",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "90%" },
          height: "auto",
          borderRadius: "30px",
          minHeight: "50vh",
          display: "flex",
          paddingInline: { xs: "1rem", md: "0.5rem" },
        }}
        className="bg-slate-900"
      >
        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            height: "100%",
            position: "sticky",
            top: 0,
            width: "100%",
            maxWidth: "35rem",
            gap: "0.5rem",
          }}
          // className="w-full md:w-1/2"
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              fontFamily: "Cinzel Decorative, Cinzel Decorative Fallback",
              whiteSpace: "nowrap",
              padding: "1rem",
            }}
          >
            Otaku Guild
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Search anime..."
              sx={{
                marginBlock: "1rem",
                backgroundColor: "primary.contrastText",
                borderRadius: "10px",
                color: "primary.main",

                "& label": {
                  color: "primary.contrastText",
                },
                "& .MuiInputBase-input": {
                  padding: "0.5rem", // Adjust padding here
                },
                "& .MuiOutlinedInput-root": {
                  color: "primary.main",
                },
              }}
              slotProps={{
                htmlInput: {
                  color: "primary.main",
                  padding: "0.5rem",
                  "&::placeholder": {
                    color: "primary.main",
                  },
                },
              }}
            />
            <IconButton
              aria-label="search"
              sx={{
                backgroundColor: "primary.main",
                borderRadius: "10px",
                color: "primary.contrastText",
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
          <TopSearchName />
          <Button variant="outlined" endIcon={<ArrowCircleRightIcon />} sx={{
            width:'fit-content',
            whiteSpace: "nowrap",
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            borderRadius: "10px",
            textTransform:'none',
            height:'3rem',
            fontFamily: "Cinzel Decorative, Cinzel Decorative Fallback",
            display: "flex",
            alignItems: "center",
          }}>
            Unlock Epic Tales
          </Button>
        </Box>
        <div className="md:block  hidden relative right-0 w-full before:content-[''] before:absolute before:top-0 before:left-0 before:bottom-0 before:w-[500px] before:bg-gradient-to-r before:from-slate-900 before:to-transparent before:z-30 rounded-xl before:rounded-r-[30px] overflow-hidden max-w-[768px]">
          <Image
            src="/banner.webp"
            alt="Otaku Guild"
            width={1090}
            height={720}
            className=" h-full w-full rounded-r-[30px] object-cover scale-110"
            quality={100}
          />
        </div>
      </Box>
    </Box>
  );
}
