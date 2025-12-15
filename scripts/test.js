const { ethers } = require("ethers");
const { LacchainProvider, LacchainSigner } = require('@lacchain/gas-model-provider');
const fs = require("fs");
const path = require("path");

async function interactWithStorage() {
  // Load the ABI from the artifacts folder
  const artifactPath = path.join(__dirname, "../artifacts/contracts/Storage.sol/Storage.json");
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const contractABI = artifact.abi;


  //TESTNET
  const yourRPCNode = "http://35.185.112.219";
  const nodeAddress = "0xad730de8c4bfc3d845f7ce851bcf2ea17c049585";

  //Contract Owner
  const privateKey = "b6f5ca0a893ca893f048b3d74b3b1a30411726dd3caf567d055ad02a0742369f";

  console.log("Contract Name: ", artifact.contractName);

  // current date and time + 5 miutes
  const now = new Date();
  const expiration_date = now.getTime() + (5 * 60 * 1000);
  console.log("Expiration Date:",expiration_date);
  const provider = new LacchainProvider(yourRPCNode);
  const signer = new LacchainSigner(
    privateKey,
    provider,
    nodeAddress,
    expiration_date
  );

    // Replace with the deployed contract address
    const contractAddress = "0x52614D3d6504115454b4E484ea95628B28d95d61";

    // Connect to the contract
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log("Contract Address: ", contractAddress);

    const nonceLatest = await provider.getTransactionCount(ethers.computeAddress("0x"+privateKey), 'latest');

    //Enviar 1 sola TX:
    //console.log("Latest Nonce: ", nonceLatest); 
    //tx = await contract.store(42,{nonce: nonceLatest});
    //console.log("Transaction sent 'store(42)' :", tx.hash);
    //await tx.wait();
    //console.log("Transaction confirmed");

    //Enviar multiples TXs controlando el nonce, simula el encolado de Txs:
    
    let nonce = await signer.getNonce("pending");
    console.log("Initial nonce:", nonce);

    for (const value of [42, 43, 44]) {
      console.log(`Sending store(${value}) with nonce ${nonce}`);

      const tx = await contract.store(value, { nonce });
      console.log("Tx sent:", tx.hash);

      await tx.wait();
      console.log("Tx confirmed");

      nonce++; // ⬅️ CLAVE
  }


    // Read: Get the stored value
    const storedValue = await contract.retreive();
    console.log("Stored Value: ", storedValue.toString());
}

interactWithStorage().catch(console.error);
