import {Injectable} from "@angular/core";
import {ActionEvent} from "./context_event/action_event";
import {CES} from "./ces";
@Injectable()
export class CESService {
	CES: CES = new CES();
	send(event: ActionEvent){
		this.CES.send(event);
	}
}
