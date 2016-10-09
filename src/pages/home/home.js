var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { NFC } from 'ionic-native';
import { ValidationComponent } from './../validation/validation.component';
export var HomePage = (function () {
    function HomePage(navCtrl, platform) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.data = [];
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.loginNfc();
        });
    };
    HomePage.prototype.loginNfc = function () {
        var _this = this;
        NFC.addNdefListener().subscribe(function (scannedTag) {
            _this.tags = scannedTag.tag.ndefMessage;
            console.log(_this.tags);
            for (var _i = 0, _a = _this.tags; _i < _a.length; _i++) {
                var entry = _a[_i];
                _this.data.push(_this.bytesToString(entry["payload"].splice(3)));
                console.log(_this.bytesToString(entry["payload"].splice(3)));
            }
            _this.navCtrl.setRoot(ValidationComponent, { name: _this.data[0], id: _this.data[1] });
        });
    };
    HomePage.prototype.bytesToString = function (bytes) {
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
            }
            else if ((c > 191) && (c < 224)) {
                if (i + 1 >= bytes.length) {
                    throw "Un-expected encoding error, UTF-8 stream truncated, or incorrect";
                }
                c2 = bytes[i + 1] & 0xff;
                result += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
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
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }), 
        __metadata('design:paramtypes', [NavController, Platform])
    ], HomePage);
    return HomePage;
}());
