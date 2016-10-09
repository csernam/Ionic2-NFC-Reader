# Ionic2-NFC-Reader
How to read NFC tags with Ionic2 RC0. Basic usage.

In the first screen, you only have to bring near to the phone a NFC tag with at least one record in text/plain mode.
The second screen will show the the text recorded for the first position (You can have an array of string recorded... and many more things)

Studing the code, you will be able to easily change it to read some other stuff.

Check this page with useful information about [parsing NDEF](http://nfcpy.readthedocs.io/en/latest/topics/ndef.html#parsing-ndef).

# Deployment instructions in a fresh environment #
```
npm install -g ionic
npm install -g cordova
```

Install platforms and plugins as configured in `package.json`:
```
$ ionic state restore
```

Another npm install should be necessary...
```
$ npm install
```

# Run in device
Since you are using NFC native reader you must run directly in a device. If you run in the browser, a warning message should be shown in the console.

## Check connected devices
```
$ adb devices
```
## Run directly in the device conected
```
$ ionic run android
```
# Build
You can also build an APK and installed later if you have trouble with adb.
```
$ ionic build android
```
