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
    let currentHours = new Date();
    currentHours.setHours(currentHours.getHours()+(this.config.timeAdjustment || 0))
    currentHours = currentHours.getHours();

    let requiredMinutes = Number(data.minutes);
    let currentMinutes = new Date().getMinutes();

   //console.log(requiredMinutes, requiredHours, currentMinutes, currentHours);

    if (
      currentHours > requiredHours ||
      (currentHours == requiredHours && currentMinutes > requiredMinutes)
    )
      return true;
    return false;
  };
}
