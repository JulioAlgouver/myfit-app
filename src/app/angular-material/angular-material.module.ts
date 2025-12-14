import { NgModule } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
    imports:[
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatRadioModule,
        MatDatepickerModule,
        MatCheckboxModule,        
    ],
    providers:[
        provideNativeDateAdapter(),
    ],
    declarations:[

    ],
    exports:[
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatRadioModule,
        MatDatepickerModule,
        MatCheckboxModule,
    ]
})
export class AngularMaterialModule{

}