Object.assign(String.prototype, {
  clearFormatting() {
    return this.replace(/\u202A|\u202B|\u202C/g, "");
  },
});

Object.assign(String.prototype, {
  toRTL() {
    return this.split("\n")
      .map((line) => "\u202B" + line + "\u202C")
      .join("\n");
  },
});

Object.assign(String.prototype, {
  toLTR() {
    return this.split("\n")
      .map((line) => "\u202A" + line + "\u202C")
      .join("\n");
  },
});

Object.assign(String.prototype, {
  detectDirection() {
    const clean = this.replace(/\u202A|\u202B|\u202C/g, "");
    const rtl = (clean.match(/[\u0600-\u06FF\u0750-\u077F\u0590-\u05FF\uFB50-\uFDFF\uFE70-\uFEFF]/g) || []).length;
    const ltr = (clean.match(/[a-zA-Z]/g) || []).length;
    return rtl >= ltr ? "rtl" : "ltr";
  },
});
