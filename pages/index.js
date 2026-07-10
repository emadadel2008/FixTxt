import Head from "next/head";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Editor from "../components/Editor";
import IndexInfo from "../components/IndexInfo";
import "../utils/string";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Head>
        <title>FixTxt — Fix Right-to-Left (RTL) text misalignment</title>
        <meta
          name="title"
          content="FixTxt — Fix Right-to-Left (RTL) text misalignment"
        />
        <meta
          name="description"
          content="Fix your Right-to-Left (RTL) text when you mix it with Left-to-Right (LTR) text."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fixtxt.co/" />
        <meta
          property="og:title"
          content="FixTxt — Fix RTL text misalignment"
        />
        <meta
          property="og:description"
          content="Fix your Right-to-Left (RTL) text when you mix it with Left-to-Right (LTR) text."
        />
        <meta
          property="og:image"
          content="https://fixtxt.co/og_image.png?v=12072022_2217"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://fixtxt.co/" />
        <meta
          property="twitter:title"
          content="FixTxt — Fix RTL text misalignment"
        />
        <meta
          property="twitter:description"
          content="Fix your Right-to-Left (RTL) text when you mix it with Left-to-Right (LTR) text."
        />
        <meta
          property="twitter:image"
          content="https://fixtxt.co/og_image.png?v=12072022_2217"
        />
      </Head>

      <Container component="main">
        <Typography variant="h1">FixTxt</Typography>
        <Typography variant="subtitle1" gutterBottom>
          Fix your Right-to-Left (RTL) text when you mix it with Left-to-Right
          (LTR) text.
        </Typography>
        <Editor />
        <IndexInfo />
      </Container>

      <Container component="footer" sx={{ mt: "auto", py: 3 }}>
        <Typography variant="body1">
          Modified by{" "}
          <a
            href="https://github.com/emadadel2008"
            target="_blank"
            rel="noopener noreferrer"
          >
            emadadel2008
          </a>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Based on the original{" "}
          <a
            href="https://github.com/alotaiba/FixTxt"
            target="_blank"
            rel="noopener noreferrer"
          >
            FixTxt
          </a>{" "}
          made with ❤️ in 🇶🇦 by Abdulrahman Saleh Khamis
        </Typography>
        <Typography variant="body1">
          Copyright &copy; {new Date().getFullYear()}
        </Typography>
      </Container>
    </Container>
  );
}
