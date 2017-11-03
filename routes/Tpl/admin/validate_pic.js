var PW = require('png-word');
var pngword = new PW(PW.GRAY);
var Fiber = require('fibers');
module.exports.run = function(f,pg,mo,redis,pg2,db){
	var fiber = Fiber.current;
	var rw = RandomWord('abcdefghijklmnopqrstuvwxyz1234567890');
	f.session.vnum = random(4);
	var word = f.session.vnum;
	
	pngword.createPNG(word, function(word) {
		f._isRander = word;
		fiber.run();
	});
	Fiber.yield();
	return f;
}

function RandomWord(chars){
    if(!(this instanceof RandomWord)){
        return new RandomWord(chars);
    }
    this._chars = "";
    if(chars){
        add(chars);
    }
}

function add(chars){
	this._chars += chars;
    return this;
}

function random(size){
	var len = this._chars.length;
    if(len === 0){
        throw new Error('no chars,please use add(chars)');
    }
    var word = "";
    for(var i=0;i<size;i++){
        var cpo = parseInt(Math.random()*len);
        word += this._chars.charAt(cpo);
    }
    return word;
}

