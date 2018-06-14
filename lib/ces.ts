import { ActionEvent } from './context_event/action_event';
import 'event-source-polyfill/src/eventsource.min.js';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/multicast';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/from';

declare var EventSourcePolyfill: any;

export abstract class JWTResponse {
  jwt: string = '';
  authorization: string = '';
}

export abstract class SubscriptionGlob {
  topic_uri: string = '';
  model_uri: string = '';
  controller_uri: string = '';
}

export class CES {
  private url: string = 'http://context-event-service.prestonlee.com';
  private token: JWTResponse = { jwt:'', authorization:'' };
  private eventStreamSubject: Subject<any> = new Subject();
  private events: Observable<any> = Observable.from([]);

  constructor(){}

  initialize(channels: string[]): Promise <Subject<any>>{
    return new Promise((resolve, reject) => {
      this.requestEvents(channels).then((serverEvents: Observable <any>) => {
        this.events.concat(serverEvents)
          .multicast(this.eventStreamSubject)
          .connect();
        resolve(this.eventStreamSubject);
      });
    });
  }
  getEventStream(){
    return this.eventStreamSubject;
  }
  send (event: ActionEvent) {
    return new Promise((resolve, reject) => {
      if(!this.token.jwt){
        this.getJWT().then((token: JWTResponse) => {
          this.sendRequest(event, token).then((response) => {
            resolve(response);
          });
        });
      } else {
        this.sendRequest(event, this.token).then((response) => {
          resolve(response);
        });
      }
    });
  }
  private sendRequest(event: any, token: JWTResponse){
    return new Promise((resolve, reject) => {
      fetch(this.url + '/events', {
        method: 'POST',
        body: JSON.stringify(event),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': token.authorization
        }
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  };
  private getJWT(): Promise <JWTResponse>{
    return new Promise<JWTResponse>((resolve, reject) => {
      fetch(this.url + '/sessions', {
        method: 'POST',
        body: JSON.stringify(event),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then((response: Response) => {
        response.json().then((data: JWTResponse) => {
          this.token = data;
          resolve(data);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }
  private createObservableOfEvents(token: JWTResponse, channels: string[]): Observable <any>{
    return Observable.create( (observer: Observer <any>) => {
      let connection = new EventSourcePolyfill('http://context-event-service.prestonlee.com/stream?channels=' + channels.join(), {
        headers: {
          'Authorization': token.authorization
        }
      });
      connection.onopen = (event: any) => {
        observer.next(event)
      };
      connection.onmessage = (event: any) => {
        observer.next(event)
      };
      connection.onerror = (event: any) => {
        observer.next(event)
      };
      return () => {
        connection.close();
      };
    });
  }
  private requestEvents(channels: string[]): Promise <Observable <any>>{
    return new Promise((resolve, reject) => {
      if(!this.token.jwt){
        this.getJWT().then((token: JWTResponse) => {
          resolve(this.createObservableOfEvents(token, channels));
        });
      } else {
        resolve(this.createObservableOfEvents(this.token, channels));
      }
    });
  }
  private filterSubscription(): Subject <any> {
    return this.eventStreamSubject;
  }
}
export function eventFilter(terms: string[], value: any) {
  if(value.data){
    let event = JSON.parse(value.data);
    for(let term of terms){
      if(event.topic_uri){
        return glob(event.topic_uri, term);
      }
      if(event.model_uri){
        return glob(event.model_uri, term);
      }
      if(event.controller_uri){
        return glob(event.controller_uri, term);
      }
    }
    return false;
  }
  return true;
}

function glob(input:string, pattern:string) {
  let re = new RegExp(pattern.replace(/([.?+^$[\]\\(){}|\/-])/g, "\\$1").replace(/\*/g, '.*'));
  return re.test(input);
}
