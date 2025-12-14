import { NgModule } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';



@NgModule({
    imports:[
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatRadioModule,
    ],
    declarations:[

    ],
    exports:[
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatRadioModule,
    ]
})
export class AngularMaterialModule{

}