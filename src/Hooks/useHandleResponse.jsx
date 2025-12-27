import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { iconifyIcons } from "../Utils/constants";

const useHandleResponse = () => {
  const handleResponse = (response, callbackObj) => {
    if (response.success === true) {
      toast.success(response.message, {
        icon: <Icon icon={iconifyIcons.tick} height={20} />,
      });
      callbackObj && callbackObj.success && callbackObj.success();
    } else {
      toast.error(response.message);
      callbackObj && callbackObj.failure && callbackObj.failure();
    }
  };
  return { handleResponse };
};

export default useHandleResponse;
