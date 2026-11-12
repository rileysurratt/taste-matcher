// Compares 2 favorite lists 

// Titles that are on both lists
export function sharedTitles(listA, listB){
    const idsB = new Set(listB.map((item) => item.id));
    return listA.filter((item) => idsB.has(item.id));
}


// Count how often each genre shows up { scifi: 3, drama: 1}

export function genreProfile(list){
    const counts = {};

    for(const item of list){
        for(const genre of item.genres){
            counts[genre] = (counts[genre] ?? 0) + 1;
        }
    }
    return counts;
}


// How alike 2 genre profiles are, from 0(nothing in common) to 1(same mix)
// consine similarity - compares mix of genres not totals
export function cosineSimilarity(profileA, profileB){
    const genres = new Set([...Object.keys(profileA), ...Object.keys(profileB)]);
    let dot = 0;
    let sizeA = 0;
    let sizeB = 0;

    for (const genre of genres){
        const a = profileA[genre] ?? 0;
        const b = profileB[genre] ?? 0;
        dot += a * b;
        sizeA += a * a;
        sizeB += b * b;
    }

    if(sizeA === 0 || sizeB === 0) return 0;
    return dot / (Math.sqrt(sizeA) * Math.sqrt(sizeB));
}

// Compatibility from 0 to 100 
// 40% = how many titles you share, 60% = how similar your genre taste is
export function compatibility(listA, listB){
    if(listA.length === 0 || listB.length === 0) return 0;

    const shared = sharedTitles(listA, listB).length;
    const titleOverlap = shared / Math.min(listA.length, listB.length);
    const genreMatch = cosineSimilarity(genreProfile(listA), genreProfile(listB));

    return Math.round(100 * (0.4 * titleOverlap + 0.6 * genreMatch));

}