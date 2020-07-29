// MENU ACTIVE
const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')
for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add('active')
    }
}

// FORM DELETE
const formDelete = document.querySelector('#form-delete')
if (formDelete) {
    itemFormDelete(formDelete)
}

function itemFormDelete(formDelete) {
    formDelete.addEventListener('submit', function (event) {
        const confirmation = confirm("Deseja Deletar?")
        if (!confirmation) {
            event.preventDefault()
        }
    })
}

// PAGINATE
const pagination = document.querySelector(".pagination")
if (pagination) {
    createPagination(pagination)
}

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2

        if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {

            if (oldPage && currentPage - oldPage > 2) {
                pages.push('...')
            }

            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)
            oldPage = currentPage
        }
    }
    return pages
}

function createPagination(pagination) {
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)

    let elements = ""

    for (let page of pages) {
        if (String(page).includes('...')) {
            elements += `<span>${page}</span>`
        } else {
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }
    pagination.innerHTML = elements
}