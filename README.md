# NgxCompareObject [![npm version](https://badge.fury.io/js/ngx-compare-object.svg)](https://badge.fury.io/js/ngx-cam-shoot) [![Build Status](https://api.travis-ci.com/rzodev/ngx-compare-object.svg?branch=main)](https://app.travis-ci.com/github/rzodev/ngx-compare-object) [![Support](https://img.shields.io/badge/Support-Angular%2018%2B-blue.svg?style=flat-square)]() [![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/RzoDev/ngx-compare-object/blob/main/LICENSE.md)

An Angular Class tool to compare an initial object with another modified version of itself. 

## Usage

1. Install via npm

`npm i ngx-compare-object`

2. Import

```typescript
import { NgxCompareObject } from 'ngx-compare-object';
```

3. Usage example

```html
<form [formGroup]="form">
   <div>
      <h2>Edit user</h2>
   </div>
   <div>
      <label>First name</label>
      <input type="text" formControlName="firtname">
   </div>
   <div>
      <label>Last name</label>
      <input type="text" formControlName="lastname">
   </div>
   <div>
      <label>Email</label>
      <input type="text" formControlName="email">
   </div>
   <div>
      <button type="button" [disabled]="!hasChanges()" (click)="restore()">Cancel</button>
      <button type="button"  [disabled]="!hasChanges()" (click)="submitUser()">Submit</button>
   </div>
</form>
```

```typescript
private fb = inject(FormBuilder);
private route = inject(ActivatedRoute);

private co!: CompareObject;
form: FormGroup;
private @Input() id: string;

ngOnInit(){
   if(this.id){
      this.getInfo(this.id);
   }
}

private getInfo(id: string){
   this.http.get('https://example.com/users/'+id)
   .subcribe((response)=>{
      this.initForm(response.user);
   })
}

private initForm(user: IUser){
   this.form = this.fb.group({
    firstname: [user.firstname, Validators.required],
    lastname: [user.lastname, Validators.required],
    email: [user.email, Validators.required]
   });

   const originalForm = this.form.value();

   this.co = new CompareObject(originalForm);
}

hasChanges(): boolean{
   const form = this.form.value();
   return !this.co.isSame(form);
}
private restore(){
   this.form.reset(this.co.getOriginal());
}

submitUser(){
   if(this.hasChanges()){
      //do something
   }
}
cancelSubmit(){
   this.restore();
}
```
