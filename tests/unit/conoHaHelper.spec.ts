import { ConoHaHelper } from "../../src/conoHaHelper";
import { SecurityGroupRuleDetail, SecurityGroupDetail } from "../../src/conoHaService";

describe('extractSetSgRule', () => {
  it('ok', () => {
    const input: SecurityGroupRuleDetail = {
      security_group_rule: {
        remote_group_id: null,
        direction: 'ingress',
        protocol: 'tcp',
        ethertype: 'IPv4',
        tenant_id: 'testId',
        id: 'testId',
        security_group_id: 'testId',
        remote_ip_prefix: '192.168.0.1/32',
        port_range_max: 22,
        port_range_min: 22
      }};
      const actual = ConoHaHelper.extractSetSgRule(input);
    expect(actual).toBe('`Set ingress rules: 192.168.0.1/32:22`');
  });
});

describe('extractIngressSgRules', () => {
  it('one ingress', () => {
    const input: any = {security_group: {
        security_group_rules: [
          {id: 'testId', remote_ip_prefix: '192.168.0.1/32', direction: 'ingress'}
        ]
      }};
    const actual = ConoHaHelper.extractIngressSgRules(input);
    expect(actual).toEqual([{id: 'testId', ip: '192.168.0.1/32'}]);
  });
  it('two ingress', () => {
    const input: any = {security_group: {
        security_group_rules: [
          {id: 'testId', remote_ip_prefix: '192.168.0.1/32', direction: 'ingress'},
          {id: 'testId2', remote_ip_prefix: '192.168.0.2/32', direction: 'ingress'}
        ]
      }};
    const actual = ConoHaHelper.extractIngressSgRules(input);
    expect(actual).toEqual([{id: 'testId', ip: '192.168.0.1/32'}, {id: 'testId2', ip: '192.168.0.2/32'}]);
  });
  it('two ingress, one egress', () => {
    const input: any = {security_group: {
        security_group_rules: [
          {id: 'testId', remote_ip_prefix: '192.168.0.1/32', direction: 'ingress'},
          {id: 'testId2', remote_ip_prefix: '192.168.0.2/32', direction: 'ingress'},
          {id: 'testId3', remote_ip_prefix: '192.168.0.3/32', direction: 'egress'}
        ]
      }};
    const actual = ConoHaHelper.extractIngressSgRules(input);
    expect(actual).toEqual([{id: 'testId', ip: '192.168.0.1/32'}, {id: 'testId2', ip: '192.168.0.2/32'}]);
  });
  it('one egress', () => {
    const input: any = {security_group: {
        security_group_rules: [
          {id: 'testId3', remote_ip_prefix: '192.168.0.3/32', direction: 'egress'}
        ]
      }};
    const actual = ConoHaHelper.extractIngressSgRules(input);
    expect(actual).toEqual([]);
  });
  it('empty', () => {
    const input: any = {security_group: {
        security_group_rules: [
        ]
      }};
    const actual = ConoHaHelper.extractIngressSgRules(input);
    expect(actual).toEqual([]);
  });
});

describe('extractLatestAccountBillPlusTax', () => {
  it('ok', () => {
    const formatDate = jest.fn(() => {
      return '2020/4/19';
    });
    // @ts-ignore
    Utilities.formatDate = formatDate;
    const input: any = {billing_invoices: [
        {bill_plus_tax: 500, due_date: '2020-04-19T15:00:00Z'}
      ]};
    const actual = ConoHaHelper.extractLatestAccountBillPlusTax(input);
    expect(actual).toBe('Now Billing: 500YEN\n  Due Date: 2020/4/19');
  });
});
