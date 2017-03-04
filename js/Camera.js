var Camera = {
    center : $V([5,0,0]) ,
    direction : $V([0,0,0]) ,
    up : $V([0,0,1]) ,
    LookAt : 0,
    CameraRotateAngle : 6 * Math.PI / 180.0 ,
    CameraRadius : 5 ,
    init : function(e,c,u)
    {
        this.center = $V([0,0,this.CameraRadius]) ;
        this.direction = $V([0,0,0]) ;
        this.up = $V([0,1,0]) ;
        this.update() ;
    },
    update : function()
    {
        this.LookAt = makeLookAt(this.center,this.direction,this.up ) ;
    },

    MoveCameraV : function(direction)
    {
        var normal = this.up.cross(this.direction.subtract(this.center));
        normal = normal.toUnitVector() ;
        var R = Matrix.Rotation(this.CameraRotateAngle * direction , normal) ;
        this.center = R.x(this.center) ;
        this.up = this.direction.subtract(this.center).cross(normal).toUnitVector() ;
        this.update() ;
    } ,
    MoveCameraH : function(direction)
    {
        var R = Matrix.Rotation(this.CameraRotateAngle * direction,this.up).ensure3x3() ;
        this.center = R.x(this.center) ;
        this.update() ;
    },
    ChangeCameraRadius: function(direction)
    {
        this.center = this.center.x( 1 + direction*0.06 ) ;
        this.update() ;
    }
}
