// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import {ZKCommunity} from "./Community/Community.sol";

contract Factory {
    uint256 communityId = 0;

    address verifier;

    constructor(address _verifier) {
        verifier = _verifier;
    }

    address[] allCommunities;

    mapping(uint256 => address) public idToCommunity;

    function createCommunity(
        string memory _domainPub,
        string memory _regionPub,
        string memory _genderPub,
        string memory _communityName,
        string memory _communityDescription
    ) public {
        uint256 _id = communityId;
        address newCommunity = address(
            new ZKCommunity(_domainPub, _regionPub, _genderPub, verifier, _id, _communityName, _communityDescription)
        );
        idToCommunity[_id] = newCommunity;
        allCommunities.push(newCommunity);
        communityId++;
    }

    function getCommunity(uint256 _id) public view returns (address) {
        return idToCommunity[_id];
    }

    function getAllCommunities() public view returns (address[] memory) {
        return allCommunities;
    }
}
