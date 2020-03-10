import { Utils } from "../../src/utils";

describe('ValidateIP', () => {
  it('OK', () => {
    const actual = Utils.validateIP('192.168.0.1');
    expect(actual).toBe(true);
  });
  it('NG', () => {
    const actual = Utils.validateIP('test');
    expect(actual).toBe(false);
  });
});

describe('revokeCommand', () => {
  it('OK', () => {
    const actual = Utils.revokeCommand('revokeall');
    expect(actual).toBe(true);
  });
  it('NG', () => {
    const actual = Utils.revokeCommand('test');
    expect(actual).toBe(false);
  });
});

describe('showCommand', () => {
  it('OK', () => {
    const actual = Utils.showCommand('showall');
    expect(actual).toBe(true);
  });
  it('NG', () => {
    const actual = Utils.showCommand('test');
    expect(actual).toBe(false);
  });
});

describe('usageCommand', () => {
  it('OK', () => {
    const actual = Utils.usageCommand('help');
    expect(actual).toBe(true);
  });
  it('NG', () => {
    const actual = Utils.usageCommand('test');
    expect(actual).toBe(false);
  });
});

describe('billingCommand', () => {
  it('OK', () => {
    const actual = Utils.billingCommand('billing');
    expect(actual).toBe(true);
  });
  it('NG', () => {
    const actual = Utils.billingCommand('test');
    expect(actual).toBe(false);
  });
});

describe('prettyJSON', () => {
  it('OK', () => {
    const jsonData = {"test": "test"};
    const actual = Utils.prettyJSON(jsonData);
    expect(actual).toBe("{\n    \"test\": \"test\"\n}");
  });
});
