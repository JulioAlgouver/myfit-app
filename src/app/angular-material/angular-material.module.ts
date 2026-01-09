import { NgModule } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
    imports:[
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatRadioModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatProgressBarModule,
        MatDividerModule,
        MatSelectModule,
             
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
        MatDialogModule,
        BrowserAnimationsModule,  
        MatProgressBarModule,
        MatDividerModule,
        MatSelectModule,
    ]
})
export class AngularMaterialModule{

}