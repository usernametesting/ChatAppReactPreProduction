import alertify from "alertifyjs";
import { ServiceResponse } from "../../../types/Auths/auth";

export const handleActionResult = async (actionResult: ServiceResponse) => {
    if (actionResult.success)
        alertify.success(actionResult.message);
    else
        alertify.error(actionResult.message);
};