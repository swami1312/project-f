import { toast } from 'react-toastify';

const useHandleResponse = () => {
  const handleResponse = (response, callbackObj) => {
    if (response.success === true) {
      toast.success(response.message);
      callbackObj && callbackObj.success && callbackObj.success();
    } else {
      toast.error(response.message);
      callbackObj && callbackObj.failure && callbackObj.failure();
    }
  };
  return { handleResponse };
};

export default useHandleResponse;
