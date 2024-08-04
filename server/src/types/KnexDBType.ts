export interface IKnexDBType {
  users: {
    id: string;
    created: Date;
    username: string;
    email: string;
    password: string;
    token: string;
  };
}
