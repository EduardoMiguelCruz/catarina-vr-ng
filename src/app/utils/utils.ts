export class Utils {
  static loadScript(src: string) {
    let chatScript = document.createElement("script");
    chatScript.type = "text/javascript";
    chatScript.async = true;
    chatScript.src = src;
    document.head.appendChild(chatScript);
  }
}