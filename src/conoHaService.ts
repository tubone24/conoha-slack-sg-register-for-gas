export class ConoHaService {
  private readonly token: string;
  private readonly networkDomain: string;
  private readonly securityGroupId: string;
  constructor(
    username: string,
    password: string,
    tenantId: string,
    identityDomain: string,
    networkDomain: string,
    securityGroupId: string
  ) {
    this.networkDomain = networkDomain;
    this.securityGroupId = securityGroupId;
    this.token = ConoHaService.issueToken(identityDomain, username, password, tenantId);
  }

  static issueToken(
    identityDomain: string,
    username: string,
    password: string,
    tenantId: string
  ): string {
    const url = 'https://' + identityDomain + '/v2.0/tokens';
    const payload = {
      auth: {
        passwordCredentials: {
          username: username,
          password: password
        },
        tenantId: tenantId
      }
    };
    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload)
    };
    // @ts-ignore
    const json = UrlFetchApp.fetch(url, options).getContentText();
    return JSON.parse(json).access.token.id;
  }

  getTargetSecurityGroupInfo(): JSON {
    const url = 'https://' + this.networkDomain + '/v2.0/security-groups/' + this.securityGroupId;
    const headers = { 'X-Auth-Token': this.token };
    const options = {
      method: 'get',
      contentType: 'application/json',
      headers: headers
    };
    // @ts-ignore
    const json = UrlFetchApp.fetch(url, options).getContentText();
    return JSON.parse(json);
  }
  addIpToTargetSg(ipAddress: string, protocol: string, port: string) {
    const url = 'https://' + this.networkDomain + '/v2.0/security-group-rules';
    const ipPrefix = ipAddress + '/32';
    const headers = { 'X-Auth-Token': this.token };
    const payload = {
      security_group_rule: {
        direction: 'ingress',
        remote_ip_prefix: ipPrefix,
        protocol: protocol,
        ethertype: 'IPv4',
        port_range_max: port,
        port_range_min: port,
        security_group_id: this.securityGroupId
      }
    };
    const options = {
      method: 'post',
      contentType: 'application/json',
      headers: headers,
      payload: JSON.stringify(payload)
    };
    console.log('addIpToTargetSg' + JSON.stringify(payload));
    // @ts-ignore
    const json = UrlFetchApp.fetch(url, options).getContentText();
    return JSON.parse(json);
  }
  revokeIpToTargetSg(id: string) {
    const url = 'https://' + this.networkDomain + '/v2.0/security-group-rules/' + id;
    const headers = { 'X-Auth-Token': this.token };
    const options = {
      method: 'delete',
      contentType: 'application/json',
      headers: headers
    };
    // @ts-ignore
    const code = UrlFetchApp.fetch(url, options).getResponseCode();
    return code == 204;
  }
}
