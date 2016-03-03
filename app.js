var level;
var api;

function loadLevel(num){
	level = _loadLevelData(num);
	api = _getLevelAPI(level);
	_displayAPI(api);
	_initLevel(level);
}


function run(){
	var code = _getUserCode();
	level._reset();
	eval(code);
}






function _loadLevelData(num){
	return window['level'+num];
}
function _getLevelAPI(level){
	return Object.keys(level);
}
function _displayAPI(api){
	var str = _getAPIAsHumanString(api);
	document.getElementById('level-api').innerText = str;
}
function _getAPIAsHumanString(api){
	var str = '';
	for(var i in api){
		var functionName = api[i];
		if(functionName.substring(0,1) == '_') continue; // private methods denoted by underscore
		str += 'level.'+functionName+'()\n';
	}
	return str;
}
function _getUserCode(){
	return document.getElementById('editor').value;
}
function _initLevel(level){
	var canvas = document.getElementById("canvas");
	level._init(canvas);
}


window.onload = function(){
	loadLevel(1);
}
