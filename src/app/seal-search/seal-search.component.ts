import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { SealService } from '../app.service';
import { FormatsDialogComponent } from '../formats-dialog/formats-dialog.component';

@Component({
  selector: 'app-seal-search',
 // templateUrl: './seal-search.component.html',
  templateUrl: './seal-search-test.html',
  styleUrls: ['./seal-search.component.scss']
})
export class SealSearchComponent implements OnInit {

  availableDevices: MediaDeviceInfo[];
  deviceCurrent: MediaDeviceInfo;
  deviceSelected: any;

  formatsEnabled: BarcodeFormat[] = [
    // BarcodeFormat.CODE_128,
    // BarcodeFormat.DATA_MATRIX,
    // BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string = "12234";
  sealData:any;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;
  constructor(
    private readonly _dialog: MatDialog,
    private sealService:SealService
    ) { }
  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    console.debug('devices ', this.availableDevices)
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    if (this.qrResultString){
      this.sealData = this.sealService.getSealData(this.qrResultString)
    }
  }

  onDeviceSelectChange(event:any) {
    let selected = event.value;
    if (selected){
      this.deviceCurrent = this.availableDevices.find(x => x.deviceId === selected.deviceId);
    }
    console.debug("dev selected ", this.deviceSelected)
    console.debug("dev current ", this.deviceCurrent)
   /*  console.debug("selected ", selected)
    console.debug("dev selected ", this.deviceSelected)
    const selectedStr = selected? selected?.value?.deviceId : undefined;
    if (this.deviceSelected === selected) { return; }
    this.deviceSelected = selected;
    const device = this.availableDevices.find(x => x.deviceId === selected?.value?.deviceId);
    console.debug('device cnst ', device)
    this.deviceCurrent = device || undefined;  */
   
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }


  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  onChangeCam(){
  //TO DO enable changing device on button click

/*     if(this.availableDevices&&this.availableDevices.length>=2){
      const deviceIndex = this.availableDevices.findIndex(i=>i.deviceId===this.deviceCurrent.deviceId)
      const newIndex = deviceIndex===0?1:0;
      this.deviceCurrent = this.availableDevices[newIndex];
    }
 */

  }
  ngOnInit(): void {
  }


}
