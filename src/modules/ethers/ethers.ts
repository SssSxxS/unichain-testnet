import { ethers } from "ethers"
import { abiBridgeETHTo, abiERC20Token, abiERC721Token } from "./abis"
import { ETHEREUM_SEPOLIA_RPC_URL, UNICHAIN_SEPOLIA_RPC_URL } from "../../../data/config"
import { bytecodeClaimNFT, bytecodeERC20Token, bytecodeERC721Token } from "./bytecodes"
import { getRandomName } from "./names"
import { getRandomSymbol } from "./symbols"
import { getRandomNumFloor } from "../../utils/basic"

export const getAddressFromPrivateKey = (privateKey: string) => {
  const wallet = new ethers.Wallet(privateKey)
  return wallet.address
}

export const getEthBalance = async (rpcUrl: string, address: string) => {
  const provider = new ethers.JsonRpcProvider(rpcUrl)
  const balanceWei = await provider.getBalance(address)
  const balanceEther = ethers.formatEther(balanceWei)
  return balanceEther
}

export const callBridgeEthTo = async (private_key: string, amountInEth: string, extraData: string) => {
  const provider = new ethers.JsonRpcProvider(ETHEREUM_SEPOLIA_RPC_URL)
  const signer = new ethers.Wallet(private_key, provider)

  const contractAddress = "0xea58fcA6849d79EAd1f26608855c2D6407d54Ce2"
  const to = signer.address
  const minGasLimit = 200000
  const amountInWei = ethers.parseEther(amountInEth)

  const contract = new ethers.Contract(contractAddress, abiBridgeETHTo, signer)
  return await contract.bridgeETHTo(to, minGasLimit, extraData, { value: amountInWei })
}

export const deployERC20Token = async (private_key: string) => {
  const provider = new ethers.JsonRpcProvider(UNICHAIN_SEPOLIA_RPC_URL)
  const signer = new ethers.Wallet(private_key, provider)
  const contractFactory = new ethers.ContractFactory(abiERC20Token, bytecodeERC20Token, signer)

  const name = getRandomName()
  const symbol = getRandomSymbol()
  const initialSupply = ethers.parseUnits(String(getRandomNumFloor(1000000, 1000000000)), 18)

  const contract = await contractFactory.deploy(name, symbol, initialSupply)
  const deployedContract = await contract.waitForDeployment()
  return deployedContract.deploymentTransaction()
}

export const deployERC721Token = async (private_key: string) => {
  const provider = new ethers.JsonRpcProvider(UNICHAIN_SEPOLIA_RPC_URL)
  const signer = new ethers.Wallet(private_key, provider)
  const contractFactory = new ethers.ContractFactory(abiERC721Token, bytecodeERC721Token, signer)

  const name = getRandomName()
  const symbol = getRandomSymbol()

  const contract = await contractFactory.deploy(name, symbol)
  const deployedContract = await contract.waitForDeployment()
  return deployedContract.deploymentTransaction()
}

export const claimNFT = async (private_key: string, contractAddress: string) => {
  const provider = new ethers.JsonRpcProvider(UNICHAIN_SEPOLIA_RPC_URL)
  const signer = new ethers.Wallet(private_key, provider)

  const tx = {
    to: contractAddress,
    data: bytecodeClaimNFT(signer.address),
    gasLimit: ethers.toQuantity(200000),
  }

  return signer.sendTransaction(tx)
}
