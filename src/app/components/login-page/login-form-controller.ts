import { inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

export class LoginFormController{
    loginForm! : FormGroup;

    private _fb = inject(FormBuilder);

    constructor(){
        this.createLoginForm();
    }

    private createLoginForm(){
        this.loginForm = this._fb.group({
            
        })
    }
}