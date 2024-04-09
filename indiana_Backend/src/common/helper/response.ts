import { Response } from '../type/type';

function responseMessage(
  statusCode: number,
  message: string,
  data = {},
): Response {
  return {
    statusCode: statusCode,
    message: message,
    data: data,
  };
}
export default responseMessage;
