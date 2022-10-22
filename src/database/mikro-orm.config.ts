import { LoadStrategy, Options, PopulateHint } from "@mikro-orm/core";
import { AuthRecordEntity } from "src/auth/auth-record.entity";
import { UserEntity } from "src/user/user.entity";

const mikroOrmConfig: Options = {
  entities: [UserEntity, AuthRecordEntity],
  dbName: 'donat_baza',
  type: 'mysql',
  host: 'donat_baza_db',
  port: 3306,
  password: 'donat_baza',
  // loadStrategy: LoadStrategy.JOINED,
  // populateAfterFlush: false,
};

export default mikroOrmConfig;