const formEle = document.querySelector('.form');
const submitBtn = document.querySelector('.submit-btn');
const numberOfGroupsInput = document.querySelector('#number-of-groups');
const pairedGroupsDiv = document.querySelector('.paired-groups');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault(); // prevent form from refreshing page

    // create array of groups
    const groups = [];
    for (let i = 1; i <= numberOfGroupsInput.value; i++) {
        groups.push(`B${i}`); // template literal!
    }
    // call the helper function to shuffle the array
    shuffleArray(groups);

    // pair groups into groups of 2 randomly, if odd number of peers, last group will have 3
    const pairedGroups = [];
    for (let i = 0; i < groups.length - 1; i += 2) {
        pairedGroups.push([groups[i], groups[i + 1]]);
    }
    if (groups.length % 2 === 1) {
        pairedGroups[pairedGroups.length - 1].push(groups[groups.length - 1]);
    }

    formEle.classList.toggle('hidden');
    pairedGroupsDiv.classList.toggle('hidden');

    pairedGroups.forEach((group) => {
        displayGroups(group);
    });
});

// shuffle each element in the array to a random index
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// display each group in the DOM
function displayGroups(group) {
    const groupDiv = document.createElement('div');
    groupDiv.classList.add('group');
    groupDiv.innerHTML = group.join(' & ');
    pairedGroupsDiv.appendChild(groupDiv);
}
