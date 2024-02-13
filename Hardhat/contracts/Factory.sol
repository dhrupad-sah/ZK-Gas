// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import {ZKCommunity} from "./Community/Community.sol";

contract Factory {

    uint256 _communityId = 0;

    address verifier;

    constructor(address _verifier){
        verifier = _verifier;
    }

    address[] allCommunities;

    mapping(uint256 => address) idToCommunity;

    function createCommunity(string memory _domainPub, string memory _regionPub, string memory _genderPub) public {
        uint256 _id = _communityId;
        address newCommunity = address(new ZKCommunity(_domainPub, _regionPub, _genderPub, verifier, _id));
        idToCommunity[_id] = newCommunity;
        allCommunities.push(newCommunity);
        _communityId++;
    }

    function getCommunity(uint256 _id) public view returns(address) {
        return idToCommunity[_id];
    }

    function getAllCommunities() public view returns(address[] memory) {
        return allCommunities;
    }
    
}