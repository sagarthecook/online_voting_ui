import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'otp-success-dialog',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <h2 mat-dialog-title>OTP Sent</h2>
    <mat-dialog-content>
      <p>Your OTP has been sent to your email. Please check and enter it below.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close color="primary" (click)="onOKClick()">OK</button>
    </mat-dialog-actions>
  `
})
export class OtpSuccessDialog {

    onOKClick() {
        // close the popup
    }
}