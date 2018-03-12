import {List, Map} from 'immutable';

export const groupTrees = (trees, group) => {
    return List(trees)
        .groupBy(t => t[group])
        .map((v, k) => {
            let res = {'v': 0, 'mp': 0, 'ms': 0, total: 0, key: k};
            v.forEach(t => {
                res[t.etat]++;
                res.total++;
            });
            return res
        }).toList()
        .sort((a, b) => Number(a.key) - Number(b.key))
        .toJS();
};

export const groupDateTreeNb = (filedParcel) => {
    return List(filedParcel)
        .groupBy(fp => fp['date'])
        .map((v, k) => {
            let res = {'value': 0, key: k};
            v.forEach(fp => {
                res['value'] = Math.max(res['value'], Object.keys(fp.arbres || []).length);
            });
            return res
        }).toList()
        .sort((a, b) => Number(a.key) - Number(b.key))
        .toJS();
};

function speciesToType(species) {
    return species.reduce((acc, e) => {
        acc[e.essence] = e.type;
        return acc;
    }, {});
}
export const countSpecies = (trees, species) => {
    const flattenedSpecies = speciesToType(species);
    let speciesCount = {};
    trees.forEach(t => {
        speciesCount[t.essence] = speciesCount[t.essence] || 0;
        speciesCount[t.essence]++;
    });
    return Object.keys(speciesCount).map(s => ({
        essence: s.toLowerCase(),
        type: flattenedSpecies[s.toLowerCase()],
        count: speciesCount[s]
    }));
};

export const countType = (trees, species) => {
    const mapping = speciesToType(species);
    let res = {};
    trees.forEach((t) => {
        const type = mapping[t.essence.toLowerCase()];
        res[type] = res[type] || 0;
        res[type]++;
    });
    return Map(res).map((v, k) => ({type: k, count: v})).toList().toJS()
};

export const sortSpeciesByCount = (a, b) => {

    if (a.type === b.type) {
        return b.count -  a.count ;

    } else {
        return a.type.localeCompare(b.type)
    }


};