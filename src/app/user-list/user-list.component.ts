import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  users: User[] = [];
  userForm: FormGroup;  
  idEditFormOpen: boolean = false;
  editingUser: User | null = null;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(() => {
      this.users = this.users.filter((u) => u.id !== user.id);
    });
  }

  openEditForm() {
    this.idEditFormOpen = !this.idEditFormOpen;
  }

  editUser(user: User) {
    this.editingUser = user;
    this.userForm.patchValue({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      username: user.username
    });
    this.idEditFormOpen = true;
  }

  updateUser() {
    if (this.editingUser) {
      const updatedUser: User = { ...this.editingUser, ...this.userForm.value };
      this.userService.updateUser(updatedUser).subscribe((response) => {
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
          this.editingUser = updatedUser;
        }  
        this.idEditFormOpen = false;
      });
    }
  }  
}