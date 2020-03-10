import {ConoHaService} from "../../src/conoHaService";

describe('constructor', () => {
  it('constructorIssueToken', () => {
    const mockFetch = jest.fn(() => {
      return {
        getContentText: jest.fn(() => {
          return '{"access": {"token": {"id": "testToken"}}}';
        })
      };
    });
    // @ts-ignore
    UrlFetchApp.fetch = mockFetch;
    const url = 'https://testIdentityDomain/v2.0/tokens';
    const option = {
      'contentType': 'application/json',
      'method': 'post',
      'payload': '{"auth":{"passwordCredentials":{"username":"testUser","password":"testPassword"},"tenantId":"testTenantId"}}'};
    const expected = [url, option];
    const actual = new ConoHaService(
      'testUser',
      'testPassword',
      'testTenantId',
      'testIdentityDomain',
      'testNetworkDoman',
      'testAccountDomain',
      'testSecurityGroupId');
    expect(mockFetch.mock.calls[0]).toEqual(expected);
    const token = (actual as any).token;
    const networkDomain = (actual as any).networkDomain;
    const securityGroupId = (actual as any).securityGroupId;
    expect(token).toBe('testToken');
    expect(networkDomain).toBe('testNetworkDoman');
    expect(securityGroupId).toBe('testSecurityGroupId');
  });
});

describe('issueToken', () => {
  it('IssueToken', () => {
    const mockFetch = jest.fn(() => {
      return {
        getContentText: jest.fn(() => {
          return '{"access": {"token": {"id": "testToken"}}}';
        })
      };
    });
    // @ts-ignore
    UrlFetchApp.fetch = mockFetch;
    const url = 'https://testIdentityDomain/v2.0/tokens';
    const option = {
      'contentType': 'application/json',
      'method': 'post',
      'payload': '{"auth":{"passwordCredentials":{"username":"testUser","password":"testPassword"},"tenantId":"testTenantId"}}'};
    const expected = [url, option];
    const actual = ConoHaService.issueToken('testIdentityDomain', 'testUser', 'testPassword', 'testTenantId');
    expect(mockFetch.mock.calls[0]).toEqual(expected);
    expect(actual).toBe('testToken');
  });
});

describe('getAccountInfo', () => {
  it('getAccountInfo', () => {
    const mockFetch = jest.fn(() => {
      return {
        getContentText: jest.fn(() => {
          return '{"access": {"token": {"id": "testToken"}}, "billing_invoices": [{"bill_plus_tax": "500"}]}';
        })
      };
    });
    // @ts-ignore
    UrlFetchApp.fetch = mockFetch;
    const target = new ConoHaService(
      'testUser',
      'testPassword',
      'testTenantId',
      'testIdentityDomain',
      'testNetworkDoman',
      'testAccountDomain',
      'testSecurityGroupId');
    const actual = target.getAccountInfo();
    const url = 'https://testAccountDomain/v1/testTenantId/billing-invoices';
    const headers = { 'X-Auth-Token': 'testToken' };
    const option = {
      'method': 'get',
      'contentType': 'application/json',
      'headers': headers};
    const expected = [url, option];
    expect(mockFetch.mock.calls[1]).toEqual(expected);
    // @ts-ignore
    expect(actual.billing_invoices[0].bill_plus_tax).toBe('500')
  });
});

describe('getTargetSecurityGroupInfo', () => {
  it('getTargetSecurityGroupInfo', () => {
    const mockFetch = jest.fn(() => {
      return {
        getContentText: jest.fn(() => {
          return '{"access": {"token": {"id": "testToken"}}, "security_group": {"id": "testId"}}';
        })
      };
    });
    // @ts-ignore
    UrlFetchApp.fetch = mockFetch;
    const target = new ConoHaService(
      'testUser',
      'testPassword',
      'testTenantId',
      'testIdentityDomain',
      'testNetworkDoman',
      'testAccountDomain',
      'testSecurityGroupId');
    const actual = target.getTargetSecurityGroupInfo();
    const url = 'https://testNetworkDoman/v2.0/security-groups/testSecurityGroupId';
    const headers = { 'X-Auth-Token': 'testToken' };
    const option = {
      'method': 'get',
      'contentType': 'application/json',
      'headers': headers};
    const expected = [url, option];
    expect(mockFetch.mock.calls[1]).toEqual(expected);
    // @ts-ignore
    expect(actual.security_group.id).toBe('testId')
  });
});

