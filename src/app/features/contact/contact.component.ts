import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  template: `
    <section id="Contact" class="contact-section">
      <div class="wrapper style2">
        <h2>{{ 'HOME.CONTACT.TITLE' | translate }}</h2>

        <form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="contactForm">

          <div class="row">
            <div class="col-6">
              <label>{{ 'HOME.CONTACT.NAME' | translate }}</label>
              <input type="text" name="name" [(ngModel)]="form.name" required />
            </div>

            <div class="col-6">
              <label>{{ 'HOME.CONTACT.EMAIL' | translate }}</label>
              <input type="email" name="email" [(ngModel)]="form.email" required />
            </div>
          </div>

          <label>{{ 'HOME.CONTACT.DEVICES' | translate }}</label>

          <div class="multi-select-dropdown" (click)="toggleDropdown()">
            <div class="selected-items">
              {{ form.devices.length 
                  ? form.devices.join(', ') 
                  : ('HOME.CONTACT.DEVICES_PLACEHOLDER' | translate) }}
            </div>

            <div *ngIf="dropdownOpen" class="dropdown-options">
              <label *ngFor="let device of devicesOptions">
                <input type="checkbox"
                       [value]="device.value"
                       [checked]="form.devices.includes(device.value)"
                       (change)="onDeviceChange($event)" />
                {{ device.label }}
              </label>
            </div>
          </div>

          <label>{{ 'HOME.CONTACT.MESSAGE' | translate }}</label>
          <textarea name="message" [(ngModel)]="form.message" rows="3" required></textarea>

          <div style="color:#f5c000; margin:10px 0; font-weight:bold;">
            {{ formError }}
          </div>

          <button type="submit">
            {{ 'HOME.CONTACT.BUTTON' | translate }}
          </button>

        </form>
      </div>
    </section>
  `,
  styles: [`
    .multi-select-dropdown { position: relative; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; padding: 8px; width: 100%; max-width: 400px; background: #fff; }
    .selected-items { min-height: 24px; }
    .dropdown-options { position: absolute; top: 100%; left: 0; width: 100%; border: 1px solid #ccc; border-top: none; background: white; max-height: 150px; overflow-y: auto; z-index: 1000; padding: 5px 0; }
    .dropdown-options label { display: block; padding: 4px 10px; cursor: pointer; }
    .dropdown-options label:hover { background-color: #f5f5f5; }
  `]
})
export class ContactComponent {

  constructor(private translate: TranslateService) {}

  form = {
    name: '',
    email: '',
    devices: [] as string[],
    message: ''
  };

  formError = '';
  dropdownOpen = false;

  // 🔥 Devices traducidos dinámicamente
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
      console.log('FORM COMPLETO:', this.form);
      alert(this.translate.instant('HOME.CONTACT.SUCCESS'));

      this.form = { name: '', email: '', devices: [], message: '' };
    } else {
      console.log('FORM ERROR:', this.formError);
      alert(this.formError);
    }

    this.formError = '';
  }
}