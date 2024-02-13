// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import {UltraVerifier} from "../plonk_vk.sol";

contract ZKCommunity {
    
    UltraVerifier verifier;

    uint256 communityId;

    struct CommmunityRules {
        string domainPub;
        string regionPub;
        string genderPub;
    }

    CommmunityRules public communityRules;

    mapping(address => bool) isInCommunity;

    constructor(string memory _domainPub, string memory _regionPub, string memory _genderPub , address _verifier, uint256 _communityId){
        verifier = UltraVerifier(_verifier);
        communityRules.domainPub = _domainPub;
        communityRules.regionPub = _regionPub;
        communityRules.genderPub = _genderPub;
        communityId = _communityId;
    }

    function isMember() external view returns(bool) {
        return isInCommunity[msg.sender];
    }

    function leaveCommunity() external {
        isInCommunity[msg.sender] =  false;
    }

    function getRules() external view returns (CommmunityRules memory) {
        return communityRules;
    }

    function joinCommunity(bytes calldata _proof, bytes32[] calldata _publicInputs) external view returns(bool) {
        require(verifier.verify(_proof, _publicInputs), "Invalid proof");
        return true;
    }

}