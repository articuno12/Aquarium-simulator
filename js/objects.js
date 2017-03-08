var HumanControl = false;
var focused_fish = "" ;
var Fish_list = {} ;
var Fish_no = 0 ;
var EggCount =0 ;
var CountFallingObjects = 0;
var ListOfFallingObjects ={};
var FoodCount = 0 ;
var FishTextureList = [
		"models/images/fish5.png",
		"models/images/fish4.png",
		"models/images/fish0.png",
		"models/images/fish1.png",

		"models/images/fish3.png",
]
function getArbitrary(max, min)  {  return Math.random() * (min - max) + max; }
function NewFish(fish_type)
{
		if(fish_type=="Fish")
		{
				var fish = {
						type : "Fish" ,
						name : "fish" + Fish_no ,
						isAlive : true ,
						isAdult : false ,
						age : Date.now() ,
						babyScale : 0.75 ,
						currentScale : 1 ,
						adultScale : 3 ,
						speed : 0.02 ,
						rotateprobab : 0.5 ,
						isRotating : false ,
						rotateAngle : 0 ,
						movetime : 0 ,
						moveStartTime : 0 ,
						scale : $V([1,1,1]),
						center : $V([0,0,0]),
						direction : $V([1,0,0]),
						up : $V([0,1,0]) ,
						boundingVal : 11.8622 ,
				} ;

				Fish_no += 1 ;
				this.babyScale = this.babyScale / this.boundingVal ;
				this.currentScale = this.babyScale ;
				this.adultScale = this.adultScale / this.boundingVal ;
				this.scale = $V([this.currentScale,this.currentScale,this.currentScale]) ;

				loadTexture(fish.name, "models/images/whale.png" );
				ModelLoader.loadModel("models/Whale/Whale.obj","models/Whale/Whale.mtl",fish.name,function(model){Renderer.models[fish.name] = model;} );
				Fish_list[fish.name] = fish ;
				return fish.name ;
		}
		else if (fish_type == "marijuana")
		{
				var marijuana = {
						type : "marijuana" ,
						name : "fish" + Fish_no ,
						isAdult : false ,
						isAlive : true ,
						age : Date.now() ,
						babyScale : 0.75 ,
						currentScale : 1 ,
						adultScale : 3,
						speed : 0.02 ,
						rotateprobab : 0.5 ,
						isRotating : false ,
						rotateAngle : 0 ,
						movetime : 0 ,
						moveStartTime : 0 ,
						scale : $V([1,1,1]),
						center : $V([0,0,0]),
						up : $V([0,1,0]) ,
						direction : $V([1,0,0]),
						boundingVal : 5.2537 ,
				}
				Fish_no+=1;
				this.babyScale = this.babyScale / this.boundingVal ;
				this.currentScale = this.babyScale ;
				this.adultScale = this.adultScale / this.boundingVal ;
				this.scale = $V([this.currentScale,this.currentScale,this.currentScale]) ;

				loadTexture(marijuana.name, FishTextureList[ Math.floor(Math.random() * FishTextureList.length) ] );
				ModelLoader.loadModel("models/marijuana/rbtrout.obj","models/marijuana/rbtrout.mtl",marijuana.name,function(model){Renderer.models[marijuana.name] = model;} );
				Fish_list[marijuana.name] = marijuana ;
				return marijuana.name ;
		}
		else if (fish_type == "tuna")
		{
				var tuna = {
						type : "tuna" ,
						name : "fish" + Fish_no ,
						isAdult : false ,
						isAlive : true ,
						age : Date.now() ,
						babyScale : 0.75 ,
						currentScale : 1 ,
						adultScale : 3,
						speed : 0.02 ,
						rotateprobab : 0.5 ,
						isRotating : false ,
						rotateAngle : 0 ,
						movetime : 0 ,
						moveStartTime : 0 ,
						scale : $V([1,1,1]),
						center : $V([0,0,0]),
						up : $V([0,1,0]) ,
						direction : $V([1,0,0]),
						boundingVal : 2.540946 ,
				}
				Fish_no+=1;
				this.babyScale = this.babyScale / this.boundingVal ;
				this.currentScale = this.babyScale ;
				this.adultScale = this.adultScale / this.boundingVal ;
				this.scale = $V([this.currentScale,this.currentScale,this.currentScale]) ;

				loadTexture(tuna.name, FishTextureList[ Math.floor(Math.random() * FishTextureList.length) ] );
				ModelLoader.loadModel("models/tuna/tuna.obj","models/tuna/tuna.mtl",tuna.name,function(model){Renderer.models[tuna.name] = model;} );
				Fish_list[tuna.name] = tuna ;
				return tuna.name ;
		}
}
function init_fish()
{
		//dummy fish to be used as camera in free viewport
		var dummyCamera = {
				center : $V([0,0,0]),
				direction : $V([1,0,0]) ,
				up : $V([0,1,0]) ,
				speed : 0.1 ,
				currentScale : 1 ,
		} ;

		Fish_list["dummy"] = dummyCamera ;
		tuna = NewFish("tuna") ;
		Fish_list[tuna].center = $V([getArbitrary( -(AquariumBox.width - Fish_list[tuna].currentScale),(AquariumBox.width - Fish_list[tuna].currentScale) ) ,
						getArbitrary( -(AquariumBox.width - Fish_list[tuna].currentScale),(AquariumBox.width - Fish_list[tuna].currentScale) ) ,
						getArbitrary( -(AquariumBox.width - Fish_list[tuna].currentScale),(AquariumBox.width - Fish_list[tuna].currentScale) )
		]) ;
		Fish_list[tuna].speed = 0.06;
		tuna = NewFish("tuna") ;
		Fish_list[tuna].center = $V([getArbitrary( -(AquariumBox.width - Fish_list[tuna].currentScale),(AquariumBox.width - Fish_list[tuna].currentScale) ) ,
						getArbitrary( -(AquariumBox.width - Fish_list[tuna].currentScale),(AquariumBox.width - Fish_list[tuna].currentScale) ) ,
						getArbitrary( -(AquariumBox.width - Fish_list[tuna].currentScale),(AquariumBox.width - Fish_list[tuna].currentScale) )
		]) ;
		Fish_list[tuna].speed = 0.06;
		marijuana = NewFish("marijuana") ;
		Fish_list[marijuana].center = $V([getArbitrary( -(AquariumBox.width - Fish_list[marijuana].currentScale),(AquariumBox.width - Fish_list[marijuana].currentScale) ) ,
						getArbitrary( -(AquariumBox.width - Fish_list[marijuana].currentScale),(AquariumBox.width - Fish_list[marijuana].currentScale) ) ,
						getArbitrary( -(AquariumBox.width - Fish_list[marijuana].currentScale),(AquariumBox.width - Fish_list[marijuana].currentScale) )
		]) ;
		marijuana = NewFish("marijuana") ;
		Fish_list[marijuana].center = $V([getArbitrary( -(AquariumBox.width - Fish_list[marijuana].currentScale),(AquariumBox.width - Fish_list[marijuana].currentScale) ) ,
						getArbitrary( -(AquariumBox.width - Fish_list[marijuana].currentScale),(AquariumBox.width - Fish_list[marijuana].currentScale) ) ,
						getArbitrary( -(AquariumBox.width - Fish_list[marijuana].currentScale),(AquariumBox.width - Fish_list[marijuana].currentScale) )
		]) ;
		fish = NewFish("Fish") ;
		Fish_list[fish].center = $V([getArbitrary( -(AquariumBox.width - Fish_list[fish].currentScale),(AquariumBox.width - Fish_list[fish].currentScale) ) ,
						getArbitrary( -(AquariumBox.width - Fish_list[fish].currentScale),(AquariumBox.width - Fish_list[fish].currentScale) ) ,
						getArbitrary( -(AquariumBox.width - Fish_list[fish].currentScale),(AquariumBox.width - Fish_list[fish].currentScale) )
		]) ;
}

