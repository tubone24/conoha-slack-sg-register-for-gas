import { ConoHaHelper } from "../../src/conoHaHelper";

describe('extractSetSgRule', () => {
  it('ok', () => {
    const input = {security_group_rule: {
        remote_ip_prefix: '192.168.0.1/32',
        port_range_max: 22
      }}
      const actual = ConoHaHelper.extractSetSgRule(input);
    expect(actual).toBe('`Set ingress rules: 192.168.0.1/32:22`');
  });
});

describe('extractIngressSgRules', () => {
  it('one ingress', () => {
    const input = {security_group: {
        security_group_rules: [
          {id: 'testId', remote_ip_prefix: '192.168.0.1/32', direction: 'ingress'}
        ]
      }};
    const actual = ConoHaHelper.extractIngressSgRules(input);
    expect(actual).toEqual([{id: 'testId', ip: '192.168.0.1/32'}]);
  });
  it('two ingress', () => {
    const input = {security_group: {
        security_group_rules: [
          {id: 'testId', remote_ip_prefix: '192.168.0.1/32', direction: 'ingress'},
          {id: 'testId2', remote_ip_prefix: '192.168.0.2/32', direction: 'ingress'}
        ]
      }};
    const actual = ConoHaHelper.extractIngressSgRules(input);
    expect(actual).toEqual([{id: 'testId', ip: '192.168.0.1/32'}, {id: 'testId2', ip: '192.168.0.2/32'}]);
  });
  it('two ingress, one egress', () => {
    const input = {security_group: {
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
    const input = {security_group: {
        security_group_rules: [
          {id: 'testId3', remote_ip_prefix: '192.168.0.3/32', direction: 'egress'}
        ]
      }};
    const actual = ConoHaHelper.extractIngressSgRules(input);
    expect(actual).toEqual([]);
  });
  it('empty', () => {
    const input = {security_group: {
        security_group_rules: [
        ]
      }};
    const actual = ConoHaHelper.extractIngressSgRules(input);
    expect(actual).toEqual([]);
  });
});
