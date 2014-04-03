# Emitter sniffer
hook to the emit function of an event emitter to print all fired events activity

### install
```
	npm install emitter-sniffer
```
### Example
```
var EventEmitter = require('events').EventEmitter
var emitterSniffer = require('emitter-sniffer')
var emitter = new EventEmitter()

var sniffer = emitterSniffer.attach(emitter)

emitter.emit('someevent', 'data') // will now print { "0": "someevent", "1": "data" }

sniffer.detach()

emitter.emit('someevent', 'data') // prints nothing

emitterSniffer.attach(emitter, function(type) {
	console.log(type)
})

emitter.emit('someevent', 'data') // will now print "someevent"

```