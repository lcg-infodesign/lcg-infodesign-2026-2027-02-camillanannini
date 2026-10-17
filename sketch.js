function setup(){
  createCanvas (windowWidth, windowHeight); //rende la canvas larga e alta quanto la finestra di visualizzazione
  background(255,255,255); //colore di sfondo
  angleMode(DEGREES); //converto in gradi i radianti come unità di riferimento

 


//creo la griglia
  let numeroTorte = 100//decido il numero delle torte sullo schermo
  let numeroColonne = ceil(sqrt(numeroTorte)); //il numero delle colonne è dato dalla radice quadrata del numero delle torte arrotondato per eccesso con ceil
  let numeroRighe = ceil(numeroTorte/numeroColonne); //il numero delle righe è dato dal numero delle torte / il numero delle colonne,per capire quante righe creare percontenere tutti i 100 eleemnti
  let larghezzaColonna = windowWidth/numeroColonne; //divido la larghezza totale della finestra per il numero delle colonne (arrotondato per eccesso)
  let altezzaRiga = windowHeight/numeroRighe; //divido l'altezza della finestra per il numero ttoale delle righe 
  //quindi trovo larghezza e altezza di ogni colonna e riga

  
//spiego come devono disporsi le torte 
  let xCorrente = 0;
  let yCorrente = 0;

  for (let i=0; i<numeroTorte; i++){
    disegnoTorta(xCorrente + larghezzaColonna / 2, yCorrente + altezzaRiga/1.3, altezzaRiga * 0.8); 
  //xCorrente +larghezzacolonna/2 é il punto di partenza dal margine sinistro della cella 
  // yCorrente + altezzariga/1.3 è il punto di partenza dal margine superiore
  //QUINDI LA TORTA STA AL CENTRO DELLA CELLA
  //poi dico che la dimensione della torta deve stare nell'altezza della riga *0.7, in modo che non si tocchino tutte l etorte, se mettevo 1, le torte si sarebbero toccate) = così la torta occupa il 70%della casella
    xCorrente = xCorrente + larghezzaColonna; 

    if (xCorrente >= windowWidth) {
      xCorrente = 0;
      yCorrente = yCorrente + altezzaRiga; 
    } //in questo caso dico che quando la torta si trova su una x che è maggiore della finestra, la facci tornare a 0 sulla x e la sposto in basso di una riga 
  }
  //la torta è disegnato prendendo come riferimento xCorrente e yCorrente e scrivendo /2 le metto al centro della cella
  //ogni volta che viene disegnata una torta, se ne aggiunge un'altra (finche il numero rimane minore del numero totale delle torte)
  //ogni volta che viene disegnata una torta, l'altra si aggiunge facendo un passo a destra (quindi la xCorrente viene aumentata di una larghezza di colonna)
  }

//qui il draw rimane vuoto perchè voglio che le torte vengano disegnate solo una volta
  function draw(){
   

  
  }

//disegno la torta
  function disegnoTorta(_x,_y,_size){ //i parametri nella parentesi tonda sono come dei contenitori vuoti, a cui noi poi associamo un valore
  push();
  translate(_x,_y); //sposto l'origine nel punto in cui voglio posizionare la torta
  rectMode(CENTER); //i rettangoli sono generati dal loro centro

  //rendo altezza della base della torta casuale, mentre la larghezza rimane fissa
  let altezzaSotto = random (_size*0.2, _size*0.4); //avendo giù messo il translate, non serve mettere le coordinate, sennò se le metto sarebbe come fare 2 volte translate
  let larghezzaSotto = _size*0.8 //devo lasciare sempre il _size, perchè sta nei parametri, lo moltiplico poi per 0.8 come se _size fosse 1

  //rendo altezza e larghezza della parte sopra della trota casuali
  let altezzaSopra = random (_size*0.08, _size*0.3);
  let larghezzaSopra = larghezzaSotto*random(0.5,0.8);

  //rendo altezza e larghezza della parte altissima della torta casuali
  let altezzaAlta = random (_size*0.06, _size*0.3);
  let larghezzaAlta = larghezzaSopra*random(0.5, 0.8);

  //rendo il colore della parte sotto e il colore della parte sopra
  let coloreSotto = color(random(100, 255), random(100,255), random(100,255));
  let coloreSopra = color(random (100,255), random (100,255), random (100,255));
  let coloreAlto = color(random (50,200), random (50,200), random (50,200));

  fill (coloreSotto); //sarebbbe come scrivere fill (random(100,255), random(100,255), random(100, 255))
  noStroke();
  rect(0,0,larghezzaSotto, altezzaSotto, 1); //lacio a 0 perchè c'è già il translate+ dimensioi + bordi arrotondati

  let ySopra = -(altezzaSotto/2 + altezzaSopra/2); //altezza sotto /2 è la distanza dal centro della base fino alla parte superiore, altezza sopra/2 è la distanza che va dal centro 
  //della parte sopra fino al bordo inferiore = se le sommo trovo la distanza tra il centro della base e il centro della parte sopra
  //aggiungo il - perchè la parte sopra  deve andare verso l'alto e appoggiarsi sul bordo superiore della base, sennò verebbe disegnato dentro la base
  fill(coloreSopra);
  rect(0, ySopra, larghezzaSopra, altezzaSopra, 1);


  let yAlta = ySopra-(altezzaSopra/2+altezzaAlta/2); //sarebe come [-(altezzaSotto/2 + altezzaSopra/2)]-(altezzaSopra/2+altezzaAlta/2) -- perchè y sopra mi porta già al secondo piano
  fill(coloreAlto);
  rect(0,yAlta, larghezzaAlta, altezzaAlta, 1);

//creo la candelina
  let altezzaCandela = _size*0.12;
  let larghezzaCandela= _size*0.03;
  let yCandelina = yAlta-(altezzaAlta/2+altezzaCandela/2);
  fill(255,0,0);
  noStroke();
  rect(0, yCandelina, larghezzaCandela, altezzaCandela, 0);

//creo la fiammella

let larghezzaFiammella = _size*0.04;
let altezzaFiammella = _size*0.08;
let yFiammella = yCandelina -(altezzaCandela/2+altezzaFiammella/2); 
//parto dal centro della candelina, come prima sottraggo meà altezza della candelina (e quindi arrivo sul bordo superiore della candelina)
// sottraggo ancora metà dell'altezza della fiamma, così che l'ellisse(che parte disegnata dal centro), abbia la base che appoggia sul bordo alto della candelina
fill(255,205,0);
noStroke();
ellipse(0, yFiammella, larghezzaFiammella, altezzaFiammella);


  pop();

  
}
