var Renderer = {
		canvas: {}, gl: {},   // canvas being drawn to and WebGL context
		shaderProgram:  {},   // shader program handle
		quadBuffer:     {},   // buffer to hold position vertices for quad
		models:         {},   // list of loaded models
		textures:       {},   // list of loaded textures

		// used for timing
		time: 0, startTime: Date.now(),

		// size of window
		windowWidth: 0.0, windowHeight: 0.0,

		/** Called when canvas is created */
		init: function() {



				this.initGL(canvas);

				// only continue if WebGL is available
				if (gl) {
						// set window resize listener; intial call sets canvas size and gl viewport
						this.onWindowResize();
						window.addEventListener('resize', this.onWindowResize, false);

						Sandbox.init();
						ModelRenderer.init();
				}

				AquariumBox.init();
				init_fish();
				Mountain.init();
				WEED.init();
				Pebbles.init();
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
				ModelRenderer.renderModel(Renderer.models['AquariumBox'], modelView);

				//render mountain
				modelView = Matrix.scale(Mountain.scale) ;
				modelView = Matrix.Translation(Mountain.center).ensure4x4().x(modelView);
				modelView = lookAt.x(modelView) ;
				ModelRenderer.renderModel(Renderer.models['Mountain'], modelView);

				//render weeds
				modelView = Matrix.scale(WEED.scale) ;
				modelView = Matrix.Translation(WEED.center).ensure4x4().x(modelView);
				modelView = lookAt.x(modelView) ;
				ModelRenderer.renderModel(Renderer.models['Weed'], modelView);
				modelView = Matrix.scale(WEED.scale) ;
				center2=$V([3,-13.5,0]),
				modelView = Matrix.Translation(center2).ensure4x4().x(modelView);
				modelView = lookAt.x(modelView) ;
				ModelRenderer.renderModel(Renderer.models['Weed'], modelView);
				// Render the floor
				modelView = Matrix.scale(Pebbles.scale) ;
				modelView = Matrix.Translation(Pebbles.center).ensure4x4().x(modelView);
				modelView = lookAt.x(modelView) ;
				ModelRenderer.renderModel(Renderer.models['Pebbles'], modelView);
				// Render egg,bubble and Food
				if(EggCount > 0 || FoodCount > 0) MoveFallingObjects() ;
				for(var obname in ListOfFallingObjects)
				{
					console.log("Egg ") ;
					obj = ListOfFallingObjects[obname] ;
					modelView = Matrix.scale(obj.scale) ;
					modelView = Matrix.Rotate3D2(obj.direction.cross(obj.up).toUnitVector(),obj.up,obj.direction).x(modelView) ;
					modelView = Matrix.Translation(obj.center).x(modelView) ;
					modelView = lookAt.x(modelView) ;
					ModelRenderer.renderModel(Renderer.models[obj.name],modelView) ;
				}
		}
}
