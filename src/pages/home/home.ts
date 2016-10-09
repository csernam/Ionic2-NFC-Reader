import { Component, OnInit } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import { NFC, Ndef } from 'ionic-native';

import { NfcDataComponent } from './../nfc-data/nfc-data.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {
  data: string[] = [];
  tags: Ndef[];

  constructor(public navCtrl: NavController, public platform: Platform) {

  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.loginNfc();
    });
  }

  loginNfc() {
    NFC.addNdefListener().subscribe(scannedTag => {
      this.tags = scannedTag.tag.ndefMessage;
      console.log(this.tags);

      //We should read more than only one value...
      for (let entry of this.tags) {
        this.data.push(this.bytesToString(entry["payload"].splice(3)));
        console.log(this.bytesToString(entry["payload"].splice(3)));
      }
      this.navCtrl.setRoot(NfcDataComponent, { value: this.data[0] });
    });
  }

  bytesToString(bytes) {
    // based on http://ciaranj.blogspot.fr/2007/11/utf8-characters-encoding-in-javascript.html

    var result = "";
    var i, c, c1, c2, c3;
    i = c = c1 = c2 = c3 = 0;

    // Perform byte-order check.
    if (bytes.length >= 3) {
      if ((bytes[0] & 0xef) == 0xef && (bytes[1] & 0xbb) == 0xbb && (bytes[2] & 0xbf) == 0xbf) {
        // stream has a BOM at the start, skip over
        i = 3;
      }
    }

    while (i < bytes.length) {
      c = bytes[i] & 0xff;

      if (c < 128) {

        result += String.fromCharCode(c);
        i++;

      } else if ((c > 191) && (c < 224)) {

        if (i + 1 >= bytes.length) {
          throw "Un-expected encoding error, UTF-8 stream truncated, or incorrect";
        }
        c2 = bytes[i + 1] & 0xff;
        result += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;

      } else {

        if (i + 2 >= bytes.length || i + 1 >= bytes.length) {
          throw "Un-expected encoding error, UTF-8 stream truncated, or incorrect";
        }
        c2 = bytes[i + 1] & 0xff;
        c3 = bytes[i + 2] & 0xff;
        result += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;

      }
    }
    return result;
  }
}