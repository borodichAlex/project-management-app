import { UserDataKeys } from 'src/app/core/interfaces/user.interface';

export type TranslateUserGeneralData = {
  heading: string;
  btn: string;
  fields: {
    userName: {
      label: string;
    };
    userLogin: {
      label: string;
    };
  };
};

export type TranslateFieldsKeys = 'userName' | 'userLogin';

export type UserGeneralFieldsKeys = UserDataKeys;

export type UserGeneralField = {
  name: UserGeneralFieldsKeys;
  translateKey: TranslateFieldsKeys;
};
