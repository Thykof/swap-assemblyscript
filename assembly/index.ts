// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

let tConstant: i32;
let initialValue: i32;
let initialized: bool = false;
// const ACTION_FOR_USD = 1;
const ACTION_FOR_TOKEN = 2;
const balancesToken = new Map<i32, i32>();
const balancesUSD = new Map<i32, i32>();
let totalUSD: i32;
let totalToken: i32;

export function init(t: i32, value: i32): void {
  initialized = true;
  tConstant = t;
  initialValue = value;
  totalToken = Math.sqrt(tConstant) as i32;
  totalUSD = Math.sqrt(tConstant) as i32;
}

export function giveAway(amount: i32, address: i32): void {
  const usdBalance: i32 = balancesUSD.has(address) ? balancesUSD.get(address) : 0;
  balancesUSD.set(address, usdBalance + amount);
}

export function swap(amount: i32, action: i32, address: i32): string {
  let amountToken: i32;

  if (action === ACTION_FOR_TOKEN) {
    const usdBalance: i32 = balancesUSD.has(address) ? balancesUSD.get(address) : 0;
    const tokenBalance: i32 = balancesToken.has(address) ? balancesToken.get(address) : 0;
    if (usdBalance < amount) {
      throw new Error("insufficient funds");
    }
    amountToken = totalToken -  (tConstant / (totalUSD + amount));
  
    if (totalToken < amountToken) {
      throw new Error("insufficient token");
    }

    totalToken = totalToken - amountToken;
    totalUSD += amount;
    balancesToken.set(address, tokenBalance + amountToken);
    balancesUSD.set(address, usdBalance - amount);

    return `successfully swapped ${amount} USD for ${amountToken} token`;
  }

  throw new Error("not implemented");
}

export function status(): string
{
  return `total token: ${totalToken} total usd: ${totalUSD} t constant: ${tConstant}`;
}

export function getBalanceUSD(address: i32): i32 {
  return balancesUSD.has(address) ? balancesUSD.get(address) : 0
}

export function getBalanceToken(address: i32): i32 {
  return balancesToken.has(address) ? balancesToken.get(address) : 0
}