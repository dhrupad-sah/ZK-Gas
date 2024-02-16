// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import {ZKCommunity} from "./Community/Community.sol";
import {ZKPoll} from "./Polls/Polls.sol";

contract Factory {
    uint256 communityId;
    uint256 pollId;

    address verifier;

    constructor(address _verifier) {
        verifier = _verifier;
        communityId = 0;
        pollId = 0;
    }

    address[] allCommunities;
    address[] allPolls;

    struct CommunityDetails{
        string communityName;
        string communityDescription;
        string domainPub;
        string regionPub;
        string genderPub;
    }

    struct PollDetails{
        string pollName;
        string pollDescription;
        string domainPub;
        string regionPub;
        string genderPub;
    }

    CommunityDetails[] public communityDetails;
    PollDetails[] public pollDetails;

    mapping(uint256 => address) public idToCommunity;
    mapping(uint256 => address) public idToPoll;
    mapping(address => CommunityDetails) public addressToCommunityDetails;
    mapping(address => PollDetails) public addressToPollDetails;

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
        addressToCommunityDetails[newCommunity] = CommunityDetails(_communityName, _communityDescription, _domainPub, _regionPub, _genderPub);
        idToCommunity[_id] = newCommunity;
        allCommunities.push(newCommunity);
        communityId++;
    }

    function createPoll(
        string memory _domainPub,
        string memory _regionPub,
        string memory _genderPub,
        string memory _pollName,
        string memory _pollDescription
    ) public {
        uint256 _id = pollId;
        address newPoll = address(
            new ZKPoll(_domainPub, _regionPub, _genderPub, verifier, _id, _pollName, _pollDescription)
        );
        addressToPollDetails[newPoll] = PollDetails(_pollName, _pollDescription, _domainPub, _regionPub, _genderPub);
        idToPoll[_id] = newPoll;
        allPolls.push(newPoll);
        pollId++;
    }

    function getCommunity(uint256 _id) public view returns (address) {
        return idToCommunity[_id];
    }

    function getAllCommunities() public view returns (address[] memory) {
        return allCommunities;
    }

    function getCommunityDetails(address _communityAddress) public view returns (CommunityDetails memory) {
        return addressToCommunityDetails[_communityAddress];
    }

    function getPoll(uint256 _id) public view returns (address) {
        return idToPoll[_id];
    }

    function getAllPolls() public view returns (address[] memory) {
        return allPolls;
    }

    function getPollDetails(address _pollAddress) public view returns (PollDetails memory) {
        return addressToPollDetails[_pollAddress];
    }
}
