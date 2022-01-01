import subs from './subs.json'
let tags_set = new Set();

subs.forEach(function (sub) {
    sub.tags.forEach(tags_set.add, tags_set)
});

// const subTags = [...tags_set];
// console.log("subTags -> ", subTags)
// export default subTags;
tags_set = [...tags_set].sort()

const filterSubsByTags = (selectedTags) => {
    let filters = selectedTags.map(e => e.name);

    let filteredArr = subs.filter((sub) => {
        return filters.every(f => sub.tags.includes(f));
    });;
    console.log({filteredArr})
    return filteredArr;
}

const filterSubsByTagsSingle = (selectedTag) => {
    let filters = [selectedTag]

    let filteredArr = subs.filter((sub) => {
        return filters.every(f => sub.tags.includes(f));
    });;
    console.log({filteredArr})
    return filteredArr;
}









module.exports = {
    tagsFilterDict: tags_set.map((name, id) => ({ name, name })),
    tags: tags_set,
    subs:subs,
    filterSubsByTags:filterSubsByTags,
    filterSubsByTagsSingle:filterSubsByTagsSingle,
}
