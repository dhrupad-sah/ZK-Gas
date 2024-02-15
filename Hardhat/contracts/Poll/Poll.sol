// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;
import {UltraVerifier} from '../noirstarter/plonk_vk.sol';

contract ZKPoll {
    
    UltraVerifier verifier;

    uint256 pollId;

    struct PollRules {
        string domainPub;
        string regionPub;
        string genderPub;
    }

    PubRules public pubRules;

    mapping(address => bool) isInPoll;

    constructor(string memory _domainPub, string memory _regionPub, string memory _genderPub , address _verifier, uint256 _communityId){
        verifier = UltraVerifier(_verifier);
        pollRules.domainPub = _domainPub;
        pollRules.regionPub = _regionPub;
        pollRules.genderPub = _genderPub;
        pollId = _communityId;
    }

    function isMember() external view returns(bool) {
        return isInPoll[msg.sender];
    }

    function leaveCommunity() external {
        isInPoll[msg.sender] =  false;
    }

    function getRules() external view returns (PollRules memory) {
        return PollRules;
    }

    function joinPoll(bytes calldata _proof, bytes32[] calldata _publicInputs) external view returns(bool) {
        require(verifier.verify(_proof, _publicInputs), "Invalid proof");
        return true;
    }

}