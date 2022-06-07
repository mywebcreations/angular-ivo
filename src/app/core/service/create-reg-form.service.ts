import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RegistrationData } from '../model/registration-data';

@Injectable({
  providedIn: 'root',
})
export class CreateRegFormService {
  registrationForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    telephone: ['', Validators.required],
    email: ['', Validators.required],
    gender: ['', Validators.required],
    comingWithOthers: ['', Validators.required],
    howMany: ['', Validators.required],
    countOnYouYes: ['', Validators.required],
    countOnYouNo: ['', Validators.required],
  });
  registrationForm2: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    telephone: [''],
    email: [''],
    gender: [''],
    comingWithOthers: [''],
    howMany: [''],
    countOnYouYes: ['', Validators.required],
    countOnYouNo: ['', Validators.required],
  });
  private editRegistrationForm = new BehaviorSubject(this.registrationForm);
  editRegistrationForm$ = this.editRegistrationForm.asObservable();
  private editRegistrationForm2 = new BehaviorSubject(this.registrationForm2);
  editRegistrationForm2$ = this.editRegistrationForm2.asObservable();

  constructor(private formBuilder: FormBuilder) {}

  updateEditRegistrationForm(formData: RegistrationData): void {
    this.editRegistrationForm.next(
      this.formBuilder.group({
        name: [formData?.name, Validators.required],
        telephone: [formData?.telephone, Validators.required],
        email: [formData?.email, Validators.required],
        gender: [formData?.gender, Validators.required],
        comingWithOthers: [formData?.comingWithOthers, Validators.required],
        howMany: [formData?.howMany, Validators.required],
        countOnYouYes: [formData?.countOnYouYes, Validators.required],
        countOnYouNo: [formData?.countOnYouNo, Validators.required]
      })
    )
  }
  
  updateEditRegistrationForm2(formData: RegistrationData): void {
    this.editRegistrationForm2.next(
      this.formBuilder.group({
        name: [formData?.name, Validators.required],
        telephone: [formData?.telephone],
        email: [formData?.email],
        gender: [formData?.gender],
        comingWithOthers: [formData?.comingWithOthers],
        howMany: [formData?.howMany],
        countOnYouYes: [formData?.countOnYouYes, Validators.required],
        countOnYouNo: [formData?.countOnYouNo, Validators.required],
      })
    )
  }
}
