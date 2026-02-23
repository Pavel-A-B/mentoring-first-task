import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../interfaces/users.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  imports: [],
})
export class UserCardComponent {
  @Input()
  user!: User;

  @Output()
  deleteUser = new EventEmitter<number>();

  @Output()
  editUser = new EventEmitter<User>();

  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  openDialogEditUser(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.user },
    });
    dialogRef.afterClosed().subscribe((editResult: User) => {
      if (editResult) {
        this.editUser.emit(editResult);
        this.snackBar.open('пользователь успешно отредактирован', 'ок', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('редактривание отменено', 'ок', {
          duration: 3000,
        });
      }
    });
  }
  onDeleteUser(userID: number) {
    this.deleteUser.emit(userID);

  }

  openDialogDeleteUser(): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: { user: this.user },
    });
    dialogRef.afterClosed().subscribe((userId: number) => {
      if (userId) {
        this.deleteUser.emit(userId);
        this.snackBar.open('пользователь успешно удален', 'ок', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('удаление отменено', 'ок', {
          duration: 3000,
        });
      }
    });
  }
}
