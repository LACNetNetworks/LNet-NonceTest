# Sample Hardhat Project

Running Test (esta prueba emula un envio correcto en orden secuencial de nonce)

```shell
npx hardhat run scripts/test.js

Compiled 3 Solidity files successfully (evm target: paris).
Contract Name:  Storage
Expiration Date: 1765818992685
Contract Address:  0x52614D3d6504115454b4E484ea95628B28d95d61
Initial nonce: 28
Sending store(42) with nonce 28
Tx sent: 0x530084487e0d22924afa4de9c6200d9707e81b2c161653ace1f4a04c5ca33809
Tx confirmed
Sending store(43) with nonce 29
Tx sent: 0x8be90ac38365b78ae0f5f75f94be545c5927c15657605df1ec885997340646d3
Tx confirmed
Sending store(44) with nonce 30
Tx sent: 0x194dbb3467e82152375a77be942289326ef893904a2a0e5244ea84d0c2fe3294
Tx confirmed
Stored Value:  44
```

Running Test (esta prueba emula 3 procesos compitiendo por el nonce, en caso de dar error el proximo latest recupera la Tx)

```
npx hardhat run scripts/test.js & npx hardhat run scripts/test.js & npx hardhat run scripts/test.js &

[1] 58308
[2] 58309
[3] 58310
Contract Name:  Storage
Contract Name:  Storage
Expiration Date: 1765819091238
Expiration Date: 1765819091238
Contract Name:  Storage
Expiration Date: 1765819091240
Contract Address:  0x52614D3d6504115454b4E484ea95628B28d95d61
Contract Address:  0x52614D3d6504115454b4E484ea95628B28d95d61
Contract Address:  0x52614D3d6504115454b4E484ea95628B28d95d61
Initial nonce: 31
Sending store(42) with nonce 31
Initial nonce: 32
Sending store(42) with nonce 32
Initial nonce: 33
Sending store(42) with nonce 33
Tx sent: 0x70c3bbf91be95ea1a0b2cd816c6c69c1445a86651145450eb95b90add437b3c4
Error: could not coalesce error (error={ "code": -32000, "message": "BAD NONCE" }, payload={ "id": 12, "jsonrpc": "2.0", "method": "eth_sendRawTransaction", "params": [ "0xf8c420808299799452614d3d6504115454b4e484ea95628b28d95d6180b8646057361d000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000ad730de8c4bfc3d845f7ce851bcf2ea17c0495850000000000000000000000000000000000000000000000000000019b230509261ba0b472ba456798ce8cb435096e16ac4edfd5260a7a206ad5963720623b4c732bdfa016dbfbf00cebcb3bafb88ef1ebc2aa7747f7c29287676540e1046af5353cdc8e" ] }, code=UNKNOWN_ERROR, version=6.16.0)
    at makeError (/Users/neri/LNet-NonceTest/node_modules/ethers/src.ts/utils/errors.ts:698:21)
    at LacchainProvider.getRpcError (/Users/neri/LNet-NonceTest/node_modules/ethers/src.ts/providers/provider-jsonrpc.ts:1086:25)
    at /Users/neri/LNet-NonceTest/node_modules/ethers/src.ts/providers/provider-jsonrpc.ts:571:45
    at processTicksAndRejections (node:internal/process/task_queues:105:5) {
  code: 'UNKNOWN_ERROR',
  error: { code: -32000, message: 'BAD NONCE' },
  payload: {
    method: 'eth_sendRawTransaction',
    params: [
      '0xf8c420808299799452614d3d6504115454b4e484ea95628b28d95d6180b8646057361d000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000ad730de8c4bfc3d845f7ce851bcf2ea17c0495850000000000000000000000000000000000000000000000000000019b230509261ba0b472ba456798ce8cb435096e16ac4edfd5260a7a206ad5963720623b4c732bdfa016dbfbf00cebcb3bafb88ef1ebc2aa7747f7c29287676540e1046af5353cdc8e'
    ],
    id: 12,
    jsonrpc: '2.0'
  },
  shortMessage: 'could not coalesce error'
}
Error: could not coalesce error (error={ "code": -32000, "message": "BAD NONCE" }, payload={ "id": 12, "jsonrpc": "2.0", "method": "eth_sendRawTransaction", "params": [ "0xf8c421808299799452614d3d6504115454b4e484ea95628b28d95d6180b8646057361d000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000ad730de8c4bfc3d845f7ce851bcf2ea17c0495850000000000000000000000000000000000000000000000000000019b230509281ca05c5ad6bd275a1872b5d57c392705d21f9706748e36a7cf58d1942dc947da5f61a0562311d9df1a403a30feb7bb8a22871269d1e9534e25c229fdf72ea4e2ab45a5" ] }, code=UNKNOWN_ERROR, version=6.16.0)
    at makeError (/Users/neri/LNet-NonceTest/node_modules/ethers/src.ts/utils/errors.ts:698:21)
    at LacchainProvider.getRpcError (/Users/neri/LNet-NonceTest/node_modules/ethers/src.ts/providers/provider-jsonrpc.ts:1086:25)
    at /Users/neri/LNet-NonceTest/node_modules/ethers/src.ts/providers/provider-jsonrpc.ts:571:45
    at processTicksAndRejections (node:internal/process/task_queues:105:5) {
  code: 'UNKNOWN_ERROR',
  error: { code: -32000, message: 'BAD NONCE' },
  payload: {
    method: 'eth_sendRawTransaction',
    params: [
      '0xf8c421808299799452614d3d6504115454b4e484ea95628b28d95d6180b8646057361d000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000ad730de8c4bfc3d845f7ce851bcf2ea17c0495850000000000000000000000000000000000000000000000000000019b230509281ca05c5ad6bd275a1872b5d57c392705d21f9706748e36a7cf58d1942dc947da5f61a0562311d9df1a403a30feb7bb8a22871269d1e9534e25c229fdf72ea4e2ab45a5'
    ],
    id: 12,
    jsonrpc: '2.0'
  },
  shortMessage: 'could not coalesce error'
}

[2]  - 58309 done       npx hardhat run scripts/test.js
[3]  + 58310 done       npx hardhat run scripts/test.js
Tx confirmed
Sending store(43) with nonce 32
Tx sent: 0xcf5a022d08312d054e593d1a61664d1338c496f86f9ff664d2e4480ad5b21564
Tx confirmed
Sending store(44) with nonce 33
Tx sent: 0x1976f6282f797321b1486a405c39ac28e3d68ccd4c7cb32c24583ecc8e3e98d9
Tx confirmed
Stored Value:  44

[1]  + 58308 done       npx hardhat run scripts/test.js
```
