// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import {UltraVerifier} from "../plonk_vk.sol";

contract ZKPoll {
    UltraVerifier verifier;

    uint256 public pollId;
    string public pollName;
    string public pollDescription;

    error NOT_A_MEMBER();

    struct PollRules {
        string mongoId;
        string domainPub;
        string regionPub;
        string genderPub;
    }

    PollRules public pollRules;

    mapping(address => bool) isInPoll;

    constructor(string memory _domainPub, string memory _regionPub, string memory _genderPub , address _verifier, uint256 _pollId, string memory _mongoId){
        verifier = UltraVerifier(_verifier);
        pollRules.domainPub = _domainPub;
        pollRules.regionPub = _regionPub;
        pollRules.genderPub = _genderPub;
        pollRules.mongoId = _mongoId;
        pollId = _pollId;
    }

    function getBtytes(string memory x) internal pure returns(bytes memory){
        bytes memory domain = bytes(x);
        return domain;
    }

    function getPollName() external view returns(string memory){
        return pollName;
    }

    function getPollDescription() external view returns(string memory){
        return pollDescription;
    }

    function isMember() external view returns(bool) {
        return isInPoll[msg.sender];
    }

    function leavePoll() external {
        if(!isInPoll[msg.sender]){
            revert NOT_A_MEMBER();
        }
        isInPoll[msg.sender] =  false;
    }

    function getRules() external view returns (bytes memory, bytes memory, bytes memory) {
        string memory domainPub = pollRules.domainPub;
        bytes memory domainPubBytes = getBtytes(domainPub);
        string memory regionPub = pollRules.regionPub;
        bytes memory regionPubBytes = getBtytes(regionPub);
        string memory genderPub = pollRules.genderPub;
        bytes memory genderPubBytes = getBtytes(genderPub);
        return (domainPubBytes, regionPubBytes, genderPubBytes);
    }

    function setIsInPoll() external {
        isInPoll[msg.sender] = true;
    }

    function joinPoll(bytes calldata _proof, bytes32[] calldata _publicInputs) external view returns(bool) {
        bool flag = verifier.verify(_proof, _publicInputs);
        if(flag){
            return true;
        }
        return false;
    }

}