//Sim
var nb_teams = 8;

//Env
var c_height = 720, c_width = 720;
var padding = 2;
var N_VDIV = (Math.log2(nb_teams) + padding) * 2, N_HDIV = nb_teams * 2;
var V_Unit = c_height / N_VDIV, H_Unit = c_width / N_HDIV;

//Matrix generation
var rings = [];
for (i = 0; i <= N_VDIV / 2; i++) {
    rings[i] = [];
    for (k = 0; k <= N_HDIV; k++) {
        rings[i][k] = k;
    }
    rings[-i] = rings[i];
}

//Obj
var canvas = document.createElement('canvas');
canvas.setAttribute('height', c_height);
canvas.setAttribute('width', c_width);
document.body.appendChild(canvas);

var ctx=canvas.getContext("2d");
ctx.translate(0, canvas.height);
ctx.scale(1, -1);

ctx.beginPath();
ctx.moveTo(H_Unit-10,c_height/2);
ctx.lineTo((rings[0].length-2)*H_Unit+10,c_height/2);
ctx.stroke();

for (i = 0; i < rings.length-2; i++) {
    var p = 1;
    for (k = Math.pow(2,i); rings[i][k] < rings[i].length - Math.pow(2,i); k+= Math.pow(2,i+1)) {
        //Ascendant
        ctx.beginPath();
        ctx.moveTo(k*H_Unit,c_height/2+i*V_Unit);
        ctx.lineTo(k*H_Unit,c_height/2+(i+1)*V_Unit);
        ctx.stroke();
        if(p % 2 != 0 && i < rings.length-3) {
            ctx.beginPath();
            ctx.moveTo(k*H_Unit,c_height/2+(i+1)*V_Unit);
            ctx.lineTo((k + Math.pow(2,i+1))*H_Unit,c_height/2+(i+1)*V_Unit);
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(k*H_Unit,c_height/2+i*V_Unit,H_Unit/4,0,2*Math.PI,true);
        ctx.stroke();
        
        //Descendant
        ctx.beginPath();
        ctx.moveTo(k*H_Unit,c_height/2-i*V_Unit);
        ctx.lineTo(k*H_Unit,c_height/2-(i+1)*V_Unit);
        ctx.stroke();
        if(p % 2 != 0 && i < rings.length-3) {
            ctx.beginPath();
            ctx.moveTo(k*H_Unit,c_height/2-(i+1)*V_Unit);
            ctx.lineTo((k + Math.pow(2,i+1))*H_Unit,c_height/2-(i+1)*V_Unit);
            ctx.stroke();
        }
        if(i != 0){
            ctx.beginPath();
            ctx.arc(k*H_Unit,c_height/2-i*V_Unit,H_Unit/4,0,2*Math.PI,true);
            ctx.stroke();
        }
        p++;
    }
}