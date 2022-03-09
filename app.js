document.getElementById('issueForm').addEventListener('submit', issueHandler)

const getElementById = id => {
    return document.getElementById(id)
}

function issueHandler(e) {
    const issue = getElementById('issue').value
    const severity = getElementById('severity').value
    const assignedTo = getElementById('assignedTo').value
    const id = Math.ceil(Math.random() * 100000000)
    const status = 'open'
    const newIssue = { id, issue, severity, assignedTo, status }

    addToLocal(newIssue)
    document.getElementById('issueForm').reset()
    e.preventDefault()
}

const addToLocal = newIssue => {
    let issuesArr = getLocalData()
    issuesArr.push(newIssue)
    localStorage.setItem('issues', JSON.stringify(issuesArr))
    fetchData()
}

const getLocalData = () => {
    let issueArr
    const issues = localStorage.getItem('issues')
    if (issues) {
        issueArr = JSON.parse(issues)
    } else {
        issueArr = []
    }
    return issueArr
}

const fetchData = () => {
    const issues = getLocalData()
    const parent = getElementById('issueList')
    parent.textContent = ''
    issues.forEach(issue => {
        const div = document.createElement('div')
        div.innerHTML = `
            <div class="mt-4 p-5" style="background-color: #eee">
                <p><b>Issue No:</b> ${issue.id}</p>
                <h3>Issue: ${issue.issue}</h3>
                <p><b>Severity:</b> ${issue.severity}</p>
                <p><b>Assigned To:</b> ${issue.assignedTo}</p>
                <button onclick="closeBtn(event)" class="btn btn-secondary">Close</button><button onclick="deleteBtn('${issue.id}')" class="btn btn-danger ms-3">Delete</button>
            </div>
        `
        parent.appendChild(div)
    })
}

const closeBtn = event => {
    event.target.parentNode.childNodes[3].style.textDecoration = 'line-through'
}

const deleteBtn = id => {
    const issues = getLocalData()
    const remained = issues.filter(issue => issue.id !== parseInt(id))
    localStorage.setItem('issues', JSON.stringify(remained))
    fetchData()
}
