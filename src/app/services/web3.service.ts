import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import {Observable} from "rxjs";
import {catchError, tap} from "rxjs/operators";

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

  btcBlock: any = [];

  token: string;


  constructor(
    private _http: HttpClient
  ) {
    this.token = '0bd88606587e4cc1b36c001685938b5c';
    this.web3 = new Web3(this.web3Provider);
    this.web3.eth.getBlockNumber()
      .then(numb => {
        this.processArray(numb);
      });

    this.btcBlockchain().forEach((value)=> {
      for (let i = 0; i < 10; i++){
        this.btcInfos(value['height'] - i).forEach(
          (values)=> {
            const data = {
              height: parseInt(value['height']) - i,
              hash: values['hash'],
              total: values['total'],
              size: values['size'],
              time: values['time'],
              mrkl_root: values['mrkl_root'],
              coinbase_addr: values['coinbase_addr'],
              bits: values['bits'],
              nonce: values['nonce'],
              transactions: values['txids'].length,
              txids: values['txids'],
            }
            this.btcBlock.push(data)
          }
        )
      }
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
    cc.priceHistorical('ETH', ['USD'], new Date())
      .then(prices => {
      })
      .catch(console.error)
  }

  btcBlockchain(){
    return this._http.get('https://api.blockcypher.com/v1/btc/main?token='+this.token);
  }

  btcInfos(height){
    return this._http.get('https://api.blockcypher.com/v1/btc/main/blocks/'+height+'?token='+this.token);
  }

  tx_Infos(hash){
    return this._http.get('https://api.blockcypher.com/v1/btc/main/txs/'+hash+'?token='+this.token)
  }
}
