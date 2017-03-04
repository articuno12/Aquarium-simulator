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
