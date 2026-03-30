import { Component, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  styles: [`
    .multi-select-dropdown { position: relative; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; padding: 8px; width: 100%; max-width: 400px; background: #fff; }
    .selected-items { min-height: 24px; }
    .dropdown-options { position: absolute; top: 100%; left: 0; width: 100%; border: 1px solid #ccc; border-top: none; background: white; max-height: 150px; overflow-y: auto; z-index: 1000; padding: 5px 0; }
    .dropdown-options label { display: block; padding: 4px 10px; cursor: pointer; }
    .dropdown-options label:hover { background-color: #f5f5f5; }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #2ecc71;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      animation: fadeInOut 4s ease forwards;
    }
    .toast.error {
      background: #e74c3c;
    }
    @keyframes fadeInOut {
      0%   { opacity: 0; transform: translateY(20px); }
      10%  { opacity: 1; transform: translateY(0); }
      80%  { opacity: 1; }
      100% { opacity: 0; transform: translateY(20px); }
    }

    /* Spinner dentro del botón */
    .btn-spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255,255,255,0.4);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      margin-right: 8px;
      vertical-align: middle;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `],
  templateUrl: './contact.component.html'
})
export class ContactComponent {

  constructor(private translate: TranslateService, private contactService: ContactService, private cdr: ChangeDetectorRef) {}

  form = {
    name: '',
    email: '',
    devices: [] as string[],
    message: ''
  };

  formError   = '';
  dropdownOpen = false;
  isLoading   = false;

  // Toast
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  showToast = false;
  private toastTimer: any;

  get devicesOptions() {
    return [
      { value: 'Alexa',        label: this.translate.instant('HOME.CONTACT.DEVICES_OPTIONS.ALEXA') },
      { value: 'Google Home',  label: this.translate.instant('HOME.CONTACT.DEVICES_OPTIONS.GOOGLE_HOME') },
      { value: 'Smart Bulb',   label: this.translate.instant('HOME.CONTACT.DEVICES_OPTIONS.SMART_BULB') },
      { value: 'Smart Plug',   label: this.translate.instant('HOME.CONTACT.DEVICES_OPTIONS.SMART_PLUG') },
      { value: 'Thermostat',   label: this.translate.instant('HOME.CONTACT.DEVICES_OPTIONS.THERMOSTAT') },
      { value: 'Camera',       label: this.translate.instant('HOME.CONTACT.DEVICES_OPTIONS.CAMERA') }
    ];
  }

  toggleDropdown() { this.dropdownOpen = !this.dropdownOpen; }

  onDeviceChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      if (!this.form.devices.includes(value)) this.form.devices.push(value);
    } else {
      this.form.devices = this.form.devices.filter(d => d !== value);
    }
  }

  private triggerToast(message: string, type: 'success' | 'error') {
    clearTimeout(this.toastTimer);
    this.toastMessage = message;
    this.toastType    = type;
    this.showToast    = true;
    this.toastTimer   = setTimeout(() => this.showToast = false, 4000);
  }

  onSubmit() {
  //console.log('1. onSubmit disparado');
  
  const { name, email, message } = this.form;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const errors: string[] = [];

  if (!name.trim())            errors.push(this.translate.instant('HOME.CONTACT.ERRORS.NAME_REQUIRED'));
  if (!email.trim())           errors.push(this.translate.instant('HOME.CONTACT.ERRORS.EMAIL_REQUIRED'));
  else if (!emailRegex.test(email)) errors.push(this.translate.instant('HOME.CONTACT.ERRORS.EMAIL_INVALID'));
  if (!message.trim())         errors.push(this.translate.instant('HOME.CONTACT.ERRORS.MESSAGE_REQUIRED'));

  this.formError = errors.join(' ');
  
  //console.log('2. Errores de validación:', errors);
  
  if (errors.length > 0) return;

  //console.log('3. Pasó validación, llamando al servicio...');
  this.isLoading = true;

  this.contactService.send({
      name:    name.trim(),
      email:   email.trim(),
      message: message.trim(),
      devices: this.form.devices
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.form      = { name: '', email: '', devices: [], message: '' };
        this.formError = '';
        this.triggerToast(this.translate.instant('HOME.CONTACT.SUCCESS'), 'success');
        this.cdr.detectChanges();  // 👈 fuerza el re-render
      },
      error: (err) => {
        this.isLoading = false;
        this.triggerToast(err.error?.error ?? this.translate.instant('HOME.CONTACT.ERRORS.GENERIC'), 'error');
        this.cdr.detectChanges();  // 👈 fuerza el re-render
      }
    });
}
}