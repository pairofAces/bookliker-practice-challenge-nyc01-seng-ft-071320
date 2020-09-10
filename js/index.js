document.addEventListener('DOMContentLoaded', e => {
    //set global variables
    const baseUrl = "http://localhost:3000/books/"
    const list = document.getElementById('list')
    const showPanel = document.getElementById('show-panel')
    const user = { "id": 1, "username": "pouros" }
    //show the list of books in a list format
    //first make a get request to get all the books and then render the books as a list

    const getData = () => {
        fetch(baseUrl)
            .then(resp => resp.json())
            .then(books => renderBooks(books)) //aspirational
    }

    function renderBooks(books) {
        for (const book of books) {
            renderBook(book);
        };
    }

    function renderBook(book) {
        //create a new li for each book
        //add classname book
        // add dataset id
        //the list should display the title of each book
        let li = document.createElement('li')
        li.classList.add('book')
        li.dataset.id = book.id
        li.innerHTML = `${book.title}`

        //append to the list
        list.append(li)
    }

    //create the ability to click on the title, and be shown details of each book

    const clickHandler = () => {
        list.addEventListener('click', e => {
            // console.log(e.target)
            // const book = e.target
            const id = e.target.dataset.id

            fetch(baseUrl + id)
                .then(resp => resp.json())
                .then(info => showInfo(info)) //aspirational


            function showInfo(info) {
                //create the info elements
                // appendChild to the show-panel variable
                showPanel.innerHTML = `
                    <img src="${info.img_url}">
                    <h3>${info.title}</h3>
                    <h5>${info.subtitle}</h5>
                    <h4>${info.author}</h4>
                    <p>${info.description}</p>
                    <ul class="ul-class"></ul>
                    <button class="like-class" data-id=${info.id}>Like</button>
                `
                likedList(info)
            }

        })
    }

    function likedList(info) {
        let likeList = document.querySelector('.ul-class')
        likeList.classList.add('liked-list')
        // showPanel.insertAdjacentElement('beforeend', likedList)

        //version of iterating 'for' loop
        for (i = 0; `${info.users.length}`; i++) {
            let li = document.createElement('li')
            li.innerText = `${info.users[i].username}`
            likeList.append(li)
        }
    }
    
    const likeBook = () => {
        let button = document.querySelector('.like-class')
        document.addEventListener('click', e => {
            if (e.target.innerText === "Like") {
                let id = e.target.dataset.id
                updateLikes(id) //aspirational code
                e.target.innerText = "Unlike"
            } else if (e.target.innerText === "Unlike") {
                let ul = showPanel.querySelector('ul')
                let li = showPanel.querySelector('.pouros')
                ul.removeChild(li)
                e.target.innerText = "Like"
            }
        })
    }

    function updateLikes(id){
        //create options for 'patch' request
        options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application.json"
            },
            body: JSON.stringify({
                users: [user]
            })
        }
        fetch(baseUrl + id, options)
        .then(resp => resp.json())
        .then(showPanel.querySelector('ul').insertAdjacentHTML('beforeend',`<li class="pouros">pouros</li>`))
    }




    //invoke the appropriate functions
    getData()
    clickHandler()
    likeBook()
})