import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "src/user/user.entity";

@Table
export class AuthRecordModel extends Model {
  @Column
  accessToken: string;

  @Column
  refreshToken: Date;

  @BelongsTo(() => UserModel)
  user: UserModel;
}