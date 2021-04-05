document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue() {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';
  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));
  document.getElementById('issueInputForm').reset();
  totalIssues();
  openIssues();
  fetchIssues();
  // e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const stringId = id + '';
  const currentIssue = issues.filter(issue => issue.id === stringId);
  currentIssue[0].status = 'Closed';
  const captureDescription = currentIssue[0].description;
  const result = captureDescription.strike();
  currentIssue[0].description = result;
  localStorage.setItem('issues', JSON.stringify(issues));
  openIssues();
  fetchIssues();
}
const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const stringId = id + '';
  const remainingIssues = issues.filter( issue => issue.id !== stringId);
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  totalIssues();
  openIssues();
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];
    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
const totalIssues = () =>{
  const issue = JSON.parse(localStorage.getItem('issues')) || [];
  document.getElementById('totalIssues').innerHTML = issue.length;
}
totalIssues();
const openIssues = () =>{
  const issues = JSON.parse(localStorage.getItem('issues')) || [];
  let openIssues = 0;
  issues.forEach(singleIssue => {
    if (singleIssue.status === 'Open'){
      openIssues +=1;
    }
  });
  document.getElementById('currentOpen').innerHTML = openIssues;
}
openIssues();