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
  deviceSelected: string;

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
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    if (this.qrResultString){
      this.sealData = this.sealService.getSealData(this.qrResultString)
    }
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.deviceCurrent = device || undefined;
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
  ngOnInit(): void {
  }

}
