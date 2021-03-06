const Block = require("./block");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(block);

    return block;
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false;

    for (let index = 1; index < chain.length; index++) {
      const block = chain[index];
      const lastBlock = chain[index - 1];

      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      )
        return false;
    }

    return true;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) return;
    else if (!this.isValidChain(newChain)) return;

    this.chain = newChain;
  }
}

module.exports = Blockchain;
