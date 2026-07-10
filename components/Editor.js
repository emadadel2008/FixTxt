import { useState, useMemo } from "react";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import {
  FormatTextdirectionRToL as RTLIcon,
  FormatTextdirectionLToR as LTRIcon,
  FormatClear as FormatClearIcon,
  ContentCopy as ContentCopyIcon,
  DeleteForever as ClearAllIcon,
  AutoFixHigh as AutoDetectIcon,
  ViewColumn as SplitViewIcon,
  TableRows as LineModeIcon,
} from "@mui/icons-material";
import { styled, experimental_sx as sx } from "@mui/system";

const TextArea = styled("textarea")(
  sx({
    width: "100%",
    border: 0,
    pt: 1,
    px: 1,
    resize: "none",
    outline: "none",
    fontSize: "16px",
    fontFamily: "inherit",
    backgroundColor: "transparent",
    boxSizing: "border-box",
  })
);

const EditorButton = styled(IconButton)(() => ({
  border: "1px solid #E2E8F0",
  borderRadius: 8,
  color: "#64748B",
  transition: "all 0.15s ease",
  "&:hover": {
    backgroundColor: "rgba(79, 70, 229, 0.08)",
    borderColor: "#818CF8",
    color: "#4F46E5",
  },
}));

function detectDir(text) {
  const clean = text.replace(/\u202A|\u202B|\u202C/g, "");
  const rtl = (clean.match(/[\u0600-\u06FF\u0750-\u077F\u0590-\u05FF\uFB50-\uFDFF\uFE70-\uFEFF]/g) || []).length;
  const ltr = (clean.match(/[a-zA-Z]/g) || []).length;
  return rtl >= ltr ? "rtl" : "ltr";
}

function applyFix(text, direction, lineSet) {
  return text
    .split("\n")
    .map((line, i) => {
      if (lineSet !== null && !lineSet.has(i)) return line;
      const clean = line.replace(/\u202A|\u202B|\u202C/g, "");
      if (direction === "rtl") return "\u202B" + clean + "\u202C";
      if (direction === "ltr") return "\u202A" + clean + "\u202C";
      return clean;
    })
    .join("\n");
}

