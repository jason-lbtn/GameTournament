/*

%%%%%%%%%%%%%%%%%%%%%%%%%%%
                LEBRETON JASON
                j.lebreton@rt-iut.re
%%%%%%%%%%%%%%%%%%%%%%%%%%%

Ce script permet de construire la classe Team

*/

//Noms d'équipes à tirer aléatoirement lors de la création d'une équipe
var team_names = ["Morte-Couilles","Convolution","Doux-Hier","Such Doges","Alébatar","Mamene","ckoilébail", "φ-niels"];


//Construction de la classe
function Team(player1, player2) {
    //Attributs

    this._name = team_names.splice(parseInt(Math.random() * team_names.length), 1)[0];
    this._players = [player1, player2];
    this._players[0].setTeam(this);
    this._players[1].setTeam(this);

    this._matches = [];
    this._points = 0;

    //Methodes
    this.getName = function() { return this._name };
    this.getPlayers = function() { return this._players };
    this.getPoints = function() { return this._points };
    this.addPoints = function(nb_points) { this._points += nb_points };

    this.getMatches = function() { return this._matches };
    this.addMatch = function(m) { this._matches[this._matches.length] = m };
}
