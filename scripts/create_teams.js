/*

%%%%%%%%%%%%%%%%%%%%%%%%%%%
                LEBRETON JASON
                j.lebreton@rt-iut.re
%%%%%%%%%%%%%%%%%%%%%%%%%%%

Ce script permet de :
- Mélanger la liste des participants
- Créer le tableau des équipes dans lesquelles sont regroupés des binômes

Ce script se termine sur une exécution de la fonction gen_tree(nb_teams) (Voir gen_tree.js)
*/



/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                CREATION DES EQUIPES A PARTIR DE PLAYERS_TABLE
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

. Retourne teams_table : Tableau de type Team contenant toutes les équipes initialement caractérisées par leurs noms

*/

var teams_table;

function shuffle(a) {
    //Fonction de mélange d'éléments au sein d'une variable (type Tableau)

    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function create_teams(players_list) {   //Fonction de création des équipes en fonction de players_list
    shuffle(players_list);              //Mélange de la liste des participants

    teams_table = new Array(players_list.length / 2);

    for (i = 0; i < players_list.length / 2; i++) {                         //Création d'une variable (type Joueur) par participant
        teams_table[i] = new Team(players_list[i], players_list[i + Math.floor(players_list.length / 2)]);
    }
    teams_table = teams_table.filter(function(n){    return n != undefined });

    create_table(teams_table, document.getElementById('teams_container'));  //Création du tableau HTML

    gen_tree(teams_table.length); //Génération de l'arbre en fonction du nombre d'équipes
}

/*

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                    FONCTION DE GÉNÉRATION DU TABLEAU DES ÉQUIPES
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

*/


function create_table(teams, table) {
    //Génération du tableau des participants

    var content = "<table><tr><th class='teams'>Team</th><th class='teams'>Score</th><th class='teams'>Équipiers</th></tr>";

    for(i = 0; i < teams.length; i++) {
        content += "<tr><td class='team_head'>"
                + teams[i].getName().toUpperCase()
                + "</td><td>"
                + teams[i].getPoints()
                + "</td><td>"
                + teams[i].getPlayers()[0].getName() + " - " + teams[i].getPlayers()[1].getName()
                + "</td></tr>";
    }

    content += "</table>";
    table.innerHTML = content;
}
