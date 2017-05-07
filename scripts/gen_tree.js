
/*

%%%%%%%%%%%%%%%%%%%%%%%%%%%
              LEBRETON JASON
              j.lebreton@rt-iut.re
%%%%%%%%%%%%%%%%%%%%%%%%%%%

Ce script permet de :
- Dessiner la forme du tournoi étage par étage

Ce script se termine sur une exécution de la fonction stage_matches() (voir Tournament.js)

*/


var rings = [];
var c_height, c_width, V_Unit, H_Unit, N_HDIV, N_VDIV, padding;
var stage;

function gen_tree(nb_teams) {
    //Env
    c_height = 720;
    c_width = 720;
    padding = 2;

    N_VDIV = (Math.log2(nb_teams) + padding) * 2;
    N_HDIV = nb_teams * 2;

    V_Unit = c_height / N_VDIV;
    H_Unit = c_width / N_HDIV;

    //Matrix generation
    for (i = 0; i <= N_VDIV / 2; i++) { //Quadrillage (matriciel) du canvas
        rings[i] = [];
        for (k = 0; k <= N_HDIV; k++) {
            rings[i][k] = k;
        }
        rings[-i] = rings[i];
    }

    stage = new Konva.Stage({ //Définition de l'environnement
        container: 'canvas_container',
        width: c_width,
        height: c_height
    });
    var layer = new Konva.Layer(); //Contexte

    var circles = [];

    for (i = 0; i < rings.length-2; i++) {
        circles[i] = [];
        if(i > 0) circles[-i] = [];
        var p = 1;
        for (k = Math.pow(2,i); rings[i][k] < rings[i].length - Math.pow(2,i); k+= Math.pow(2,i+1)) {

            //Ascendant

            //%%%%%%%%%%%%%%% Konva Lignes verticales %%%%%%%%%%%%%%%%
            var vert_line_ASC = new Konva.Line({
              points: [k*H_Unit, c_height/2-i*V_Unit, k*H_Unit, c_height/2-(i+1)*V_Unit],
              stroke: 'gray',
              strokeWidth: 2,
              lineJoin: 'round',
              dash: [33, 10]
            });


            if(p % 2 != 0 && i < rings.length-3) {
                //%%%%%%%%%% Konva Lignes Horizontages %%%%%%%%%%%%%%%%%
                var horz_line_ASC = new Konva.Line({
                  points: [k*H_Unit, c_height/2-(i+1)*V_Unit, (k + Math.pow(2,i+1))*H_Unit, c_height/2-(i+1)*V_Unit],
                  stroke: 'gray',
                  strokeWidth: 2,
                  lineJoin: 'round',
                  dash: [33, 10]
                });

            }

            //Descendant

            //%%%%%%%%%%%%%%% Konva Lignes verticales %%%%%%%%%%%%%%%%
            var vert_line_DESC = new Konva.Line({
              points: [k*H_Unit, c_height/2+i*V_Unit, k*H_Unit, c_height/2+(i+1)*V_Unit],
              stroke: 'gray',
              strokeWidth: 2,
              lineJoin: 'round',
              dash: [33, 10]
            });


            if(p % 2 != 0 && i < rings.length-3) {
                //%%%%%%%%%%%%%%% Konva Lignes horizontales %%%%%%%%%%%%%%%%
                var horz_line_DESC = new Konva.Line({
                  points: [k*H_Unit, c_height/2+(i+1)*V_Unit, (k + Math.pow(2,i+1))*H_Unit, c_height/2+(i+1)*V_Unit],
                  stroke: 'gray',
                  strokeWidth: 2,
                  lineJoin: 'round',
                  dash: [33, 10]
                });
            }

            ///%%%%%%%%%%%%%%% Konva DESC Circle %%%%%%%%%%%%%%%%
//            if(i > 0)
//            circles[-i][k] = new Konva.Circle({ //Construction de l'objet
//                x: k*H_Unit,
//                y: c_height/2+i*V_Unit,
//                radius: H_Unit/4,
//                fill: 'white',
//                stroke: 'rgb(255,115, 106)',
//                strokeWidth: 1
//            });
//            circles[-i][k].moveToTop();


            //%%%% KONVA APPEND PHASE %%%%%
            layer.add(horz_line_ASC);
            layer.add(vert_line_ASC);
            layer.add(horz_line_DESC);
            layer.add(vert_line_DESC);

//            layer.add(circles[i][k]);
//            layer.add(circles[-i][k]);

            stage.add(layer);

            p++;
        }
    }
    stage_matches();
}
