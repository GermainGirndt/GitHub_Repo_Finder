// Selecting elements
let body = document.querySelector('body');
let inputField = document.querySelector('#inputField');
let inputButton = document.querySelector('#inputButton');
let olTitle = document.querySelector('#ol-title') 
let ol = document.querySelector('ol')

console.log(body)
console.log(inputField)
console.log(inputButton)
console.log(ol)

// Adding a click event listener to the button
function searchRepos() {
    let user = inputField.value

    let url = `https://api.github.com/users/${user}/repos`
    console.log(url)
    
    olTitle.innerHTML = ''
    ol.innerHTML = ''
    axios.get(url)
    .then(function(response) {

        console.log(response)
        console.log(response.data);



        let numberOfRepositories = response.data.length

        if (numberOfRepositories === 0) {
            printNoRepos()

        } else {

        printResultsTitle(user, numberOfRepositories)
        printRepos(response)    
        

        console.log(response.data.length)
        }

    })
    .catch(function(error){
        printError()
        console.warn(error);
    });
}

function printResultsTitle(user, numberOfRepositories){

    olTitle.innerHTML = `<strong>${numberOfRepositories} repositories found for <a href="https://www.github.com/${user}">${user}</a></strong>`
}

function printRepos(response) {

    for (let repo of response.data) {
        console.log(repo.name);
        console.log(repo.full_name);

        let a = document.createElement('a');
        a.setAttribute('href', `https://www.github.com/${repo.full_name}`)
        ol.appendChild(a);

        let li = document.createElement('li');
        let liText = document.createTextNode(repo.name);
        li.appendChild(liText);
        a.appendChild(li);
    } 

}

function printNoRepos() {
    
    olTitle.innerHTML = '<strong>No public repositories found for this user.</strong>'
 
}

function printError() {
    
    olTitle.innerHTML = '<strong>Error 404. Are you sure this repository exists?</strong>'
 
}