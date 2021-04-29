import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { UserService } from "./../services/user.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private user: UserService, private router: Router) {}

  ngOnInit(): void {
      this.initForm();
  }

  initForm()
  {
      this.loginForm = this.formBuilder.group({
          login: '',
      });
  }

  onSubmit()
  {
    this.user.setUsername(this.loginForm.value["login"]);
    this.router.navigate(['chat']);
  }

}
