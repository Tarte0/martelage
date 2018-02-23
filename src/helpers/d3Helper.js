import {List,Map} from 'immutable';

export const groupTrees = (trees) => {
    return List(trees)
        .groupBy(t => t.diametre)
        .map((v,k) => {
            let res = {'v': 0, 'mp': 0, 'ms': 0, total: 0,key:k};
            v.forEach(t => {
                res[t.etat]++;
                res.total++;
            });
            return res
        }).toList()
        .sort((a,b)=>Number(a.key)-Number(b.key))
        .toJS();
};

export const countSpecies = (trees) => {
    let species = {};
    trees.forEach(t=>{
        species[t.essence] = species[t.essence] || 0;
        species[t.essence]++;
    });
    return Object.keys(species).map(s=> ({type: s, count:species[s]}));
};