function LineList({ lines, selectedLines, onToggle, highlightChanged, referenceLines }) {
  return (
    <Box sx={{ p: 1, minHeight: 220, maxHeight: 320, overflowY: "auto" }}>
      {lines.map((line, i) => {
        const selected = selectedLines ? selectedLines.has(i) : false;
        const changed = highlightChanged && referenceLines && line !== referenceLines[i];
        return (
          <Box
            key={i}
            onClick={() => onToggle && onToggle(i)}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 0.5,
              px: 0.5,
              py: 0.1,
              borderRadius: 0.5,
              cursor: onToggle ? "pointer" : "default",
              bgcolor: changed
                ? "rgba(76, 175, 80, 0.12)"
                : selected
                ? "rgba(85, 108, 214, 0.12)"
                : "transparent",
              "&:hover": onToggle ? { bgcolor: "rgba(0,0,0,0.04)" } : {},
            }}
          >
            {onToggle && (
              <Checkbox
                size="small"
                checked={selected}
                onChange={() => onToggle(i)}
                onClick={(e) => e.stopPropagation()}
                sx={{ p: 0.25, flexShrink: 0 }}
              />
            )}
            <Typography
              variant="body2"
              component="div"
              sx={{
                fontFamily: "monospace",
                whiteSpace: "pre-wrap",
                flex: 1,
                py: 0.3,
                lineHeight: 1.7,
              }}
            >
              {line || "\u00A0"}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default function Editor() {
  const [text, setText] = useState("");
  const [splitView, setSplitView] = useState(false);
  const [lineMode, setLineMode] = useState(false);
  const [autoFixOnPaste, setAutoFixOnPaste] = useState(false);
  const [selectedLines, setSelectedLines] = useState(new Set());
  const [activeTransform, setActiveTransform] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: "" });

  const notify = (msg) => setNotification({ open: true, message: msg });
  const inputLines = text.split("\n");

  const outputText = useMemo(() => {
    if (!activeTransform) return text;
    const lineSel = lineMode && selectedLines.size > 0 ? selectedLines : null;
    const dir = activeTransform === "auto" ? detectDir(text) : activeTransform;
    return applyFix(text, dir, lineSel);
  }, [text, activeTransform, selectedLines, lineMode]);

  const outputLines = outputText.split("\n");

  const resolvedLabel =
    activeTransform === "auto"
      ? `AUTO → ${detectDir(text).toUpperCase()}`
      : activeTransform?.toUpperCase();

  const handleApply = (direction) => {
    if (!text) return;
    if (splitView) {
      setActiveTransform(direction);
    } else {
      const lineSet = lineMode && selectedLines.size > 0 ? selectedLines : null;
      const dir = direction === "auto" ? detectDir(text) : direction;
      setText(applyFix(text, dir, lineSet));
      if (lineSet) setSelectedLines(new Set());
    }
  };

  const handleClearFormatting = () => {
    if (!text) return;
    setText(text.replace(/\u202A|\u202B|\u202C/g, ""));
    setActiveTransform(null);
  };

  const handleClearAll = () => {
    setText("");
    setActiveTransform(null);
    setSelectedLines(new Set());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(splitView ? outputText : text);
    notify("Copied to clipboard");
  };

  const handlePaste = (e) => {
    if (!autoFixOnPaste) return;
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    const dir = detectDir(pasted);
    setText(applyFix(pasted, dir, null));
    setActiveTransform(dir);
    notify(`Auto-fixed as ${dir.toUpperCase()}`);
  };

  const toggleLine = (i) => {
    setSelectedLines((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* ── Toolbar ── */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={1}
        sx={{ mb: 1 }}
      >
        {/* Transform buttons */}
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Tooltip title="Fix as RTL">
            <EditorButton onClick={() => handleApply("rtl")} aria-label="fix-rtl">
              <RTLIcon />
            </EditorButton>
          </Tooltip>
          <Tooltip title="Fix as LTR">
            <EditorButton onClick={() => handleApply("ltr")} aria-label="fix-ltr">
              <LTRIcon />
            </EditorButton>
          </Tooltip>
          <Tooltip title="Auto-detect direction">
            <EditorButton onClick={() => handleApply("auto")} aria-label="auto-detect">
              <AutoDetectIcon />
            </EditorButton>
          </Tooltip>
          <Tooltip title="Clear formatting">
            <EditorButton onClick={handleClearFormatting} aria-label="clear-formatting">
              <FormatClearIcon />
            </EditorButton>
          </Tooltip>
          <Tooltip title="Clear all text">
            <EditorButton onClick={handleClearAll} aria-label="clear-all">
              <ClearAllIcon />
            </EditorButton>
          </Tooltip>
        </Stack>

        {/* View options */}
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={autoFixOnPaste}
                onChange={(e) => setAutoFixOnPaste(e.target.checked)}
              />
            }
            label={<Typography variant="caption">Auto-fix on paste</Typography>}
            sx={{ m: 0 }}
          />
          <Tooltip title={splitView ? "Single view" : "Split view"}>
            <EditorButton
              onClick={() => setSplitView((v) => !v)}
              aria-label="split-view"
              sx={{
                color: splitView ? "primary.main" : "inherit",
                borderColor: splitView ? "primary.main" : "#ccc",
              }}
            >
              <SplitViewIcon />
            </EditorButton>
          </Tooltip>
          <Tooltip title={lineMode ? "Exit line selection" : "Line selection mode"}>
            <EditorButton
              onClick={() => {
                setLineMode((v) => !v);
                setSelectedLines(new Set());
              }}
              aria-label="line-mode"
              sx={{
                color: lineMode ? "primary.main" : "inherit",
                borderColor: lineMode ? "primary.main" : "#ccc",
              }}
            >
              <LineModeIcon />
            </EditorButton>
          </Tooltip>
          <Tooltip title="Copy to clipboard">
            <EditorButton onClick={handleCopy} aria-label="copy">
              <ContentCopyIcon />
            </EditorButton>
          </Tooltip>
        </Stack>
      </Stack>

      {/* ── Line selection bar ── */}
      {lineMode && (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {selectedLines.size}/{inputLines.length} selected
          </Typography>
          <Chip
            size="small"
            label="All"
            variant="outlined"
            onClick={() => setSelectedLines(new Set(inputLines.map((_, i) => i)))}
          />
          <Chip
            size="small"
            label="None"
            variant="outlined"
            onClick={() => setSelectedLines(new Set())}
          />
          {selectedLines.size === 0 && (
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: "italic" }}>
              No selection = all lines
            </Typography>
          )}
        </Stack>
      )}

      {/* ── Content area ── */}
      <Box sx={{ borderTop: "1px solid #E2E8F0" }}>
        {splitView ? (
          <Grid container spacing={0}>
            {/* Left: input */}
            <Grid item xs={6} sx={{ borderRight: "1px solid #E2E8F0" }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", px: 1, pt: 0.5 }}
              >
                Input
              </Typography>
              {lineMode ? (
                <LineList
                  lines={inputLines}
                  selectedLines={selectedLines}
                  onToggle={toggleLine}
                />
              ) : (
                <TextArea
                  rows={10}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onPaste={handlePaste}
                  placeholder="Write your text here..."
                />
              )}
            </Grid>

            {/* Right: output */}
            <Grid item xs={6} sx={{ bgcolor: "rgba(0,0,0,0.02)" }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 0.5, px: 1, pt: 0.5 }}
              >
                <Typography variant="caption" color="text.secondary">
                  Output
                </Typography>
                {activeTransform && (
                  <Chip
                    size="small"
                    label={resolvedLabel}
                    color="primary"
                    sx={{ height: 16, fontSize: "0.65rem" }}
                  />
                )}
              </Box>
              {lineMode ? (
                <LineList
                  lines={outputLines}
                  highlightChanged={true}
                  referenceLines={inputLines}
                />
              ) : (
                <TextArea
                  rows={10}
                  value={outputText}
                  readOnly
                  style={{ backgroundColor: "transparent" }}
                />
              )}
            </Grid>
          </Grid>
        ) : lineMode ? (
          <LineList
            lines={inputLines}
            selectedLines={selectedLines}
            onToggle={toggleLine}
          />
        ) : (
          <TextArea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onPaste={handlePaste}
            placeholder="Write your text here..."
          />
        )}
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={2000}
        onClose={() => setNotification((n) => ({ ...n, open: false }))}
        message={notification.message}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      />
    </Box>
  );
}
