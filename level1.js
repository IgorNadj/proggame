var _BARREL_LENGTH = 35;
var _GRAVITY = 0.02;

var _canvas;
var _ctx;

var _playerShootAngle;
var _playerPos = {
	x: 20,
	y: 180
};
var _targetPos = {
	x: 540,
	y: 130
}
var _bulletTrail;
var _targetRadius = 30;


var level1 = {
	shoot: function(){
		var barrelSizeXY = _getBarrelSizeXY();
		var barrelEndXY = _getBarrelEndXY();
		var bulletXY = {
			x: barrelEndXY.x,
			y: barrelEndXY.y
		}
		var bulletVelocityXY = {
			x: barrelSizeXY.x / 10,
			y: -barrelSizeXY.y / 10
		}
		while(bulletXY.x > 0 &&
		      bulletXY.x < _canvas.width &&
		      bulletXY.y > 0 &&
		      bulletXY.y < _canvas.height){

				bulletXY = _addXY(bulletXY, bulletVelocityXY);
				bulletVelocityXY.y = bulletVelocityXY.y + _GRAVITY;
				_bulletTrail.push(bulletXY);

				if(_pointToPointDistance(bulletXY,_targetPos) < _targetRadius){
					// hit
					console.log('you did it!');
					break;
				}
		}
		_drawLevel1();
	},

	aimUp: function(){
		_playerShootAngle+=5;
		_drawLevel1();
	},

	aimDown: function(){
		_playerShootAngle-=5;
		_drawLevel1();
	},

	_reset: function(){
		_playerShootAngle = 45;
		_bulletTrail = [];
		_drawLevel1();
	},

	_init: function(canvas){
		_canvas = canvas;
		_ctx = canvas.getContext("2d");
		this._reset();
		_drawLevel1();
	}
}

function _drawLevel1(){
	_ctx.clearRect(0, 0, canvas.width, canvas.height);
	_drawPlayer();
	_drawTarget();
	_drawBulletTrail();
}
function _drawPlayer(){
	// barrel
	var barrelStartXY = _getBarrelStartXY();
	var barrelEndXY = _getBarrelEndXY();
	_ctx.beginPath();
	_ctx.moveTo(barrelStartXY.x, barrelStartXY.y);
	_ctx.lineTo(barrelEndXY.x, barrelEndXY.y);
	_ctx.lineWidth = 5;
	_ctx.strokeStyle = "lightgreen";
	_ctx.stroke();
	// body
	_ctx.fillStyle = "green";
	_ctx.fillRect(_playerPos.x, _playerPos.y, 60, -20);
	_ctx.fillRect(_playerPos.x+20, _playerPos.y-20, 20, -10);
}
function _drawTarget(){
	_ctx.beginPath();
	_ctx.arc(_targetPos.x, _targetPos.y, _targetRadius, 0, 2 * Math.PI, false);
	_ctx.fillStyle = 'red';
	_ctx.fill();
	_ctx.beginPath();
	_ctx.arc(_targetPos.x, _targetPos.y, _targetRadius*0.66, 0, 2 * Math.PI, false);
	_ctx.fillStyle = 'white';
	_ctx.fill();
	_ctx.beginPath();
	_ctx.arc(_targetPos.x, _targetPos.y, _targetRadius*0.33, 0, 2 * Math.PI, false);
	_ctx.fillStyle = 'red';
	_ctx.fill();	
}
function _drawBulletTrail(){
	for(var i in _bulletTrail){
		var xy = _bulletTrail[i];
		_ctx.fillStyle = "orange";
		_ctx.fillRect(xy.x-2, xy.y-2, 4, 4);
	}
}


function _getBarrelStartXY(){
	return {
		x: _playerPos.x+30,
		y: _playerPos.y-25
	}
}
function _getBarrelSizeXY(){
	return _vectorToXY(_playerShootAngle, _BARREL_LENGTH);
}
function _getBarrelEndXY(){
	var barrelStartXY = _getBarrelStartXY();
	var barrelSizeXY = _getBarrelSizeXY();
	return {
		x: barrelStartXY.x + barrelSizeXY.x,
		y: barrelStartXY.y - barrelSizeXY.y // flipped
	}
}

function _pointToPointDistance(a, b){
	var diffX = b.x - a.x
	var diffY = b.y - a.y;
	return Math.sqrt((diffX*diffX)+(diffY*diffY));
}
function _vectorToXY(angle, length){
	return {
		x: Math.cos(_degreesToRads(angle)) * length,
		y: Math.sin(_degreesToRads(angle)) * length
	}
}
function _degreesToRads(degrees){
	return degrees * (Math.PI/180);
}
function _addXY(a, b){
	return {
		x: a.x + b.x,
		y: a.y + b.y
	}
}
