import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ChangeDetectorRef } from "@angular/core";
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  db : any;
  rowItem = [];
  sqlDB : object = {};
  pushPage:any;
  constructor(public navCtrl: NavController, platform: Platform, private changeDetectorRef: ChangeDetectorRef) {
    platform.ready().then(() => {
      // this.db = (<any>window).sqlitePlugin.openDatabase({name: "pincode.db", location: 'default', createFromLocation: 1});
      // this.db.executeSql('select * from pincode where pincode=110049', [], (resultSet) => {
      //   this.showData.call(this, resultSet);
      // },(error) => {
      //   console.log('SELECT error: ' + error.message);
      // });
      this.pushPage = AboutPage;
      this.sqlDB = new Promise ((resolve, reject) => {
        this.db = (<any>window).sqlitePlugin.openDatabase({name: "pincode.db", location: 'default', createFromLocation: 1});

        if(this.db){
          resolve(this.db);
        }else{
          reject('ERROR: DB Connection Failed');
        }
      })

    });
  }
  getItems(event){
    // for(var x = 0; x < items.rows.length; x++) {
    //   this.rowItem.push(items.rows.item(x));
    // }
    // console.log(JSON.stringify(this.rowItem));
    // this.changeDetectorRef.detectChanges();
    this.rowItem = [];
    const val = event.target.value;
    if (val && val.trim() != '' && val.length > 4) {
      this.db.executeSql('select * from pincode where pincode=?', [val], (resultSet) => {
        for(var x = 0; x < resultSet.rows.length; x++) {
          this.rowItem.push(resultSet.rows.item(x));
        }
        console.log(JSON.stringify(this.rowItem));
        this.changeDetectorRef.detectChanges();
      },(error) => {
        console.log('SELECT error: ' + error.message);
      });
    }
  }

  itemSelected(item:object) {
    console.log(item);
  }
}
