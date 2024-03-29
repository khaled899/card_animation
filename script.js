(function(){
    let container=document.getElementById("container"),
    inner=document.getElementById('inner')

    let mouse ={
        _x:0,
        _y:0,
        x:0,
        y:0,
        updatePosition:function(event){
            let e = event || window.event
            this.x =e.clientX - this._x
            this.y =e.clientY - this._y *-1
        },
        setOrigin:function(e){
            this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2)
            this._y = e.offsetTop + Math.floor(e.offsetHeight / 2)
        },
        show:function(){
            return '('+this.x + ',' + this.y + ')'
        },
    }
    mouse.setOrigin(container)

    let counter =0
    let updateRate = 10 
    let isTimeToUpdate = function(){
        return counter++ % updateRate === 0
    }
    let onMouseEnterHandler = function(event){
        update(event)
    }
    let onMouseLeaveHandler = function(){
        inner.style=''
    }
    let mouseMoveHandler = function(event){
        if(isTimeToUpdate()){
            update(event)
        }
    }
    let update = function(event){
        mouse.updatePosition(event)
        updateTransformStyle(
            (mouse.y / inner.offsetHeight /2).toFixed(2),
            (mouse.x / inner.offsetWidth /2).toFixed(2)
        )
    }

    let updateTransformStyle = function(x,y){
        let style = 'rotateX('+ x  + 'deg) rotateY(' + y+ 'deg)'
        inner.style.transform = style
        // inner.style.webkitTransform=style
        // inner.style.mozTransform = style
        // inner.style.msTransform = style
        // inner.style.oTransform = style
    }
    container.onmouseenter =onMouseEnterHandler
    container.onmouseleave = onMouseLeaveHandler
    container.onmousemove =mouseMoveHandler
})()