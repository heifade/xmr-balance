import { get } from "./util/ask";

export async function getXmrBalance(xmrBaseAddress: string): Promise<number> {
  let res = await get(`https://p5.minexmr.com/stats_address?address=${xmrBaseAddress}&longpoll=false`, null);

  return res.stats.balance;
}

export async function getXmrData(xmrBaseAddress: string): Promise<any[]> {
  let res = await get(`https://s3.minexmr.com/graph/history_address?days=1&address=${xmrBaseAddress}`, null);
  return res;
}