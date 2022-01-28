const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export const getCalls = async (req) => {
    let data = await fetch('https://aircall-job.herokuapp.com/activities');
    data = await data.json();
    data = data.map(c =>
        Object.assign({}, c, { dt: new Date(c.created_at).toLocaleDateString() })
    );
    if (req === 'arch')
        data = data.filter(d => d.is_archived);
    if (req === 'unarch')
        data = data.filter(d => d.is_archived === false);
    data = groupBy(data, 'dt');
    console.log(data);
    // data.error = null;
    return data;
}

export const getCall = async (id) => {
    let data = await fetch('https://aircall-job.herokuapp.com/activities/' + id);
    data = await data.json();
    return data;
}