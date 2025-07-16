const { UwUifyTray } = await load("tray.js");
const { join } = util;

class UwUifyProcess extends Process {
  constructor(handler, pid, parentPid) {
    super(handler, pid, parentPid);
  }

  async start() {
    if (+this.env.get("uwuify_pid")) return false;

    this.env.set("uwuify_pid", this.pid);
    this.observer = new MutationObserver((m) => this.processMutations(m));
    this.observer.observe(document.body, { childList: true, subtree: true });

    const shell = this.handler.getProcess(+env.get("shell_pid"));
    const icon = await this.fs.direct(join(workingDirectory, "icon.png"));

    shell.trayHost.createTrayIcon(
      this.pid,
      "UwUifyTray",
      {
        icon,
        popup: {
          width: 150,
          height: 40,
        },
      },
      UwUifyTray
    );

    this.uwuifyAll();
  }

  async stop() {
    this.observer.disconnect();
    this.observer = undefined;
    this.revertAll();
    this.env.delete("uwuify_pid");
  }

  /** @param {MutationRecord[]} mutations */
  processMutations(mutations) {
    if (this._disposed) return;

    for (let mutation of mutations) {
      for (let node of mutation.addedNodes) {
        this.walkAndUwUify(node);
      }
    }
  }

  uwuify(text) {
    if (this._disposed) return text;

    return text
      .replace(/(?:r|l)/g, "w")
      .replace(/(?:R|L)/g, "W")
      .replace(/n([aeiou])/g, "ny$1")
      .replace(/N([aeiou])/g, "Ny$1")
      .replace(/N([AEIOU])/g, "NY$1")
      .replace(/ove/g, "uv")
      .replace(/!+/g, " owo!")
      .replace(/\b(th)([aeiou])/gi, "d$2")
      .replace(/\b(Th)([aeiou])/g, "D$2")
      .replace(/\b(you)\b/gi, "uu")
      .replace(/\b(You)\b/g, "Uu");
  }

  /**
   * @param {Node} node
   */
  walkAndUwUify(node) {
    if (this._disposed) return;

    if (node.nodeType === Node.TEXT_NODE) {
      if (node.nodeValue.trim().length > 0) {
        if (!node.originalValue) node.originalValue = `${node.nodeValue}`;
        node.nodeValue = this.uwuify(node.nodeValue);
      }
    } else if (
      node.nodeType === Node.ELEMENT_NODE &&
      !["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(node.tagName)
    ) {
      for (let child of node.childNodes) {
        this.walkAndUwUify(child);
      }
    }
  }

  uwuifyAll() {
    if (this._disposed) return;

    const target = document.querySelector("#appRenderer");

    this.walkAndUwUify(target);
  }

  revertAll() {
    const target = document.querySelector("#appRenderer");

    this.revert(target);
  }

  revert(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.nodeValue.trim().length > 0) {
        node.nodeValue = node.originalValue || node.nodeValue;
        node.originalValue = "";
      }
    } else if (
      node.nodeType === Node.ELEMENT_NODE &&
      !["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(node.tagName)
    ) {
      for (let child of node.childNodes) {
        this.revert(child);
      }
    }
  }
}

return { UwUifyProcess };
