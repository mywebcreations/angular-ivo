import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { RegistrationData } from '../core/model/registration-data';
import { CreateRegFormService } from '../core/service/create-reg-form.service';
import { RegistrationService } from '../core/service/registration.service';

@Component({
  selector: 'app-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.css'],
})
export class EditRegistrationComponent implements OnInit {
  registration$!: Observable<RegistrationData>;
  EditRegistrationForm!: FormGroup;
  EditRegistrationForm2!: FormGroup;
  formRegData!: RegistrationData;
  userId!: string;

  constructor(
    private registrationService: RegistrationService,
    private route: ActivatedRoute,
    private router: Router,
    private regForm: CreateRegFormService
  ) {}

  ngOnInit(): void {
    this.registration$ = this.route.paramMap.pipe(
      tap((params: ParamMap) => (this.userId = params.get('id')!)),
      switchMap((params: ParamMap) =>
        this.registrationService.getRegistration(params.get('id')!)
      )
    );
    this.addFormDataToForm();
  }

  addFormDataToForm(): void {
    this.registration$.subscribe(
      (res) => {
        // console.log(res);
        this.formRegData = res as RegistrationData;
        // console.log(this.formRegData);
        this.getTheForms();
      },
      (err) => console.log(err),
      () => console.log('Now complete.')
    );
  }

  getTheForms(): void {
    console.log(this.formRegData);
    this.regForm.getRegistrationForm(
      'EditRegistrationComponent',
      this.formRegData
    );
    this.EditRegistrationForm = this.regForm.registrationForm;
    this.EditRegistrationForm2 = this.regForm.registrationForm2;

    // this.router.navigate(['/register']); //this.router.navigate(['/register', { id: Idvalue }]);
  }
}
