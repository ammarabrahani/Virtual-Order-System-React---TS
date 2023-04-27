import { message } from "antd";

const errorHandler = (error: any) => {
  if (error.message.status === 422 || error.message.status === 401 || error.message.status === 404) {
    const errorData = error.message.data;
    message.error(errorData.message);
  }
};

export default errorHandler;