function Move_fish()
{
		for(var fishname in Fish_list)
		{
				if(fishname == "dummy") continue ;
				if(HumanControl && fishname == focused_fish) continue ;
				var fish = Fish_list[fishname] ;
				if((Date.now() - fish.moveStartTime) > (fish.movetime*1000))
				{
						if(getArbitrary(0,1) <= fish.rotateprobab)
						{
								fish.isRotating = true ;
								fish.rotateAngle  =  getArbitrary(-0.6,0.6) * Math.PI/180.0;
								fish.moveStartTime = Date.now() ;
								fish.movetime = getArbitrary(4,8) ;
						}
						else
						{
								fish.isRotating = false ;
								fish.moveStartTime = Date.now() ;
								fish.movetime = getArbitrary(0.75,3) ;
						}
				}
				if(fish.isRotating)
				{
						fish.direction = Matrix.Rotation(fish.rotateAngle,fish.up).x(fish.direction);
						fish.direction=fish.direction.toUnitVector() ;
				}
				if( CheckFishCollision(fish) || CheckBoxCollision(fish) )
				{
						//Rotate at twice the noraml speed
						fish.direction = Matrix.Rotation(2*fish.rotateAngle,fish.up).x(fish.direction);
						fish.direction=fish.direction.toUnitVector() ;
				}
				else
				{
						fish.center = fish.center.add(fish.direction.multiply(fish.speed)) ;
				}
				// update fish in the fishlist
				Fish_list[fishname] = fish ;
		}
}

