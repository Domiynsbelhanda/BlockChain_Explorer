import { Component, OnInit } from "@angular/core";
import {Web3Service} from "../../services/web3.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {

  blockId: number;
  sub: any;
  block:any;
  transactions: any = []

  constructor(
    private shared: Web3Service,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe( params => {
      this.blockId = +params['id'];
      if (this.blockId !== undefined) {
        this.shared.btcInfos(this.blockId).forEach(
          (value) => {
            this.block = value
            for (let i = 0; i < this.block.txids.length; i++){
              this.shared.tx_Infos(this.block.txids[i]).forEach(
                (values)=> {
                  this.transactions.push(values)
                  console.log(this.transactions)
                }
              )
            }
          }
        )
      } else {
        this.router.navigate(['/#/btc']);
      }
    });
  }
}
