# tracingJS

tracking user behavior data

# how to use?

the default policy is the click event default policy, and the web worker`(./assets/worker.js)` collects the policy

```ts
try {
  TracingJS.trace(window);
} catch (e: any) {
  console.error(e);
}
```

implement your own collection strategy

```ts
// strategy props
export interface TracingStrategy {
  collectorStrategy: CollectorStrategy;
  collectingClicksStrategy: CollectingClicksStrategy;
}
```

```ts
try {
  // implement your own collector strategy
  TracingJS.trace(window, {
    collectorStrategy: new CollectorStrategy(),
    collectingClicksStrategy: new CollectingClicksStrategy(),
  });
} catch (e: any) {
  console.error(e);
}
```

# how to bury points

using the `data-event-id`,`data-event-container`,`data-event-title` and `data-` attribute for custom embedding points

```html
<div data-event-id="click_div"></div>
<div data-event-container="div_container"></div>
<a
  href=""
  data-event-id="jump"
  data-event-title="blank_link"
  data-custom="custom_data"
></a>
```


