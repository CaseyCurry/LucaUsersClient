import api from "../../../api-proxy";
import changeEmailAction from "./change-email";
import changePasswordAction from "./change-password";
import changeConfirmedPasswordAction from "./change-confirmed-password";
import cancelRegistrationAction from "./cancel-registration";
import submitRegistrationAction from "./submit-registration";

export const changeEmail = changeEmailAction;
export const changePassword = changePasswordAction;
export const changeConfirmedPassword = changeConfirmedPasswordAction;
export const cancelRegistration = cancelRegistrationAction;
export const submitRegistration = submitRegistrationAction(api);
