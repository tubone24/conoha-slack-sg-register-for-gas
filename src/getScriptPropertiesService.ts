export class GetScriptPropertiesService {
  static getProperties() {
    const verifyToken: string = PropertiesService.getScriptProperties().getProperty('VERIFY_TOKEN');
    const channelId: string = PropertiesService.getScriptProperties().getProperty('CHANNEL_ID');
    const conohaNetworkEndpoint: string = PropertiesService.getScriptProperties().getProperty(
      'CONOHA_NETWORK_ENDPOINT'
    );
    const conohaUsername: string = PropertiesService.getScriptProperties().getProperty(
      'CONOHA_USERNAME'
    );
    const conohaPassword: string = PropertiesService.getScriptProperties().getProperty(
      'CONOHA_PASSWORD'
    );
    const conohaIdentityEndpoint: string = PropertiesService.getScriptProperties().getProperty(
      'CONOHA_IDENTITY_ENDPOINT'
    );
    const conohaAccountEndpoint: string = PropertiesService.getScriptProperties().getProperty(
      'CONOHA_ACCOUNT_ENDPOINT'
    );
    const conohaTenantId: string = PropertiesService.getScriptProperties().getProperty(
      'CONOHA_TENANTID'
    );
    const conohaTargetSg: string = PropertiesService.getScriptProperties().getProperty(
      'CONOHA_TARGET_SG'
    );
    return {
      verifyToken: verifyToken,
      channelId: channelId,
      conohaNetworkEndpoint: conohaNetworkEndpoint,
      conohaUsername: conohaUsername,
      conohaPassword: conohaPassword,
      conohaIdentityEndpoint: conohaIdentityEndpoint,
      conohaAccountEndpoint: conohaAccountEndpoint,
      conohaTenantId: conohaTenantId,
      conohaTargetSg: conohaTargetSg
    }
  }
}
