
/*

%%%%%%%%%%%%%%%%%%%%%%%%%%%
              LEBRETON JASON
              j.lebreton@rt-iut.re
%%%%%%%%%%%%%%%%%%%%%%%%%%%

Ce script permet de :
- générer tous les matchs du tournoi étage par étage : stage_matches()
- Tracer les cercles représentant ces matchs : stage_matches()
- Tracer les traits mettant en surbrillance les étage concernés par le niveau occurent du Tournoi : stage_matches()

/!\ L'étage 0 d'initiation a sa propre fonction : init_match()

*/


var ts = 0, matches_table = [], stage_done = false; //ts : Étage occurrent du tournoi
var matches_layer = new Konva.Layer(); //Cercles de matchs
var spec_layer = new Konva.Layer(); //Calque des infos de matchs
var line_layer = new Konva.Layer(); //Calque de la ligne en surbrillance indiquant les étages concernés en l'occurrence
var circles = []; //Tableau des objets Konva.Circle représentant graphiquement les matchs d'un étage
var rem_players = []; //Joueurs restant sur un étage donné
var cons_spec = false; //État définissant si l'utilisateur consulte les spécifications d'un match (évite la redondance de l'opération)
var match_int = new Konva.Layer(); //Calque d'interface de match
var P1_HLev = [], P2_HLev = []; //Tableau d'objet Konva.Circle représentant graphiquement les niveaux de handicaps pour les joueurs 1 et 2

//Génération des matchs de l'étage occurrent
function stage_matches() {
  rem_players[ts] = [];
  rem_players[-ts] = [];
  line_layer.clear();
  matches_layer.clear();
  if(ts == 0) {init_match(); return }
  matches_table[ts] = [];
  matches_table[-ts] = [];
  var ak = 0;
  var dk = 0;

  for (var g = 0; g < players_table.length; g++) {
    if(players_table[g].getPosition() == ts && players_table[g].getState() == true) {
      rem_players[ts][ak] = players_table[g];
      ak++;
    }
    else if(players_table[g].getPosition() == -ts && players_table[g].getState() == true) {
      rem_players[-ts][dk] = players_table[g];
      dk++;
    }
  }

  circles[ts] = [];
  circles[-ts] = [];

  matches_layer = new Konva.Layer();
  line_layer = new Konva.Layer();
  //%%%%%%%%%%%%%%% Konva Stage Circles %%%%%%%%%%%%%%%%
  var H = 0;
  var k = Math.pow(2, ts - 1) - Math.pow(2, ts + 1);
  for (h = Math.pow(2,ts); rings[ts][h] < rings[ts].length - Math.pow(2,ts); h += Math.pow(2,ts+1)) {
    k += Math.pow(2, ts + 1);

    var horz_line_asc = new Konva.Line({ //Construction de la ligne d'indication d'étage de match
      points: [k*H_Unit, c_height/2 - (ts-1) * V_Unit,
                  k*H_Unit, c_height/2 - ts * V_Unit,
                  (k + Math.pow(2, ts))*H_Unit, c_height/2 - ts * V_Unit,
                  (k + Math.pow(2, ts))*H_Unit, c_height/2 - (ts-1) * V_Unit,
        ],
      stroke: 'deepskyblue',
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round'
    });
    var horz_line_desc = new Konva.Line({ //Construction de la ligne d'indication d'étage de match
      points: [k*H_Unit, c_height/2 + (ts-1) * V_Unit,
                  k*H_Unit, c_height/2 + ts * V_Unit,
                  (k + Math.pow(2, ts))*H_Unit, c_height/2 + ts * V_Unit,
                  (k + Math.pow(2, ts))*H_Unit, c_height/2 + (ts-1) * V_Unit,
        ],
      stroke: 'rgb(255,115, 106)',
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round'
    });
    line_layer.add(horz_line_asc);
    line_layer.add(horz_line_desc);

    circles[ts][H] = new Konva.Circle({ //Construction de l'objet (Tournoi ascendant)
    x: h*H_Unit,
    y: c_height/2-ts*V_Unit,
    radius: H_Unit/4,
    fill: 'white',
    stroke: 'deepskyblue',
    strokeWidth: 1
  });
  circles[-ts][H] = new Konva.Circle({ //Construction de l'objet (Tournoi descendant)
  x: h*H_Unit,
  y: c_height/2+ts*V_Unit,
  radius: H_Unit/4,
  fill: 'white',
  stroke: 'rgb(255,115, 106)',
  strokeWidth: 1
});
matches_layer.add(circles[ts][H]);
matches_layer.add(circles[-ts][H]);

matches_table[ts][H] = new Match([rem_players[ts][2*H], rem_players[ts][2*H + 1]], ts);
matches_table[-ts][H] = new Match([rem_players[-ts][2*H], rem_players[-ts][2*H + 1]], -ts);

//EVENT LISTENERS
circles[ts][H].on('mouseenter', (function(args) {
  if(!cons_spec) GraphOpp(args[0], args[1]);
  cons_spec = true;
}).bind(this, [ts, H]));
circles[-ts][H].on('mouseenter', (function(args) {
  if(!cons_spec) GraphOpp(args[0], args[1]);
  cons_spec = true;
}).bind(this, [-ts, H]));
H++;
}
stage.add(line_layer);
stage.add(matches_layer);
}

