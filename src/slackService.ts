export class SlackService {
  static verifyToken = (targetToken: string, correctToken: string): boolean => {
    return targetToken == correctToken;
  };

  static verifyChannel = (targetChannel, correctChannel) => {
    return targetChannel == correctChannel;
  };
}
