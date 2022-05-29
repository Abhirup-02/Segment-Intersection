const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const A={x:200,y:150}
const B={x:150,y:250}
const C={x:50,y:100}
const D={x:250,y:200}

//let t=-1
let angle=0
const mouse={x:0,y:0}
document.onmousemove=(event)=>{
    mouse.x=event.x
    mouse.y=event.y
}
document.ondragmove=(event)=>{
    mouse.x=event.clientX
    mouse.y=event.clientY
}
animate()

function animate(){
    const radius=50
    A.x=mouse.x+Math.cos(angle)*radius
    A.y=mouse.y-Math.sin(angle)*radius
    B.x=mouse.x-Math.cos(angle)*radius
    B.y=mouse.y+Math.sin(angle)*radius
    angle+=0.02


    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.beginPath()
    ctx.lineWidth = 1.5
    ctx.moveTo(A.x,A.y)
    ctx.lineTo(B.x,B.y)
    ctx.moveTo(C.x,C.y)
    ctx.lineTo(D.x,D.y)
    ctx.stroke()

    drawDot(A,'A')
    drawDot(B,'B')
    drawDot(C,'C')
    drawDot(D,'D')

    // const M={
    //     x:lerp(A.x,B.x,t),
    //     y:lerp(A.y,B.y,t)
    // }

    // const N={
    //     x:lerp(C.x,D.x,t),
    //     y:lerp(C.y,D.y,t)
    // }

    // drawDot(M,'M',t<0 || t>1)
    // drawDot(N,'N',t<0 || t>1)

    const I = getIntersection(A,B,C,D)
    if(I){
        drawDot(I,'I')
    }

    // ctx.beginPath()
    // ctx.fillRect(canvas.width/2,0,I.bottom/100,10)

    // t+=0.005
    requestAnimationFrame(animate)
    
}

function getIntersection(){
 /*
    Ix = Ax+(Bx-Ax)t = Cx+(Cx-Dx)u
    Iy = Ay+(By-Ay)t = Cy+(Cy-Dy)u

    Ax+(Bx-Ax)t = Cx+(Cx-Dx)u /-Cx
    (Ax-Cx)+(Bx-Ax)t = (Dx-Cx)u ........(1)

    Ay+(By-Ay)t = Cy+(Cy-Dy)u / -Cy
    (Ay-Cy)+(By-Ay)t = (Dy-Cy)u / *(Dx-Cx)

    (Dx-cx)(Ay-Cy)t+(Dx-Cx)(By-Ay)t = (Dy-Cy)(Dx-Cx)u

    substituting,

    (Dx-cx)(Ay-Cy)t+(Dx-Cx)(By-Ay)t = (Dy-Cy)(Ax-Cx)+(Dy-Cy)(Bx-Ax)t / -(Dy-Cy)(Ax-Cx)
                                                                    / -(Dx-Cx)(Ay-Cy)t
    (Dx-Cx)(Ay-Cy)-(Dy-Cy)(Ax-Cx) =  [(Dy-Cy)(Bx-Ax)-(Dx-Cx)(By-Ay)]t
    
    t = (Dx-Cx)(Ay-Cy)-(Dy-Cy)(Ax-Cx) / (Dy-Cy)(Bx-Ax)-(Dx-Cx)(By-Ay)

    top = (Dx-Cx)(Ay-Cy)-(Dy-Cy)(Ax-Cx)
    bottom = (Dy-Cy)(Bx-Ax)-(Dx-Cx)(By-Ay)

    t = top/bottom
 */

    const tTop= (D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x)
    const uTop= (C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y)
    const bottom = (D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y)
    if(bottom!=0){
        const t=tTop/bottom
        const u=uTop/bottom
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return{
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }
    return null
}

function lerp(A,B,t){
    return A+(B-A)*t
}

function drawDot(point,label,isRed){
ctx.beginPath()
ctx.fillStyle=isRed?'red':'white'
ctx.arc(point.x,point.y,10,0,Math.PI*2)
ctx.fill()
ctx.stroke()
ctx.fillStyle='black'
ctx.textAlign='center'
ctx.textBaseline='middle'
ctx.font='bold 14px Arial'
ctx.fillText(label,point.x,point.y)
}
