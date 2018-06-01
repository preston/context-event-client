# context-event-client

Framework-agnistic client library for the [Context Event Service](https://github.com/preston/context-event-client)

## Usage

1. Ensure you have types installed for EventSource

	```npm install @types/eventsource --save```

2. Use anywhere:

	```js
	import { CES, ActionEvent } from "context-event-client";

	let ces = new CES();
	ces.send({
      topic_uri: "load",
      controller_uri: "knartwork://controllers/app",
      model_uri: "file://filename.xml/knowledgeDocument",
      parameters: {"app" : "Knartwork"}
    });
	```

## Use with Angular
This library comes bundled with an Angular `@Injectible` service for your convenience.
```typescript
import { Component, OnInit } from '@angular/core';
import { CESService, ActionEvent } from "context-event-client";
@Component({
  selector: 'app',
  template: '<app></app>',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private ces: CESService) {
    console.log("AppComponent has been initialized to establish router element.");
  }
  ngOnInit(){
    this.ces.send(new ActionEvent(
        "load", // topic_uri
        "knartwork://controllers/home", // controller_uri
        "file://knowledgeartifact.xml/knowledgeDocument", // model_uri
        {"url" : this.remoteUrl } //parameters
    ));
  }
}
```
