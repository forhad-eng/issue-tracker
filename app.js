document.getElementById('issueForm').addEventListener('submit', issueHandler)

const getElementById = id => {
    return document.getElementById(id)
}

function issueHandler(e) {
    const issueName = getElementById('issue').value
    const severity = getElementById('severity').value
    const assignedTo = getElementById('assignedTo').value
    const id = Math.ceil(Math.random() * 100000000)
    const status = 'open'
    const issue = { id, issueName, severity, assignedTo, status }
    addToLocal(issue)
    document.getElementById('issueForm').reset()
    e.preventDefault()
}

const addToLocal = issue => {
    const bugs = getLocalData()
    bugs.push(issue)
    localStorage.setItem('bugs', JSON.stringify(bugs))
    fetchLocal()
}

const getLocalData = () => {
    let issues
    const bugs = JSON.parse(localStorage.getItem('bugs'))
    if (bugs) {
        issues = bugs
    } else {
        issues = []
    }
    return issues
}

const fetchLocal = () => {
    const parent = getElementById('issue-container')
    parent.textContent = ''
    const issues = getLocalData()
    issues.forEach(bug => {
        const { id, issueName, severity, assignedTo, status } = bug
        const div = document.createElement('div')
        div.classList.add('mt-3', 'p-5')
        div.setAttribute('style', 'background-color: #eee')
        div.innerHTML = `
            <span class="border rounded bg-success text-white ps-2 pe-2 pb-1"><small>${status}</small></span>
            <p><i class="fa-solid fa-hashtag fs-6 mt-3"></i><b>Issue No:</b> ${id}</p>
            <h3><i class="fa-solid fa-triangle-exclamation fs-4 text-warning"></i> Issue: ${issueName}</h3>
            <p class="mt-3"><i class="fa-solid fa-gauge-simple-high fs-5 text-danger"></i><b class="ms-2">Severity: </b> ${severity}</p>
            <p><i class="fa-solid fa-user fs-5 text-secondary"></i><b class="ms-2">Assigned To: </b> ${assignedTo}</p>
            <button onclick="closeBtn('${id}',event)" class="btn btn-secondary">Close</button><button onclick="deleteBtn('${id}')" class="btn btn-danger ms-3">Delete</button>
        `
        parent.appendChild(div)
    })
}

const closeBtn = id => {
    const bugs = getLocalData()
    const bug = bugs.find(bug => bug.id === parseInt(id))
    bug.status = 'closed'
    bug.issueName = `<s>${bug.issueName}</s>`
    event.target.disabled = true
    localStorage.setItem('bugs', JSON.stringify(bugs))
    fetchLocal()
}

const deleteBtn = id => {
    const bugs = getLocalData()
    const remained = bugs.filter(bug => bug.id !== parseInt(id))
    localStorage.setItem('bugs', JSON.stringify(remained))
    fetchLocal()
}
