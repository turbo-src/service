const assert = require('assert');
const { postSetVote,
        postGetPRvoteStatus,
        postGetPRvoteTotals,
        postCreateRepo,
        postNewPullRequest
      } = require('../../../graphQLrequests')
const { Parser } = require('graphql/language/parser');

var snooze_ms = 1000;

// We call this at the top of each test case, otherwise nodeosd could
// throw duplication errors (ie, data races).
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('Vote and get tally', function () {
    this.timeout(15000);
    // Increase mocha(testing framework) time, otherwise tests fails
    describe('Check status after vote duplicate', function () {
      it("Should do something", async () => {
        await postCreateRepo(
            /*owner:*/ "turbo-src",
            /*repo: */ "testrepo",
            /*pr_id:*/ "issue_3",
            /*contributor_id:*/ "7db9a",
            /*side:*/ "yes",
        );
        await snooze(1500);
        await postNewPullRequest(
            /*owner:*/ "turbo-src",
            /*repo: */ "testrepo",
            /*pr_id:*/ "issue_3",
            /*contributor_id:*/ "7db9a",
            /*side:*/ "yes",
        );
        await snooze(1500);
        await postSetVote(
            /*owner:*/ "turbo-src",
            /*repo: */ "testrepo",
            /*pr_id:*/ "issue_3",
            /*contributor_id:*/ "7db9a",
            /*side:*/ "yes",
        );
        await snooze(1500);
        const afterVoteTotals = await postGetPRvoteTotals(
            /*owner:*/ "turbo-src",
            /*repo: */ "testrepo",
            /*pr_id:*/ "issue_3",
            /*contributor_id:*/ "7db9a",
            /*side:*/ "yes",
        );
        await snooze(1500);
        await postSetVote(
            /*owner:*/ "turbo-src",
            /*repo: */ "testrepo",
            /*pr_id:*/ "issue_3",
            /*contributor_id:*/ "7db9a",
            /*side:*/ "yes",
        );
        await snooze(1500);
        const duplicateVoteTotals = await postGetPRvoteTotals(
            /*owner:*/ "turbo-src",
            /*repo: */ "testrepo",
            /*pr_id:*/ "issue_3",
            /*contributor_id:*/ "7db9a",
            /*side:*/ "yes",
        );
        await snooze(1500);
        await postSetVote(
            /*owner:*/ "turbo-src",
            /*repo: */ "testrepo",
            /*pr_id:*/ "issue_3",
            /*contributor_id:*/ "mary",
            /*side:*/ "yes",
        );
        await snooze(1500);
        const closeStatus = await postGetPRvoteStatus(
            /*owner:*/ "turbo-src",
            /*repo: */ "testrepo",
            /*pr_id:*/ "issue_3",
            /*contributor_id:*/ "mary",
            /*side:*/ "yes",
        );
        assert.equal(
            afterVoteTotals,
            "0.033999",
            "Fail to add votes."
        );
        assert.equal(
            duplicateVoteTotals,
            "0.033999",
            "Fail to add votes."
        );
        assert.equal(
            closeStatus,
            "closed",
            "Fail to close even the votes exceed the quorum"
        );
      });
    });
});