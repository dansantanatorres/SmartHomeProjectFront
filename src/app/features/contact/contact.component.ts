// contact.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="Contact" class="contact-section">
      <div class="wrapper style2">
        <h2>Contact Us</h2>
        <form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="contactForm">
          
          <div class="row">
            <div class="col-6">
              <label for="name">Name</label>
              <input type="text" id="name" name="name" [(ngModel)]="form.name" required />
            </div>
            <div class="col-6">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" [(ngModel)]="form.email" required />
            </div>
          </div>

          <label for="devices">Select your devices</label>
          <div class="multi-select-dropdown" (click)="toggleDropdown()">
            <div class="selected-items">
              {{ form.devices.length ? form.devices.join(', ') : 'Select Devices' }}
            </div>
            <div *ngIf="dropdownOpen" class="dropdown-options">
              <label *ngFor="let device of devicesOptions">
                <input type="checkbox" [value]="device" [checked]="form.devices.includes(device)"
                       (change)="onDeviceChange($event)" />
                {{ device }}
              </label>
            </div>
          </div>

          <label for="message">Message</label>
          <textarea id="message" name="message" [(ngModel)]="form.message" rows="3" required></textarea>

          <div id="formError" style="color:#f5c000; margin:10px 0; font-weight:bold;">
            {{ formError }}
          </div>

          <button type="submit">Send</button>
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
  form = {
    name: '',
    email: '',
    devices: [] as string[],
    message: ''
  };

  formError = '';

  devicesOptions = ['Alexa', 'Google Home', 'Smart Bulb', 'Smart Plug', 'Thermostat', 'Camera'];
  dropdownOpen = false;

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
    // Validaciones
    const { name, email, message } = this.form;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    /*if (!name && !email && !message) {
      this.formError = "All fields are required.";
      return;
    }

    if (!emailRegex.test(email)) {
      this.formError = "Please enter a valid email, e.g.: user@domain.com";
      return;
    }*/

      // Generar errores individuales
    let errors: string[] = [];
    if (!name.trim()) errors.push('Name is required.');
    if (!email.trim()) errors.push('Email is required.');
    else if (!emailRegex.test(email)) errors.push('Invalid email format.');
    if (!message.trim()) errors.push('Message is required.');

    // Mostrar todos los errores juntos
    this.formError = errors.join(' ');

    if (errors.length === 0) {
      console.log('FORM COMPLETO:', this.form);
      alert('Formulario enviado. Revisa la consola.');
      // Aquí podrías limpiar el form si quieres:
       this.form = { name: '', email: '', devices: [], message: '' };
    }
    else
    {
      console.log('FORM ERROR:', this.formError);
      alert(this.formError);
    }
    this.formError = '';
    
  }
}