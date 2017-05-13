import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { InventoryService } from './inventory.service';
import { Inventory } from './inventory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private subscription: Subscription;
  private availableInventory: Inventory[];
  title = 'app works!';

  constructor(private inventoryService: InventoryService) {
    this.availableInventory = [];
  }

  public ngOnInit() {
    this.subscription = this.inventoryService.getInventory()
       .subscribe((items) => this.availableInventory = items);
  }
}
