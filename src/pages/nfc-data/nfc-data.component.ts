import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';

@Component({
    selector: 'nfc-data',
    templateUrl: 'nfc-data.component.html'
})
export class NfcDataComponent implements OnInit {
    @ViewChild(Content) content: Content;

    value: string;

    constructor(public nav: NavController, public navParams: NavParams) { }

    ngOnInit() {
        this.value = this.navParams.get('value');
        console.log("ID: ", this.value);
    }
}