const assert = require('assert');
const { postSetVote } = require('./../graphQLrequests')
const { Parser } = require('graphql/language/parser');

var snooze_ms = 300;

// We call this at the top of each test case, otherwise nodeosd could
// throw duplication errors (ie, data races).
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('Vote', function () {
    // Increase mocha(testing framework) time, otherwise tests fails
    this.timeout(15000);

    before(async () => {

    });
    describe('Vote up but do not close', function () {
      it("Should increment vote", async () => {
      });
    });
});