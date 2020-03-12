import { GetScriptPropertiesService } from "../../src/getScriptPropertiesService";

describe('getProperties', () => {
  it('ok', () => {
    const mockGetProperty = jest.fn();
    mockGetProperty.mockReturnValueOnce('test_verify_token');
    mockGetProperty.mockReturnValueOnce('test_channel_id');
    mockGetProperty.mockReturnValueOnce('test_conoha_network_endpoint');
    mockGetProperty.mockReturnValueOnce('test_conoha_username');
    mockGetProperty.mockReturnValueOnce('test_conoha_password');
    mockGetProperty.mockReturnValueOnce('test_conoha_identity_endpoint');
    mockGetProperty.mockReturnValueOnce('test_conoha_account_endpoint');
    mockGetProperty.mockReturnValueOnce('test_conoha_tenantid');
    mockGetProperty.mockReturnValueOnce('test_conoha_target_sg');

    const mockGetScriptProperties = jest.fn(() => {
      return {
        getProperty: mockGetProperty
      };
    });
    // @ts-ignore
    PropertiesService.getScriptProperties = mockGetScriptProperties;
    const expected = {
      verifyToken: 'test_verify_token',
      channelId: 'test_channel_id',
      conohaNetworkEndpoint: 'test_conoha_network_endpoint',
      conohaUsername: 'test_conoha_username',
      conohaPassword: 'test_conoha_password',
      conohaIdentityEndpoint: 'test_conoha_identity_endpoint',
      conohaAccountEndpoint: 'test_conoha_account_endpoint',
      conohaTenantId: 'test_conoha_tenantid',
      conohaTargetSg: 'test_conoha_target_sg'
    };

    const actual = GetScriptPropertiesService.getProperties();
    expect(actual).toEqual(expected)
  });
});
