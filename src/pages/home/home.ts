import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  db : any;
  rowItem = [];

  constructor(public navCtrl: NavController, platform: Platform, private changeDetectorRef: ChangeDetectorRef) {
    platform.ready().then(() => {
      this.db = (<any>window).sqlitePlugin.openDatabase({name: "pincode.db", location: 'default', createFromLocation: 1});
      this.db.executeSql('select * from pincode where pincode=110049', [], (resultSet) => {
        this.showData.call(this, resultSet);
      },(error) => {
        console.log('SELECT error: ' + error.message);
      });
    });
  }
  showData(items){
    for(var x = 0; x < items.rows.length; x++) {
      this.rowItem.push(items.rows.item(x));
    }
    console.log(JSON.stringify(this.rowItem));
    this.changeDetectorRef.detectChanges();
  }
}
