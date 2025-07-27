const Contract = artifacts.require("WalletFactory")

module.exports = function(deployer){
    deployer.deploy(Contract)
}