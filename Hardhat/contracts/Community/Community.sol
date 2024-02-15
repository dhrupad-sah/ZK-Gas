// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import {UltraVerifier} from "../plonk_vk.sol";

contract ZKCommunity {
    
    UltraVerifier verifier;

    uint256 communityId;
    string public communityName;
    string public communityDescription;

    error NOT_A_MEMBER();

    struct CommmunityRules {
        string domainPub;
        string regionPub;
        string genderPub;
    }

    CommmunityRules public communityRules;

    mapping(address => bool) isInCommunity;

    constructor(string memory _domainPub, string memory _regionPub, string memory _genderPub , address _verifier, uint256 _communityId, string memory _communityName, string memory _communityDescription){
        verifier = UltraVerifier(_verifier);
        communityRules.domainPub = _domainPub;
        communityRules.regionPub = _regionPub;
        communityRules.genderPub = _genderPub;
        communityId = _communityId;
        communityName = _communityName;
        communityDescription = _communityDescription;
    }

    function getBtytes(string memory x) internal pure returns(bytes memory){
        bytes memory domain = bytes(x);
        return domain;
    }

    function getCommunityName() external view returns(string memory){
        return communityName;
    }

    function getCommunityDescription() external view returns(string memory){
        return communityDescription;
    }

    function isMember() external view returns(bool) {
        return isInCommunity[msg.sender];
    }

    function leaveCommunity() external {
        if(!isInCommunity[msg.sender]){
            revert NOT_A_MEMBER();
        }
        isInCommunity[msg.sender] =  false;
    }

    function getRules() external view returns (bytes memory, bytes memory, bytes memory) {
        string memory domainPub = communityRules.domainPub;
        bytes memory domainPubBytes = getBtytes(domainPub);
        string memory regionPub = communityRules.regionPub;
        bytes memory regionPubBytes = getBtytes(regionPub);
        string memory genderPub = communityRules.genderPub;
        bytes memory genderPubBytes = getBtytes(genderPub);
        return (domainPubBytes, regionPubBytes, genderPubBytes);
    }

    function setIsInCommunity() external {
        isInCommunity[msg.sender] = true;
    }

    function joinCommunity(bytes calldata _proof, bytes32[] calldata _publicInputs) external view returns(bool) {
        bool flag = verifier.verify(_proof, _publicInputs);
        if(flag){
            return true;
        }
        return false;
    }

}