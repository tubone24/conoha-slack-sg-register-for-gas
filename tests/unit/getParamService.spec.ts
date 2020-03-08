import { GetParamService, DoPostEvent, ReturnParams } from "../../src/getParamService";

describe('getParams', () => {
  it('OK', () => {
    const doPostEvent: DoPostEvent = {parameter: {token: 'testToken', user_id: 'testUser', channel_id: 'testChannel', text: 'testText'}};
    const expected: ReturnParams = {token: 'testToken', userId: 'testUser', channelId: 'testChannel', text: 'testText'};
    const actual = GetParamService.getParams(doPostEvent);
    expect(actual.token).toBe(expected.token);
    expect(actual.userId).toBe(expected.userId);
    expect(actual.channelId).toBe(expected.channelId);
    expect(actual.text).toBe(expected.text);
  });
});
