export const hauteurDecoupe = (tree, hauteurMoyenneConst, essences) => {
    return tree.diametre <= 30 ? hauteurMoyenneConst.getIn(['petitBois']) : hauteurMoyenneConst.getIn([essences.get(tree.essence.toLowerCase())]);
};

export const volumeCommercial = (tree, volumeCommercialConst, essences, hauteurDecoupe, etatVivant) => {
    //volumeCommercialConst = this.props.constants.getIn(['volume', 'commercial']);
    return tree.etat === etatVivant ? parseFloat((volumeCommercialConst.getIn([essences.get(tree.essence.toLowerCase())]) * Math.pow(tree.diametre / 100, 2) * hauteurDecoupe).toFixed(2)) : 0.0;
};

export const volumeComBois = (tree, volumeCommercial) => {
    return ({
        oeuvre: volumeCommercial * tree.utilisationBois.oeuvre / 100,
        industrie: volumeCommercial * tree.utilisationBois.industrie / 100,
        chauffage: volumeCommercial * tree.utilisationBois.chauffage / 100
    })
};

export const prixBoisAttr = (tree, prixBoisConst, utilisationBois) => {
    //prixBoisConst = this.props.constants.getIn(['prix', 'bois']);
    return prixBoisConst.getIn([utilisationBois, tree.essence.toLowerCase()]);
};

export const prixBois = (tree, prixBoisConst, essences) => {
    //prixBoisConst = this.props.constants.getIn(['prix', 'bois']);
    const prixBoisOeuvre = prixBoisAttr(tree, prixBoisConst, 'oeuvre');
    const prixBoisIndustrie = prixBoisAttr(tree, prixBoisConst, 'industrie');
    const prixBoisChauffage = prixBoisAttr(tree, prixBoisConst, 'chauffage');
    return ({
        oeuvre: prixBoisOeuvre === undefined ? prixBoisConst.getIn(['oeuvre', essences.get(tree.essence.toLowerCase())]) : prixBoisOeuvre,
        industrie: prixBoisIndustrie === undefined ? prixBoisConst.getIn(['industrie', essences.get(tree.essence.toLowerCase())]) : prixBoisIndustrie,
        chauffage: prixBoisChauffage === undefined ? prixBoisConst.getIn(['chauffage', essences.get(tree.essence.toLowerCase())]) : prixBoisChauffage
    })
};

export const valeurEcoBois = (volumeComBois, prixBois) => {
    return ({
        oeuvre: volumeComBois.oeuvre * prixBois.oeuvre,
        industrie: volumeComBois.industrie * prixBois.industrie,
        chauffage: volumeComBois.chauffage * prixBois.chauffage
    });
};

export const valeurEconomique = (valeurEcoBois) => {
    return parseFloat((valeurEcoBois.oeuvre + valeurEcoBois.industrie + valeurEcoBois.chauffage).toFixed(2));
};

export const calculateVolumeAndPrices = (tree, essences, etatVivant,
                                         prixBoisConst, tarifs, tarifFeuillus, tarifResineux, versionFeuillus,
                                         versionResineux) => {
    //const hd = hauteurDecoupe(tree, hauteurMoyenneConst, essences);
    //volumeCommercial(tree, volumeCommercialConst, essences, hd, etatVivant);
    const vc = volumeCommercialFromTarif(tree, essences, tarifFeuillus, tarifResineux, versionFeuillus, versionResineux,
        tarifs, etatVivant);
    const vcb = volumeComBois(tree, vc);
    const pb = prixBois(tree, prixBoisConst, essences);
    const veb = valeurEcoBois(vcb, pb);
    return ({
        volume: {
            commercial: vc,
            commercialBois: vcb
        },
        prix: {
            valeurEco: valeurEconomique(veb),
            valeurEcoBois: veb
        }
    })
};

//Parse un CSV importé depuis le fichier excell du parc
//en une matrice[diametre, version]
//pour l'utiliser correctement il faut se servir des fonctions ci-dessous (get)
const getMatriceCubage = (tarifCSV) => {

    const tarif = [];
    const csvData = d3.csvParse(tarifCSV);
    const headers = d3.keys(csvData[0]);
    let ligne = [];
    for (let diametre = 15; diametre <= 100; diametre += 5) {
        for (let version = 1; version <= 20; version++) {
            //console.log((diametre-15)/5, csvData[1+(diametre-15)/5][version]);
            ligne.push(Number(csvData[(diametre - 15) / 5][version].replace(/,/g, '.')));
        }
        tarif.push(ligne);
        ligne = [];
    }

    return tarif;

};

export const getIndexDiametreTarif = (diametre) => {
    const res = diametre < 15 ? 15 : (diametre > 100 ? 100 : diametre);
    return Math.round((res - 15) / 5);
};

export const getVersionDiametre = (tarifMat, version, diametre) => {
    return tarifMat[getIndexDiametreTarif(diametre)][version];
};

export const getDiametreVersion = (tarifMat, diametre, version) => {
    return getVersionDiametre(tarifMat, version, diametre);
};

export const getVersion = (tarifMat, version) => {
    const tarifVersion = [];
    for (let diametre = 0; diametre < tarifMat.length; diametre++) {
        tarifVersion.push(tarifMat[diametre][version - 1]);
    }
    return tarifVersion;
};

export const volumeCommercialFromTarif = (tree, essences, tarifFeuillus, tarifResineux, versionFeuillus, versionResineux, tarifs, etatVivant) => {
    const tarifMatFeuillus = tarifs.get(tarifFeuillus).toJS();
    const tarifMatResineux = tarifs.get(tarifResineux).toJS();
    if (tree.etat === etatVivant) {
        if (essences.get(tree.essence.toLowerCase()) == 'feuillu') {
            return getVersionDiametre(tarifMatFeuillus, versionFeuillus, tree.diametre);
        } else {
            return getVersionDiametre(tarifMatResineux, versionResineux, tree.diametre);
        }

    }
    return 0.0;
};

/*
 export const printTarif = (tarif) => {
 const keys = Object.keys(tarif);
 let tarifVersionKeys;
 const printedTarifs = [];
 const printedTarif = {};

 tarifVersionKeys = Object.keys(tarif[1]);
 tarifVersionKeys.forEach(diametre => {
 printedTarif[diametre] = {};
 });

 keys.forEach(version => {
 if(tarif[version] != null && tarif[version] != undefined){
 tarifVersionKeys = Object.keys(tarif[version]);
 tarifVersionKeys.forEach(diametre => {
 printedTarif[diametre][version] = tarif[version][diametre];
 });
 printedTarifs.push(printedTarif);
 }
 });

 return printedTarifs;
 };*/