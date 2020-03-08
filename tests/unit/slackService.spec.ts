import { SlackService } from "../../src/slackService";

describe('verifyToken', () => {
  it('OK', () => {
    const actual = SlackService.verifyToken('test', 'test');
    expect(actual).toBe(true);
  });
  it('NG', () => {
    const actual = SlackService.verifyToken('test', 'test2');
    expect(actual).toBe(false);
  });
});

describe('verifyChannel', () => {
  it('OK', () => {
    const actual = SlackService.verifyChannel('test', 'test');
    expect(actual).toBe(true);
  });
  it('NG', () => {
    const actual = SlackService.verifyChannel('test', 'test2');
    expect(actual).toBe(false);
  });
});
