const assert = require('assert');
const fsPromises = require('fs').promises;
const {
        postGetContributorID,
        postGetContributorTokenAmount,
        postTransferTokens,
        postGetContributorName,
      } = require('../../../src/utils/requests')
const { Parser } = require('graphql/language/parser');
const {
        getContributorAddress,
        getGithubContributor,
      } = require('../../../src/utils/config')

async function readDBfile(file) {
    const data = await fsPromises.readFile(file)
                       .catch((err) => console.error('Failed to read file', err));

    return data
}

var snooze_ms = 200;

// We call this at the top of each test case, otherwise nodeosd could
// throw duplication errors (ie, data races).
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

describe.only('Check that transfer tokens reflected in database', function () {
    this.timeout(snooze_ms*50);
before(async () => {
});
  it("Should transfer tokens", async () => {
    const contributor_name = await getGithubContributor()
    const contributor_id = await postGetContributorID(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*pr_id:*/ "issue_4",
        /*contributor_name:*/ contributor_name,
    );
    console.log("contributor id: " + contributor_id)
    const maryID = await postGetContributorID(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*pr_id:*/ "issue_4",
        /*contributor_name:*/ "mary",
    );
    await snooze(snooze_ms);
    await postTransferTokens(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*from:*/ contributor_id,
        /*to:*/ maryID,
        /*amount:*/ 500_001,
    );
    await snooze(snooze_ms);
    await postTransferTokens(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*from:*/ contributor_id,
        /*to:*/ "0x571BD871120767344b4EE3Ec309c74a3D98aAf0B",
        /*amount:*/ 15_000,
    );
    await snooze(snooze_ms);
    await postTransferTokens(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*from:*/ contributor_id,
        /*to:*/ "0x493D1c854301054e5D0b0bCFE3cfAe893d573dBa",
        /*amount:*/ 10_000,
    );
    await snooze(snooze_ms);
    await postTransferTokens(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*from:*/ contributor_id,
        /*to:*/ "0x5061EF86EFcF6Ad2fdcefF8FE9E014a1Ca6801c2",
        /*amount:*/ 75_000,
    );
    await snooze(snooze_ms);
    await postTransferTokens(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*from:*/ contributor_id,
        /*to:*/ "0x232b9E710e897aEb18FEbe410526B987641BaE5f",
        /*amount:*/ 75_000,
    );
    await snooze(snooze_ms);
    await postTransferTokens(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*from:*/ contributor_id,
        /*to:*/ "0x55f8B1594beB8eA1fD366c0C138B26e70C03a6ec",
        /*amount:*/ 5_000,
    );
    await snooze(snooze_ms);
    await postTransferTokens(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*from:*/ contributor_id,
        /*to:*/ "0x45dD192B318e2f1d242954E016492BDF9446381e",
        /*amount:*/ 100_000,
    );
    await snooze(snooze_ms);
    await postTransferTokens(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*from:*/ contributor_id,
        /*to:*/ "0x1d344C9A2Ee5c0a24336dd1A0c5c79ccD50D06C9",
        /*amount:*/ 50_000,
    );
    await snooze(snooze_ms);
    await postTransferTokens(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*from:*/ contributor_id,
        /*to:*/ "0xd30Dcb56A4d3EC2dC8591588455A5Da4C3c84eCD",
        /*amount:*/ 10_000,
    );
    await snooze(snooze_ms);
    await postTransferTokens(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*from:*/ contributor_id,
        /*to:*/ "0x9095B61290249584d9d0447657a03Cf23BF7a325",
        /*amount:*/ 50_000,
    );
    await snooze(snooze_ms);
    await postTransferTokens(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*from:*/ contributor_id,
        /*to:*/ "0x1d0798e209A07715765F1486CA64f3D2399aF719",
        /*amount:*/ 75_000,
    );
    await snooze(snooze_ms);
    await postTransferTokens(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*from:*/ contributor_id,
        /*to:*/ "0xDB7A25D3B4C5506779bD9f9f1A5AA0DB525Fa6A8",
        /*amount:*/ 999,
    );
    await snooze(snooze_ms);
    const maryContributorTokenAmountRes = await postGetContributorTokenAmount(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*pr_id:*/ "issue_4",
        /*contributor:*/ "0x09EAF54C0fc9F2b077ebC96e3FeD47051f7fb626",
        /*side:*/ "no",
    );

    const maryContributorTokenAmount = Number(maryContributorTokenAmountRes)

    const contributorTokenAmountRes = await postGetContributorTokenAmount(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*pr_id:*/ "issue_4",
        /*contributor:*/ contributor_id,
        /*side:*/ "no",
    );

    const contributorTokenAmount = Number(contributorTokenAmountRes)

    const amContributorTokenAmountRes = await postGetContributorTokenAmount(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*pr_id:*/ "issue_4",
        /*contributor:*/ "0x571BD871120767344b4EE3Ec309c74a3D98aAf0B",
        /*side:*/ "no",
    );

    const amContributorTokenAmount = Number(amContributorTokenAmountRes)

    const jcContributorTokenAmountRes = await postGetContributorTokenAmount(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*pr_id:*/ "issue_4",
        /*contributor:*/ "0x493D1c854301054e5D0b0bCFE3cfAe893d573dBa",
        /*side:*/ "no",
    );

    const jcContributorTokenAmount = Number(jcContributorTokenAmountRes)

    const pcContributorTokenAmountRes = await postGetContributorTokenAmount(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*pr_id:*/ "issue_4",
        /*contributor:*/ "0x5061EF86EFcF6Ad2fdcefF8FE9E014a1Ca6801c2",
        /*side:*/ "no",
    );

    const pcContributorTokenAmount = Number(pcContributorTokenAmountRes)

    const mbContributorTokenAmountRes = await postGetContributorTokenAmount(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*pr_id:*/ "issue_4",
        /*contributor:*/ "0x232b9E710e897aEb18FEbe410526B987641BaE5f",
        /*side:*/ "no",
    );

    const mbContributorTokenAmount = Number(mbContributorTokenAmountRes)

    const npContributorTokenAmountRes = await postGetContributorTokenAmount(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*pr_id:*/ "issue_4",
        /*contributor:*/ "0x55f8B1594beB8eA1fD366c0C138B26e70C03a6ec",
        /*side:*/ "no",
    );

    const npContributorTokenAmount = Number(npContributorTokenAmountRes)

    const nnContributorTokenAmountRes = await postGetContributorTokenAmount(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*pr_id:*/ "issue_4",
        /*contributor:*/ "0x45dD192B318e2f1d242954E016492BDF9446381e",
        /*side:*/ "no",
    );

    const nnContributorTokenAmount = Number(nnContributorTokenAmountRes)

    const jpContributorTokenAmountRes = await postGetContributorTokenAmount(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*pr_id:*/ "issue_4",
        /*contributor:*/ "0x1d344C9A2Ee5c0a24336dd1A0c5c79ccD50D06C9",
        /*side:*/ "no",
    );

    const jpContributorTokenAmount = Number(jpContributorTokenAmountRes)

    const tsContributorTokenAmountRes = await postGetContributorTokenAmount(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*pr_id:*/ "issue_4",
        /*contributor:*/ "0x9095B61290249584d9d0447657a03Cf23BF7a325",
        /*side:*/ "no",
    );

    const tsContributorTokenAmount = Number(tsContributorTokenAmountRes)

    const afContributorTokenAmountRes = await postGetContributorTokenAmount(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*pr_id:*/ "issue_4",
        /*contributor:*/ "0xd30Dcb56A4d3EC2dC8591588455A5Da4C3c84eCD",
        /*side:*/ "no",
    );

    const afContributorTokenAmount = Number(afContributorTokenAmountRes)

    const dsContributorTokenAmountRes = await postGetContributorTokenAmount(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*pr_id:*/ "issue_4",
        /*contributor:*/ "0x1d0798e209A07715765F1486CA64f3D2399aF719",
        /*side:*/ "no",
    );

    const dsContributorTokenAmount = Number(dsContributorTokenAmountRes)

    const riContributorTokenAmountRes = await postGetContributorTokenAmount(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*pr_id:*/ "issue_4",
        /*contributor:*/ "0xDB7A25D3B4C5506779bD9f9f1A5AA0DB525Fa6A8",
        /*side:*/ "no",
    );

    const riContributorTokenAmount = Number(riContributorTokenAmountRes)

    assert.equal(
        contributorTokenAmount,
        34_000,
        "Fail to get amount."
    );

    assert.equal(
        amContributorTokenAmount,
        15_000,
        "Fail to get amount."
    );

    assert.equal(
        jcContributorTokenAmount,
        10_000,
        "Fail to get amount."
    );

    assert.equal(
        pcContributorTokenAmount,
        75_000,
        "Fail to get amount."
    );

    assert.equal(
        mbContributorTokenAmount,
        75_000,
        "Fail to get amount."
    );

    assert.equal(
        npContributorTokenAmount,
        5_000,
        "Fail to get amount."
    );

    assert.equal(
        nnContributorTokenAmount,
        100_000,
        "Fail to get amount."
    );

    assert.equal(
        jpContributorTokenAmount,
        50_000,
        "Fail to get amount."
    );

    assert.equal(
        tsContributorTokenAmount,
        50_000,
        "Fail to get amount."
    );

    assert.equal(
        afContributorTokenAmount,
        10_000,
        "Fail to get amount."
    );

    assert.equal(
        dsContributorTokenAmount,
        75_000,
        "Fail to get amount."
    );

    assert.equal(
        riContributorTokenAmount,
        999,
        "Fail to get amount."
    );

    assert.equal(
        maryContributorTokenAmount,
        500_001,
        "Fail to get amount."
    );

    const maryName = await postGetContributorName(
        /*owner:*/ contributor_name,
        /*repo:*/ "demo",
        /*pr_id:*/ "issue_4",
        /*contributor:*/ "0x09EAF54C0fc9F2b077ebC96e3FeD47051f7fb626",
    );

    assert.equal(
        maryName,
        "mary",
        "Fail to get contributors's name from namspace db by contributor id."
    );
  });
});