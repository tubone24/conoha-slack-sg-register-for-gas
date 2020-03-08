import { GetParamService, DoPostEvent } from './getParamService';
import { SlackService } from './slackService';
import { ResponseService } from './responseService';
import { ConoHaService } from './conoHaService';
import { ConoHaHelper } from './conoHaHelper';
import { Utils } from './utils';

declare var global: any;

global.doPost = (e: DoPostEvent) => {
  console.log(JSON.stringify(e));
  const VERIFY_TOKEN: string = PropertiesService.getScriptProperties().getProperty('VERIFY_TOKEN');
  const CHANNEL_ID: string = PropertiesService.getScriptProperties().getProperty('CHANNEL_ID');
  const CONOHA_NETWORK_ENDPOINT: string = PropertiesService.getScriptProperties().getProperty(
    'CONOHA_NETWORK_ENDPOINT'
  );
  const CONOHA_API_TOKEN: string = PropertiesService.getScriptProperties().getProperty(
    'CONOHA_API_TOKEN'
  );
  const CONOHA_TARGET_SG: string = PropertiesService.getScriptProperties().getProperty(
    'CONOHA_TARGET_SG'
  );

  const params = GetParamService.getParams(e);
  const response = new ResponseService(params.userId);

  if (
    !SlackService.verifyToken(params.token, VERIFY_TOKEN) ||
    !SlackService.verifyChannel(params.channelId, CHANNEL_ID)
  ) {
    return response.createResponseText('Invalid Token or Channel!');
  }

  const conohaService = new ConoHaService(
    CONOHA_API_TOKEN,
    CONOHA_NETWORK_ENDPOINT,
    CONOHA_TARGET_SG
  );

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

  if (!Utils.varidateIP(params.text)) {
    return response.createResponseText('Enter v4 IP address format');
  }

  const resp = ConoHaHelper.extractSetSgRule(
    conohaService.addIpToTargetSg(params.text, 'tcp', '22')
  );
  return response.createResponseText(resp);
};
