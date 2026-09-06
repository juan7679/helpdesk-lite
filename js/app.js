let tickets = [
  {
    id: 1,
    folio: 'HD-0001',
    title: 'Internet caido en laboratorio',
    description: 'No existe conexion en los equipos del laboratorio A',
    category: 'Red',
    priority: 'Critica',
    status: 'Nuevo',
    createdAt: '2026-09-02T10:35:00'
  },
  {
    id: 2,
    folio: 'HD-0002',
    title: 'Computadora no inicia',
    description: 'La maquina 5 no enciende desde esta manana',
    category: 'Hardware',
    priority: 'Alta',
    status: 'En proceso',
    createdAt: '2026-09-02T09:10:00'
  }
]

const ticketsContainer = document.querySelector('#tickets-container')
const totalCountLabel = document.querySelector('#total-count')
const newCountLabel = document.querySelector('#new-count')
const progressCountLabel = document.querySelector('#progress-count')
const resolvedCountLabel = document.querySelector('#resolved-count')

const ticketForm = document.querySelector('#ticket-form')
const newTicketButton = document.querySelector('#new-ticket-button')
const cancelFormButton = document.querySelector('#cancel-form-button')
const formSection = document.querySelector('#NuevoTicket')

const searchInput = document.querySelector('#search-input')
const filterButtons = document.querySelectorAll('.filter-button')
const priorityFilter = document.querySelector('#priority-filter')

let nextId = tickets.length + 1
let currentStatusFilter = 'Todos'

const statusFlow = {
  'Nuevo': 'En proceso',
  'En proceso': 'Resuelto',
  'Resuelto': 'Cerrado'
}

const nextStatusLabel = {
  'Nuevo': 'Iniciar Proceso',
  'En proceso': 'Marcar Resuelto',
  'Resuelto': 'Cerrar Ticket'
}

const formatDate = (isoString) => {
  const date = new Date(isoString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${day}/${month}/${year} ${hours}:${minutes}`
}

const generateFolio = (id) => {
  return `HD-${String(id).padStart(4, '0')}`
}

const getFilteredTickets = () => {
  const searchTerm = searchInput.value.trim().toLowerCase()
  const selectedPriority = priorityFilter.value

  return tickets.filter((ticket) => {
    const matchesSearch =
      !searchTerm ||
      ticket.folio.toLowerCase().includes(searchTerm) ||
      ticket.title.toLowerCase().includes(searchTerm) ||
      ticket.description.toLowerCase().includes(searchTerm)

    const matchesStatus =
      currentStatusFilter === 'Todos' || ticket.status === currentStatusFilter

    const matchesPriority =
      selectedPriority === 'Todas' || ticket.priority === selectedPriority

    return matchesSearch && matchesStatus && matchesPriority
  })
}

const renderTickets = (ticketsToRender) => {
  ticketsContainer.innerHTML = ''

  if (ticketsToRender.length === 0) {
    ticketsContainer.innerHTML = `
      <p class="empty-message">
        No hay tickets que coincidan con la busqueda
      </p>
    `
    return
  }

  ticketsToRender.forEach((ticket) => {
    const article = document.createElement('article')
    article.classList.add('ticket-card')
    article.innerHTML = `
      <div class="ticket-header">
        <span>${ticket.folio}</span>
        <span class="ticket-priority">${ticket.priority}</span>
      </div>
      <h3>${ticket.title}</h3>
      <p class="ticket-description">
        ${ticket.description}
      </p>
      <p class="ticket-meta">
        ${ticket.category} · Creado: ${formatDate(ticket.createdAt)}
      </p>
      <span class="ticket-status">
        Estado: ${ticket.status.toUpperCase()}
      </span>
      <div class="ticket-actions">
        ${nextStatusLabel[ticket.status] ? `
          <button class="button button-primary advance-button" data-ticket-id="${ticket.id}">
            ${nextStatusLabel[ticket.status]}
          </button>
        ` : ''}
        ${ticket.status !== 'Cerrado' && ticket.status !== 'Cancelado' ? `
          <button class="button button-secondary cancel-ticket-button" data-ticket-id="${ticket.id}">
            Cancelar
          </button>
        ` : ''}
      </div>
    `
    ticketsContainer.appendChild(article)
  })

  configureTicketActions()
}

const updateDashboard = () => {
  totalCountLabel.textContent = tickets.length
  newCountLabel.textContent = tickets.filter((ticket) => ticket.status === 'Nuevo').length
  progressCountLabel.textContent = tickets.filter((ticket) => ticket.status === 'En proceso').length
  resolvedCountLabel.textContent = tickets.filter((ticket) => ticket.status === 'Resuelto').length
}

const advanceTicketStatus = (ticketId) => {
  const ticket = tickets.find((currentTicket) => currentTicket.id === ticketId)

  if (!ticket) {
    return
  }

  const nextStatus = statusFlow[ticket.status]

  if (!nextStatus) {
    return
  }

  ticket.status = nextStatus
  renderTickets(getFilteredTickets())
  updateDashboard()
}

const cancelTicket = (ticketId) => {
  const ticket = tickets.find((currentTicket) => currentTicket.id === ticketId)

  if (!ticket) {
    return
  }

  if (ticket.status === 'Cerrado' || ticket.status === 'Cancelado') {
    return
  }

  ticket.status = 'Cancelado'
  renderTickets(getFilteredTickets())
  updateDashboard()
}

const configureTicketActions = () => {
  const advanceButtons = document.querySelectorAll('.advance-button')
  const cancelButtons = document.querySelectorAll('.cancel-ticket-button')

  advanceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const ticketId = Number(button.dataset.ticketId)
      advanceTicketStatus(ticketId)
    })
  })

  cancelButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const ticketId = Number(button.dataset.ticketId)
      cancelTicket(ticketId)
    })
  })
}

newTicketButton.addEventListener('click', () => {
  formSection.classList.remove('hidden')
})

cancelFormButton.addEventListener('click', () => {
  ticketForm.reset()
  formSection.classList.add('hidden')
})

ticketForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const title = document.querySelector('#title-input').value.trim()
  const description = document.querySelector('#description-input').value.trim()
  const category = document.querySelector('#category-select').value
  const priority = document.querySelector('#priority-select').value

  if (!title || !description) {
    return
  }

  const newTicket = {
    id: nextId,
    folio: generateFolio(nextId),
    title,
    description,
    category,
    priority,
    status: 'Nuevo',
    createdAt: new Date().toISOString()
  }

  tickets.push(newTicket)
  nextId++

  ticketForm.reset()
  formSection.classList.add('hidden')
  renderTickets(getFilteredTickets())
  updateDashboard()
})

searchInput.addEventListener('input', () => {
  renderTickets(getFilteredTickets())
})

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((currentButton) => {
      currentButton.classList.remove('active')
    })
    button.classList.add('active')
    currentStatusFilter = button.dataset.status
    renderTickets(getFilteredTickets())
  })
})

priorityFilter.addEventListener('change', () => {
  renderTickets(getFilteredTickets())
})

renderTickets(getFilteredTickets())