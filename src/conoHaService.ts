export class ConoHaService {
  private readonly token: string;
  private readonly networkDomain: string;
  private readonly securityGroupId: string;
  private readonly accountDomain: string;
  private readonly tenantId: string;
  constructor(
    username: string,
    password: string,
    tenantId: string,
    identityDomain: string,
    networkDomain: string,
    accountDomain: string,
    securityGroupId: string
  ) {
    this.networkDomain = networkDomain;
    this.accountDomain = accountDomain;
    this.securityGroupId = securityGroupId;
    this.tenantId = tenantId;
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

  getTargetSecurityGroupInfo(): SecurityGroupDetail {
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
  addIpToTargetSg(ipAddress: string, protocol: string, port: string): SecurityGroupRuleDetail {
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
  revokeIpToTargetSg(id: string): boolean {
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

  getAccountInfo(): BillingInvoices {
    const url = 'https://' + this.accountDomain + '/v1/' + this.tenantId + '/billing-invoices';
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
}

export interface SecurityGroups {
  security_groups: SecurityGroupDetail[]
}

export interface SecurityGroupDetail {
  security_group: {
    tenant_id: string,
    description: string,
    id: string,
    security_group_rules: SecurityGroupRule[]
  }
}

export interface SecurityGroupRuleDetail {
  security_group_rule: SecurityGroupRule
}

export interface SecurityGroupRule {
  remote_group_id: string | null,
  remote_ip_prefix: string | null,
  direction: string,
  protocol: string | null,
  ethertype: string,
  tenant_id: string,
  port_range_max: number | null,
  port_range_min: number | null,
  id: string,
  security_group_id: string
}

export interface BillingInvoices {
  billing_invoices: BillingInvoice[]
}

export interface BillingInvoice {
  invoice_id: number,
  payment_method_type: string,
  invoice_date: string,
  bill_plus_tax: number,
  due_date: string
}
