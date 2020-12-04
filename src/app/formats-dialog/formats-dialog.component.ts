import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { BarcodeFormat } from '@zxing/library';
//import { formatNames, formatsAvailable } from '../barcode-formats';

@Component({
  selector: 'app-formats-dialog',
  templateUrl: './formats-dialog.component.html',
  styleUrls: ['./formats-dialog.component.scss']
})
export class FormatsDialogComponent {

  formatsAvailable =  BarcodeFormat.QR_CODE;//formatsAvailable;

  formatsEnabled: BarcodeFormat[];

  readonly formatNames = ['QR Code 2D barcode format'];

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: any,
    private readonly _dialogRef: MatDialogRef<FormatsDialogComponent>,
  ) {
    this.formatsEnabled = data.formatsEnabled || [];
  }

  close() {
    this._dialogRef.close(this.formatsEnabled);
  }

  isEnabled(format: BarcodeFormat) {
    return this.formatsEnabled.find(x => x === format);
  }

  onSelectionChange(event: MatSelectionListChange) {
    this.formatsEnabled = event.source.selectedOptions.selected.map(selected => selected.value);
  }
}
