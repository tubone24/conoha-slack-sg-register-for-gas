// @ts-ignore
import AWS = require("aws-sdk");
// @ts-ignore
import EC2 = require('aws-sdk/clients/ec2');
AWS.config.loadFromPath('../credencials.json');

class Ec2Service {
  private ec2: EC2;
  constructor() {
    this.ec2 = new EC2({
      region: 'ap-northeast-1'
    });
  }

  async registYourIp(sgName: string, ipAddress: string) {
    const sgList = await this.getSecurityGroups(sgName);
    await this.setSgIpPermission(sgList, ipAddress, 22, "tcp")
  }

  private async getSecurityGroups(sgName: string): EC2.SecurityGroupList {
    const info = await this.ec2
      .describeSecurityGroups({
        Filters: [
          {
            Name: 'tag:Name',
            Values: [sgName]
          }
        ]
      })
      .promise();
    console.log(console.log('SGs' + info.SecurityGroups));
    return info.SecurityGroups;
  }

  private async setSgIpPermission(
    SecurityGroups: EC2.SecurityGroupList,
    ipAddress: string,
    port: number,
    protocol: string
  ): Promise<void> {
    for (const sg of SecurityGroups) {
      const params = {
        GroupId: sg.GroupId,
        IpPermissions: [
          {
            FromPort: port,
            IpProtocol: protocol,
            IpRanges: [
              {
                CidrIp: ipAddress + '/24',
                Description: 'Set by GAS'
              }
            ],
            ToPort: port
          }
        ]
      };
      await this.ec2.authorizeSecurityGroupIngress(params);
    }
  }
}
