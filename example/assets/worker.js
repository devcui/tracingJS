var events = []
var time = null
var MAX_CACHE_LEN = 5;
var MAX_WAIT_TIME = 5000;
var token = undefined

self.onmessage = function (e) {
  self.clearTimeout(time)
  var data
  var body
  if (!e.data || !e.data.data) return
  if (e.data && e.data.data) {
    data = e.data
    body = e.data.data
  }
  if (data.token) {
    token = data.token
  }
  if (body.type === 'event') {
    events.push(body)
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
    self.fetch("http://localhost:8080/tracing/api/v1/click/collect", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + ' ' + token
        },
        credentials: "include",
        method: "post",
        body: JSON.stringify(sendEvents)
      }
    ).then()
  }
}
