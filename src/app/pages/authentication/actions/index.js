import api from "../../../api-proxy";
import changeEmailAction from "./change-email";
import changePasswordAction from "./change-password";
import displayRegistrationAction from "./display-registration";
import submitAuthenticationAction from "./submit-authentication";

export const changeEmail = changeEmailAction;
export const changePassword = changePasswordAction;
export const displayRegistration = displayRegistrationAction;
export const submitAuthentication = submitAuthenticationAction(api);
