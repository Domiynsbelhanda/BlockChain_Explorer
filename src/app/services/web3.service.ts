import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  provider = 'https://polished-solitary-brook.quiknode.pro/f019ec63f51df6afb9c54792bac34e8680b2511d/'; // Add your quiknode HTTP provider link here
  web3Provider = new Web3.providers.HttpProvider(this.provider);
  web3: any;
  blocks: Array<any> = [];

  maxBlocks = 10;

  data: any;

  result:any;


  constructor(
    private _http: HttpClient
  ) {
    this.web3 = new Web3(this.web3Provider);
    this.web3.eth.getBlockNumber()
      .then(numb => {
        this.processArray(numb);
      });
  }

  async processArray(num: number) {
    for (let i = 0; i < this.maxBlocks; i++) {
      this.blocks.push(await this.web3.eth.getBlock(num - i));
    }
  }

  getPrices() {
    return this._http.get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH,BTC&tsyms=USD");
  }

  getPricedata(month:Date){
    const cc = require('cryptocompare')
    cc.setApiKey('2854a5c3399c288c9183d204216c9c5d706e7d55bb64cd5a67eda10db684a574')

// Basic Usage:
    cc.priceHistorical('ETH', ['USD'], new Date(2021,5,2, 2,34))
      .then(prices => {
        console.log(prices)
        // -> { BTC: { USD: 997, EUR: 948.17 } }
      })
      .catch(console.error)
  }
}
