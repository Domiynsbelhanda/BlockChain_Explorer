import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import {Web3Service} from "../../services/web3.service";

@Component({
  selector: "app-notifications",
  templateUrl: "notifications.component.html"
})
export class NotificationsComponent implements OnInit {
  public blocks = [];

  constructor(private web3Service: Web3Service) {}

  ngOnInit() {
    this.web3Service.getPrices()
      .subscribe(res => {
          console.log(res);
        });
      }
}
