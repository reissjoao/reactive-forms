import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(private FormBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.userForm = this.FormBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    });
  }

  onSubmit() {
    const userData = this.userForm.value;
    this.userService.createUser(userData).subscribe((response) => {
      console.log('User created:', response);
      alert("Usuário registrado!");
      this.userForm.reset();
    });
  }

}
