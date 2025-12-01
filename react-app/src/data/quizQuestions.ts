export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const quizQuestions: Question[] = [
  {
    "id": 1,
    "question": "Combien de joueurs une équipe peut-elle aligner sur le terrain pour jouer un point ?",
    "options": ["5 joueurs minimum", "6 joueurs", "7 joueurs maximum", "8 joueurs"],
    "correctAnswer": 2,
    "explanation": "Une équipe doit jouer avec 5 à 7 joueurs. 7 est le maximum autorisé."
  },
  {
    "id": 2,
    "question": "Quelle est la longueur maximale d’un match en points selon les règles standard ?",
    "options": ["11 points", "13 points", "15 points", "17 points"],
    "correctAnswer": 2,
    "explanation": "Un match standard se joue en 15 points."
  },
  {
    "id": 3,
    "question": "À quel moment la mi-temps est-elle atteinte ?",
    "options": ["5 points", "7 points", "8 points", "9 points"],
    "correctAnswer": 2,
    "explanation": "La mi-temps a lieu lorsque l'une des équipes marque 8 points."
  },
  {
    "id": 4,
    "question": "Qu’est-ce qui déclenche un ‘pull’ ?",
    "options": ["Après chaque turnover", "Au début du match, après la mi‑temps et après chaque point", "Après un temps-mort", "Uniquement au début du match"],
    "correctAnswer": 1,
    "explanation": "Le pull commence le jeu au début du match, après la mi-temps et après chaque point."
  },
  {
    "id": 5,
    "question": "Que peut faire le receveur si le pull atterrit hors-limites derrière la zone d’en-but ?",
    "options": ["Reprendre depuis la ligne de fond", "Appeler 'brick'", "Reprendre où le disque sort", "Relancer le pull"],
    "correctAnswer": 1,
    "explanation": "Si le pull sort à moins de 20 m de la zone ou derrière, le receveur peut appeler 'brick'."
  },
  {
    "id": 6,
    "question": "Où se situe le point de brick ?",
    "options": ["Au milieu du terrain, 10 m devant la ligne de but", "Au milieu du terrain, 20 m devant la ligne de but", "Sur la ligne médiane", "À 15 m du bord de touche"],
    "correctAnswer": 1,
    "explanation": "La marque de brick est au centre, à une distance égale à la profondeur de l’en‑but (20 m standard)."
  },
  {
    "id": 7,
    "question": "Qui peut appeler une faute (‘foul’) ?",
    "options": ["N’importe quel joueur sur le terrain", "Seulement le lanceur", "Uniquement le joueur qui subit la faute", "Le capitaine"],
    "correctAnswer": 2,
    "explanation": "Seul le joueur qui subit la faute peut l’appeler."
  },
  {
    "id": 8,
    "question": "Combien de secondes séparent les annonces du marqueur lors du ‘stall count’ ?",
    "options": ["0,5 seconde", "1 seconde minimum", "2 secondes", "Il n’y a pas de durée imposée"],
    "correctAnswer": 1,
    "explanation": "Chaque nombre du stall count doit être espacé d'au moins une seconde."
  },
  {
    "id": 9,
    "question": "À quelle distance maximale un marqueur peut-il être du pivot pour compter ?",
    "options": ["1 mètre", "2 mètres", "3 mètres", "4 mètres"],
    "correctAnswer": 2,
    "explanation": "Le marqueur doit être à moins de 3 mètres du pivot."
  },
  {
    "id": 10,
    "question": "Que se passe-t-il si les joueurs ne s’accordent pas sur un appel ?",
    "options": ["Le capitaine décide", "On rejoue l'action", "Le disque revient au lanceur précédent", "On laisse l’arbitre trancher"],
    "correctAnswer": 2,
    "explanation": "En cas d'incertitude ou désaccord, le disque revient au lanceur précédent."
  },
  {
    "id": 11,
    "question": "Quelle règle correspond à une transgression sans contact ?",
    "options": ["Faute", "Infraction", "Violation", "Turnover automatique"],
    "correctAnswer": 1,
    "explanation": "Les infractions concernent le marquage et les travels, sans arrêt de jeu."
  },
  {
    "id": 12,
    "question": "Qu’est-ce qu’un ‘strip’ ?",
    "options": ["Un contact mineur", "Une infraction de marquage", "Une faute qui fait perdre le disque au joueur l’ayant attrapé", "Un turnover intentionnel"],
    "correctAnswer": 2,
    "explanation": "Un strip est une faute qui cause la perte du disque après une réception."
  },
  {
    "id": 13,
    "question": "Comment est considérée la ligne de périmètre ?",
    "options": ["Elle fait partie de l’aire de jeu", "Elle est hors‑limites", "Elle est neutre", "Elle est jouable si on saute depuis le terrain"],
    "correctAnswer": 1,
    "explanation": "Les lignes de périmètre ne font pas partie de l’aire de jeu, elles sont hors-limites."
  },
  {
    "id": 14,
    "question": "Qu’est-ce qu’un joueur en l’air conserve jusqu’à toucher le sol ?",
    "options": ["Son statut en‑jeu ou hors-limites", "Sa possession", "Son droit d’appeler une faute", "Rien du tout"],
    "correctAnswer": 0,
    "explanation": "Un joueur en l’air garde son statut en‑jeu/hors‑limites jusqu’au contact avec le sol."
  },
  {
    "id": 15,
    "question": "Quel joueur peut appeler une infraction de marquage ?",
    "options": ["N’importe qui", "L’entraîneur", "Le marqueur", "Le lanceur"],
    "correctAnswer": 3,
    "explanation": "Seul le lanceur peut appeler une infraction de marquage."
  },
  {
    "id": 16,
    "question": "Après un appel ‘pick’, à quel compte reprend-on ?",
    "options": ["Stall 1", "Stall 6 maximum", "Stall 8", "Stall 9"],
    "correctAnswer": 1,
    "explanation": "Après un pick, le compte reprend à un maximum de 6."
  },
  {
    "id": 17,
    "question": "Qu’est-ce qu’un turnover ?",
    "options": ["Une faute grave", "Un changement d’équipe en possession", "Une violation", "Une mise en jeu"],
    "correctAnswer": 1,
    "explanation": "Un turnover est tout événement qui donne la possession à l’autre équipe."
  },
  {
    "id": 18,
    "question": "Le pull est-il considéré comme une passe légitime ?",
    "options": ["Oui", "Non", "Oui s’il touche un attaquant", "Oui seulement en indoor"],
    "correctAnswer": 1,
    "explanation": "Le pull n'est jamais considéré comme une passe légitime."
  },
  {
    "id": 19,
    "question": "Que doit faire un joueur qui a un problème de blessure saignante ?",
    "options": ["Continuer à jouer", "Quitter le terrain immédiatement", "Résoudre le problème en 70 secondes", "Appeler un temps-mort automatique"],
    "correctAnswer": 2,
    "explanation": "Il dispose de 70 secondes pour régler le problème, sinon il doit sortir ou utiliser un temps-mort."
  },
  {
    "id": 20,
    "question": "Qui peut appeler une interruption technique (‘technical’) ?",
    "options": ["Uniquement le capitaine", "Uniquement le lanceur", "Tout joueur identifiant un danger", "L’équipe en défense uniquement"],
    "correctAnswer": 2,
    "explanation": "Tout joueur peut appeler un ‘technical’ en cas de danger."
  },
  {
    "id": 21,
    "question": "Quelle partie du terrain fait partie de la zone centrale ?",
    "options": ["Les zones d’en-but", "La zone centrale + lignes de but", "Seulement les lignes de périmètre", "Uniquement la partie entre les lignes médianes"],
    "correctAnswer": 1,
    "explanation": "La zone centrale inclut les lignes de but mais exclut zones d’en-but et lignes de périmètre."
  },
  {
    "id": 22,
    "question": "Quels objets marquent les coins du terrain selon les règles WFDF ?",
    "options": ["Des bâtons", "Des drapeaux", "Des cônes flexibles", "Des plots rigides"],
    "correctAnswer": 2,
    "explanation": "Les coins sont marqués par des objets flexibles, généralement des cônes en plastique."
  },
  {
    "id": 23,
    "question": "La ligne de périmètre est…",
    "options": ["En-jeu", "Hors-limites", "Partiellement en-jeu", "Neutre"],
    "correctAnswer": 1,
    "explanation": "Les lignes de périmètre ne font pas partie de l’aire de jeu et sont hors-limites."
  },
  {
    "id": 24,
    "question": "Que doit faire un joueur pour signaler un 'brick' ?",
    "options": ["Lever un bras et dire 'brick'", "Se placer au point de brick", "Reposer le disque au sol", "Rien, le brick est automatique"],
    "correctAnswer": 0,
    "explanation": "Le joueur doit lever un bras et annoncer 'brick' avant de ramasser le disque."
  },
  {
    "id": 25,
    "question": "Quand le jeu devient-il vivant ?",
    "options": ["Quand un joueur court", "Au moment du pull", "Quand un pivot est établi", "Après chaque turnover, dès que le pivot est posé"],
    "correctAnswer": 3,
    "explanation": "Le jeu devient vivant lorsque le pivot est établi après un pull ou turnover."
  },
  {
    "id": 26,
    "question": "Quelle est la distance minimale pour qu’un défenseur commette 'double team' ?",
    "options": ["Moins de 1 m", "Moins de 2 m", "Moins de 3 m", "Moins de 5 m"],
    "correctAnswer": 2,
    "explanation": "Un défenseur non marqueur à moins de 3 m du pivot commet 'double team'."
  },
  {
    "id": 27,
    "question": "Quelle infraction de marquage consiste à obstruer intentionnellement la vision du lanceur ?",
    "options": ["Straddle", "Wrapping", "Vision", "Double Team"],
    "correctAnswer": 2,
    "explanation": "L'infraction 'Vision' consiste à bloquer la vue du lanceur."
  },
  {
    "id": 28,
    "question": "Que doit faire le marqueur après une infraction de marquage non contestée ?",
    "options": ["Redémarrer à stall 1", "Reprendre au dernier nombre - 1", "Reprendre au même nombre", "Arrêter de compter 3 secondes"],
    "correctAnswer": 1,
    "explanation": "Le marqueur reprend au dernier nombre entièrement prononcé moins un."
  },
  {
    "id": 29,
    "question": "Un joueur hors-limites peut-il établir un pivot en touchant le sol ?",
    "options": ["Oui", "Non", "Oui si le disque est en l’air", "Oui seulement après un check"],
    "correctAnswer": 1,
    "explanation": "Pour établir un pivot, il faut être en-jeu."
  },
  {
    "id": 30,
    "question": "Qui peut appeler un 'offside' sur le pull ?",
    "options": ["Le capitaine", "N’importe quel attaquant ou défenseur", "Uniquement le puller", "Uniquement le marqueur"],
    "correctAnswer": 1,
    "explanation": "L’équipe adverse à la faute peut appeler 'offside'."
  },

  {
    "id": 31,
    "question": "Lors du pull, où doivent être les attaquants avant le lancer ?",
    "options": ["N’importe où dans leur zone d’en-but", "Avec un pied sur leur ligne de but", "À 3 m de la ligne de but", "Au point médian"],
    "correctAnswer": 1,
    "explanation": "Tous les attaquants doivent avoir un pied sur leur ligne de but."
  },
  {
    "id": 32,
    "question": "Le pull peut-il être effectué sans que les deux équipes lèvent la main ?",
    "options": ["Oui", "Non", "Seulement si les deux capitaines s’y accordent", "Seulement en indoor"],
    "correctAnswer": 1,
    "explanation": "Les deux équipes doivent signaler qu’elles sont prêtes en levant la main."
  },
  {
    "id": 33,
    "question": "Que se passe-t-il si une équipe se met volontairement en retard pour checker le disque ?",
    "options": ["Rien", "Turnover automatique", "Avertissement 'delay of game'", "Stall count direct"],
    "correctAnswer": 2,
    "explanation": "Un avertissement 'delay of game' peut être donné."
  },
  {
    "id": 34,
    "question": "Quel élément fait partie du sol ?",
    "options": ["Un joueur", "Un vêtement", "Un cône", "L’air"],
    "correctAnswer": 2,
    "explanation": "Les cônes, équipements et non‑joueurs sont considérés comme le sol."
  },
  {
    "id": 35,
    "question": "Une passe déviée par un défenseur puis relâchée par un attaquant provoque…",
    "options": ["Une faute automatique", "Un turnover", "Un strip", "Une infraction"],
    "correctAnswer": 1,
    "explanation": "Une passe incomplète est un turnover, peu importe la déviation."
  },
  {
    "id": 36,
    "question": "Quand un joueur peut-il appeler 'pick' ?",
    "options": ["S’il est empêché de défendre un attaquant par un contact", "S’il doit changer de trajectoire à cause d’un écran non-contact", "Seulement après un turnover", "Seulement dans la zone d’en-but"],
    "correctAnswer": 1,
    "explanation": "'Pick' concerne un écran sans contact gênant la défense."
  },
  {
    "id": 37,
    "question": "Après un pick, que font les joueurs ?",
    "options": ["Ils reviennent tous au pivot", "Ils reprennent leur position quand l’appel a été fait", "Ils restent où ils sont", "Ils retournent à leur position 10 secondes avant"],
    "correctAnswer": 1,
    "explanation": "Les joueurs reprennent la position qu’ils occupaient au moment de l’appel."
  },
  {
    "id": 38,
    "question": "Un turnover siffle-t-il automatiquement la fin du jeu ?",
    "options": ["Oui", "Non", "Seulement en zone d’en‑but", "Uniquement si annoncé"],
    "correctAnswer": 1,
    "explanation": "Le jeu continue, un turnover ne met pas le jeu 'mort'."
  },
  {
    "id": 39,
    "question": "Un joueur peut-il se déplacer pendant un dead play ?",
    "options": ["Oui", "Non", "Seulement en attaque", "Seulement en défense"],
    "correctAnswer": 0,
    "explanation": "Les joueurs peuvent se déplacer sauf indication contraire."
  },
  {
    "id": 40,
    "question": "Si un joueur attrape le disque mais tombe hors-limites sans avoir un pied en-jeu, la possession est-elle valide ?",
    "options": ["Oui", "Non", "Oui si le disque n’a pas bougé", "Oui si l’arbitre valide"],
    "correctAnswer": 1,
    "explanation": "Il faut établir la possession avec un contact au sol en-jeu."
  },

  {
    "id": 41,
    "question": "Une faute de blocage implique…",
    "options": ["Aucun contact", "Un écran volontaire sans contact", "Un contact non mineur lié à une position inévitable", "Un contest automatique"],
    "correctAnswer": 2,
    "explanation": "La faute de blocage survient si un joueur prend une position inévitablement dangereuse."
  },
  {
    "id": 42,
    "question": "Une faute 'force-out' concerne…",
    "options": ["Un joueur poussé hors-limites", "Un lanceur dont le disque est touché", "Un réceptionneur empêché de retomber en-jeu", "Un pick"],
    "correctAnswer": 2,
    "explanation": "La faute force-out empêche un joueur d’établir la possession en-jeu."
  },
  {
    "id": 43,
    "question": "Si une faute est acceptée et qu’elle aurait donné un point, que se passe-t-il ?",
    "options": ["Le point est annulé", "Le disque revient au lanceur", "Le point est accordé", "On rejoue l’action"],
    "correctAnswer": 2,
    "explanation": "En cas de strip sur une réception de point, le point est accordé."
  },
  {
    "id": 44,
    "question": "Que signifie ‘travel’ ?",
    "options": ["Un déplacement illégal du pivot", "Marcher avec le disque intentionnellement", "Changer de pivot sans lancer", "Tout mouvement du lanceur"],
    "correctAnswer": 0,
    "explanation": "Le travel concerne le pivot ou le déplacement du lanceur."
  },
  {
    "id": 45,
    "question": "En cas de travel contesté, que fait-on ?",
    "options": ["Turnover", "Stall reset à 6", "Retour au lanceur", "Reprise du jeu immédiate"],
    "correctAnswer": 2,
    "explanation": "Le disque revient au lanceur en cas de contest."
  },
  {
    "id": 46,
    "question": "Un temps-mort peut-il être demandé lorsqu’un joueur n’a pas le disque ?",
    "options": ["Oui", "Non", "Oui seulement en défense", "Oui mais contestable"],
    "correctAnswer": 1,
    "explanation": "Seul le joueur en possession peut appeler un temps-mort."
  },
  {
    "id": 47,
    "question": "Combien de temps dure une interruption 'injury' ?",
    "options": ["30 s", "60 s", "70 s", "90 s"],
    "correctAnswer": 2,
    "explanation": "Une interruption pour blessure donne 70 secondes au joueur."
  },
  {
    "id": 48,
    "question": "Si un pull est touché par un attaquant avant de sortir hors-limites, où joue-t-on ?",
    "options": ["Au point de brick", "Sur la ligne de fond", "À l’endroit où il a traversé la ligne", "On rejoue le pull"],
    "correctAnswer": 2,
    "explanation": "Le pivot se fait où le disque a d'abord traversé la ligne de périmètre."
  },
  {
    "id": 49,
    "question": "L’Esprit du Jeu encourage…",
    "options": ["Les contacts contrôlés", "La compétition sans limites", "Le fair-play et l’auto-arbitrage", "La pression du public"],
    "correctAnswer": 2,
    "explanation": "L’Esprit du Jeu met l’accent sur le respect et l’auto-arbitrage."
  },
  {
    "id": 50,
    "question": "Qui peut appeler une violation ?",
    "options": ["Uniquement les capitaines", "Tout joueur", "Seulement le lanceur", "Seulement le marqueur"],
    "correctAnswer": 1,
    "explanation": "Toute violation peut être appelée par n’importe quel joueur."
  },

  {
    "id": 51,
    "question": "Quelle est la taille standard d’une endzone WFDF ?",
    "options": ["15 m", "20 m", "25 m", "30 m"],
    "correctAnswer": 1,
    "explanation": "Les endzones WFDF standard font 20 m de profondeur."
  },
  {
    "id": 52,
    "question": "Une passe 'thrown away' est…",
    "options": ["Une faute", "Une violation", "Un turnover", "Une action normale sans conséquence"],
    "correctAnswer": 2,
    "explanation": "Une passe ratée par le lanceur est un turnover."
  },
  {
    "id": 53,
    "question": "Le marqueur commence le compte en disant…",
    "options": ["« Stall »", "« Compté »", "« Stalling »", "« Un » directement"],
    "correctAnswer": 2,
    "explanation": "Le marqueur doit annoncer clairement « stalling » avant de compter."
  },
  {
    "id": 54,
    "question": "Un joueur doit-il rester immobile lors d’un check ?",
    "options": ["Oui", "Non", "Oui mais seulement en défense", "Non sauf en endzone"],
    "correctAnswer": 0,
    "explanation": "Tous les joueurs doivent rester immobiles pendant le check."
  },
  {
    "id": 55,
    "question": "Après un arrêt de jeu non lié au lanceur, le stall reprend à…",
    "options": ["1", "6", "8", "9"],
    "correctAnswer": 1,
    "explanation": "Après la plupart des appels, le stall reprend à un maximum de 6."
  },
  {
    "id": 56,
    "question": "Quand un joueur peut-il appeler 'play on' ?",
    "options": ["Quand il veut accélérer le jeu", "Quand il fait un appel mais garde la possession", "Quand une faute est contestée", "Jamais, c’est réservé aux arbitres"],
    "correctAnswer": 1,
    "explanation": "'Play on' est annoncé quand le joueur appelant conserve la possession."
  },
  {
    "id": 57,
    "question": "Une réception valide doit inclure…",
    "options": ["Deux pieds au sol", "Un pied ou partie du corps en-jeu", "Le disque tenu 3 secondes", "Le disque tenu sans mouvement"],
    "correctAnswer": 1,
    "explanation": "Il suffit d’un contact en‑jeu pour établir la possession."
  },
  {
    "id": 58,
    "question": "Si un non-joueur gêne une action à moins de 3 m du terrain…",
    "options": ["On ignore", "C’est une faute", "C’est une violation", "On refait le point"],
    "correctAnswer": 2,
    "explanation": "Un joueur peut appeler une violation."
  },
  {
    "id": 59,
    "question": "Un disque en l’air touché par un joueur hors-limites est…",
    "options": ["Hors-limites immédiatement", "Encore jouable", "Turnover automatique", "Validé si rattrapé ensuite"],
    "correctAnswer": 0,
    "explanation": "Tout contact d’un joueur hors-limites rend le disque hors-limites immédiatement."
  },
  {
    "id": 60,
    "question": "Une équipe peut-elle faire des remplacements pendant un point ?",
    "options": ["Oui", "Non", "Oui si accord des deux équipes", "Uniquement en cas de blessure"],
    "correctAnswer": 1,
    "explanation": "Les remplacements ne sont autorisés qu’entre les points."
  },

  {
    "id": 61,
    "question": "Une violation de marquage peut-elle être contestée ?",
    "options": ["Oui", "Non", "Seulement par le capitaine", "Seulement par le marqueur"],
    "correctAnswer": 0,
    "explanation": "Une infraction peut être contestée par la défense."
  },
  {
    "id": 62,
    "question": "Un joueur peut-il attraper le disque et le relâcher immédiatement sans perdre la possession ?",
    "options": ["Oui", "Non", "Oui s’il dit 'possession'", "Oui mais seulement en zone centrale"],
    "correctAnswer": 0,
    "explanation": "Un joueur peut ajuster sa prise tant qu’il reste en contact avec le disque."
  },
  {
    "id": 63,
    "question": "Qui doit expliquer une transgression à un joueur débutant ?",
    "options": ["Son capitaine uniquement", "Les adversaires uniquement", "Les joueurs expérimentés", "Personne"],
    "correctAnswer": 2,
    "explanation": "Les joueurs expérimentés doivent aider à expliquer les règles."
  },
  {
    "id": 64,
    "question": "Une passe qui touche le sol avant d’être rattrapée devient…",
    "options": ["Une faute", "Une réception valide", "Un turnover", "Une violation"],
    "correctAnswer": 2,
    "explanation": "Si la passe touche le sol, elle est incomplète et cause un turnover."
  },
  {
    "id": 65,
    "question": "Un joueur peut-il appeler 'fast count' ?",
    "options": ["Oui", "Non", "Seulement si le stall < 1 seconde", "Seulement le capitaine"],
    "correctAnswer": 0,
    "explanation": "Fast count est une infraction de marquage appelable par le lanceur."
  },
  {
    "id": 66,
    "question": "Après un fast count non contesté, le stall…",
    "options": ["Reprend à 1", "Reprend au même nombre", "Reprend au dernier nombre -1", "Est annulé"],
    "correctAnswer": 2,
    "explanation": "Comme toute infraction de marquage, il reprend au nombre précédent - 1."
  },
  {
    "id": 67,
    "question": "Un joueur qui attrape le disque et atterrit sur un cône est…",
    "options": ["En-jeu", "Hors-limites", "Il doit lancer immédiatement", "Il peut choisir"],
    "correctAnswer": 1,
    "explanation": "Les cônes font partie du sol et sont hors-limites."
  },
  {
    "id": 68,
    "question": "Un joueur peut-il lancer un disque retourné accidentellement par un chien ?",
    "options": ["Oui", "Non", "Oui si la trajectoire n’a pas changé", "Uniquement si contesté"],
    "correctAnswer": 1,
    "explanation": "Un non-joueur rendant un disque hors de contrôle annule la légitimité de l’action."
  },
  {
    "id": 69,
    "question": "Une obstruction intentionnelle sans contact est…",
    "options": ["Un pick", "Une faute", "Une violation", "Un turnover"],
    "correctAnswer": 0,
    "explanation": "Un pick est un écran sans contact gênant un défenseur."
  },
  {
    "id": 70,
    "question": "Si une infraction de marquage est contestée et une passe est complétée…",
    "options": ["La réception compte", "Le disque revient au lanceur", "Turnover", "Le stall repart à 1"],
    "correctAnswer": 1,
    "explanation": "Elle est traitée comme une violation par l’attaque et le disque revient au lanceur."
  },

  {
    "id": 71,
    "question": "Un joueur peut-il appeler faute s’il a initié le contact ?",
    "options": ["Oui", "Non", "Oui mais le point est annulé", "Oui seulement si blessure"],
    "correctAnswer": 1,
    "explanation": "Il faut subir la faute pour l'appeler."
  },
  {
    "id": 72,
    "question": "Un lancer bloqué par la marque et tombant au sol est…",
    "options": ["Une faute", "Un turnover", "Une violation", "Autorisé"],
    "correctAnswer": 1,
    "explanation": "Une passe bloquée au sol est un turnover."
  },
  {
    "id": 73,
    "question": "Une endzone fait-elle partie de la zone centrale ?",
    "options": ["Oui", "Non", "Uniquement en indoor", "Uniquement après un point"],
    "correctAnswer": 1,
    "explanation": "Les endzones ne font pas partie de la zone centrale."
  },
  {
    "id": 74,
    "question": "Un joueur sautant depuis l’aire de jeu et attrapant un disque hors-limites est…",
    "options": ["En-jeu", "Hors-limites", "Possession valide", "Action illégale"],
    "correctAnswer": 1,
    "explanation": "Le premier contact au sol en-limites détermine le statut, ici hors-limites."
  },
  {
    "id": 75,
    "question": "Quand peut-on appeler 'equipment' ?",
    "options": ["Pour réparer son équipement", "Pour arrêter le jeu", "Jamais", "Uniquement en zone centrale"],
    "correctAnswer": 0,
    "explanation": "On peut prolonger une interruption mais pas l'appeler pour arrêter le jeu."
  },
  {
    "id": 76,
    "question": "Si le disque est touché par un défenseur puis rattrapé à terre, c’est…",
    "options": ["Une faute", "Une réception valide", "Un turnover", "Une violation"],
    "correctAnswer": 2,
    "explanation": "Une passe incomplète est un turnover même si déviée."
  },
  {
    "id": 77,
    "question": "Un joueur doit repositionner son pivot…",
    "options": ["Uniquement si demandé", "S’il a bougé illégalement", "Jamais", "Seulement après un point"],
    "correctAnswer": 1,
    "explanation": "En cas de travel, le joueur doit replacer son pivot."
  },
  {
    "id": 78,
    "question": "Peut-on attraper un disque sur ses vêtements ?",
    "options": ["Oui", "Non", "Oui si le vêtement est serré", "Seulement si on garde la possession 3 s"],
    "correctAnswer": 1,
    "explanation": "On ne peut pas utiliser un vêtement ou objet pour aider une réception."
  },
  {
    "id": 79,
    "question": "Si une équipe refuse le pull en restant immobile malgré readiness, c’est…",
    "options": ["Legal", "Delay of game", "Turnover", "Foul"],
    "correctAnswer": 1,
    "explanation": "Un retard injustifié peut déclencher un avertissement delay of game."
  },
  {
    "id": 80,
    "question": "Que signifie 'live disc' ?",
    "options": ["Le disque est au sol", "Le jeu peut repartir", "Le jeu est arrêté", "Le disque est hors‑limites"],
    "correctAnswer": 1,
    "explanation": "Un disque live signifie que le jeu est vivant et qu’une erreur peut causer un turnover."
  },
  {
    "id": 81,
    "question": "Un joueur peut-il appeler faute sur un contact mineur sans impact sur le jeu ?",
    "options": ["Oui", "Non", "Oui si en défense", "Oui si en attaque"],
    "correctAnswer": 1,
    "explanation": "Une faute doit affecter le jeu pour être appelée."
  },
  {
    "id": 82,
    "question": "Quel joueur peut contester une faute ?",
    "options": ["N’importe qui", "Le capitaine uniquement", "Le joueur impliqué", "Les coachs"],
    "correctAnswer": 2,
    "explanation": "Seul le joueur directement impliqué peut contester."
  },
  {
    "id": 83,
    "question": "Si le disque touche un arbre hors-limites avant de revenir en-jeu, il est…",
    "options": ["En-jeu", "Hors-limites", "Contestable", "Il faut rejouer la passe"],
    "correctAnswer": 1,
    "explanation": "Tout contact hors-limites rend le disque hors-limites."
  },
  {
    "id": 84,
    "question": "Qui décide de reprendre un match après un 'Spirit stoppage' ?",
    "options": ["Le capitaine spirit", "Les capitaines des deux équipes", "Un arbitre", "Le public"],
    "correctAnswer": 1,
    "explanation": "Les deux capitaines doivent s’accorder."
  },
  {
    "id": 85,
    "question": "Un joueur qui perd brièvement le contact avec le disque pendant une réception mais le rattrape en-jeu…",
    "options": ["Perd la possession", "Fait un turnover", "Garde la possession", "Fait une infraction"],
    "correctAnswer": 2,
    "explanation": "La possession nécessite un contrôle continu jusqu’au contact au sol."
  },
  {
    "id": 86,
    "question": "Un défenseur peut-il rester immobile dans la trajectoire d’un attaquant ?",
    "options": ["Oui si la position n'est pas dangereuse", "Non", "Oui toujours", "Oui seulement en endzone"],
    "correctAnswer": 0,
    "explanation": "Il doit éviter les contacts non mineurs mais peut occuper légalement un espace."
  },
  {
    "id": 87,
    "question": "Une passe tentée après un appel sur le lanceur doit…",
    "options": ["Être stoppée", "Continuer jusqu’à la possession", "Être retournée automatiquement", "Donner un turnover"],
    "correctAnswer": 1,
    "explanation": "Le jeu continue jusqu’à la possession."
  },
  {
    "id": 88,
    "question": "Le disque peut-il être lancé avant le check ?",
    "options": ["Oui", "Non", "Oui si en défense", "Oui si le stall est bas"],
    "correctAnswer": 1,
    "explanation": "Un check est nécessaire pour reprendre le jeu."
  },
  {
    "id": 89,
    "question": "Dans quel cas parle-t-on de 'dead disc' ?",
    "options": ["Le disque vole", "Il y a une remise en jeu", "Le jeu est arrêté", "Un turnover vient d’avoir lieu"],
    "correctAnswer": 2,
    "explanation": "Le jeu est arrêté et aucun turnover ne peut se produire."
  },
  {
    "id": 90,
    "question": "Un joueur peut-il attraper le disque en plongeant hors du terrain puis revenir en-jeu sans lâcher le disque ?",
    "options": ["Oui", "Non", "Oui si la zone est centrale", "Oui si le lanceur le dit"],
    "correctAnswer": 1,
    "explanation": "Dès qu’il touche le sol hors-limites, la possession n’est plus valide."
  },

  {
    "id": 91,
    "question": "Si un joueur met du temps à se remettre en position pendant un check, c’est…",
    "options": ["Autorisé", "Une violation", "Un delay of game potentiel", "Une faute"],
    "correctAnswer": 2,
    "explanation": "Un retard peut provoquer un avertissement delay of game."
  },
  {
    "id": 92,
    "question": "Qui décide si un appel de faute a influencé le résultat ?",
    "options": ["Le capitaine", "Le lanceur", "Les joueurs directement impliqués", "Les spectateurs"],
    "correctAnswer": 2,
    "explanation": "Les joueurs impliqués doivent s'accorder."
  },
  {
    "id": 93,
    "question": "Une interception en l’air suivie d’un contact hors-limites sans toucher le sol est…",
    "options": ["En-jeu", "Hors-limites", "Contestable", "Turnover automatique"],
    "correctAnswer": 0,
    "explanation": "Le statut dépend du sol ; tant qu’on ne touche pas le sol, on conserve son statut."
  },
  {
    "id": 94,
    "question": "Un joueur peut-il utiliser un adversaire pour se stabiliser en réception ?",
    "options": ["Oui", "Non", "Oui si l’adversaire est d’accord", "Oui uniquement en indoor"],
    "correctAnswer": 1,
    "explanation": "On ne peut pas utiliser un adversaire comme appui."
  },
  {
    "id": 95,
    "question": "Un capitaine peut-il contester à la place d’un joueur ?",
    "options": ["Oui", "Non", "Oui si c’est une faute grave", "Oui seulement en mixte"],
    "correctAnswer": 1,
    "explanation": "Seul le joueur impliqué peut contester."
  },
  {
    "id": 96,
    "question": "Un lancer renversé par le vent qui revient vers le lanceur peut-il être rejoué ?",
    "options": ["Oui", "Non, turnover", "Oui si le lanceur le rattrape", "Uniquement en indoor"],
    "correctAnswer": 1,
    "explanation": "Une passe ratée volontairement ou non est un turnover."
  },
  {
    "id": 97,
    "question": "Si un joueur glisse et percute un adversaire sans intention…",
    "options": ["Pas de faute", "Faute si impact sur le jeu", "Violation", "Pick"],
    "correctAnswer": 1,
    "explanation": "Une faute dépend de l'impact et non de l'intention."
  },
  {
    "id": 98,
    "question": "Une équipe peut-elle jouer sans capitaine spirit ?",
    "options": ["Oui", "Non", "Oui mais avec sanction", "Uniquement en amical"],
    "correctAnswer": 1,
    "explanation": "Chaque équipe doit désigner un capitaine et un capitaine spirit."
  },
  {
    "id": 99,
    "question": "Qu’est-ce qu’un turnover 'callahan' ?",
    "options": ["Un point marqué en défense par interception dans l’endzone adverse", "Un point refusé", "Un turnover sur pull", "Un point marqué après contest"],
    "correctAnswer": 0,
    "explanation": "Un callahan est une interception défensive directement dans la endzone attaquée."
  },
  {
    "id": 100,
    "question": "Le stall count maximal est…",
    "options": ["8", "9", "10", "11"],
    "correctAnswer": 2,
    "explanation": "Le stall count va de 1 à 10."
  },
  {
    "id": 101,
    "question": "Quelle équipe effectue le pull après qu’un point est marqué ?",
    "options": ["L’équipe qui a marqué", "L’équipe qui a encaissé", "L’équipe choisie par le capitaine", "L’équipe en défense au point précédent"],
    "correctAnswer": 0,
    "explanation": "Après chaque point, l’équipe qui vient de marquer passe en défense et effectue le pull."
  },
  {
    "id": 102,
    "question": "Quand un turnover se produit-il officiellement ?",
    "options": ["Quand un joueur appelle turnover", "Quand le disque touche le sol", "Quand le capitaine le dit", "Quand les deux équipes l’acceptent"],
    "correctAnswer": 1,
    "explanation": "Un turnover survient automatiquement lorsque le disque touche le sol sans être contrôlé."
  },
  {
    "id": 103,
    "question": "Un joueur peut-il plonger dans la zone d’endzone pour marquer ?",
    "options": ["Oui", "Non", "Seulement si personne n’est autour", "Seulement en indoor"],
    "correctAnswer": 0,
    "explanation": "Plonger (layout) est autorisé s’il n’y a pas de contact dangereux."
  },
  {
    "id": 104,
    "question": "Quelle est la seule action autorisée avec une main pour signaler readiness au pull ?",
    "options": ["Faire un signe circulaire", "Lever la main", "Frapper dans les mains", "Pointer le disque"],
    "correctAnswer": 1,
    "explanation": "Les joueurs doivent lever la main pour signaler qu'ils sont prêts."
  },
  {
    "id": 105,
    "question": "Qu’arrive-t-il si un pull tombe directement au sol dans la endzone attaquante sans être touché ?",
    "options": ["Turnover", "Le disque est placé au milieu de la endzone", "Le disque est joué du point où il s’est arrêté", "Le disque est joué depuis la ligne de but"],
    "correctAnswer": 3,
    "explanation": "Si le pull atterrit dans la endzone, sans contact, l’attaque joue depuis la ligne de but."
  },
  {
    "id": 106,
    "question": "Que se passe-t-il si le marqueur commence le stall à plus de 3 mètres du pivot ?",
    "options": ["Rien", "C’est une infraction de marquage", "Turnover immédiat", "Le lanceur doit appeler 'travel'"],
    "correctAnswer": 1,
    "explanation": "Le marqueur doit être à moins de 3 m pour compter."
  },
  {
    "id": 107,
    "question": "Quel est le mot nécessaire pour signaler un appel de faute ?",
    "options": ["Stop", "Faute", "Ahhhh", "Contact"],
    "correctAnswer": 1,
    "explanation": "Le mot standard est « faute »."
  },
  {
    "id": 108,
    "question": "À quel moment les attaquants peuvent-ils échanger de position pendant le pull ?",
    "options": ["À tout moment", "Jamais", "Une fois que le pull est lancé", "Avant le readiness"],
    "correctAnswer": 2,
    "explanation": "Ils doivent rester immobiles jusqu’au moment du pull, mais peuvent bouger ensuite."
  },
  {
    "id": 109,
    "question": "Le marqueur doit annoncer chaque nombre du stall…",
    "options": ["À haute voix et distinctement", "En murmurant", "Avec contact visuel obligatoire", "En levant la main"],
    "correctAnswer": 0,
    "explanation": "Les règles exigent une communication claire et audible."
  },
  {
    "id": 110,
    "question": "Si une faute se produit sur le lanceur pendant un mouvement de lancer…",
    "options": ["Le jeu s’arrête immédiatement", "Le jeu continue jusqu’à possession", "Turnover automatique", "Reprise à stall 1"],
    "correctAnswer": 1,
    "explanation": "Le jeu continue jusqu’à ce que la possession soit établie."
  },

  {
    "id": 111,
    "question": "Une passe qui rebondit sur un défenseur avant d’aller hors-limites est…",
    "options": ["Valide", "Un turnover", "Une faute", "Une violation"],
    "correctAnswer": 1,
    "explanation": "Même déviée, une passe sortie hors-limites est un turnover."
  },
  {
    "id": 112,
    "question": "Quel joueur effectue le check pour reprendre le jeu ?",
    "options": ["Le joueur le plus proche du disc", "Le lanceur uniquement", "Le marqueur ou le joueur en possession", "Le capitaine"],
    "correctAnswer": 2,
    "explanation": "Le check se fait entre le lanceur et le marqueur."
  },
  {
    "id": 113,
    "question": "Si un joueur appelle 'injury' mais que la blessure n’est pas causée par un adversaire, que se passe-t-il ?",
    "options": ["Rien", "Il doit sortir ou prendre un temps-mort", "Son équipe gagne la possession", "On conteste l’appel"],
    "correctAnswer": 1,
    "explanation": "Le joueur doit sortir ou utiliser un temps-mort."
  },
  {
    "id": 114,
    "question": "Si une équipe appelle deux offsides consécutifs contre la même équipe, que peut-elle faire ?",
    "options": ["Rien", "Recommencer le pull", "Faire commencer le stall à 0", "Faire avancer ou reculer le disque"],
    "correctAnswer": 1,
    "explanation": "Elle peut faire recommencer le pull."
  },
  {
    "id": 115,
    "question": "Un lancer où le disque ne tourne pas est-il légal ?",
    "options": ["Oui", "Non", "Uniquement s’il a un angle positif", "Uniquement en indoor"],
    "correctAnswer": 0,
    "explanation": "Les règles n’imposent aucune rotation au disque."
  },
  {
    "id": 116,
    "question": "Un joueur qui contacte le disque avec deux mains…",
    "options": ["Est en faute", "Fait une violation", "Est autorisé", "Commence un turnover"],
    "correctAnswer": 2,
    "explanation": "Il est légal d’attraper avec deux mains."
  },
  {
    "id": 117,
    "question": "Lorsqu’une faute est contestée, le disque…",
    "options": ["Reste avec le réceptionneur", "Va au défenseur", "Retourne au lanceur", "Est relancé"],
    "correctAnswer": 2,
    "explanation": "Une faute contestée renvoie le disque au lanceur."
  },
  {
    "id": 118,
    "question": "Quel type de contact est toléré ?",
    "options": ["Aucun", "Tout contact léger", "Contact mineur simultané sans impact", "Contact avec les vêtements"],
    "correctAnswer": 2,
    "explanation": "Les contacts mineurs simultanés sont acceptés."
  },
  {
    "id": 119,
    "question": "Quand un défenseur peut-il appeler 'strip' ?",
    "options": ["Jamais", "S’il arrache le disque à un attaquant", "Si le lanceur lâche le disque trop vite", "Si un contact le gêne"],
    "correctAnswer": 0,
    "explanation": "Seul l’attaquant peut appeler un strip."
  },
  {
    "id": 120,
    "question": "Un disque bloqué par un défenseur et qui reste en l'air est…",
    "options": ["Mort", "Encore jouable", "Turnover automatique", "Violation"],
    "correctAnswer": 1,
    "explanation": "Tant qu’il ne touche pas le sol, il peut être rattrapé."
  },

  {
    "id": 121,
    "question": "Une endzone compte-t-elle comme hors-limites ?",
    "options": ["Oui", "Non", "Seulement après un point", "Seulement en mixte"],
    "correctAnswer": 1,
    "explanation": "L’endzone fait partie de l’aire de jeu."
  },
  {
    "id": 122,
    "question": "Un joueur peut-il courir avec le disque en l'air après l’avoir intercepté ?",
    "options": ["Oui", "Non", "Seulement 3 pas", "Seulement dans l’endzone"],
    "correctAnswer": 0,
    "explanation": "La règle interdit de courir avec le disque au sol, pas en l'air avant l’atterrissage."
  },
  {
    "id": 123,
    "question": "Un défenseur peut-il annoncer le compte pour remplacer le marqueur ?",
    "options": ["Oui", "Non", "Seulement en zone d’en‑but", "Oui si moins de 3 m du disque"],
    "correctAnswer": 0,
    "explanation": "Un nouveau défenseur peut devenir marqueur en prenant la position."
  },
  {
    "id": 124,
    "question": "L’équipe en attaque peut-elle demander un 'spirit stoppage' ?",
    "options": ["Oui", "Non", "Uniquement le capitaine spirit", "Uniquement si elle mène"],
    "correctAnswer": 0,
    "explanation": "Toute équipe peut en appeler un pour régler un problème d’Esprit."
  },
  {
    "id": 125,
    "question": "L’Esprit du jeu interdit…",
    "options": ["Les discussions calmes", "Les contestations", "Les contacts dangereux", "Les décisions rapides"],
    "correctAnswer": 2,
    "explanation": "La sécurité est prioritaire."
  },
  {
    "id": 126,
    "question": "Un lanceur peut-il pivoter sur un genou ?",
    "options": ["Oui", "Non", "Seulement si la marque est loin", "Seulement en intérieur"],
    "correctAnswer": 0,
    "explanation": "Il peut utiliser n’importe quelle partie du corps comme pivot."
  },
  {
    "id": 127,
    "question": "Que se passe-t-il si une équipe joue avec 8 joueurs sur le terrain ?",
    "options": ["Rien", "Turnover", "Violation 'too many players'", "Faute"],
    "correctAnswer": 2,
    "explanation": "C’est une violation d’avoir plus de 7 joueurs."
  },
  {
    "id": 128,
    "question": "Une passe touchée par un attaquant puis récupérée par un défenseur est…",
    "options": ["Valide", "Turnover", "Faute", "Violation"],
    "correctAnswer": 1,
    "explanation": "Une interception défensive est un turnover."
  },
  {
    "id": 129,
    "question": "Le stall peut-il être compté en courant autour du lanceur ?",
    "options": ["Oui", "Non", "Oui s’il reste à moins de 3 m", "Uniquement en zone centrale"],
    "correctAnswer": 2,
    "explanation": "Le marqueur doit rester à moins de 3 mètres."
  },
  {
    "id": 130,
    "question": "Le disque peut-il être lancé en arrière ?",
    "options": ["Oui", "Non", "Uniquement dans la zone centrale", "Seulement dans la zone d’en-but"],
    "correctAnswer": 0,
    "explanation": "On peut lancer dans n’importe quelle direction."
  },

  {
    "id": 131,
    "question": "Si le disque casse en deux pendant une passe…",
    "options": ["La passe continue", "Turnover immédiat", "Le point est annulé", "La passe est refaite"],
    "correctAnswer": 1,
    "explanation": "Un disque cassé cause un turnover."
  },
  {
    "id": 132,
    "question": "Un joueur peut-il sauter depuis hors-limites pour attraper un disque en‑jeu ?",
    "options": ["Oui", "Non", "Oui si personne ne le touche", "Oui si le disque sortait"],
    "correctAnswer": 1,
    "explanation": "Il faut être en‑jeu au moment du saut."
  },
  {
    "id": 133,
    "question": "Un joueur peut-il utiliser un cône pour ralentir sa chute ?",
    "options": ["Oui", "Non", "Oui si le cône est mou", "Seulement si le disque est en l'air"],
    "correctAnswer": 1,
    "explanation": "On ne peut pas utiliser un objet du terrain pour faciliter le mouvement."
  },
  {
    "id": 134,
    "question": "Une passe attrapée en même temps par deux joueurs est attribuée…",
    "options": ["À l’attaquant", "À la défense", "Au joueur le plus haut", "À personne"],
    "correctAnswer": 0,
    "explanation": "L’attaque gagne la possession lors d’une réception simultanée."
  },
  {
    "id": 135,
    "question": "Quel joueur peut appeler 'violation' ?",
    "options": ["Uniquement le lanceur", "Uniquement un arbitre", "Tout joueur", "Uniquement un capitaine"],
    "correctAnswer": 2,
    "explanation": "Toute violation peut être appelée par n’importe quel joueur."
  },
  {
    "id": 136,
    "question": "Un joueur peut-il établir un pivot avant de se relever ?",
    "options": ["Oui", "Non", "Uniquement en endzone", "Uniquement si contact avec un adversaire"],
    "correctAnswer": 0,
    "explanation": "S’il n’est pas debout, il peut pivoter avec n’importe quelle partie du corps."
  },
  {
    "id": 137,
    "question": "Un disque posé au sol après un arrêt de jeu sans check préalable est…",
    "options": ["Turnover", "Valide", "Violation", "Faute"],
    "correctAnswer": 2,
    "explanation": "Le jeu doit reprendre par un check."
  },
  {
    "id": 138,
    "question": "Si un joueur fait exprès de mal attraper pour avancer, c’est…",
    "options": ["Stratégique", "Autorisé", "Un travel", "Un pick"],
    "correctAnswer": 2,
    "explanation": "C’est explicitement un travel."
  },
  {
    "id": 139,
    "question": "Un joueur peut-il pousser un adversaire avant de sauter ?",
    "options": ["Oui", "Non", "Oui si léger", "Oui si le disque est contesté"],
    "correctAnswer": 1,
    "explanation": "Tout contact non mineur est une faute."
  },
  {
    "id": 140,
    "question": "Un joueur peut-il attraper le disque contre sa poitrine ?",
    "options": ["Oui", "Non", "Uniquement si le disque tourne lentement", "Uniquement en indoor"],
    "correctAnswer": 0,
    "explanation": "Attraper avec le corps est autorisé tant qu'il ne s’aide pas de ses vêtements."
  },

  {
    "id": 141,
    "question": "Une faute de réception est…",
    "options": ["Un contact illégal sur un réceptionneur", "Un catch raté", "Une violation", "Un turnover automatique"],
    "correctAnswer": 0,
    "explanation": "C’est une faute impliquant le joueur tentant une réception."
  },
  {
    "id": 142,
    "question": "Qui peut appel 'travel' ?",
    "options": ["Uniquement le défenseur le plus proche", "Uniquement le lanceur", "N’importe quel joueur de la défense", "N’importe quel joueur"],
    "correctAnswer": 3,
    "explanation": "Toute personne peut appeler un travel."
  },
  {
    "id": 143,
    "question": "Un joueur peut-il lancer avant que le marqueur dise 'disc in' ?",
    "options": ["Oui", "Non", "Oui si le stall commence", "Oui si le point précédent est contesté"],
    "correctAnswer": 1,
    "explanation": "Le lancer avant check est illégal."
  },
  {
    "id": 144,
    "question": "Une foul non contestée donne…",
    "options": ["Stall 1", "Retour au lanceur", "Placement où la faute s’est produite", "Stall 6"],
    "correctAnswer": 2,
    "explanation": "On replace les joueurs en fonction du moment de la faute."
  },
  {
    "id": 145,
    "question": "Un joueur peut-il attraper le disque entre les jambes ?",
    "options": ["Oui", "Non", "Uniquement s’il ne tombe pas", "Uniquement en attaque"],
    "correctAnswer": 0,
    "explanation": "Tous les moyens naturels du corps sont autorisés."
  },
  {
    "id": 146,
    "question": "Un joueur peut-il établir un pivot en étant assis ?",
    "options": ["Oui", "Non", "Uniquement en indoor", "Uniquement sur gazon"],
    "correctAnswer": 0,
    "explanation": "Il peut pivoter avec n’importe quelle partie du corps."
  },
  {
    "id": 147,
    "question": "Une passe laser touchant un défenseur au visage est…",
    "options": ["Une faute de l’attaque", "Une faute de la défense", "Un accident de jeu", "Un turnover immédiat"],
    "correctAnswer": 2,
    "explanation": "Aucun contact n’est initié par un joueur, donc c’est un accident."
  },
  {
    "id": 148,
    "question": "Si un joueur glisse au pivot et perd l’équilibre, c’est…",
    "options": ["Un travel", "Rien", "Une violation", "Un pick"],
    "correctAnswer": 1,
    "explanation": "Le pivot doit rester stable, mais un glissement n’est pas une faute tant que le pivot reste."
  },
  {
    "id": 149,
    "question": "Le stall repart à 1 quand…",
    "options": ["Après une foul acceptée par la défense", "Après un pick", "Après une violation", "Après une contestation"],
    "correctAnswer": 0,
    "explanation": "Une foul acceptée par la défense remet le stall à 1."
  },
  {
    "id": 150,
    "question": "Un contact léger sur le bras du lanceur est…",
    "options": ["Autorisé", "Une faute", "Une violation", "Un travel"],
    "correctAnswer": 1,
    "explanation": "Tout contact sur le lanceur est une faute."
  },

  {
    "id": 151,
    "question": "Qui décide de la position correcte des joueurs après un appel ?",
    "options": ["Les capitaines", "Les joueurs impliqués", "Le lanceur", "La défense"],
    "correctAnswer": 1,
    "explanation": "Ce sont les joueurs impliqués qui doivent s’accorder."
  },
  {
    "id": 152,
    "question": "Quel appel concerne un défenseur trop proche du lanceur sans le marquer ?",
    "options": ["Double team", "Straddle", "Wrapping", "Vision"],
    "correctAnswer": 0,
    "explanation": "Être à moins de 3 m sans marquer est un double team."
  },
  {
    "id": 153,
    "question": "Un joueur peut-il bloquer la vision du lanceur involontairement ?",
    "options": ["Oui", "Non", "Uniquement si contesté", "Seulement en course"],
    "correctAnswer": 0,
    "explanation": "Vision doit être intentionnel."
  },
  {
    "id": 154,
    "question": "Lors d'un turnover, le joueur qui prend le disque doit…",
    "options": ["Lancer immédiatement", "Établir un pivot au point du turnover", "Reculer de 3 mètres", "Attendre 5 secondes"],
    "correctAnswer": 1,
    "explanation": "Le pivot se fait à l’endroit où le disque devient mort."
  },
  {
    "id": 155,
    "question": "Quand commence le stall après un turnover ?",
    "options": ["Immédiatement", "Après 3 secondes", "Quand le pivot est établi", "Quand les deux équipes sont prêtes"],
    "correctAnswer": 2,
    "explanation": "Le stall ne commence que lorsque le pivot est posé."
  },
  {
    "id": 156,
    "question": "Est-il légal d’attraper le disque en le pinçant entre le bras et le torse ?",
    "options": ["Oui", "Non", "Uniquement si on ne tombe pas", "Uniquement si le marqueur n’est pas là"],
    "correctAnswer": 1,
    "explanation": "C’est considéré comme utiliser un objet externe (la chemise/torse) pour attraper."
  },
  {
    "id": 157,
    "question": "Un joueur peut-il poser le disque au sol volontairement avant de lancer ?",
    "options": ["Oui", "Non", "Oui si en endzone", "Uniquement après une violation"],
    "correctAnswer": 1,
    "explanation": "C’est un turnover car il abandonne la possession."
  },
  {
    "id": 158,
    "question": "Si un défenseur trébuche et percute un attaquant, c’est…",
    "options": ["Une faute", "Un pick", "Une violation", "Rien si involontaire mais impact sur jeu ⇒ faute"],
    "correctAnswer": 3,
    "explanation": "L’intention ne compte pas, seul l’impact sur le jeu."
  },
  {
    "id": 159,
    "question": "Si le disque touche un cône en vol, il est…",
    "options": ["Hors-limites", "Valide", "Turnover", "Faute"],
    "correctAnswer": 1,
    "explanation": "Un cône fait partie du sol, mais en vol il ne compte pas."
  },
  {
    "id": 160,
    "question": "Une passe déviée par un attaquant puis attrapée par un autre attaquant est-elle valide ?",
    "options": ["Oui", "Non", "Turnover", "Violation"],
    "correctAnswer": 0,
    "explanation": "Les déviations offensives sont autorisées."
  },

  {
    "id": 161,
    "question": "Le pull doit rester…",
    "options": ["En-jeu", "Au-dessus de 2 m de haut", "Sans rotation", "En trajectoire ascendante"],
    "correctAnswer": 0,
    "explanation": "Une sortie hors-limites modifie les options de l’attaque."
  },
  {
    "id": 162,
    "question": "Si un attaquant touche le pull avant qu’il ne sorte hors-limites…",
    "options": ["Brick", "Turnover", "Pivot à la sortie", "On rejoue"],
    "correctAnswer": 2,
    "explanation": "Le pivot est à l’endroit où le disque traverse la ligne."
  },
  {
    "id": 163,
    "question": "Un joueur peut-il avoir deux pivots successifs ?",
    "options": ["Oui", "Non", "Oui si le marqueur bouge", "Uniquement dans l’endzone"],
    "correctAnswer": 1,
    "explanation": "Un seul pivot peut être établi."
  },
  {
    "id": 164,
    "question": "Une passe lancée après un stall-out est…",
    "options": ["Valide", "Un turnover", "Une violation", "Une faute"],
    "correctAnswer": 1,
    "explanation": "Le stall-out est un turnover immédiat."
  },
  {
    "id": 165,
    "question": "Le stall-out peut-il être contesté ?",
    "options": ["Oui", "Non", "Uniquement par le capitaine", "Uniquement en défense"],
    "correctAnswer": 0,
    "explanation": "Un stall-out peut être contesté si le compte n’était pas correct."
  },
  {
    "id": 166,
    "question": "Une passe attrapée dans la endzone défendue par l’équipe attaquante est…",
    "options": ["Valide", "Un point", "Un turnover", "Non autorisée"],
    "correctAnswer": 2,
    "explanation": "C’est une interception défensive."
  },
  {
    "id": 167,
    "question": "Un joueur qui ne signale pas readiness peut…",
    "options": ["Subir un pull anticipé", "Empêcher le pull", "Provoquer un turnover", "Recevoir un pick"],
    "correctAnswer": 0,
    "explanation": "Le pull peut partir quand même s’il tarde."
  },
  {
    "id": 168,
    "question": "Si un joueur prend plus de 10 secondes pour établir un pivot…",
    "options": ["Rien", "Violation delay", "Faute", "Pick"],
    "correctAnswer": 1,
    "explanation": "C’est un delay of game."
  },
  {
    "id": 169,
    "question": "Le disque peut-il être lancé entre les jambes ?",
    "options": ["Oui", "Non", "Uniquement en indoor", "Uniquement sans marque"],
    "correctAnswer": 0,
    "explanation": "Aucun style de lancer n’est interdit."
  },
  {
    "id": 170,
    "question": "Un joueur peut-il marcher vers le marqueur pour pivoter ?",
    "options": ["Oui", "Non", "Uniquement en zone centrale", "Uniquement si contesté"],
    "correctAnswer": 1,
    "explanation": "Le pivot doit rester fixe."
  },

  {
    "id": 171,
    "question": "Une passe touchée par un attaquant hors-limites est…",
    "options": ["Valide", "Hors-limites immédiat", "Contestable", "Turnover si pas contesté"],
    "correctAnswer": 1,
    "explanation": "Tout joueur hors-limites rend le disque hors-limites."
  },
  {
    "id": 172,
    "question": "Une interception réalisée en étant hors-limites est…",
    "options": ["Valide", "Hors-limites donc turnover offensif", "Turnover défensif", "Violation"],
    "correctAnswer": 1,
    "explanation": "Le défenseur hors-limites ne peut établir la possession."
  },
  {
    "id": 173,
    "question": "Une passe catchée puis immédiatement arrachée par un défenseur est…",
    "options": ["Un strip", "Un turnover", "Une faute défensive", "Une violation"],
    "correctAnswer": 0,
    "explanation": "Le strip est une faute défensive."
  },
  {
    "id": 174,
    "question": "Un joueur peut-il appeler 'pick' s’il n’est pas gêné ?",
    "options": ["Oui", "Non", "Oui si c’est pour un coéquipier", "Uniquement le capitaine"],
    "correctAnswer": 1,
    "explanation": "Seul le joueur gêné peut appeler pick."
  },
  {
    "id": 175,
    "question": "Quel est le pivot légal minimum ?",
    "options": ["Pied entier", "Point précis du corps", "Deux pieds", "Genoux"],
    "correctAnswer": 1,
    "explanation": "Le pivot est un point précis du corps, même un orteil."
  },
  {
    "id": 176,
    "question": "Le lanceur peut-il faire semblant d’appeler une faute ?",
    "options": ["Oui", "Non", "Oui si non verbal", "Uniquement en zone centrale"],
    "correctAnswer": 1,
    "explanation": "Simuler un appel est contraire à l’esprit du jeu."
  },
  {
    "id": 177,
    "question": "Un joueur peut-il appeler 'out' ?",
    "options": ["Oui", "Non", "Seulement les capitaines", "Uniquement la défense"],
    "correctAnswer": 1,
    "explanation": "Il n'y a pas d'appel 'out' dans les règles."
  },
  {
    "id": 178,
    "question": "Comment est appelé un point marqué en interception directe sur une passe offensive ?",
    "options": ["Layout", "Callahan", "Turnover simple", "Huck"],
    "correctAnswer": 1,
    "explanation": "C’est un Callahan."
  },
  {
    "id": 179,
    "question": "Une passe attrapée sur la ligne de but est-elle un point ?",
    "options": ["Oui", "Non", "Oui si les deux pieds entrent ensuite", "Seulement si contest"],
    "correctAnswer": 1,
    "explanation": "La ligne fait partie de la zone centrale, pas de l’endzone."
  },
  {
    "id": 180,
    "question": "Un joueur peut-il initier un contact s’il crie 'danger' ?",
    "options": ["Oui", "Non", "Oui si le disque est proche", "Uniquement en indoor"],
    "correctAnswer": 1,
    "explanation": "Crier n’autorise jamais un contact illégal."
  },

  {
    "id": 181,
    "question": "Un joueur peut-il lancer un disque cassé ?",
    "options": ["Oui", "Non", "Uniquement si d’accord avec défense", "Uniquement en endzone"],
    "correctAnswer": 1,
    "explanation": "Un disque cassé n’est pas légalement jouable."
  },
  {
    "id": 182,
    "question": "En cas de confusion entre deux appels simultanés, qui décide ?",
    "options": ["Le capitaine", "Les joueurs directement impliqués", "La défense", "L’attaque"],
    "correctAnswer": 1,
    "explanation": "Les joueurs impliqués doivent clarifier."
  },
  {
    "id": 183,
    "question": "Un joueur peut-il rattraper le disque avec le pied ?",
    "options": ["Oui", "Non", "Uniquement en défense", "Uniquement en endzone"],
    "correctAnswer": 1,
    "explanation": "Il faut une prise de contrôle avec les mains ou le corps supérieur."
  },
  {
    "id": 184,
    "question": "Le marqueur peut-il toucher le disque ?",
    "options": ["Oui", "Non", "Oui si le disque est bas", "Oui après le stall 8"],
    "correctAnswer": 0,
    "explanation": "Il peut tenter de bloquer la passe mais pas frapper le lanceur."
  },
  {
    "id": 185,
    "question": "Une passe attrapée dans la endzone attaquée après un pick non contesté est…",
    "options": ["Un point", "Non valide", "Contestable", "Rejouée"],
    "correctAnswer": 1,
    "explanation": "Le pick arrête le jeu."
  },
  {
    "id": 186,
    "question": "Si un joueur n’est pas sûr d’être en faute…",
    "options": ["Il conteste automatiquement", "Il accepte l’appel ou discute", "Il refuse l’appel", "Il attend le capitaine"],
    "correctAnswer": 1,
    "explanation": "La discussion est essentielle."
  },
  {
    "id": 187,
    "question": "Un joueur peut-il récupérer le disque posé au sol après un turnover sans check ?",
    "options": ["Oui", "Non", "Oui si défense lente", "Uniquement en indoor"],
    "correctAnswer": 0,
    "explanation": "Après un turnover, le disque est live dès pivot établi."
  },
  {
    "id": 188,
    "question": "Un joueur qui tient le disque peut-il demander du temps pour s’essuyer les mains ?",
    "options": ["Oui", "Non", "Oui si défense d’accord", "Uniquement en indoor"],
    "correctAnswer": 0,
    "explanation": "Il peut brièvement prolonger le jeu pour un équipement."
  },
  {
    "id": 189,
    "question": "Le marqueur peut-il se placer derrière le lanceur ?",
    "options": ["Oui", "Non", "Uniquement en endzone", "Uniquement si attaquant est blessé"],
    "correctAnswer": 0,
    "explanation": "Aucune restriction sur l’orientation du marqueur."
  },
  {
    "id": 190,
    "question": "Un joueur peut-il utiliser son pied pour arrêter le disque au sol ?",
    "options": ["Oui", "Non", "Seulement en défense", "Seulement en attaque"],
    "correctAnswer": 0,
    "explanation": "Il est autorisé d’arrêter le disque mais cela n’établit pas la possession."
  },

  {
    "id": 191,
    "question": "Un joueur peut-il être en-jeu en touchant simultanément la ligne et un pied en-limites ?",
    "options": ["Oui", "Non", "Seulement si attrape", "Uniquement en défense"],
    "correctAnswer": 1,
    "explanation": "La ligne est hors-limites."
  },
  {
    "id": 192,
    "question": "Un joueur attrapant le disque au-dessus d’un non-joueur est…",
    "options": ["En-jeu", "Hors-limites", "En faute", "Violant une règle"],
    "correctAnswer": 1,
    "explanation": "Les non-joueurs font partie du sol hors-limites."
  },
  {
    "id": 193,
    "question": "Une passe attrapée puis perdue au sol est…",
    "options": ["Valide", "Turnover", "Violation", "Pick"],
    "correctAnswer": 1,
    "explanation": "Le joueur doit établir le contrôle en touchant le sol sans perdre le disque."
  },
  {
    "id": 194,
    "question": "Un joueur peut-il utiliser une main pour bloquer la vue du lanceur ?",
    "options": ["Oui", "Non, c’est un 'vision'", "Uniquement en défense", "Uniquement si le lanceur tourne"],
    "correctAnswer": 1,
    "explanation": "L’obstruction volontaire de la vision est une infraction."
  },
  {
    "id": 195,
    "question": "Le stall count doit être…",
    "options": ["Rythmé d’au moins 1 seconde", "Rapide", "Suivant le rythme du lanceur", "Sans rythme imposé"],
    "correctAnswer": 0,
    "explanation": "Chaque nombre doit être espacé d’au moins une seconde."
  },
  {
    "id": 196,
    "question": "Un joueur peut-il s’appuyer sur un coéquipier pour attraper ?",
    "options": ["Oui", "Non", "Uniquement s’il est grand", "Uniquement en défense"],
    "correctAnswer": 1,
    "explanation": "Aucune aide physique n’est autorisée."
  },
  {
    "id": 197,
    "question": "Une passe qui tape dans le disque posé au sol est…",
    "options": ["Valide", "Turnover", "Violation", "Faute"],
    "correctAnswer": 1,
    "explanation": "Toucher le sol rend la passe incomplète."
  },
  {
    "id": 198,
    "question": "Un joueur peut-il attraper le disque en l’écrasant entre ses deux avant-bras ?",
    "options": ["Oui", "Non", "Uniquement en défense", "Uniquement en endzone"],
    "correctAnswer": 0,
    "explanation": "C’est une prise naturelle autorisée."
  },
  {
    "id": 199,
    "question": "Un joueur peut-il contester une violation qu’il ne comprend pas ?",
    "options": ["Oui", "Non", "Uniquement avec son capitaine", "Uniquement si en attaque"],
    "correctAnswer": 0,
    "explanation": "Tout joueur peut contester s’il n’est pas d’accord."
  },
  {
    "id": 200,
    "question": "Une passe dans la endzone attrapée par un défenseur est…",
    "options": ["Un point", "Un turnover", "Une violation", "Contestable"],
    "correctAnswer": 1,
    "explanation": "Toute interception défensive est un turnover."
  }
];
