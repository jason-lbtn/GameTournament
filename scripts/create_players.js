
/*

%%%%%%%%%%%%%%%%%%%%%%%%%%%
                LEBRETON JASON
                j.lebreton@rt-iut.re
%%%%%%%%%%%%%%%%%%%%%%%%%%%

Ce script permet de :
- Parser la liste des joueurs entrés
- Les ranger dans un tableau

Ce script se termine sur une exécution de la fonction create_teams(talbeau_des_joueurs) (Voir create_teams.js)
*/


/*

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
         CREATION DES JOUEURS A PARTIR DE LA SAISIE DANS PARTICIPANTS_LIST
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

. Retourne players_table : Tableau de type Player contenant tous les joueurs initialement caractérisés par leurs noms

*/


var players_table;

function create_players() {

    var players_input = document.getElementById('participants_list').value.split(', ');
     players_table = new Array(players_input.length);

    for(var i = 0; i < players_input.length; i++) {
        players_table[i] = new Player(players_input[i]);
    }

    create_teams(players_table);
}
