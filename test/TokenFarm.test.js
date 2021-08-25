// const { assert } = require('chai')
// const { Item } = require('react-bootstrap/lib/Breadcrumb')
// const _deploy_contracts = require('../migrations/2_deploy_contracts')

const { assert } = require('chai')
const { default: Web3 } = require('web3')

const DaiToken = artifacts.require('DaiToken')
const DappToken = artifacts.require('DappToken')
const TokenFarm = artifacts.require('TokenFarm')

// allow us to write better tests
require('chai')
  .use(require('chai-as-promised'))
  .should()

  function tokens(n){
      return web3.utils.toWei(n, 'ether');
  }

contract('TokenFarm', ([owner, investor]) => {
    // write tests here
    let daiToken, dappToken, tokenFarm

    before(async () => {
        // load contracts
        daiToken = await DaiToken.new()
        dappToken = await DappToken.new()
        tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)

        // transfer all Dapp tokens to farm (1 milli)
        await dappToken.transfer(tokenFarm.address, tokens('1000000'))

        // send tokens to investor
        await daiToken.transfer(investor, tokens('100'), { from: owner })
    })

    describe('Mock DAI deployment', async () => {
        it('has a name', async () => {
           const name = await daiToken.name()
           assert.equal(name, 'Mock DAI Token')
        })
    })

    describe('Dapp Token deployment', async () => {
        it('has a name', async () => {
           const name = await dappToken.name()
           assert.equal(name, 'DApp Token')
        })
    })

    describe('Token Farm deployment', async () => {
        it('has a name', async () => {
           const name = await tokenFarm.name()
           assert.equal(name, 'Dapp Token Farm')
        })

        it('contract has tokens', async () => {
            let balance = await dappToken.balanceOf(tokenFarm.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })

    describe('Farming tokens', async () => {

        it('rewards investors for staking mDai tokens', async () => {
            let result

            //Check investor balance before staking
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct before staking')

            //Stake Mock DAI Tokens
            await daiToken.approve(tokenFarm.address, tokens('100'), {from: investor})
            await tokenFarm.stakeTokens(tokens('100'), { from: investor })
        })
        

    })
})