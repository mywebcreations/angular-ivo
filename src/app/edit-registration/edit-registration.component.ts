import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { RegistrationData } from '../core/model/registration-data';
import { RegistrationService } from '../core/service/registration.service';

@Component({
  selector: 'app-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.css']
})
export class EditRegistrationComponent implements OnInit {
  registration$!: Observable<RegistrationData>;
  formJsonData!: RegistrationData;

  constructor(
    private registrationService: RegistrationService,
    private route: ActivatedRoute,  
    private router: Router  
  ) { }

  ngOnInit(): void {
    this.registration$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.registrationService.getRegistration(params.get('id')!)        
      )
    )
    this.addFormDataToForm();
  }

  addFormDataToForm(): void {
    this.registration$
        .subscribe(
          res => this.formJsonData = res,
          // res => console.log(res),
          err => console.log(err),
          () => console.log('Now complete.')
        )
  }
}
