import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {AuthService} from "../../../../core/services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  errorMessage?: string

  sub$ = new Subject()

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return

    this.authService.signIn(this.form.value)
      .pipe(takeUntil(this.sub$))
      .subscribe( {
        next: res => {
          if(res) {
            this.router.navigate(['/'])
          }
        },
        error: ({error}) => {
          console.log(error)
          this.errorMessage = error.error.message
        }
      })
  }

  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }

}
