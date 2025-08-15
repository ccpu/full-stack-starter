console.warn('background is running');

interface ChromeMessage {
  type: string;
  count?: number;
}

chrome.runtime.onMessage.addListener((request: ChromeMessage) => {
  if (request.type === 'COUNT') {
    // eslint-disable-next-line no-console
    console.log(
      'background has received a message from popup, and count is ',
      request.count,
    );
  }
});
