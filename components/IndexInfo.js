import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import instagramUseCaseImage from "../public/images/FixTxt_Instagram.png";
import notionUseCaseImage from "../public/images/FixTxt_Notion.png";
import FormatTextdirectionRToLIcon from "@mui/icons-material/FormatTextdirectionRToL";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CreateIcon from "@mui/icons-material/Create";

const STEPS = [
  { Icon: CreateIcon, label: "Paste or type your text" },
  { Icon: FormatTextdirectionRToLIcon, label: "Click the RTL or Auto-detect button" },
  { Icon: ContentCopyIcon, label: "Copy the result and use it anywhere" },
];

export default function IndexInfo() {
  return (
    <>
      <Paper elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3, p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>What is FixTxt?</Typography>
        <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
          FixTxt is a web tool that corrects the text alignment in the proper
          flow of the language. Some apps do not support RTL languages like
          Arabic — when you mix LTR characters into Arabic text, words get
          misaligned and hard to read. FixTxt wraps each line with the correct
          Unicode directional markers to fix the display instantly.
        </Typography>
      </Paper>

      <Paper elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3, p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>How to use FixTxt?</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          {STEPS.map(({ Icon, label }, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #4F46E5, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>
                <Icon sx={{ fontSize: 20 }} />
              </Box>
              <Typography variant="body1">{label}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3, p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>Use Cases</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Works anywhere you need to paste correctly-aligned RTL text.
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {[
            { label: "Instagram", img: instagramUseCaseImage },
            { label: "Notion", img: notionUseCaseImage },
          ].map(({ label, img }) => (
            <Box key={label}>
              <Typography variant="h5" sx={{ mb: 1 }}>{label}</Typography>
              <Box sx={{ borderRadius: 2, overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
                <Image src={img} alt={`FixTxt ${label} example`} style={{ width: "100%", height: "auto", display: "block" }} />
              </Box>
            </Box>
          ))}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Plus much more — Twitter/X, WhatsApp, Google Docs, and any app that does not natively support RTL.
        </Typography>
      </Paper>
    </>
  );
}
