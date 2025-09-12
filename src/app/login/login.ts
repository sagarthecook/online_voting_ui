import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OtpSuccessDialog } from '../common/OtpSuccessDialog';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  step = 1;
  userIdForm: FormGroup;
  otpForm: FormGroup;
  submittedUserId = false;
  submittedOtp = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog,
     private route: Router) {
    this.userIdForm = this.fb.group({
      userId: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required,Validators.pattern('[0-9]*') ,Validators.minLength(5), Validators.maxLength(5)]]
    });
  }

  onGenerateOtp() {
    debugger
    this.submittedUserId = true;
    if (this.userIdForm.valid) {
      // Call backend to send OTP here
       const payload = { userId: this.userIdForm.value.userId };

      this.http.post('http://localhost:8080/v1/user/generate_otp', payload).subscribe({
        next: () => {
        this.dialog.open(OtpSuccessDialog);
          this.step = 2;
        },
        error: err => {
          // Handle error (show message, etc.)
          console.log('Error generating OTP', err);
        }
      });
      this.step = 2;
    }
  }

  onLogin() {
    this.submittedOtp = true;
    const payload = { userId: this.userIdForm.value.userId, otp: this.otpForm.value.otp };
    if (this.otpForm.valid) {
     this.http.post('http://localhost:8080/v1/user/validate_otp',payload).subscribe({
        next: () => {
          // redirect to home page or dashboard
          this.route.navigate(['/home']);
          console.log('Login successful');
        },
        error: err => {
          console.log('Error validating OTP', err);
        }
      }); 
    }
  }
}