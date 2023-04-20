export class Person {
  name?: string;

  constructor() {
    Promise.resolve("1").then((a) => {
      console.log(a);
    });

    Array.from([1, 2, 3]).forEach((a) => {
      console.log(a);
    });
    Proxy.revocable({}, {});
  }
}
