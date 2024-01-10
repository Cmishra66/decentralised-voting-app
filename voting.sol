// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <=0.9.0;

contract Ballot {
    struct Voter {
        bool voted;
        uint vote;
        uint weight;
    }

    struct Proposal {
        string name;
        uint votecount;
    }

    Proposal[] public proposals;
    mapping(address => Voter) public voters;
    address public chairperson;

    constructor(string[] memory proposalNames) {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                votecount: 0
                
            }));
        }
    }

    function giveRightToVote(address voter) public {
        require(msg.sender == chairperson, 'Only the chairperson can give access to vote');
        require(!voters[voter].voted, 'The voter has already voted');
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    function vote(uint proposal) public payable {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, 'Has no right to vote');
        require(!sender.voted, 'Already voted');
        sender.voted = true;
        sender.vote = proposal;
        proposals[proposal].votecount = proposals[proposal].votecount + sender.weight;
    }

    function winningProposal() public view returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for (uint i = 0; i < proposals.length; i++) {
            if (proposals[i].votecount > winningVoteCount) {
                winningVoteCount = proposals[i].votecount;
                winningProposal_ = i;
            }
        }
    }

    function winningName() public view returns (string memory winningName_) {
        winningName_ = proposals[winningProposal()].name;
    }
}
