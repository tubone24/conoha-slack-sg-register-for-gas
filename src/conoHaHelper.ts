export class ConoHaHelper {
  static extractSetSgRule(json): string {
    const remoteIdPrefix = json.security_group_rule.remote_ip_prefix;
    const port = `${json.security_group_rule.port_range_max}`;
    return '`Set ingress rules: ' + remoteIdPrefix + ':' + port + '`';
  }
  static extractIngressSgRules(json): { [key: string]: string }[] {
    const sgRules = json.security_group.security_group_rules;
    let ingressSgRules = [];
    for (const sg of sgRules) {
      if (sg.direction == 'ingress') {
        const id: string = sg.id;
        const ip: string = sg.remote_ip_prefix;
        ingressSgRules.push({ id: id, ip: ip });
      }
    }
    return ingressSgRules;
  }
}
