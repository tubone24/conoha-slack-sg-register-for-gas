export class GetParamService {
  static getParams = (e: DoPostEvent): ReturnParams => {
    return {
      token: e.parameter.token,
      text: e.parameter.text,
      channelId: e.parameter.channel_id,
      userId: e.parameter.user_id
    };
  };
}

export interface DoPostEvent {
  parameter: RequestParameter;
}

interface RequestParameter {
  token: string;
  text: string;
  channel_id: string;
  user_id: string;
}

export interface ReturnParams {
  token: string;
  text: string;
  channelId: string;
  userId: string;
}
