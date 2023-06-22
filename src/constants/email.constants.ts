import { EEmailActions } from "../enums/email.enum";

export const allTemplates = {
  [EEmailActions.WELCOME]: {
    templateName: "register",
    subject: "Welcome to our powerfull CRUD platform",
  },
  [EEmailActions.FORGOT_PASSWORD]: {
    templateName: "forgot-password",
    subject: "Welcome to reset password",
  },
  [EEmailActions.ACTIVATE_ACCOUNT]: {
    templateName: "activate-account",
    subject: "Please activate your user account",
  },
};
