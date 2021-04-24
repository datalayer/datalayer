export const ANONYMOUS_USER = null;

export const ANONYMOUS_TOKEN = '';

export const NULL_USER: User = {
  username: '',
  firstName: '',
  lastName: '',
  displayName: '',
  email: '',
  roles: [],
};

export type User = {
  username: string ;
  firstName: string;
  lastName: string;
  displayName?: string;
  email: string;
  roles: Array<string>;
};
