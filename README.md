# Context Event Client

Framework-agnostic client library for the [Context Event Service](https://github.com/preston/context-event-service)

##Concepts

All URIs associated with this library represent an identification but not necessarily a location. It is recommended that users of the library spend some time analyzing their application in order to uniquely name section and data model. Consistency is key, but `controller_uri` and `model_uri` are open ended fields.

Field | Description
:--- | :---
`topic_uri` | Represents a semantic web operation or resource. Currently the library supports the [ui_detail_level](http://www.ke.tu-darmstadt.de/ontologies/ui_detail_level.owl) ontology, and it is recommended that you use the concepts provided there.
`controller_uri` | Represents a component or module that is responsible for emitting this event.
`model_uri` | Represents an identifier that corresponds to the specific data model used in your controllers and that relates to this event.
`parameters` | This can be any valid JSON or javascript object that contains additional data you may wish to include with the event.

#### By Example

In the example usage below, you can see how you can structure your app's URIs.

Assuming you want to send an event when a user click 'Login' on your app's login screen:
```js
ces.send({
  topic_uri: "mouse-click",
  controller_uri: "app://controllers/login",
  model_uri: "data://app/user/login",
  parameters: { "username" : "jsmith", "login_attempt_time" : new Date() }
});
```

## Usage

1. Ensure you have types installed for EventSource
  
    ```npm install @types/eventsource --save```
  
2. Install Context Event Client
  
    ```npm install context-event-client --save```

3. Use anywhere:
  
    ```js
    import { CES, ActionEvent } from "context-event-client";
  
    let ces = new CES();
    ces.send({
      topic_uri: "load",
      controller_uri: "protocol://controllers/app",
      model_uri: "data://app/data",
      parameters: {"name" : "CES App" }
    });
    ```
#####Custom CES Endpoint
By default, the library uses the CES public event endpoint. However, It is possible to specify a specific CES url for other instances. It is a simple, optional constructor argument you can include when creating the `CES` object.

```js
import { CES, ActionEvent } from "context-event-client";

let ces = new CES('http://any-CES-url.com/');
```

## Use with Angular
This library comes bundled with an Angular `@Injectible` service for your convenience. Here is an example of using it in your `app.component.ts` and sending an 'Application Started' event to CES.
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
        "protocol://controllers/app", // controller_uri
        "data://app/data", // model_uri
        {"name" : "CES App" } //parameters
    ));
  }
}
```

[NPM Package](https://www.npmjs.com/package/context-event-client) |
[GitHub](https://github.com/preston/context-event-client) |
[Contributors](https://github.com/preston/context-event-client/graphs/contributors)
