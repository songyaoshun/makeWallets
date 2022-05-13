const ethers = require('ethers');
const fs = require('fs')

// 生成账号数
let accountNumber = 1000;

async function create_new_account() {
    let tmpWallet = ethers.Wallet.createRandom();
    let record=[tmpWallet.privateKey, (await tmpWallet.getAddress()).toString(), tmpWallet.mnemonic.phrase]

    return record;
}

async function main() {
    const FILE_NAME='./secrect.csv'
    let header="PrivateKey,Address,Mnemonic\n";
    fs.writeFile(FILE_NAME,header,err=>{});

    for (let index = 0; index < accountNumber; index++) {
        let record=await create_new_account();
        fs.writeFile(FILE_NAME,record.toString()+'\n',{flag:'a+'},err=>{
            if (err) {
                console.log('Some error occured - file either not saved or corrupted file saved.');
              } else{
                console.log('finished',index+1);
              }
        });

    }
}
main()