describe('addIpToTargetSg', () => {
  it('addIpToTargetSg', () => {
    const mockFetch = jest.fn(() => {
      return {
        getContentText: jest.fn(() => {
          return '{"access": {"token": {"id": "testToken"}}, "security_group": {"id": "testId"}}';
        })
      };
    });
    // @ts-ignore
    UrlFetchApp.fetch = mockFetch;
    const target = new ConoHaService(
      'testUser',
      'testPassword',
      'testTenantId',
      'testIdentityDomain',
      'testNetworkDoman',
      'testAccountDomain',
      'testSecurityGroupId');
    const actual = target.addIpToTargetSg('192.168.0.1', 'tcp', '22');
    const url = 'https://testNetworkDoman/v2.0/security-group-rules';
    const headers = { 'X-Auth-Token': 'testToken' };
    const payload = {
      security_group_rule: {
        direction: 'ingress',
        remote_ip_prefix: '192.168.0.1/32',
        protocol: 'tcp',
        ethertype: 'IPv4',
        port_range_max: '22',
        port_range_min: '22',
        security_group_id: 'testSecurityGroupId'
      }
    };
    const option = {
      'method': 'post',
      'contentType': 'application/json',
      'headers': headers,
      'payload': JSON.stringify(payload)};
    const expected = [url, option];
    expect(mockFetch.mock.calls[1]).toEqual(expected);
    // @ts-ignore
    expect(actual.security_group.id).toBe('testId')
  });
});

describe('revokeIpToTargetSg', () => {
  it('OK', () => {
    const mockFetch = jest.fn(() => {
      return {
        getContentText: jest.fn(() => {
          return '{"access": {"token": {"id": "testToken"}}, "security_group": {"id": "testId"}}';
        }),
        getResponseCode: jest.fn(() => {
          return 204
      })
      };
    });
    // @ts-ignore
    UrlFetchApp.fetch = mockFetch;
    const target = new ConoHaService(
      'testUser',
      'testPassword',
      'testTenantId',
      'testIdentityDomain',
      'testNetworkDoman',
      'testAccountDomain',
      'testSecurityGroupId');
    const actual = target.revokeIpToTargetSg('testSecurityGroupId');
    const url = 'https://testNetworkDoman/v2.0/security-group-rules/testSecurityGroupId';
    const headers = { 'X-Auth-Token': 'testToken' };
    const option = {
      'method': 'delete',
      'contentType': 'application/json',
      'headers': headers
    };
    const expected = [url, option];
    expect(mockFetch.mock.calls[1]).toEqual(expected);
    // @ts-ignore
    expect(actual).toBe(true);
  });
  it('NG', () => {
    const mockFetch = jest.fn(() => {
      return {
        getContentText: jest.fn(() => {
          return '{"access": {"token": {"id": "testToken"}}, "security_group": {"id": "testId"}}';
        }),
        getResponseCode: jest.fn(() => {
          return 500
        })
      };
    });
    // @ts-ignore
    UrlFetchApp.fetch = mockFetch;
    const target = new ConoHaService(
      'testUser',
      'testPassword',
      'testTenantId',
      'testIdentityDomain',
      'testNetworkDoman',
      'testAccountDomain',
      'testSecurityGroupId');
    const actual = target.revokeIpToTargetSg('testSecurityGroupId');
    const url = 'https://testNetworkDoman/v2.0/security-group-rules/testSecurityGroupId';
    const headers = { 'X-Auth-Token': 'testToken' };
    const option = {
      'method': 'delete',
      'contentType': 'application/json',
      'headers': headers
    };
    const expected = [url, option];
    expect(mockFetch.mock.calls[1]).toEqual(expected);
    // @ts-ignore
    expect(actual).toBe(false);
  });
});
