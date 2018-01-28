import { option } from "yargs";
import chalk from "chalk";
import { getXmrBalance, getXmrData } from "./xmr";
import { dateToString, toValue, average } from "./util/util";
import { Save, SaveType, ConnectionHelper } from "mysql-i";

let pars = option("d", {
  alias: "xmrBaseAddress",
  demand: true,
  default: "",
  describe: "Please input xmr base address",
  type: "string"
})
  .option("f", {
    alias: "frequency",
    demand: false,
    default: 60,
    describe: "Please input frequency of send xmr info",
    type: "number"
  })
  .option("i", {
    alias: "databaseServer",
    demand: false,
    default: "192.168.1.100",
    describe: "Please input database server ip",
    type: "string"
  })
  .option("u", {
    alias: "user",
    demand: false,
    default: "",
    describe: "Please input database server user",
    type: "string"
  })
  .option("p", {
    alias: "password",
    demand: false,
    default: "",
    describe: "Please input database server password",
    type: "string"
  })
  .option("b", {
    alias: "database",
    demand: false,
    default: "xmr",
    describe: "Please input database name",
    type: "string"
  })
  .option("o", {
    alias: "port",
    demand: false,
    default: 3306,
    describe: "Please input database port",
    type: "string"
  }).argv;

let lastBalance = 0;

async function getXmr() {
  let balance = await getXmrBalance(pars.d);

  let increment = lastBalance ? balance - lastBalance : 0;

  let balanceVal = toValue(balance.toString(), 12);
  let incrementVal = toValue(increment.toString(), 12);

  await save({
    balance: balanceVal,
    increment: incrementVal,
    createDate: new Date()
  });
}

async function save(data: any) {
  let conn = await ConnectionHelper.create({
    host: pars.databaseServer,
    user: pars.user,
    password: pars.password,
    database: pars.database,
    port: pars.port
  });

  await Save.save(conn, {
    data: { balance: data.balance, increment: data.increment, createDate: data.createDate },
    table: "balance", // 表名
    saveType: SaveType.insert //插入
  });
}

async function begin() {
  setInterval(() => {
    getXmr();
  }, Number(pars.f) * 1000);
}

begin()
  .then()
  .catch(e => {
    console.log(chalk.red(e));
  });