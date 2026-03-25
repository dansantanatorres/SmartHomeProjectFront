// home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolutionCardComponent } from '../../shared/components/solution-card/solution-card.component';
import { PlanCardComponent } from '../../shared/components/plan-card/plan-card.component';
import { ContactComponent } from '../../features/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SolutionCardComponent, PlanCardComponent, FormsModule, ContactComponent],
  styleUrls: ['./home.component.scss'],
  template: `
    <!-- Solutions -->
    <section id="solutions" class="solution-section">
        <div class="solution-title">
        <h2>Smart Home Solutions Tailored for You</h2>
        <p>
            Integrate your devices or add new smart technology to make your home more comfortable, secure, and 
            <span style="color: #c9a227;">energy</span>-<span style="color: #61c927;">efficient</span>.
        </p>
        </div>

        <div class="solution-container">
        <app-solution-card 
            *ngFor="let s of solutions" 
            [data]="s">
        </app-solution-card>
        </div>
    </section>

    <!-- Plans -->
    <section id="plans" class="plans-section">
        <h1>Choose Your <span>Smart Home Plan</span></h1>

        <div class="plans-container">
        <app-plan-card 
            *ngFor="let p of plans" 
            [data]="p">
        </app-plan-card>
        </div>
    </section>

    <!-- About Us -->
    <section id="AbouUs" class="about-section">
    <div class="wrapper style2">
        <header class="about-title">
        <h2>About Us</h2>

        <p>
            At ZentrixNest, we transform modern homes and spaces into intelligent, connected, and efficient environments. 
            We specialize in 
            <strong style="color: #f5c000">smart home automation and device configuration</strong>, 
            integrating lighting, climate control, security, voice control, and remote monitoring from your smartphone.
        </p>

        <p>
            Our approach combines advanced technology, elegant design, and secure solutions, tailored to each client’s unique needs. 
            Whether you are starting from scratch or upgrading your current setup, we help you create a home that is more comfortable, secure, and efficient.
        </p>

        <p>
            At ZentrixNest, we believe a smart home isn’t just controlled—it’s enjoyed, which is why we provide intuitive, reliable, and aesthetically elegant solutions that seamlessly fit your lifestyle.
        </p>

        </header>
    </div>
    </section>
  `
})
export class HomeComponent {
    
  form = {
    name: '',
    email: '',
    devices: [] as string[], // array para multiple select
    message: ''
  };
  onSubmit() {
    console.log('FORM COMPLETO:', this.form);
    // Aquí luego puedes enviar los datos a tu backend
  }
  solutions = [
    { title: 'Integration', text: 'Use devices you already own, like Alexa or Google Home, to control your home effortlessly.', icons: ['conexion50y.png'] },
    { title: 'Lighting & Power', text: 'Automate bulbs, switches, and plugs to save energy and create the perfect ambiance.', icons: ['lights50y.png'] },
    { title: 'Climate & Comfort', text: 'Smart thermostats, heaters, and fans keep your home comfortable and energy-efficient.', icons: ['climate50y.png','eco50y.png'] },
    { title: 'Security & Safety', text: 'Protect your home with cameras, sensors, smart locks, and real-time alerts.', icons: ['cloud50y.png'] },
    { title: 'Custom Automations', text: 'Create personalized scenes and routines to make your home smarter and simpler.', icons: ['autoplay50y.png'] }
  ];
  plans = [
    {
        title: 'Starter',
        icon: 'mic30y.png',
        price: 'Starting at $299 CAD',
        features: [
        'Voice assistant integration.',
        'Installation of 1–2 smart devices.',
        'Basic configuration & system testing.'
        ],
        ideal: 'Perfect for first-time smart home users.',
        buttonText: 'Book Free Consultation'
    },
    {
        title: 'Essentials',
        icon: 'devices30y.png',
        price: 'Starting at $599 CAD',
        features: [
        'Control 3–5 smart devices.',
        'Smartphone & voice integration.',
        'Custom automation scenes.'
        ],
        ideal: 'Great for upgrading key areas of your home.',
        buttonText: 'Book Free Consultation'
    },
    {
        title: 'Full Smart',
        icon: 'smartHome30y.png',
        price: 'Custom Quote',
        features: [
        'Full-home smart integration.',
        'Advanced automations & remote access.',
        'Complete voice + app control.'
        ],
        ideal: 'Designed for a fully connected smart home.',
        buttonText: 'Request Custom Plan'
    },
    {
        title: 'Customize',
        icon: 'custom30y.png',
        price: 'Flexible Pricing',
        features: [
        'Installation & setup per device.',
        'Add switches, cameras, plugs & tailor-made automations.'
        ],
        ideal: 'Perfect for a personalized smart home setup.',
        buttonText: 'Build Your Setup'
    }
    ];
}