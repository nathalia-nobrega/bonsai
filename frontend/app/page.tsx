{/* usando aqui para visualizar teste */}
'use client';
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

export default function Ihome() {
  return (
    <Box
      sx={{
        backgroundImage: "url('/images/image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >

      <Box
        sx={{
          display: "flex",
          flexDirection: "column", 
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >

        <Box
          sx={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/images/florfofa.png"
            alt="Ícone"
            width={200}
            height={200}
            style={{
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            color: "white",
            textAlign: "AlignmentLeft",
            fontFamily: "Nunito, sans-serif",
          }}
        >
          Grow your Garden. <br />
          Grow Yourself.
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "white",
            color: "#5C9F60",
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "20px",
            paddingX: 12,
            paddingY: 1,
          }}
          onClick={() => alert("Botão clicado")}
          >
            Get Started!
          </Button>

          <Typography
            variant="body1"
            sx={{
              fontWeight: 200,
              color: "white",
              textAlign: "center",
              fontFamily: "Nunito, sans-serif",
            }}
          >
            Already have an account?{" "}
            <span style={{ fontWeight: 900 }}>Sign in</span>
        </Typography>
      </Box>
    </Box>
  );
}
