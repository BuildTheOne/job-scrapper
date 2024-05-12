class BaseResponse {
  public static success<T>(statusCode: number, message: string, data: T) {
    return {
      data,
      message,
      statusCode,
      serverTime: new Date(Date.now()),
    };
  }

  public static error<T>(
    statusCode: number,
    message: string,
    data: T | null = null,
  ) {
    return {
      data,
      message,
      statusCode,
      serverTime: new Date(Date.now()),
    };
  }
}

export default BaseResponse;
