function Graph_interface(m) { //Objet d'interface d'interfaçage graphique d'un objet Match
    
    /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      CREATION DES OBJETS CONSTITUANTS
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
    this.match = m;
    var h_text = 'HANDICAP : ';
    var r_headers = document.createElement('tr');
    var r_addH = document.createElement('tr');
    
    //Création de l'objet Player 1
    this._p1 = m.getPlayers()[0];
    
    //Création de l'objet graphique Player 1
    var h1 = document.createElement('th');
    var d1 = document.createElement('td');
    
    var p1_name = document.createTextNode(this._p1.getName());
    this.player1 = document.createElement("span");
    this.player1.classList.add("player_infos");
    this.player1.classList.add("player1");

        //Partie choix du handicap
    this.p1_addHandicap = document.createElement("span");
    this.p1_addHandicap_l1 = document.createElement("button");
    this.p1_addHandicap_l2 = document.createElement("button");
    this.p1_addHandicap_l3 = document.createElement("button");
    this.p1_addHandicap_l1.appendChild(document.createTextNode("1"));
    this.p1_addHandicap_l2.appendChild(document.createTextNode("2"));
    this.p1_addHandicap_l3.appendChild(document.createTextNode("3"));
    this.p1_addHandicap_l1.classList.add('hlevel_btn');
    this.p1_addHandicap_l2.classList.add('hlevel_btn');
    this.p1_addHandicap_l3.classList.add('hlevel_btn');
    this.p1_addHandicap.classList.add("add_handicap");
    this.p1_addHandicap.appendChild(document.createTextNode(h_text));
    
    this.player1.appendChild(p1_name);
    h1.appendChild(this.player1);
    d1.appendChild(this.p1_addHandicap);
    d1.appendChild(this.p1_addHandicap_l1);
    d1.appendChild(this.p1_addHandicap_l2);
    d1.appendChild(this.p1_addHandicap_l3);
    
    
    //Création de l'objet Player 2
    this._p2 = m.getPlayers()[1];
    
    //Création de l'objet graphique Player 2
    var h2 = document.createElement('th');
    var d2 = document.createElement('td');
    
    var p2_name = document.createTextNode(this._p2.getName());
    this.player2 = document.createElement("span");
    this.player2.classList.add("player_infos");
    this.player2.classList.add("player2");
    this.p2_addHandicap = document.createElement("span");
    this.p2_addHandicap_l1 = document.createElement("button");
    this.p2_addHandicap_l2 = document.createElement("button");
    this.p2_addHandicap_l3 = document.createElement("button");
    this.p2_addHandicap_l1.appendChild(document.createTextNode("1"));
    this.p2_addHandicap_l2.appendChild(document.createTextNode("2"));
    this.p2_addHandicap_l3.appendChild(document.createTextNode("3"));
    this.p2_addHandicap_l1.classList.add('hlevel_btn');
    this.p2_addHandicap_l2.classList.add('hlevel_btn');
    this.p2_addHandicap_l3.classList.add('hlevel_btn');
    this.p2_addHandicap.classList.add("add_handicap");
    this.p2_addHandicap.appendChild(document.createTextNode(h_text));
    this.player2.appendChild(p2_name);
    h2.appendChild(this.player2);
    d2.appendChild(this.p2_addHandicap);
    d2.appendChild(this.p2_addHandicap_l1);
    d2.appendChild(this.p2_addHandicap_l2);
    d2.appendChild(this.p2_addHandicap_l3);
    

    
    /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      CREATION DE L'OBJET D'INTERFACE
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
    
    //Construction de l'interface de match
    this.interface = document.createElement("table");
    this.interface.setAttribute('class', 'match_interface');
    var mel_text = document.createTextNode("VS");
    var middle_el = document.createElement("th");
    middle_el.setAttribute("class","middle-el");
    middle_el.appendChild(mel_text);
    var go_btn = document.createElement('td');
    go_btn.appendChild(document.createTextNode("GO"));
    
        //Assimimation des objets Joueur - Format : Tableau HTML
    r_headers.appendChild(h1);
    r_headers.appendChild(middle_el);
    r_headers.appendChild(h2);
    
    r_addH.appendChild(d1);
    r_addH.appendChild(go_btn);
    r_addH.appendChild(d2);
    
    this.interface.appendChild(r_headers);
    this.interface.appendChild(r_addH);
    
    
    /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                FONCTIONS
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
    
    
    //Fonction d'implentation de l'interface
    this.implement = function(obj) { obj.appendChild(this.interface) };
    
    //-------------- Ajout d'handicap ----------------
    function addHandicap(args) { //args[0] : objet Player / args[1] : Int niveau du handicap / args[2] : objet HTML (th) pour mise à jour du contenu / args[3] : bloc choix handicap à supprimer
        var h_select = handicaps_list[args[1]][parseInt(Math.random() * handicaps_list[args[1]].length)]; //Génération du handicap en fonction de niveau de handicap donné (args[1])
        m.setPlayerHandicap(args[0], handicaps_list[args[1]][handicaps_list[args[1]].indexOf(h_select)], args[1] + 1); //Mise en place du handicap pour le joueur
        var han_text = document.createElement("span");
        han_text.classList.add("player_handicap");
        han_text.appendChild(document.createTextNode(h_select));
        args[2].appendChild(han_text); //Affichage du handicap généré
        args[3].innerHTML = ""; //Suppression du menu de choix du handicap
    }
    
    function match_start() {
        go_btn.innerHTML = "OVER";
        go_btn.onclick = match_stop;
        m.startMatch();
    }
    function match_stop() {
        m.stopMatch();
    }
        //Event listeners
    this.p1_addHandicap_l1.onclick = addHandicap.bind(this, [this._p1, 0, this.player1, d1]);
    this.p1_addHandicap_l2.onclick = addHandicap.bind(this, [this._p1, 1, this.player1, d1]);
    this.p1_addHandicap_l3.onclick = addHandicap.bind(this, [this._p1, 2, this.player1, d1]);
    
    this.p2_addHandicap_l1.onclick = addHandicap.bind(this, [this._p2, 0, this.player2, d2]);
    this.p2_addHandicap_l2.onclick = addHandicap.bind(this, [this._p2, 1, this.player2, d2]);
    this.p2_addHandicap_l3.onclick = addHandicap.bind(this, [this._p2, 2, this.player2, d2]);
    
    go_btn.onclick = match_start;
}