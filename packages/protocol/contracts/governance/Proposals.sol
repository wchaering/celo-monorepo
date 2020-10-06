pragma solidity ^0.5.8;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";
import "solidity-bytes-utils/contracts/BytesLib.sol";

import "../common/ExternalCall.sol";
import "../common/FixidityLib.sol";

/**
 * @title A library operating on Celo Governance proposals.
 */
library Proposals {
  using FixidityLib for FixidityLib.Fraction;
  using SafeMath for uint256;
  using BytesLib for bytes;

  enum Stage { None, Referendum, Execution, Expiration }

  enum VoteValue { None, Abstain, No, Yes }

  struct StageDurations {
    uint256 referendum;
    uint256 execution;
  }

  // TODO(asa): Reduce storage usage here.
  struct VoteTotals {
    uint256 yes;
    uint256 no;
    uint256 abstain;
  }

  struct Transaction {
    uint256 value;
    address destination;
    bytes data;
  }

  struct Proposal {
    address proposer;
    uint256 deposit;
    uint256 submissionTimestamp;
    uint256 executionTimestamp;
    VoteTotals votes;
    Transaction[] transactions;
    bool approved;
    uint256 networkWeight;
    string descriptionUrl;
  }

  /**
   * @notice Returns the storage, major, minor, and patch version of the contract.
   * @return The storage, major, minor, and patch version of the contract.
   */
  function getVersionNumber() external pure returns (uint256, uint256, uint256, uint256) {
    return (2, 0, 0, 0);
  }

  /**
   * @notice Constructs a proposal.
   * @param proposal The proposal struct to be constructed.
   * @param values The values of Celo Gold to be sent in the proposed transactions.
   * @param destinations The destination addresses of the proposed transactions.
   * @param data The concatenated data to be included in the proposed transactions.
   * @param dataLengths The lengths of each transaction's data.
   * @param proposer The proposer.
   * @param deposit The proposal deposit.
   */
  function make(
    Proposal storage proposal,
    uint256[] memory values,
    address[] memory destinations,
    bytes memory data,
    uint256[] memory dataLengths,
    address proposer,
    uint256 deposit,
    uint256 executionTimestamp
  ) public {
    require(
      values.length == destinations.length && destinations.length == dataLengths.length,
      "Array length mismatch"
    );
    uint256 transactionCount = values.length;
    proposal.executionTimestamp = executionTimestamp;

    proposal.proposer = proposer;
    proposal.deposit = deposit;
    // solhint-disable-next-line not-rely-on-time
    proposal.submissionTimestamp = now;

    uint256 dataPosition = 0;
    for (uint256 i = 0; i < transactionCount; i = i.add(1)) {
      proposal.transactions.push(
        Transaction(values[i], destinations[i], data.slice(dataPosition, dataLengths[i]))
      );
      dataPosition = dataPosition.add(dataLengths[i]);
    }
  }

  function setDescriptionUrl(Proposal storage proposal, string memory descriptionUrl) internal {
    require(bytes(descriptionUrl).length != 0, "Description url must have non-zero length");
    proposal.descriptionUrl = descriptionUrl;
  }

  /**
   * @notice Executes a proposal in memory.
   * @param values The values of Celo Gold to be sent in the proposed transactions.
   * @param destinations The destination addresses of the proposed transactions.
   * @param data The concatenated data to be included in the proposed transactions.
   * @param dataLengths The lengths of each transaction's data.
   */
  function executeMem(
    uint256[] memory values,
    address[] memory destinations,
    bytes memory data,
    uint256[] memory dataLengths
  ) public {
    require(
      values.length == destinations.length && destinations.length == dataLengths.length,
      "Array length mismatch"
    );

    uint256 dataPosition = 0;
    for (uint256 i = 0; i < values.length; i = i.add(1)) {
      ExternalCall.execute(destinations[i], values[i], data.slice(dataPosition, dataLengths[i]));
      dataPosition = dataPosition.add(dataLengths[i]);
    }
  }

  /**
   * @notice Adds or changes a vote on a proposal.
   * @param proposal The proposal struct.
   * @param previousWeight The previous weight of the vote.
   * @param currentWeight The current weight of the vote.
   * @param previousVote The vote to be removed, or None for a new vote.
   * @param currentVote The vote to be set.
   */
  function updateVote(
    Proposal storage proposal,
    uint256 previousWeight,
    uint256 currentWeight,
    VoteValue previousVote,
    VoteValue currentVote
  ) public {
    // Subtract previous vote.
    if (previousVote == VoteValue.Abstain) {
      proposal.votes.abstain = proposal.votes.abstain.sub(previousWeight);
    } else if (previousVote == VoteValue.Yes) {
      proposal.votes.yes = proposal.votes.yes.sub(previousWeight);
    } else if (previousVote == VoteValue.No) {
      proposal.votes.no = proposal.votes.no.sub(previousWeight);
    }

    // Add new vote.
    if (currentVote == VoteValue.Abstain) {
      proposal.votes.abstain = proposal.votes.abstain.add(currentWeight);
    } else if (currentVote == VoteValue.Yes) {
      proposal.votes.yes = proposal.votes.yes.add(currentWeight);
    } else if (currentVote == VoteValue.No) {
      proposal.votes.no = proposal.votes.no.add(currentWeight);
    }
  }

  /**
   * @notice Executes the proposal.
   * @param proposal The proposal struct.
   * @dev Reverts if any transaction fails.
   */
  function execute(Proposal storage proposal) public {
    for (uint256 i = 0; i < proposal.transactions.length; i = i.add(1)) {
      ExternalCall.execute(
        proposal.transactions[i].destination,
        proposal.transactions[i].value,
        proposal.transactions[i].data
      );
    }
  }

  /**
   * @notice Computes the support ratio for a proposal with the quorum condition:
   *   If the total number of votes (yes + no + abstain) is less than the required number of votes,
   *   "no" votes are added to increase particiption to this level. The ratio of yes / (yes + no)
   *   votes is returned.
   * @param proposal The proposal struct.
   * @param quorum The minimum participation at which "no" votes are not added.
   * @return The support ratio with the quorum condition.
   */
  function getSupportWithQuorumPadding(
    Proposal storage proposal,
    FixidityLib.Fraction memory quorum
  ) internal view returns (FixidityLib.Fraction memory) {
    uint256 yesVotes = proposal.votes.yes;
    if (yesVotes == 0) {
      return FixidityLib.newFixed(0);
    }
    uint256 noVotes = proposal.votes.no;
    uint256 totalVotes = yesVotes.add(noVotes).add(proposal.votes.abstain);
    uint256 requiredVotes = quorum
      .multiply(FixidityLib.newFixed(proposal.networkWeight))
      .fromFixed();
    if (requiredVotes > totalVotes) {
      noVotes = noVotes.add(requiredVotes.sub(totalVotes));
    }
    return FixidityLib.newFixedFraction(yesVotes, yesVotes.add(noVotes));
  }

  /**
   * @notice Returns the stage of a proposal.
   * @param proposal The proposal struct.
   * @param stageDurations The durations of the dequeued proposal stages.
   * @return The stage of the proposal.
   */
  function getStage(Proposal storage proposal, StageDurations storage stageDurations)
    internal
    view
    returns (Stage)
  {
    uint256 endReferendum = proposal.submissionTimestamp.add(stageDurations.referendum);

    if (now <= endReferendum) {
      return Stage.Referendum;
    }

    uint256 endExecution = proposal.executionTimestamp.add(stageDurations.execution);
    if (now <= endExecution) {
      return Stage.Execution;
    }

    return Stage.Expiration;
  }

  /**
   * @notice Returns the number of votes cast on the proposal over the total number
   *   of votes in the network as a fraction.
   * @param proposal The proposal struct.
   * @return The participation of the proposal.
   */
  function getParticipation(Proposal storage proposal)
    internal
    view
    returns (FixidityLib.Fraction memory)
  {
    uint256 totalVotes = proposal.votes.yes.add(proposal.votes.no).add(proposal.votes.abstain);
    return FixidityLib.newFixedFraction(totalVotes, proposal.networkWeight);
  }

  /**
   * @notice Returns a specified transaction in a proposal.
   * @param proposal The proposal struct.
   * @param index The index of the specified transaction in the proposal's transaction list.
   * @return The specified transaction.
   */
  function getTransaction(Proposal storage proposal, uint256 index)
    public
    view
    returns (uint256, address, bytes memory)
  {
    require(index < proposal.transactions.length, "getTransaction: bad index");
    Transaction storage transaction = proposal.transactions[index];
    return (transaction.value, transaction.destination, transaction.data);
  }

  /**
   * @notice Returns an unpacked proposal struct with its transaction count.
   * @param proposal The proposal struct.
   * @return The unpacked proposal with its transaction count.
   */
  function unpack(Proposal storage proposal)
    internal
    view
    returns (address, uint256, uint256, uint256, uint256, string storage)
  {
    return (
      proposal.proposer,
      proposal.deposit,
      proposal.submissionTimestamp,
      proposal.executionTimestamp,
      proposal.transactions.length,
      proposal.descriptionUrl
    );
  }

  /**
   * @notice Returns the referendum vote totals for a proposal.
   * @param proposal The proposal struct.
   * @return The yes, no, and abstain vote totals.
   */
  function getVoteTotals(Proposal storage proposal)
    internal
    view
    returns (uint256, uint256, uint256)
  {
    return (proposal.votes.yes, proposal.votes.no, proposal.votes.abstain);
  }

  /**
   * @notice Returns whether or not a proposal has been approved.
   * @param proposal The proposal struct.
   * @return Whether or not the proposal has been approved.
   */
  function isApproved(Proposal storage proposal) internal view returns (bool) {
    return proposal.approved;
  }

  /**
   * @notice Returns whether or not a proposal exists.
   * @param proposal The proposal struct.
   * @return Whether or not the proposal exists.
   */
  function exists(Proposal storage proposal) internal view returns (bool) {
    return proposal.submissionTimestamp > 0;
  }
}
