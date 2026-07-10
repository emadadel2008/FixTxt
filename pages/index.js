import Head from "next/head";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Editor from "../components/Editor";
import IndexInfo from "../components/IndexInfo";
import "../utils/string";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", display: "flex", flexDirection: "column" }}>
      <Head>
        <title>FixTxt — Fix Right-to-Left (RTL) text misalignment</title>
        <meta name="title" content="FixTxt — Fix Right-to-Left (RTL) text misalignment" />
        <meta
          name="description"
          content="Fix your Right-to-Left (RTL) text when you mix it with Left-to-Right (LTR) text."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fixtxt.co/" />
        <meta property="og:title" content="FixTxt — Fix RTL text misalignment" />
        <meta
          property="og:description"
          content="Fix your Right-to-Left (RTL) text when you mix it with Left-to-Right (LTR) text."
        />
        <meta property="og:image" content="https://fixtxt.co/og_image.png?v=12072022_2217" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://fixtxt.co/" />
        <meta property="twitter:title" content="FixTxt — Fix RTL text misalignment" />
        <meta
          property="twitter:description"
          content="Fix your Right-to-Left (RTL) text when you mix it with Left-to-Right (LTR) text."
        />
        <meta property="twitter:image" content="https://fixtxt.co/og_image.png?v=12072022_2217" />
      </Head>

      {/* ── Hero ── */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 55%, #4c1d95 100%)",
          py: { xs: 5, md: 7 },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(139,92,246,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(99,102,241,0.2) 0%, transparent 50%)",
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative" }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "3rem", md: "4.5rem" },
              background: "linear-gradient(90deg, #ffffff 0%, #c7d2fe 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              mb: 1.5,
            }}
          >
            FixTxt
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "rgba(255,255,255,0.75)",
              fontSize: { xs: "1rem", md: "1.15rem" },
              maxWidth: 520,
            }}
          >
            Fix your Right-to-Left (RTL) text when you mix it with Left-to-Right
            (LTR) text — instantly, right in your browser.
          </Typography>
        </Container>
      </Box>

      {/* ── Main ── */}
      <Container maxWidth="md" component="main" sx={{ py: 4, flex: 1 }}>
        {/* Editor card */}
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 4px 32px rgba(79, 70, 229, 0.08), 0 1px 4px rgba(0,0,0,0.04)",
            overflow: "hidden",
            mb: 5,
          }}
        >
          <Editor />
        </Box>

        <IndexInfo />
      </Container>

      {/* ── Footer ── */}
      <Box
        component="footer"
        sx={{
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          py: 3,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="body2" color="text.secondary">
            Modified by{" "}
            <Box
              component="a"
              href="https://github.com/emadadel2008"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "primary.main", textDecoration: "none", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}
            >
              emadadel2008
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Based on{" "}
            <Box
              component="a"
              href="https://github.com/alotaiba/FixTxt"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "primary.main", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            >
              FixTxt
            </Box>{" "}
            by Abdulrahman Saleh Khamis
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            &copy; {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
