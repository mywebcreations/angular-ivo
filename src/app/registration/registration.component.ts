import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, concatMap, map, Observable, of, tap } from 'rxjs';
import { RegistrationData } from '../core/model/registration-data';
import { RegistrationService } from '../core/service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  registrationForm2!: FormGroup;
  comingAlone: Array<string> = [
    'Please select',
    'Just myself',
    "I'm bringing some colleagues",
  ];

  showForm1: boolean = true;
  showForm2: boolean = false;
  showHowManyColleagues: boolean = false;
  selectedOption: string = 'Please select';
  showWhoIsComingWithYou: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      comingWithOthers: ['', Validators.required],
      howMany: ['', Validators.required],
      countOnYou: ['', Validators.required],
    });
    this.registrationForm2 = this.formBuilder.group({
      name: ['', Validators.required],
      telephone: [''],
      email: [''],
      gender: [''],
      comingWithOthers: [''],
      howMany: [''],
      countOnYou: [''],
    });
  }

  processYesChoice(): void {
    this.showForm1 = true;
    this.showForm2 = false;
  }
  processNoChoice(): void {
    this.showForm1 = false;
    this.showForm2 = true;
    this.showWhoIsComingWithYou = false;
  }

  controlHowManyColleagesField() {
    this.selectedOption == "I'm bringing some colleagues"
      ? (this.showHowManyColleagues = true)
      : (this.showHowManyColleagues = false);
  }

  // saveData() {
  //   // const valueChanges$ = this.registrationForm.valueChanges;
  //   const formValue$: Observable<RegistrationData> = of(this.registrationForm.value);
  //   console.log(formValue$);
  //   formValue$.pipe(
  //       map((formValue: RegistrationData) => this.registrationService.saveRegistration(formValue)),
  //       catchError(errors => of(errors)),
  //       tap(result=>this.saveSuccess(result))
  //   );
  // }

  saveData() {
    const formId = Math.floor(1000 + Math.random() * 9000);
    const formData = this.registrationForm.value;
    formData['formId'] = formId;
    // console.log(formData);
    this.registrationService.saveRegistration(formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  saveSuccess(result: any) {
    console.log(result);
  }
}
