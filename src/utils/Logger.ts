import dayjs from "dayjs";
import logger from "pino";

const log = logger({
  pretyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `,"time"${dayjs().format()}`,
});

export default log;
