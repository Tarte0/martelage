export const hauteurDecoupe = (tree, hauteurMoyenneConst, essences) => {
    return tree.diametre <= 30 ? hauteurMoyenneConst.getIn(['petitBois']) : hauteurMoyenneConst.getIn([essences.get(tree.essence)]);
};

export const volumeCommercial = (tree, volumeCommercialConst, essences, hauteurDecoupe, etatVivant) => {
    //volumeCommercialConst = this.props.constants.getIn(['volume', 'commercial']);
    return tree.etat === etatVivant ? (volumeCommercialConst.getIn([essences.get(tree.essence)]) * Math.pow(tree.diametre / 100, 2) * hauteurDecoupe).toFixed(2) : 0;
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
    prixBoisConst.getIn([utilisationBois, tree.essence]);
};

export const prixBois = (tree, prixBoisConst, essences) => {
    //prixBoisConst = this.props.constants.getIn(['prix', 'bois']);
    const prixBoisOeuvre = prixBoisAttr(tree, prixBoisConst, 'oeuvre');
    const prixBoisIndustrie = prixBoisAttr(tree, prixBoisConst, 'industrie');
    const prixBoisChauffage = prixBoisAttr(tree, prixBoisConst, 'chauffage');
    return ({
        oeuvre: prixBoisOeuvre === undefined ? prixBoisConst.getIn(['oeuvre', essences.get(tree.essence)]) : prixBoisOeuvre,
        industrie: prixBoisIndustrie === undefined ? prixBoisConst.getIn(['industrie', essences.get(tree.essence)]) : prixBoisIndustrie,
        chauffage: prixBoisChauffage === undefined ? prixBoisConst.getIn(['chauffage', essences.get(tree.essence)]) : prixBoisChauffage
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
    return valeurEcoBois.oeuvre + valeurEcoBois.industrie + valeurEcoBois.chauffage;
};

export const calculateVolumeAndPrices = (tree, essences, hauteurMoyenneConst, volumeCommercialConst, etatVivant, prixBoisConst) => {
    const hd = hauteurDecoupe(tree, hauteurMoyenneConst, essences);
    const vc = volumeCommercial(tree, volumeCommercialConst, essences, hd, etatVivant);
    const vcb = volumeComBois(tree, vc);
    const pb = prixBois(tree, prixBoisConst, essences);
    const veb = valeurEcoBois(vcb, pb);
    return ({
        hauteurDecoupe : hd,
        volume : {
            commercial : vc,
            commercialBois : vcb
        },
        prix : {
            valeurEco : valeurEconomique(veb),
            valeurEcoBois : veb
        }
    })
};