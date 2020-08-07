export const isIOSWebView = () => /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);

export const isIE = () => Boolean(navigator.userAgent.match(/MSIE/i));
