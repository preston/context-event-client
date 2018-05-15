import { Subject } from "rxjs";

export class ContextEventService {
  protected connection: EventSource;
  public open: Subject<MessageEvent> = new Subject();
  public message: Subject<MessageEvent> = new Subject();
  public error: Subject<MessageEvent> = new Subject();

  constructor(public url: string) {}

  connect() {
    this.connection = new EventSource(this.url);
    this.connection.onopen = event => {
      // this.open.
	  console.log("OPEN: " + event);
	  // this.open.forEach()
    };
    this.connection.onmessage = event => {
      console.log("MESSAGE: " + event);
    };
    this.connection.onerror = event => {
      console.log("ERROR: " + event);
    };
    this.connection.withCredentials;
  }

  disconnect() {
    this.connection.close();
  }
}
