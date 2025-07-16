const html = await loadHtml("body.html");

class UwUifyTray extends TrayIconProcess {
  constructor(handler, pid, parentPid, data) {
    super(handler, pid, parentPid, data);
  }

  async renderPopup(body, target) {
    this.Log("test");
    body.innerHTML = html;

    const css = await this.fs.direct(util.join(workingDirectory, "style.css"));
    const button = body.querySelector("#killButton");

    this.Log(`${button} ${css}`);

    button.addEventListener("click", () => {
      target?.killSelf();
    });

    body.getElementsByTagName("link")[0].href = css;
  }
}

return { UwUifyTray };
