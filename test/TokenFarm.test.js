// const { assert } = require('chai')
// const { Item } = require('react-bootstrap/lib/Breadcrumb')
// const _deploy_contracts = require('../migrations/2_deploy_contracts')

const DaiToken = artifacts.require('DaiToken')
const DappToken = artifacts.require('DappToken')
const TokenFarm = artifacts.require('TokenFarm')

// allow us to write better tests
require('chai')
  .use(require('chai-as-promised'))
  .should()


contract('TokenFarm', (accounts) => {
    // write tests here
    describe('Mock DAI deployment', async () => {
        it('has a name', async () => {
           let daiToken = await DaiToken.new()
           const name = await daiToken.name()
           assert.equal(name, 'Mock DAI Token')
        })
    })
})