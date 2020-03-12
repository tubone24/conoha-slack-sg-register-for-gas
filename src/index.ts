import { GetParamService, DoPostEvent } from './getParamService';
import { SlackService } from './slackService';
import { ResponseService } from './responseService';
import { ConoHaService } from './conoHaService';
import { ConoHaHelper } from './conoHaHelper';
import { GetScriptPropertiesService } from "./getScriptPropertiesService";
import { Utils } from './utils';

declare var global: any;

global.doPost = (e: DoPostEvent) => {
  console.log(JSON.stringify(e));
  const VERIFY_TOKEN: string = GetScriptPropertiesService.getProperties().verifyToken;
  const CHANNEL_ID: string =  GetScriptPropertiesService.getProperties().channelId;
  const CONOHA_NETWORK_ENDPOINT: string = GetScriptPropertiesService.getProperties().conohaNetworkEndpoint;
  const CONOHA_USERNAME: string = GetScriptPropertiesService.getProperties().conohaUsername;
  const CONOHA_PASSWORD: string = GetScriptPropertiesService.getProperties().conohaPassword;
  const CONOHA_IDENTITY_ENDPOINT: string = GetScriptPropertiesService.getProperties().conohaIdentityEndpoint;
  const CONOHA_ACCOUNT_ENDPOINT: string = GetScriptPropertiesService.getProperties().conohaAccountEndpoint;
  const CONOHA_TENANTID: string = GetScriptPropertiesService.getProperties().conohaTenantId;
  const CONOHA_TARGET_SG: string = GetScriptPropertiesService.getProperties().conohaTargetSg;

  const params = GetParamService.getParams(e);
  const response = new ResponseService(params.userId);

  if (
    !SlackService.verifyToken(params.token, VERIFY_TOKEN) ||
    !SlackService.verifyChannel(params.channelId, CHANNEL_ID)
  ) {
    return response.createResponseText('Invalid Token or Channel!');
  }

  if (Utils.usageCommand(params.text)) {
    return response.createResponseText(
      '```\nRegist your IP for your conoHa Server SecurityGroup\n\nusage: ' +
        '\n/ipregister showall\nShow all rules in target SecurityGroup\n\n' +
        '/ipregister revokeall\nRevoke All ingress Rules in target SecurityGroup\n\n' +
        '/ipregister 192.168.0.1\nRegist your IP for target SecurityGroup(format IPv4)```'
    );
  }

  const conohaService = new ConoHaService(
    CONOHA_USERNAME,
    CONOHA_PASSWORD,
    CONOHA_TENANTID,
    CONOHA_IDENTITY_ENDPOINT,
    CONOHA_NETWORK_ENDPOINT,
    CONOHA_ACCOUNT_ENDPOINT,
    CONOHA_TARGET_SG
  );

  if (Utils.billingCommand(params.text)) {
    return response.createResponseText(ConoHaHelper.extractLatestAccountBillPlusTax(conohaService.getAccountInfo()));
  }

  if (Utils.showCommand(params.text)) {
    let responseText = 'Show All Rules...\n```';
    responseText =
      responseText + Utils.prettyJSON(conohaService.getTargetSecurityGroupInfo()) + '```';
    return response.createResponseText(responseText);
  }

  if (Utils.revokeCommand(params.text)) {
    let responseText = 'RevokeAllIp...\n```';
    const ingressSgRules = ConoHaHelper.extractIngressSgRules(
      conohaService.getTargetSecurityGroupInfo()
    );
    for (const sg of ingressSgRules) {
      if (conohaService.revokeIpToTargetSg(sg.id)) {
        responseText = responseText + sg.ip + ' is revoked.\n';
      } else {
        responseText = responseText + sg.ip + ' is NOT revoked!!\n';
      }
    }
    responseText = responseText + '```';
    return response.createResponseText(responseText);
  }

  if (!Utils.validateIP(params.text)) {
    return response.createResponseText('Enter v4 IP address format');
  }

  const resp = ConoHaHelper.extractSetSgRule(
    conohaService.addIpToTargetSg(params.text, 'tcp', '22')
  );
  return response.createResponseText(resp);
};
