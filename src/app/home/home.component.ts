import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  event = {
    title: 'COME TO CELEBRATE THE NEW YEAR WITH US!',
    logo: '../assets/company-logo.png',
    companyName: 'IT COMPANY',
    tagline: 'Implementing your IT solutions',
    message: 'We will be more than happy to',
    messageContd: 'have you with us for this very',
    dayOfWeek: 'Wednesday',
    month: 'December',
    day: 29,
    timePeriod: '19h to 23h',
    action: 'ACCEPT/REFUSE',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  processClick(): void {
    this.router.navigate(['/register']);
  }
}