//Génération des matchs de l'étage 0 spécifiquement (Étage d'amorçage du Tournoi)
function init_match() {

  matches_table[ts] = [];
  var p = 1; //Variable d'ajustement d'écart d'index provoqué dans matches_table par le fait qu'il y ait des index dans rings qui ne correspondent pas à des matchs
  circles[0] = [];
  for (h = Math.pow(2,ts+1); rings[ts][h] < rings[ts].length - Math.pow(2,ts); h += Math.pow(2,ts+2)) {
    // Construction du traçage du niveau d'étage
    //Étage 0 spécifiquement
    var horz_line_init = new Konva.Line({
      points: [(h - Math.pow(2,ts))*H_Unit, c_height/2, (h+Math.pow(2,ts))*H_Unit, c_height/2],
      stroke: 'deepskyblue',
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round'
    });
    line_layer.add(horz_line_init);


    var H = Math.round((h / (rings[ts].length)) * teams_table.length) - p;
    circles[0][H] = new Konva.Circle({ //Construction de l'objet
    x: h*H_Unit,
    y: c_height/2-ts*V_Unit,
    radius: H_Unit/4,
    fill: 'white',
    stroke: 'deepskyblue',
    strokeWidth: 1
  });
  matches_layer.add(circles[0][H]);
  matches_table[ts][H] = new Match([teams_table[H].getPlayers()[0], teams_table[teams_table.length - (H + 1)].getPlayers()[0]], 0);

  //EVENT LISTENERS
  circles[0][H].on('mouseenter', function(evt) {
    if(!cons_spec) GraphOpp(ts, this.index);
    cons_spec = true;
  });
  p++;
}
stage.add(line_layer);
stage.add(matches_layer);
}


/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        GRAPHIC OBJECTS BUILDING
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

function GraphOpp(e, m) { //e : numéro d'étage ; m : position du match dans l'étage
  var spec_layer = new Konva.Layer();
  var w = 300;

  var complexText = new Konva.Text({
    width: w,
    x: circles[e][m].position().x - (circles[e][m].position().x > stage.getWidth() / 2 ? w : 0),
    y: circles[e][m].position().y,
    text: matches_table[e][m].getPlayers()[0].getName() + " VS " + matches_table[e][m].getPlayers()[1].getName(),
    fontSize: 18,
    fontFamily: 'ssf4',
    fill: 'color: rgb(255, 102, 102)',
    padding: 20,
    align: 'center'
  });

  var rect = new Konva.Rect({
    x: complexText.position().x,
    y: complexText.position().y,
    stroke: '#555',
    strokeWidth: 5,
    fill: '#eee',
    width: w,
    height: complexText.getHeight(),
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffset: [10, 10],
    shadowOpacity: 0.2,
    cornerRadius: 10
  });

  spec_layer.add(rect);
  spec_layer.add(complexText);
  stage.add(spec_layer);

  //Events handler
  rect.on('mouseleave', function(evt) {
    spec_layer.remove();
    cons_spec = false;
  });
  circles[e][m].on('click', function(evt) {
    GraphMatch(e, m);
    spec_layer.remove();
    cons_spec = false;
  });
}





