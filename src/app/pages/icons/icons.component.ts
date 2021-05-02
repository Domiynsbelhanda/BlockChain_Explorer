import { Component, OnInit } from "@angular/core";
import {TransactionClass} from "../../services/transactions";
import {Web3Service} from "../../services/web3.service";
import {ActivatedRoute, Router} from "@angular/router";
import Web3 from "web3";

@Component({
  selector: "app-icons",
  templateUrl: "icons.component.html"
})
export class IconsComponent implements OnInit {

  web3: Web3;
  private transactionId: string;
  private sub: any;
  tx: TransactionClass;

  constructor(
    private shared: Web3Service,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.tx = new TransactionClass(null);
  }

  ngOnInit() {
    this.web3 = this.shared.web3;
    this.sub = this.route.params.subscribe( params => {
      this.transactionId = params['id'];
      if (this.transactionId !== undefined) {
        this.web3.eth.getTransaction(this.transactionId)
          .then( result => {
            this.web3.eth.getBlockNumber()
              .then(numb => {
                this.tx.blockHash = +result.blockHash;
                this.tx.blockHashStr = result.blockHash;
                this.tx.blockNumber = result.blockNumber;
                this.tx.blockNumberStr = String(result.blockNumber);
                this.tx.from = result.from;
                this.tx.gas = result.gas;
                this.tx.gasPrice = result.gasPrice; // result.gasPrice.c[0] + " WEI";
                this.tx.hash = result.hash;
                this.tx.input = result.input;
                this.tx.nonce = result.nonce;
                this.tx.to = result.to;
                this.tx.transactionIndex = result.transactionIndex;
                this.tx.ethValue = result.value; // result.value.c[0] / 10000;
                this.tx.txprice = (result.gas * +result.gasPrice) / 1000000000000000000;
                if (this.tx.blockNumber !== undefined) {
                  this.tx.conf = numb - this.tx.blockNumber;
                  if (this.tx.conf === 0) {
                    this.tx.confStr = 'unconfirmed'; // TODO change color button when unconfirmed... ng-if or ng-class
                  }
                }
                if (this.tx.blockNumber !== undefined) {
                  this.web3.eth.getBlock(this.tx.blockNumber).then( block => {
                    this.tx.time = block.timestamp;
                  });
                }
              });
          });
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
