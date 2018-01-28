import fetch from "node-fetch";

export async function get(url: string, pars: any) {
  let response = await fetch(`${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    timeout: 60000,
    body: JSON.stringify(pars)
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("error");
  }
}
