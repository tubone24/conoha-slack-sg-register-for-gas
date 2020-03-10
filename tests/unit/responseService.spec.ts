import { ResponseService } from "../../src/responseService";

describe('constructor', () => {
  it('constructorSetUserId', () => {
    const mockCreateTextOutput = jest.fn(() => {
      return {
        setMimeType: jest.fn(() => {
          return 'test';
        })
      };
    });
    // @ts-ignore
    ContentService.createTextOutput = mockCreateTextOutput;
    const responseService = new ResponseService('testUserId');
    const actualUserId = (responseService as any).userId;
    expect(actualUserId).toBe('testUserId');
  });
});

describe('createResponseText', () => {
  it('ok', () => {
    const mockCreateTextOutput = jest.fn(() => {
      return {
        setMimeType: jest.fn(() => {
          return '{"text": "<@ testUserId> testText"}';
        })
      };
    });
    // @ts-ignore
    ContentService.createTextOutput = mockCreateTextOutput;
    // @ts-ignore
    ContentService.MimeType= {};
    // @ts-ignore
    ContentService.MimeType.JSON = {};
    const responseService = new ResponseService('testUserId');
    const actual = responseService.createResponseText('testText');
    expect(actual).toBe('{"text": "<@ testUserId> testText"}')
  });
});

