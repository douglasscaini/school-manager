const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')

// MENU ACTIVE
for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add('active')
    }
}

// FORM DELETE
const formDelete = document.querySelector('#form-delete')
formDelete.addEventListener('submit', function (event) {
    const confirmation = confirm("Deseja Deletar?")
    if (!confirmation) {
        event.preventDefault()
    }
})