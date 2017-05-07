/*

%%%%%%%%%%%%%%%%%%%%%%%%%%%
                LEBRETON JASON
                j.lebreton@rt-iut.re
%%%%%%%%%%%%%%%%%%%%%%%%%%%

Ce script permet de construire la classe Player

*/


function Player(n) {

    //Atributs
    this._name = n;
    this._points = 0;
    this._team = null;
    this._state = true;
    this._position = 0;
    this._order = null;  //1 : asc ; -1 : desc

    //Methodes
    this.getName = function() { return this._name };

    this.addPoints = function(nb_points) { this._points += nb_points };
    this.getPoints = function() { return this._points };

    this.setTeam = function(t) { this._team = t };
    this.getTeam = function() { return this._team };

    this.getPosition = function() { return this._position };

    this.getState = function() { return this._state };

    this.win = function(n) { //n : nombre de points (> 0 : asc / < 0 : desc / 0 : pas d'argument)
        this._position += (arguments.length > 0 ? n / Math.abs(n) : 1);
        this.addPoints(arguments.length > 0 ? Math.abs(n) : 1);
    };

    this.movePosition = function(n) {
        this._position += n;
    }

    this.lose = function() { //team_n : Nombre de points à retirer à l'équipe dans le cas d'un tournoi descendant (Laisser vide si tournoi ascendant)
        this._state = false;
    };
}
