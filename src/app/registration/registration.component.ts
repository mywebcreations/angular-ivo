import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { RegistrationData } from '../core/model/registration-data';
import { RegistrationService } from '../core/service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  registrationForm2!: FormGroup;
  comingAlone: Array<string> = ["Please select", "Just myself", "I'm bringing some colleagues"];

  showForm1: boolean = true;
  showForm2: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      comingWithOthers: ['', Validators.required],
      countOnYou: ['', Validators.required]
    })
    this.registrationForm2 = this.formBuilder.group({
      name: ['', Validators.required],
      telephone: [''],
      email: [''],
      gender: [''],
      comingWithOthers: [''],
      countOnYou: ['']
    })
  }

  saveData(): Observable<RegistrationData> {
    return of() //just to remove error. Please change to correct observable.
  }

  processYesChoice(): void {
    this.showForm1 = true;
    this.showForm2 = false;
  }
  processNoChoice(): void {
    this.showForm1 = false;
    this.showForm2 = true;
  }


}
