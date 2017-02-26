var Camera = {
    center : $V([5,0,0]) ,
    direction : $V([0,0,0]) ,
    up : $V([0,0,1]) ,
    LookAt : 0,
    CameraRotateAngle : 5 * Math.PI / 180.0 ,
    CameraRadius : 5 ,
    init : function(e,c,u)
    {
        this.center = $V([this.CameraRadius,0,0]) ;
        this.direction = $V([0,0,0]) ;
        this.up = $V([0,0,1]) ;
        this.Update() ;
    },
    Update : function()
    {
        this.LookAt = makeLookAt(this.center,this.direction,this.up ) ;
    },
    MoveCameraH : function(direction)
    {
        var R = Matrix.Rotation(this.CameraRotateAngle * direction,this.up).ensure3x3() ;
        this.center = R.x(this.center) ;
        this.Update() ;
    },
    MoveCameraV : function(direction)
    {
        var normal = this.up.cross(this.direction.subtract(this.center)).toUnitVector() ;
        var R = Matrix.Rotation(this.CameraRotateAngle * direction , normal) ;
        this.center = R.x(this.center) ;
        this.up = this.direction.subtract(this.center).cross(normal).toUnitVector() ;
        this.Update() ;
    } ,
    ChangeCameraRadius: function(direction)
    {
        this.center = this.center.x( 1 + direction*0.05 ) ;
        this.Update() ;
    }
}