function GraphMatch(e, m) { //e : numéro d'étage ; m : position du match dans l'étage
  var w = 300;
  var h_ray = 10;

  var P_Names = new Konva.Text({
    width: w,
    x: circles[e][m].position().x - (circles[e][m].position().x > stage.getWidth() / 2 ? w : 0),
    y: circles[e][m].position().y + circles[e][m].getHeight(),
    text: matches_table[e][m].getPlayers()[0].getName() + " VS " + matches_table[e][m].getPlayers()[1].getName(),
    fontSize: 18,
    fontFamily: 'ssf4',
    fill: 'rgb(255, 102, 102)',
    padding: 20,
    align: 'center'
  });

  var P1_Name = new Konva.Text({
    width: w/2,
    x: P_Names.position().x,
    y: P_Names.position().y,
    text: matches_table[e][m].getPlayers()[0].getName(),
    fontSize: 15,
    fontFamily: 'ssf4',
    fill: 'rgb(255, 102, 102)',
    padding: 20,
    align: 'left'
  });

  var middle_el = new Konva.Text({
    width: w/4,
    x: P_Names.position().x + 3 * P_Names.getWidth() / 8,
    y: P_Names.position().y,
    text: 'VS',
    fontSize: 18,
    fontFamily: 'ssf4',
    fill: 'rgb(65,65,65)',
    padding: 20,
    align: 'center'
  });

  var P2_Name = new Konva.Text({
    width: w/2,
    x: P_Names.position().x + P_Names.getWidth() / 2,
    y: P_Names.position().y,
    text: matches_table[e][m].getPlayers()[1].getName(),
    fontSize: 15,
    fontFamily: 'ssf4',
    fill: 'rgb(106,187, 223)',
    padding: 20,
    align: 'right'
  });

  var rect = new Konva.Rect({
    x: circles[e][m].position().x - (circles[e][m].position().x > stage.getWidth() / 2 ? w : 0),
    y: circles[e][m].position().y + circles[e][m].getHeight(),
    stroke: '#555',
    strokeWidth: 5,
    fill: '#eee',
    width: w,
    height: 3*P_Names.getHeight() + h_ray,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffset: [10, 10],
    shadowOpacity: 0.2,
    cornerRadius: 10
  });

  match_int.add(rect);
  match_int.add(P1_Name);
  match_int.add(P2_Name);
  match_int.add(middle_el);

  //Levels handicaps Player 1
  for (var b = 0; b < handicaps_list.length; b++) {
    P1_HLev[b] = new Konva.Circle({ //Construction de l'objet
    x: P_Names.position().x + (b > 0 ? b * P1_HLev[b-1].getWidth() : 0) + P_Names.padding(),
    y: P_Names.position().y + P_Names.getHeight(),
    radius: h_ray,
    stroke: 'rgb(255,115, 106)',
    strokeWidth: 1,
    id: 'P1_HLev' + b
  });
  match_int.add(P1_HLev[b]);

  //EVENTS LISTENER
  P1_HLev[b].on("click", (function(args) {
    for(h=args[0];
      h >= 0;
      h--) {
        match_int.find('#P1_HLev' + h)[0].fill('rgb(255, 102, 102)');
      }
      for(h=args[0]+1;
        h <= 2;
        h++) {
          match_int.find('#P1_HLev' + h)[0].fill('rgba(255,255,255,0)');
        }
        var hn = parseInt(Math.random() * handicaps_list[args[0]].length);
        matches_table[args[1]][args[2]].setPlayerHandicap(matches_table[args[1]][args[2]].getPlayers()[0], handicaps_list[args[0]][hn], args[0]);
        alert(matches_table[args[1]][args[2]].getPlayers()[0].getName() +" : "+handicaps_list[args[0]][hn]);

        match_int.draw();
      }).bind(this, [b, e, m]));
    }

    //Levels handicaps Player 2
    for (var b = 0; b < handicaps_list.length; b++) {
      P2_HLev[b] = new Konva.Circle({ //Construction de l'objet
      x: (P_Names.position().x + P_Names.getWidth() - P1_HLev.length * P1_HLev[0].getWidth()) + (b > 0 ? b * P2_HLev[b-1].getWidth() : 0),
      y: P_Names.position().y + P_Names.getHeight(),
      radius: h_ray,
      stroke: 'rgb(106,187, 223)',
      strokeWidth: 1,
      id: 'P2_HLev' + b
    });
    match_int.add(P2_HLev[b]);

    //EVENTS LISTENER
    P2_HLev[b].on("click", (function(args) {
      for(h=args[0];
        h >= 0;
        h--) {
          match_int.find('#P2_HLev' + h)[0].fill('rgb(106,187, 223)');
        }
        for(h=args[0]+1;
          h <= 2;
          h++) {
            match_int.find('#P2_HLev' + h)[0].fill('rgba(255,255,255,0)');
          }
          var hn = parseInt(Math.random() * handicaps_list[args[0]].length);
          matches_table[args[1]][args[2]].setPlayerHandicap(matches_table[args[1]][args[2]].getPlayers()[1], handicaps_list[args[0]][hn], args[0]);
          alert(matches_table[args[1]][args[2]].getPlayers()[1].getName() + " : " + handicaps_list[args[0]][hn]);

          match_int.draw();
        }).bind(this, [b, e, m]));
      }

      //GO BUTTON - Start Match
      var GO = new Konva.Text({
        width: 150,
        x: rect.position().x + rect.getWidth() / 2 - 75,
        y: rect.position().y + rect.getHeight() / 2,
        text: "GO",
        fontSize: 20,
        fontFamily: 'ssf4',
        fill: 'rgb(65,65,65)',
        padding: 20,
        align: 'center'
      });

      var GO_rect = new Konva.Rect({
        x: GO.position().x,
        y: GO.position().y,
        stroke: '#555',
        strokeWidth: 5,
        fill: '#eee',
        width: GO.getWidth(),
        height: GO.getHeight(),
        shadowBlur: 10,
        shadowOffset: [10, 10],
        shadowOpacity: 0.2,
        cornerRadius: 10
      });

      var OVER = new Konva.Text({
        width: 150,
        x: rect.position().x + rect.getWidth() / 2 - 75,
        y: rect.position().y + rect.getHeight() / 2,
        text: "OVER",
        fontSize: 20,
        fontFamily: 'ssf4',
        fill: 'rgb(65,65,65)',
        padding: 20,
        align: 'center'
      });

      var OVER_rect = new Konva.Rect({
        x: GO.position().x,
        y: GO.position().y,
        stroke: '#555',
        strokeWidth: 5,
        fill: '#eee',
        width: GO.getWidth(),
        height: GO.getHeight(),
        shadowBlur: 10,
        shadowOffset: [10, 10],
        shadowOpacity: 0.2,
        cornerRadius: 10
      });

      //Event : Click on GO
      GO.on('click', (function(args) {
        matches_table[args[0]][args[1]].startMatch();
        matches_table[args[0]][args[1]].getPlayers()[0].getTeam().addMatch(matches_table[args[0]][args[1]]);
        matches_table[args[0]][args[1]].getPlayers()[1].getTeam().addMatch(matches_table[args[0]][args[1]]);
        args[4].remove();

        match_int.add(OVER_rect);
        match_int.add(OVER);
        this.remove();
        match_int.draw();
      }).bind(GO, [e,m,P1_Name,P2_Name,GO_rect]));

      var P1_Name, P2_Name;

      //Event : Click on OVER
      OVER.on('click', (function(args) {
        matches_table[args[0]][args[1]].stopMatch();
        match_int.clear();
        var wi = 350;

        var cont = new Konva.Rect({
          x: circles[args[0]][args[1]].position().x - (circles[args[0]][args[1]].position().x > stage.getWidth() / 2 ? w : 0),
          y: circles[args[0]][args[1]].position().y + circles[args[0]][args[1]].getHeight(),
          stroke: '#555',
          strokeWidth: 5,
          fill: '#eee',
          width: wi,
          height: 6 * h_ray,
          shadowColor: 'black',
          shadowBlur: 10,
          shadowOffset: [10, 10],
          shadowOpacity: 0.2,
          cornerRadius: 10
        });

        var P1_Name = new Konva.Text({
          x: cont.position().x,
          y: cont.position().y,
          width: wi / 2,
          text: matches_table[args[0]][args[1]].getPlayers()[0].getName(),
          fontSize: 20,
          fontFamily: 'ssf4',
          fill: 'rgb(255, 102, 102)',
          padding: 20,
          align: 'left'
        })
        ;

        var P2_Name = new Konva.Text({
          x: cont.position().x + cont.getWidth() / 2,
          y: cont.position().y,
          width: wi / 2,
          text: matches_table[args[0]][args[1]].getPlayers()[1].getName(),
          fontSize: 20,
          fontFamily: 'ssf4',
          fill: 'rgb(106,187, 223)',
          padding: 20,
          align: 'right'
        });

        match_int = new Konva.Layer();

        match_int.add(cont, P1_Name, P2_Name);
        stage.add(match_int);

        P1_Name.on("click", (function() {
          matches_table[args[0]][args[1]].setIssue(matches_table[args[0]][args[1]].getPlayers()[0], matches_table[args[0]][args[1]].getPlayers()[1]);
          match_end(args[0], args[1]);
        }).bind(this, [args[0],args[1]]));

        P2_Name.on("click", (function(args) {
          matches_table[args[0]][args[1]].setIssue(matches_table[args[0]][args[1]].getPlayers()[1], matches_table[args[0]][args[1]].getPlayers()[0]);
          match_end(args[0], args[1]);
        }).bind(this, [args[0],args[1]]));

      }).bind(this, [e,m,P1_Name,P2_Name]));

      match_int.add(GO_rect);
      match_int.add(GO);
      stage.add(match_int);
    }



    function GraphResult(e, m) { //e : numéro d'étage ; m : position du match dans l'étage
      console.log('winner : ' + matches_table[e][m].getIssue().winner.getTeam());
    }


    function match_end(e,m) {
      var wteam_id = teams_table.indexOf(matches_table[e][m].getIssue().winner.getTeam());
      var lteam_id = teams_table.indexOf(matches_table[e][m].getIssue().loser.getTeam());

      var wteam_points = teams_table[wteam_id].getPoints();
      var lteam_points = teams_table[lteam_id].getPoints();

      document.getElementById('teams_container').firstChild.firstChild.childNodes[1 + wteam_id].childNodes[1].innerHTML = wteam_points;
      document.getElementById('teams_container').firstChild.firstChild.childNodes[1 + lteam_id].childNodes[1].innerHTML = lteam_points;
      match_int.clear();
      match_int = new Konva.Layer();

      console.log('match end');
      circles[e][m].setFill(e < 0 ? "rgb(255, 102, 102)" : "deepskyblue")
      matches_layer.draw();
      circles[e][m].on('mouseenter', function(evt) {
        if(!cons_spec) GraphResult(e, m);
        cons_spec = true;
      });
      stage_done = true;
      for(v = 0; v < matches_table[e].length ; v++) {
        if(matches_table[e][v].getIssue().winner == null || matches_table[-e][v].getIssue().winner == null) {
          stage_done = false;
        }
      }
      if(stage_done == true) {
        ts++;
        stage_matches();
      }
    }
