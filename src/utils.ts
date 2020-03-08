export class Utils {
  static varidateIP = (str: string): boolean => {
    const regex = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    return str.match(regex) != null;
  };
  static revokeCommand = (str: string): boolean => {
    return str == 'revokeall';
  };

  static showCommand = (str: string): boolean => {
    return str == 'showall';
  };

  static usageCommand = (str: string): boolean => {
    return str == 'help';
  };

  static prettyJSON(json): string {
    return JSON.stringify(json, null, 4);
  }
}
