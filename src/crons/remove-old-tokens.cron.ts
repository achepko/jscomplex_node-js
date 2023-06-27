import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Token } from "../models/Token.model";

dayjs.extend(utc);

const tokensRemover = async () => {
  const previousMonth = dayjs().utc().subtract(1, "day");
  // console.log(previousMonth.toISOString());
  await Token.deleteMany({ createdAt: { $lte: previousMonth } });
};

export const removeOldTokens = new CronJob(
  "0 * * * * *",
  tokensRemover,
  null,
  true
);
