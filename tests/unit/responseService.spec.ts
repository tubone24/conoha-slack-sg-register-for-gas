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

