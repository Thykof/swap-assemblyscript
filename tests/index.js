import assert from "assert";
import { add } from "../build/debug.js";
assert.strictEqual(add(1, 2), 3);
console.log("ok");

import { init, giveAway, swap, status, getBalanceUSD, getBalanceToken } from "../build/debug.js";

const ADDRESS = 13;

assert.strictEqual(status(), "total token: 0 total usd: 0 t constant: 0");
init(10000, 1);
assert.strictEqual(status(), "total token: 100 total usd: 100 t constant: 10000");

assert.strictEqual(getBalanceUSD(ADDRESS), 0);
assert.strictEqual(getBalanceToken(ADDRESS), 0);

try {
    swap(2, 2, ADDRESS);
    throw new Error("did not fail");
} catch (error) {
    assert.strictEqual(error.message.startsWith("insufficient funds"), true);
}

giveAway(24, ADDRESS);
assert.strictEqual(getBalanceUSD(ADDRESS), 24);
let result = swap(2, 2, ADDRESS);
console.log(result, status());
assert.strictEqual(result, "successfully swapped 2 USD for 2 token");
assert.strictEqual(status(), "total token: 98 total usd: 102 t constant: 10000");
assert.strictEqual(getBalanceUSD(ADDRESS), 22);
assert.strictEqual(getBalanceToken(ADDRESS), 2);

result = swap(2, 2, ADDRESS);
console.log(result, status());
assert.strictEqual(result, "successfully swapped 2 USD for 2 token");
assert.strictEqual(status(), "total token: 96 total usd: 104 t constant: 10000");
assert.strictEqual(getBalanceUSD(ADDRESS), 20);
assert.strictEqual(getBalanceToken(ADDRESS), 4);

giveAway(180, ADDRESS);
result = swap(200, 2, ADDRESS);
console.log(result, status());
assert.strictEqual(result, "successfully swapped 200 USD for 64 token");
assert.strictEqual(status(), "total token: 32 total usd: 304 t constant: 10000");
assert.strictEqual(getBalanceUSD(ADDRESS), 0);
assert.strictEqual(getBalanceToken(ADDRESS), 68);

console.log("done");
