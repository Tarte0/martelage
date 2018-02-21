import {List} from 'immutable';
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