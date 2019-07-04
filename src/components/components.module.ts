import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicModule } from "ionic-angular";
import { ChatwithusListComponent } from './chatwithus-list/chatwithus-list.component';
import { ChatwithusFormComponent } from './chatwithus-form/chatwithus-form.component';
import { ChatwithusItemComponent } from './chatwithus-item/chatwithus-item.component';

@NgModule({
	declarations: [ ChatwithusListComponent, ChatwithusFormComponent, ChatwithusItemComponent ],
	imports: [ IonicModule ],
	exports: [ ChatwithusListComponent, ChatwithusFormComponent, ChatwithusItemComponent ],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {}
