// the game itself
var game;
// slices (prizes) placed in the wheel
var slices = 22;
// slice_degrees  in degrees
var slice_degrees = parseFloat((360 / slices));
// Compensation factor
var factor = 5;

var colors = [
    0xFF3300, 0x993300, 0x553300, 0x223300, 0xFF5500,
    0xFF7700, 0xFF9922, 0xFF5544, 0xFF3300, 0x993300,
    0x553300, 0x223300, 0xFF5500, 0xFF7700, 0xFF9922,
    0xFF5544, 0xFF3300, 0x993300, 0x553300, 0x223300,
    0xFF5500, 0xFF7700, 0xFF9922, 0xFF5544
];

window.onload = function () {
    // creation of a 458x488 game
    game = new Phaser.Game(458, 458, Phaser.AUTO, "");
    // adding "PlayGame" state
    game.state.add("PlayGame", playGame);
    // launching "PlayGame" state
    game.state.start("PlayGame");
}

var playGame = function (game) { };


 
playGame.prototype = {
    preload: function () {
        //game.load.image("pin", "pin.png");  
    },
    create: function () {
        game.stage.backgroundColor = "#000000";
        this.createSlices()
        // pin = game.add.sprite(game.width / 2, game.width / 2, "pin");
        // pin.scale.setTo(0.5);
        // pin.anchor.set(0.5);
        // pin.game.input.onDown.add(this.spin, this);
        // console.log(pin);
        canSpin = true;
    },
    update: function(){
        canSpin = true;
    },
    createSlices() {
        var i = 0;
        var sliceCounter = 0;
        var sliceEnd = 0;
        var sliceStart = slice_degrees;
        var color = 0xFF3300;
        var slicesArray = [];
        
        for (i; i < slices; i++) {
            var slice = game.add.graphics(game.world.centerX, game.world.centerY);
            slice.lineStyle(0);
            slice.beginFill(colors[i]);
            slice.arc(
                0,
                0,
                215,
                game.math.degToRad(sliceStart + factor),
                game.math.degToRad(sliceEnd),
                true
            );
            slice.endFill();
            slice.inputEnabled = true;
            //slice.game.input.onDown.add(this.callSlice, this);
            sliceStart += slice_degrees
            sliceEnd += slice_degrees
            slicesArray.push(slice);
        }    
    },

    spin() {
        if(canSpin){  
       
            // the wheel will spin round from 2 to 4 times. This is just coreography
            var rounds = game.rnd.between(2, 4);
            // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
            var degrees = game.rnd.between(0, 360);
            // before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
            prize = slices - 1 - Math.floor(degrees / (360 / slices));
            // now the wheel cannot spin because it's already spinning
            canSpin = false;
            // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
            // the quadratic easing will simulate friction
            var spinTween = game.add.tween(pin).to({
                 angle: 360 * rounds + degrees
            }, 3000, Phaser.Easing.Quadratic.Out, true);
            // once the tween is completed, call winPrize function
            //spinTween.onComplete.add(this.winPrize, this);
       }
    },
    callSlice(e){
        console.log("callSlice");
    }

}