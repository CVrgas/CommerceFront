class BannerStyle {
  backgroundColor: string;
  titleColor: string;
  bodyColor: string;

  constructor(
    titleColor: string = "",
    bodyColor: string = "",
    backgroundColor: string = "",
  ) {
    this.titleColor = titleColor;
    this.bodyColor = bodyColor;
    this.backgroundColor = backgroundColor;
  }

  static default({
    titleColor = "text-black",
    bodyColor = "text-slate-700",
  } = {}): BannerStyle {
    return new BannerStyle(titleColor, bodyColor, "bg-white");
  }

  static dark({
    titleColor = "text-white",
    bodyColor = "text-gray-300",
  } = {}): BannerStyle {
    return new BannerStyle(titleColor, bodyColor, "bg-slate-900");
  }

  static red({
    titleColor = "text-slate-200",
    bodyColor = "text-slate-300",
  } = {}): BannerStyle {
    return new BannerStyle(titleColor, bodyColor, "bg-red-700");
  }

  static lightDark({
    titleColor = "text-gray-100",
    bodyColor = "text-gray-400",
  } = {}): BannerStyle {
    return new BannerStyle(titleColor, bodyColor, "bg-slate-700");
  }
}

export default BannerStyle;
