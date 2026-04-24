let provider;
let signer;
let contract;

const contractAddress = "0x1fD2713e56c6054CC68e87611e3EfC2b25974455";

const abi = [
  "function checkIn() public"
];

async function connect() {
  if (!window.ethereum) {
    alert("MetaMask yok");
    return;
  }

  await window.ethereum.request({ method: 'eth_requestAccounts' });

  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);

  document.getElementById("status").innerText = "Wallet connected";
}

async function checkIn() {
  if (!contract) {
    alert("Önce wallet bağla");
    return;
  }

  const tx = await contract.checkIn();
  document.getElementById("status").innerText = "İşlem gönderildi...";
  await tx.wait();
  document.getElementById("status").innerText = "Check-in başarılı";
}
