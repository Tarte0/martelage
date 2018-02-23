import {List} from 'immutable';

export const groupTrees = (trees) => {
    return List(trees)
        .groupBy(t => t.diametre)
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

export const countSpecies = (trees, species) => {
    const flattenedSpecies = species.reduce((acc, e) => {
        acc[e.essence] = e.type;
        return acc;
    }, {});
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