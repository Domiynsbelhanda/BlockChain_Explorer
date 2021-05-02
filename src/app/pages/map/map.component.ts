import {Component, OnDestroy, OnInit} from "@angular/core";
import Web3 from "web3";
import {Web3Service} from "../../services/web3.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-map",
  templateUrl: "map.component.html"
})
export class MapComponent implements OnInit, OnDestroy  {

  web3: Web3;
  private addressId: string;
  private sub: any;
  balance: any;
  balanceInEther: any;

  constructor(
    private shared: Web3Service,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.web3 = this.shared.web3;
    this.sub = this.route.params.subscribe( params => {
      this.addressId = params['id'];
      if (this.addressId !== undefined) {
        this.web3.eth.getBalance(this.addressId, null, null).then( result => {
          this.balance = result;
          this.balanceInEther = this.web3.utils.fromWei(result, 'ether');
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
