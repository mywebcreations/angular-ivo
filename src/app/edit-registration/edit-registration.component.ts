import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, Observable, switchMap, tap } from 'rxjs';
import { SubSink } from 'subsink';
import { RegistrationData } from '../core/model/registration-data';
import { CreateRegFormService } from '../core/service/create-reg-form.service';
import { RegistrationService } from '../core/service/registration.service';

@Component({
  selector: 'app-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.css'],

})
export class EditRegistrationComponent implements OnInit, OnDestroy {
  registration$!: Observable<RegistrationData>;
  formRegData!: RegistrationData;
  userId!: string;

  subs = new SubSink();

  constructor(
    private registrationService: RegistrationService,
    private route: ActivatedRoute,
    private router: Router,
    private regForm: CreateRegFormService
  ) {}

  ngOnInit(): void {
    this.registration$ = this.route.paramMap.pipe(
      catchError(async (error) => console.log('Caught Error', error)),
      tap((params: ParamMap) => (this.userId = params.get('id')!)),
      switchMap((params: ParamMap) =>
        this.registrationService.getRegistration(params.get('id')!)
      )
    );
    this.addFormDataToForm();
  }

  addFormDataToForm(): void {
    this.subs.add(
      this.registration$.subscribe(
        (res) => {
          // console.log(res);
          this.formRegData = res as RegistrationData;
          // console.log(this.formRegData);
          this.getTheFormGroups();
        },
        (err) => console.log(err),
        () => console.log('Now complete.')
      )
    );
  }

  getTheFormGroups(): void {
    // console.log(this.formRegData);
    console.log(this.userId);
    this.regForm.updateEditRegistrationForm(this.formRegData);
    this.regForm.updateEditRegistrationForm2(this.formRegData);
    this.registrationService.updateUserId(this.userId);
    this.router.navigate(['/register']); //this.router.navigate(['/register', { id: Idvalue }]);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
