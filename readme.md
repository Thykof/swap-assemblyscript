# Swap Assemblyscript

ressources:
- Getting started with AssemblyScript | WebAssembly | Tutorial
    https://www.youtube.com/watch?v=YYmE1m1LN1w
- What is an Automated Market Maker? (Liquidity Pool Algorithm)
    https://www.youtube.com/watch?v=1PbZMudPP5E

## Setup dev env

Install https://marketplace.visualstudio.com/items?itemName=saulecabrera.asls

## Issues

This error occurred when passing string function arguments:

```
file:///Users/nathanseva/dev/swap-assemblyscript/build/debug.js:46
      pointer = exports.__new(length << 1, 1) >>> 0,
                        ^

TypeError: exports.__new is not a function
    at __lowerString (file:///Users/nathanseva/dev/swap-assemblyscript/build/debug.js:46:25)
    at swap (file:///Users/nathanseva/dev/swap-assemblyscript/build/debug.js:22:16)
    at file:///Users/nathanseva/dev/swap-assemblyscript/tests/index.js:13:16

Node.js v17.8.0
```