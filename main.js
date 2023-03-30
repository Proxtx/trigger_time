import fs from "fs/promises";

export class Trigger {
  constructor(config, folder) {
    this.config = config;
    this.folder = folder;
    (async () => {
      this.html = await fs.readFile(this.folder + "index.html", "utf8");
      this.handler = await fs.readFile(this.folder + "handler.js", "utf8");
    })();
  }

  getSelectionGui = async () => {
    return { html: this.html, handler: this.handler, data: {} };
  };

  triggers = async (data) => {
    let requiredHours = Number(data.hours);
    let currentHours =
      new Date().getHours() + this.config.timeAdjustment
        ? this.config.timeAdjustment
        : 0;

    let requiredMinutes = Number(data.minutes);
    let currentMinutes = new Date().getMinutes();

    if (
      currentHours > requiredHours ||
      (currentHours == requiredHours && currentMinutes > requiredMinutes)
    )
      return true;
    return false;
  };
}