function ControlFish(Move)
{
		if(!focused_fish in Fish_list)
		{
				HumanControl = false;
				return;
		}
		f = Fish_list[focused_fish];
		if(Move == 1)
		{
				// Rotate right
				f.direction = Matrix.Rotation(-6*Math.PI/180,f.up).x(f.direction);
				f.direction=f.direction.toUnitVector() ;
		}
		else if(Move == 2)
		{
				// Rotate left
				f.direction = Matrix.Rotation(6*Math.PI/180,f.up).x(f.direction).toUnitVector() ;
		}
		else if(Move == 3)
		{
				// Move Foward
				f.center = f.center.add(f.direction.multiply(6*f.speed)) ;
		}
		else if(Move == 4)
		{
				// Move back
				if(f!="dummy")
						f.center = f.center.subtract(f.direction.multiply(5*f.speed)) ;
		}
		else if(Move == 5)
		{
				// Rotate Up
				var normal = f.direction.cross(f.up);
				f.up = Matrix.Rotation(6*Math.PI/180,normal.toUnitVector()).x(f.up).toUnitVector() ;
				f.direction = Matrix.Rotation(6*Math.PI/180,normal.toUnitVector()).x(f.direction).toUnitVector() ;
		}
		else if(Move == 6)
		{
				// Rotate Down
				var normal = f.direction.cross(f.up).toUnitVector() ;
				f.up = Matrix.Rotation(-6*Math.PI/180,normal).x(f.up).toUnitVector() ;
				f.direction = Matrix.Rotation(-6*Math.PI/180,normal).x(f.direction).toUnitVector() ;
		}
		Fish_list[focused_fish] = f;
}

function Kill()
{
		if(focused_fish in Fish_list)   delete Fish_list[focused_fish] ;
}
//*******AQUARIUM BOX********//

var AquariumBox = {
		init:function()
		{
				loadTexture("AquariumBox", "models/AquariumBox/skybox.png");
				ModelLoader.loadModel( 	"models/AquariumBox/skybox.obj", "models/AquariumBox/skybox.mtl", "AquariumBox",function(model){Renderer.models['AquariumBox'] = model;} );
		} ,
		center : $V([0,0,0]),
		height : 12 ,
		width : 12 ,
		length : 12 ,
		scale : $V([15,15,15]) ,
} ;



