export class ResponseService {
  private readonly userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
  createResponseText = (text: string): GoogleAppsScript.Content.TextOutput => {
    const formatText = '<@' + this.userId + '> ' + text;
    const response = { text: formatText };
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
      ContentService.MimeType.JSON
    );
  };
}
