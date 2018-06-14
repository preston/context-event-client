import {Injectable} from "@angular/core";
import {ActionEvent} from "./context_event/action_event";
import {CES} from "./ces";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
@Injectable()
export class CESService {
  CES: CES = new CES();
  send(event: ActionEvent){
    this.CES.send(event);
  }
  initialize(channels: string[]): Promise <Subject<any>>{
    return new Promise((resolve, reject) => {
      this.CES.initialize(channels).then((obsEvents) => {
        resolve(obsEvents);
      });
    });
  }
  getEventStream(){
    return this.CES.getEventStream();
  }
}
