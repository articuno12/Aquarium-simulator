var Fish_list = {} ;
var Fish_no = 0 ;
var FishTextureList = [
    "models/images/fish5.png",
    "models/images/fish4.png",
    "models/images/fish0.png",
    "models/images/fish1.png",
    "models/images/fish2.png",
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
        boundingVal : 3.597651 ,
    } ;

    Fish_no += 1 ;
    this.babyScale = this.babyScale / this.boundingVal ;
    this.currentScale = this.babyScale ;
    this.adultScale = this.adultScale / this.boundingVal ;
    this.scale = $V([this.currentScale,this.currentScale,this.currentScale]) ;

    loadTexture(fish.name, FishTextureList[ Math.floor(Math.random() * FishTextureList.length) ] );
ModelLoader.loadModel("models/Fish/Fish.obj","models/Fish/Fish.mtl",fish.name,function(model){Renderer.models[fish.name] = model;} );
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
      boundingVal : 3.597651 ,
    }
    Fish_no+=1;
    this.babyScale = this.babyScale / this.boundingVal ;
    this.currentScale = this.babyScale ;
    this.adultScale = this.adultScale / this.boundingVal ;
    this.scale = $V([this.currentScale,this.currentScale,this.currentScale]) ;

    loadTexture(marijuana.name, FishTextureList[ Math.floor(Math.random() * FishTextureList.length) ] );
ModelLoader.loadModel("models/marijuana/marijuana.obj","models/marijuana/marijuana.mtl",marijuana.name,function(model){Renderer.models[marijuana.name] = model;} );
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
      boundingVal : 3.597651 ,
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
    tuna = NewFish("tuna") ;
    Fish_list[tuna].center = $V([getArbitrary( -(AquariumBox.width - Fish_list[tuna].currentScale),(AquariumBox.width - Fish_list[tuna].currentScale) ) ,
                        getArbitrary( -(AquariumBox.width - Fish_list[tuna].currentScale),(AquariumBox.width - Fish_list[tuna].currentScale) ) ,
                        getArbitrary( -(AquariumBox.width - Fish_list[tuna].currentScale),(AquariumBox.width - Fish_list[tuna].currentScale) )
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
        fish.center = fish.center.add(fish.direction.multiply(fish.speed)) ;
        // update fish in the fishlist
        Fish_list[fishname] = fish ;
    }
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
    scale : $V([12,12,12]) ,
} ;
