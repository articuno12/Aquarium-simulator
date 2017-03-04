var Renderer = {
	canvas: {}, gl: {},   // canvas being drawn to and WebGL context
	shaderProgram:  {},   // shader program handle
	quadBuffer:     {},   // buffer to hold position vertices for quad
	models:         {},   // list of loaded models
	textures:       {},   // list of loaded textures

	// used for timing
	time: 0, startTime: Date.now(),

	diamondLocs: [],

	diamondRots: [],

	// size of window
	windowWidth: 0.0, windowHeight: 0.0,

	/** Called when canvas is created */
	init: function() {
		for(var i = 5; i < 100; i++){
			var x = Math.random() * i, y = Math.random() * i, z = -7;
			if(Math.random() > 0.5)
				x = -x;
			if(Math.random() < 0.5)
				y = -y;
			this.diamondLocs.push([x, y, z]);
			this.diamondRots.push([Math.random(), Math.random(), Math.random(), Math.random()]);
		}


		this.initGL(canvas);

		// only continue if WebGL is available
		if (gl) {
			// set window resize listener; intial call sets canvas size and gl viewport
			this.onWindowResize();
			window.addEventListener('resize', this.onWindowResize, false);

			Sandbox.init();
			ModelRenderer.init();
	  	}


		loadTexture("diamond", "models/diamond/diamond.png");
		ModelLoader.loadModel(
			"models/diamond/diamond.obj", "models/diamond/diamond.mtl", "diamond",
			function(model){
				Renderer.models['diamond'] = model;
			}
		);

		//loading aquarium textures
		AquariumBox.init();
		init_fish();
		Mountain.init();
	},

	/** What happens when window gets resized */
	onWindowResize: function(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		if(gl)
			gl.viewport(0, 0, canvas.width, canvas.height);

			console.log(canvas.width) ;
		console.log(canvas.height) ;
	},

	/**
	  * Initializes WebGL
	  * After this, if 'gl' is null then it means that WebGl wasn't properly initialized.
	  */
	initGL: function() {
		try {
			gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		}catch(error) {
			// alert user if gl isn't supported
			alert("Couldnt initialize webgl !");
		}

		if (gl) {
			gl.clearColor(0.0, 0.0, 0.0, 1.0);	// Clear to black, fully opaque
			gl.clearDepth(1.0);					// Clear everything
		}
	},

	/** Creates a shader of the given type with the given string, returns shader object on success, null otherwise */
	createShader: function(src, type){
		var shader = gl.createShader(type);
		gl.shaderSource(shader, src);
		gl.compileShader(shader);

		if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
			alert(gl.getShaderInfoLog(shader));
			return null;
		} else
			return shader;
	},

	/** Renders the scene */
	render: function() {
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		if(Camera.FishHeadViewOn) Camera.Fishheadview() ;
		else if(Camera.FishEyeViewOn) Camera.FishEyeView() ;
		wat += 0.05;

		var lookAt = Camera.LookAt ;
		// console.log("got lookat matrix") ;
		var rads = wat * Math.PI / 180.0;

		for(var i = 0; i < this.diamondLocs.length; i++){
			this.diamondLocs[i][1] -= 0.025;
			if(this.diamondLocs[i][1] < -10.0)
				this.diamondLocs[i][1] = 10.0;

			var m = lookAt.x(Matrix.Translation($V(this.diamondLocs[i])).ensure4x4());
			var rot = this.diamondRots[i];
			m = m.x(Matrix.Rotation(rot[0], $V([rot[1], rot[2], rot[3]])).ensure4x4());

			rot[0] += (Math.random() / 100.0) + 0.05;

			ModelRenderer.renderModel(Renderer.models['diamond'], m);
		}
		//Render the FISHES
		Move_fish() ;
		for(var f in Fish_list)
		{
			if (f=="dummy") continue;
			if(Camera.FishEyeViewOn && f == Camera.ControlFish) continue ;
			var fish = Fish_list[f] ;
			modelView = Matrix.scale(fish.scale) ;
			modelView = Matrix.Rotate3D2(fish.direction.cross(fish.up).toUnitVector(),fish.up,fish.direction).x(modelView) ;
			modelView = Matrix.Translation(fish.center).x(modelView) ;
			modelView = lookAt.x(modelView) ;
			ModelRenderer.renderModel(Renderer.models[fish.name],modelView) ;
		}

		// Render the Box
		modelView = Matrix.scale(AquariumBox.scale) ;
		modelView = Matrix.Translation(AquariumBox.center).ensure4x4().x(modelView);
		modelView = lookAt.x(modelView) ;
	//ModelRenderer.renderModel(Renderer.models['AquariumBox'], modelView);

	//render mountain
	modelView = Matrix.scale(Mountain.scale) ;
	modelView = Matrix.Translation(Mountain.center).ensure4x4().x(modelView);
	modelView = lookAt.x(modelView) ;
	ModelRenderer.renderModel(Renderer.models['Mountain'], modelView);
	}
}
