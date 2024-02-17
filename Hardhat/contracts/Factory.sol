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

    struct CommunityDetails {
        string communityName;
        string communityDescription;
        string domainPub;
        string regionPub;
        string genderPub;
    }

    struct PollDetails {
        string mongoPollId;
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
    mapping(string => uint256) mongoIdToPollId;

    event CommunityCreatedEvent(
        uint256 indexed _id,
        address indexed _communityAddress,
        string _communityName,
        string _communityDescription
    );

    function createCommunity(
        string memory _domainPub,
        string memory _regionPub,
        string memory _genderPub,
        string memory _communityName,
        string memory _communityDescription
    ) public returns (uint256) {
        uint256 _id = communityId;
        address newCommunity = address(
            new ZKCommunity(
                _domainPub,
                _regionPub,
                _genderPub,
                verifier,
                _id,
                _communityName,
                _communityDescription
            )
        );
        addressToCommunityDetails[newCommunity] = CommunityDetails(
            _communityName,
            _communityDescription,
            _domainPub,
            _regionPub,
            _genderPub
        );
        idToCommunity[_id] = newCommunity;
        allCommunities.push(newCommunity);
        communityId++;
        emit CommunityCreatedEvent(_id, newCommunity, _communityName, _communityDescription);
        return _id;
    }

    function createPoll(
        string memory _domainPub,
        string memory _regionPub,
        string memory _genderPub,
        string memory _mongoId
    ) public {
        uint256 _id = pollId;
        address newPoll = address(
            new ZKPoll(
                _domainPub,
                _regionPub,
                _genderPub,
                verifier,
                _id,
                _mongoId
            )
        );
        addressToPollDetails[newPoll] = PollDetails(
            _mongoId,
            _domainPub,
            _regionPub,
            _genderPub
        );
        idToPoll[_id] = newPoll;
        allPolls.push(newPoll);
        mongoIdToPollId[_mongoId] = _id;
        pollId++;
    }

    function getLastCommunityAddress() external view returns(address){
        uint256 lastIndex = allCommunities.length;
        return allCommunities[lastIndex-1];
    }

    function getCommunity(uint256 _id) public view returns (address) {
        return idToCommunity[_id];
    }

    function getAllCommunities() public view returns (address[] memory) {
        return allCommunities;
    }

    function getCommunityDetails(
        address _communityAddress
    ) public view returns (CommunityDetails memory) {
        return addressToCommunityDetails[_communityAddress];
    }

    function getPollIdFromMongoId(
        string memory _mongoId
    ) public view returns (uint256) {
        return mongoIdToPollId[_mongoId];
    }

    function getIdFromMongoId(
        string calldata _mongoId
    ) external view returns (uint256) {
        return mongoIdToPollId[_mongoId];
    }

    function getPoll(uint256 _id) public view returns (address) {
        return idToPoll[_id];
    }

    function getAllPolls() public view returns (address[] memory) {
        return allPolls;
    }

    function getPollDetails(
        address _pollAddress
    ) public view returns (PollDetails memory) {
        return addressToPollDetails[_pollAddress];
    }
}
