let events = []
let time = null
const MAX_CACHE_LEN = 5;
const MAX_WAIT_TIME = 5000;


self.onmessage = function (e) {
  self.clearTimeout(time)
  if (e.data && e.data.type === 'event') {
    events.push(e.data)
  }
  if (events.length > MAX_CACHE_LEN) {
    send()
  } else {
    time = self.setTimeout(() => {
      send()
    }, MAX_WAIT_TIME)
  }
}


function send() {
  if (events.length) {
    const sendEvents = events.slice(0, MAX_CACHE_LEN);
    events = events.slice(MAX_CACHE_LEN);
    self.fetch("http://localhost:8080/collect", {
        credentials: "include",
        method: "post", body: JSON.stringify(sendEvents)
      }
    ).then()
  }
}
