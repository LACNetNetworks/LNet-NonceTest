const { ethers } = require("ethers");
const { LacchainProvider, LacchainSigner } = require('@lacchain/gas-model-provider');
const contractAbi = require("../artifacts/contracts/Greeter.sol/Greeter.json");

async function main() {


  //TESTNET
  const yourRPCNode = "http://35.185.112.219";
  const nodeAddress = "0xad730de8c4bfc3d845f7ce851bcf2ea17c049585";



  //Contract Owner
  const privateKey = "b6f5ca0a893ca893f048b3d74b3b1a30411726dd3caf567d055ad02a0742369f";

  console.log("Starting deploy of contract: ", contractAbi.contractName);

  // current date and time + 5 miutes
  const now = new Date();
  const expiration_date = now.getTime() + (5 * 60 * 1000);

  const provider = new LacchainProvider(yourRPCNode);
  const signer = new LacchainSigner(
    privateKey,
    provider,
    nodeAddress,
    expiration_date
  );


  console.log(`Create Factory ${contractAbi.contractName}...`);

  const contractFactory = new ethers.ContractFactory(
    contractAbi.abi,
    contractAbi.bytecode,
    signer
  );

  console.log(`Deploying ${contractAbi.contractName}...`);

  const contract = await contractFactory.deploy();
  const receipt = await contract.deploymentTransaction()?.wait();
  console.log("Contract deployed!");
  const contractAddress = receipt?.contractAddress;
  console.log(`${contractAbi.contractName} Contract Address: `, contractAddress );

  deployedContract = new ethers.Contract(contractAddress, contractAbi.abi, provider);

  deployedContractOwner = await deployedContract.getOwner();

  console.log(`${contractAbi.contractName} Owner Address: `,deployedContractOwner)

  geetResponse  = await deployedContract.greetMe('Alice');

  console.log(`${contractAbi.contractName} greetMe('Alice'): `,geetResponse)
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