function CheckBoxCollision(fish)
{
		var l = fish.center.add(fish.direction.multiply(fish.speed)) ;
		var dif = l.subtract(AquariumBox.center) ;
		if(Math.abs(dif.dot($V([0,1,0])) >= AquariumBox.height/1.5) ||
						Math.abs(dif.dot($V([1,0,0])) >= AquariumBox.length/1.5) ||
						Math.abs(dif.dot($V([0,0,1])) >= AquariumBox.width/1.5) )
				return true ;
		return false ;

}
function CheckFishCollision(fish)
{
		var l = fish.center.add(fish.direction.multiply(fish.speed)) ;
		for(var f in Fish_list) if(f != fish.name && f!="dummy")
		{
				f2 = Fish_list[f] ;
				var Dif = l.subtract(f2.center) ;
				if( Dif.modulus() <= f2.currentScale + fish.currentScale )
						return true ;
		}
		return false ;
}
function NewEgg()
{
    if(!(focused_fish in Fish_list)) return ;
    parent = Fish_list[focused_fish];
    var egg = {
        type1 : "egg" ,
        type : parent.type ,
        name : "FallingObject" + CountFallingObjects ,
        age : Date.now() ,
        boundingVal : 1.041994 ,
				speed : 0.06 ,
        currentScale : 50 ,
				center : parent.center,
        scale : $V([1,1,1]),
        up : $V([0,1,0]) ,
        direction : $V([0,-1,0]),
    }
    CountFallingObjects += 1 ;
    EggCount++ ;

    this.scale = $V([this.currentScale,this.currentScale,this.currentScale]) ;

    loadTexture(egg.name, "models/images/egg_shell.png" );
    ModelLoader.loadModel("models/Egg/Egg.obj","models/Egg/Egg.mtl",egg.name,function(model){Renderer.models[egg.name] = model;} );
    ListOfFallingObjects[egg.name] = egg ;
    console.log("Egg Created") ;
}
function MoveFallingObjects()
{
    for(var obname in ListOfFallingObjects)
    {
        obj = ListOfFallingObjects[obname] ;
        // hits the ground
        if(Math.abs(obj.center.elements[1]) >= AquariumBox.height)
        {
            if(obj.type1 == "egg" && Date.now() - obj.age >= 9000)
            {
                fish = NewFish(obj.type) ;
								console.log("move falling");
                Fish_list[fish].center = obj.center;
                delete ListOfFallingObjects[obj.name] ;
                EggCount-- ;
            }
        }
        else  obj.center = obj.center.add(obj.direction.multiply(obj.speed)) ;
    }
}

//*****mountain****//
var Mountain = {
		init:function()
		{
				loadTexture("Mountain", "models/images/mountain.png");
				ModelLoader.loadModel( 	"models/mountain/mountain.obj", "models/mountain/mountain.mtl", "Mountain",function(model){
						console.log("m made") ;
						Renderer.models['Mountain'] = model;} );
		} ,
		center : $V([-4.5,-13.5,0]),
		height : 4 ,
		width : 4 ,
		length : 8 ,
		scale : $V([5,5,5]) ,
		boundingVal : 1.646952 ,
};

//*****WEED*//

var WEED = {
		init:function()
		{
				loadTexture("Weed", "models/images/weed.png");
				ModelLoader.loadModel( 	"models/Weed/marijuana.obj", "models/Weed/marijuana.mtl", "Weed",function(model){
						console.log("made");
						Renderer.models['Weed'] = model;} );
		} ,
		center : $V([0,-13.5,0]),
		height : 4 ,
		width : 4 ,
		length : 8 ,
		scale : $V([4,4,4]) ,
		boundingVal : 1.646952 ,
};

//****PEBBLES

var Pebbles = {
		init:function()
		{
				loadTexture("Pebbles", "models/images/pebble.png");
				ModelLoader.loadModel( 	"models/AquariumBox/skybox.obj", "models/AquariumBox/skybox.mtl", "Pebbles",function(model){Renderer.models['Pebbles'] = model;} );
		} ,
		center : $V([0,-14.5,0]),
		height : 15 ,
		width : 2 ,
		length : 15 ,
		scale : $V([15,2,15]) ,
} ;
