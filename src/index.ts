import { GetParamService, DoPostEvent } from './getParamService';
import { SlackService } from './slackService';
import { ResponseService } from './responseService';
import { Utils } from './utils';

declare var global: any;

global.doPost = (e: DoPostEvent) => {
  console.log(JSON.stringify(e));
  const VERIFY_TOKEN: string = PropertiesService.getScriptProperties().getProperty('VERIFY_TOKEN');
  const CHANNEL_ID: string = PropertiesService.getScriptProperties().getProperty('CHANNEL_ID');
  // const CONOHA_ENDPOINT: string = PropertiesService.getScriptProperties().getProperty('CONOHA_ENDPOINT');
  // const CONOHA_API_TOKEN: string = PropertiesService.getScriptProperties().getProperty('CONOHA_API_TOKEN');
  // const CONOHA_TENANT_ID: string = PropertiesService.getScriptProperties().getProperty('CONOHA_TENANT_ID');
  // const CONOHA_SERVER_ID: string = PropertiesService.getScriptProperties().getProperty('CONOHA_SERVER_ID');
  // const SLACK_CHANNEL: string = PropertiesService.getScriptProperties().getProperty('SLACK_CHANNEL') || '#general';

  const params = GetParamService.getParams(e);
  const response = new ResponseService(params.userId);

  if (
    !SlackService.verifyToken(params.token, VERIFY_TOKEN) ||
    !SlackService.verifyChannel(params.channelId, CHANNEL_ID)
  ) {
    return response.createResponseText('Invalid Token or Channel!');
  }

  if (!Utils.varidateIP(params.text)) {
    return response.createResponseText('Enter v4 IP address format');
  }

  return response.createResponseText(params.text);
};
