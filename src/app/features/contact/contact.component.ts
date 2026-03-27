import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';                    
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
  `],
  templateUrl: './contact.component.html'
})
export class ContactComponent {

  constructor(private translate: TranslateService, private contactService: ContactService) {}

  form = {
    name: '',
    email: '',
    devices: [] as string[],
    message: ''
  };

  formError = '';
  dropdownOpen = false;
  isLoading = false;


  get devicesOptions() {
    return [
      { value: 'Alexa', label: this.translate.instant('HOME.CONTACT.DEVICES_OPTIONS.ALEXA') },
      { value: 'Google Home', label: this.translate.instant('HOME.CONTACT.DEVICES_OPTIONS.GOOGLE_HOME') },
      { value: 'Smart Bulb', label: this.translate.instant('HOME.CONTACT.DEVICES_OPTIONS.SMART_BULB') },
      { value: 'Smart Plug', label: this.translate.instant('HOME.CONTACT.DEVICES_OPTIONS.SMART_PLUG') },
      { value: 'Thermostat', label: this.translate.instant('HOME.CONTACT.DEVICES_OPTIONS.THERMOSTAT') },
      { value: 'Camera', label: this.translate.instant('HOME.CONTACT.DEVICES_OPTIONS.CAMERA') }
    ];
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onDeviceChange(event: any) {
    const value = event.target.value;

    if (event.target.checked) {
      if (!this.form.devices.includes(value)) this.form.devices.push(value);
    } else {
      this.form.devices = this.form.devices.filter(d => d !== value);
    }
  }

  onSubmit() {
    const { name, email, message } = this.form;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let errors: string[] = [];

    if (!name.trim()) errors.push(this.translate.instant('HOME.CONTACT.ERRORS.NAME_REQUIRED'));
    if (!email.trim()) errors.push(this.translate.instant('HOME.CONTACT.ERRORS.EMAIL_REQUIRED'));
    else if (!emailRegex.test(email)) errors.push(this.translate.instant('HOME.CONTACT.ERRORS.EMAIL_INVALID'));
    if (!message.trim()) errors.push(this.translate.instant('HOME.CONTACT.ERRORS.MESSAGE_REQUIRED'));

    this.formError = errors.join(' ');

    if (errors.length === 0) {
      this.isLoading = true;  // 👈 deshabilita el botón

      this.contactService.send({
        name:    this.form.name.trim(),
        email:   this.form.email.trim(),
        message: this.form.message.trim(),
        devices: this.form.devices
      }).subscribe({
        next: () => {
          alert(this.translate.instant('HOME.CONTACT.SUCCESS'));
          this.form = { name: '', email: '', devices: [], message: '' };
          this.formError = '';
          this.isLoading = false;
        },
        error: (err) => {
          this.formError = err.error?.error ?? this.translate.instant('HOME.CONTACT.ERRORS.GENERIC');
          this.isLoading = false;
        }
      });
    }
  }
}