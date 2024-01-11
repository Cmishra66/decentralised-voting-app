document.addEventListener('DOMContentLoaded', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.error("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }

    // Replace the following ABI with your actual smart contract ABI
    const abi = [
{
"inputs": [
    {
        "internalType": "address",
        "name": "voter",
        "type": "address"
    }
],
"name": "giveRightToVote",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
    {
        "internalType": "string[]",
        "name": "proposalNames",
        "type": "string[]"
    }
],
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"inputs": [
    {
        "internalType": "uint256",
        "name": "proposal",
        "type": "uint256"
    }
],
"name": "vote",
"outputs": [],
"stateMutability": "payable",
"type": "function"
},
{
"inputs": [],
"name": "chairperson",
"outputs": [
    {
        "internalType": "address",
        "name": "",
        "type": "address"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
],
"name": "proposals",
"outputs": [
    {
        "internalType": "string",
        "name": "name",
        "type": "string"
    },
    {
        "internalType": "uint256",
        "name": "votecount",
        "type": "uint256"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
    {
        "internalType": "address",
        "name": "",
        "type": "address"
    }
],
"name": "voters",
"outputs": [
    {
        "internalType": "bool",
        "name": "voted",
        "type": "bool"
    },
    {
        "internalType": "uint256",
        "name": "vote",
        "type": "uint256"
    },
    {
        "internalType": "uint256",
        "name": "weight",
        "type": "uint256"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "winningName",
"outputs": [
    {
        "internalType": "string",
        "name": "winningName_",
        "type": "string"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "winningProposal",
"outputs": [
    {
        "internalType": "uint256",
        "name": "winningProposal_",
        "type": "uint256"
    }
],
"stateMutability": "view",
"type": "function"
}
];

    const contractAddress = '0xa948Eb8b6FD5c6f809D05FAaB6E8690f86f548B8';
    const contract = new web3.eth.Contract(abi, contractAddress);

    window.vote = async () => {
        const selectedProposalIndex = document.getElementById('proposal').value;
        const walletAddress = document.getElementById('walletAddress').value;

        await contract.methods.vote(selectedProposalIndex).send({ from: walletAddress });
        alert('Vote submitted successfully!');
        return false; // Prevent form submission
    };

    window.getWinningProposal = async () => {
const winningProposalIndex = await contract.methods.winningProposal().call();
const winningProposal = await contract.methods.proposals(winningProposalIndex).call();

const winningProposalName = winningProposal.name;

document.getElementById('winningProposalResult').innerText = winningProposalName;
};


    window.showWinnerDetails = async () => {
const winningProposalIndex = await contract.methods.winningProposal().call();
const winningProposal = await contract.methods.proposals(winningProposalIndex).call();

const winningProposalName = winningProposal.name;
const winningVoteCount = winningProposal.votecount;

const detailsMessage = `Winner: ${winningProposalName} | Votes: ${winningVoteCount}`;
alert(detailsMessage);
    };

    // Display the initial winning proposal
    getWinningProposal();
});