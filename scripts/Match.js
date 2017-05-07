
/*

%%%%%%%%%%%%%%%%%%%%%%%%%%%
                LEBRETON JASON
                j.lebreton@rt-iut.re
%%%%%%%%%%%%%%%%%%%%%%%%%%%

Ce script permet de construire la classe Match

*/

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
              UTILISATION
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

var m1 = new Match([teams_table[0].getPlayers()[0], teams_table[1].getPlayers()[0]], 1);    //Création du match avec (joueur1, joueur2, position du match dans l'étage)

m1.setPlayerHandicap(teams_table[0].getPlayers()[0], handicaps_list[2][0], 2);              //Mise en place des handicaps, pour le joueur 1 en l'occurrence

m1.startMatch();                                                                            //Démarrage du match (start du timer)

m1.stopMatch();                                                                             //Arrêt du match (stop du timer)

m1.setIssue(m1.getPlayers()[0], m1.getPlayers[1]);                         //Définition de l'issue du match -> Gagnant joueur 1 en l'occurence

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    CONCEPTUALISATION DES POSITIONS
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

                   0  ------------------------ ETAGE 4 - Fin de tournoi, n'oppose personne

              0      1   -------------------- ETAGE 3

         0      1      2   ---------------- ETAGE 2

    0        1        2        3  ------------- ETAGE 1

 0  0   0   0   0   0   0   0 ----------- ETAGE 0

    0        1        2        3 ------------- ETAGE -1

         0      1      2 ----------------- ETAGE -2

            0      1  -------------------- ETAGE -3

                0 ------------------------ETAGE -4 - Fin de tournoi, n'oppose personne

*/

var handicaps_list = new Array(["Parler tout le long de la partie", "Pas de coups forts"],                                  //niveau 1
                          ["Pas de garde"],                                                                                 //niveau 2
                          ["Jouer en faisant des flexions", "Pas de saut", "Pas de coups faibles", "Pas de projection"]     //niveau 3
                         );

function Match(players_arr, pos) { //players : array { player1, player2 }
    //Attributs
    this._common_handicap = [parseInt(Math.random() * handicaps_list.length), parseInt(Math.random() * handicaps_list[parseInt(Math.random() * handicaps_list.length)].length)];
    this._players = [players_arr[0], players_arr[1]];
    this._playersHandicaps = [null, null];
    this._position = pos;
    this._issue = {winner: null, loser: null};
    this._timer = 0;

    //Methodes
    this.setPlayerHandicap = function(p, h, l) {
         this._playersHandicaps[this._players.indexOf(p)] = {name: h, level: l};
    };

    this.getPlayers = function() { return this._players };
    this.getPlayersHandicaps = function() { return this._playersHandicaps };

    this.getPosition = function() { return this._position };

    this.startTimer = function() { this._timer = new Date() };
    this.stopTimer = function() {
        var tf = new Date();
        var to = this._timer;
        var total = ( to.getHours() * 3600 + to.getMinutes() * 60 + to.getSeconds() ) - ( tf.getHours() * 3600 + tf.getMinutes() * 60 + tf.getSeconds() );
        timer = {hours: total % 3600, minutes: (total - (total % 3600) * 3600) % 60, seconds: (total - (total - (( total % 3600) * 3600) % 60) * 60)};
    };
    this.getTime = function() { return this._timer };

    this.startMatch = function() {
        this._playersHandicaps[0] = this._playersHandicaps[0] == null ? {name: "Aucun", level: 0} : this._playersHandicaps[0];
        this._playersHandicaps[1] = this._playersHandicaps[1] == null ? {name: "Aucun", level: 0} : this._playersHandicaps[1];
        this.startTimer();
    };

    this.stopMatch = function() {
        this.stopTimer();
    }

    this.setIssue = function(w, l) {
        this._issue.winner = w;
        this._issue.loser = l;

        if(this._position < 0) { //Tournoi descendant
            l.getTeam().addPoints(-(2+this._playersHandicaps[0].level + this._playersHandicaps[1].level)); //Retrait des points à l'équipe perdante
            l.lose(); //Élimination du perdant

            w.win(-(1+this._playersHandicaps[0].level + this._playersHandicaps[1].level)); //Ajout des points au score du gagnant
        }
        else if(this._position > 0) { //Tournoi ascendant
            w.win(1 + this._playersHandicaps[this._players.indexOf(w)].level); //Ajout des points au score du gagnant
            w.getTeam().addPoints(1 + this._playersHandicaps[this._players.indexOf(w)].level); //Ajout des points à l'équipe gagnante

            l.lose(); //Élimination du perdant
        }
        else if(this._position == 0) {
            w.getTeam().addPoints(1 + this._playersHandicaps[this._players.indexOf(w)].level); //Ajout des points à l'équipe gagnante
            w.win();
            w.getTeam().getPlayers()[Math.abs(w.getTeam().getPlayers().indexOf(w) - 1)].movePosition(-1);

            l.movePosition(-1);
            l.getTeam().getPlayers()[Math.abs(l.getTeam().getPlayers().indexOf(l) - 1)].movePosition(1);
        }
    };

    this.getIssue = function() { return this._issue };
}
