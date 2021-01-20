import Pagination from './components/Pagination'
import './App.css';
import {useState} from 'react';
import Axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
require('dotenv').config();

function App() {

const [name, setName] = useState('')
const [age, setAge] = useState(0)
const [country, setCountry] = useState('')
const [position, setPosition] = useState('')
const [salary, setSalary] = useState(0)

const [newName, setNewName] = useState('')
const [newAge, setNewAge] = useState(0)
const [newCountry, setNewCountry] = useState('')
const [newPosition, setNewPosition] = useState('')
const [newSalary, setNewSalary] = useState(0)

const [employeeList, setEmployeeList] = useState([]); 

const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(2);


//Node ENV
const baseUrl = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3001';

const addEmployee = () => {
Axios.post(baseUrl + 'create', 
{name: name, 
age: age, 
country: country, 
position: position, 
salary: salary}).then( () => {
setEmployeeList( [...employeeList, {
name: name, 
age: age, 
country: country, 
position: position, 
salary: salary
}] )
})
};

// Get a list of employees
const getEmployees = () => {
Axios.get(baseUrl + '/employees').then( (response) => {
setEmployeeList(response.data);
})
} 

const reset = () => {
window.location.reload();
}

// Update employee info
const updateEmployeeName = (id) => {
Axios.put(baseUrl + '/update_name', {name: newName, id: id}).then( (response) => {
getEmployees()
}
)
};

const updateEmployeeAge = (id) => {
Axios.put(baseUrl + '/update_age', {age: newAge, id: id}).then( (response) => {
getEmployees()
}
)
};

const updateEmployeeCountry = (id) => {
Axios.put(baseUrl + '/update_country', {country: newCountry, id: id}).then( (response) => {
getEmployees()
}
)
};

const updateEmployeePosition = (id) => {
Axios.put(baseUrl + '/update_position', {position: newPosition, id: id}).then( (response) => {
getEmployees()
}
)
};

const updateEmployeeSalary = (id) => {
Axios.put(baseUrl + '/update_salary', {salary: newSalary, id: id}).then( (response) => {
getEmployees()
}
)
};

// Delete an employee object
const deleteEmployee = (id) => {

confirmAlert({
title: 'Confirm to Delete',
message: 'Are you sure you want to delete this employee?',
buttons: [
{
label: 'Yes',
onClick: () => Axios.delete(baseUrl + `/delete/${id}`).then( (response) => {
getEmployees()
}
) 
},
{
label: 'No',
onClick: () => getEmployees()
}
]
});

}

// get current posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = employeeList.slice(indexOfFirstPost, indexOfLastPost);

// Change page
const paginate = (pageNumber) => setCurrentPage(pageNumber)

return (
<div className="App">
    <h1>Employee Database</h1>

    <div className="links">
    <button onClick={(e) => {
    e.preventDefault();
    window.location.href='https://github.com/micloudon/';
    }}> <strong>My Github</strong></button>
    <button onClick={(e) => {
    e.preventDefault();
    window.location.href='https://www.linkedin.com/in/michael-loudon-dev/';
    }}><strong>My LinkedIn</strong></button>
    </div>

    <div className="inputs">

    <label><strong>Name:</strong></label>
    <input type="text" onChange={ 
    (event) => { setName(event.target.value) } } />

    <label><strong>Age:</strong></label>
    <input type="number" onChange={ 
    (event) => { setAge(event.target.value) } }/>

    <label><strong>Country:</strong></label>
    <input type="text" onChange={ 
    (event) => { setCountry(event.target.value) } } />

    <label><strong>Position:</strong></label>
    <input type="text" onChange={ 
    (event) => { setPosition(event.target.value) } } />

    <label><strong>Salary:</strong></label>
    <input type="number" onChange={ 
    (event) => { setSalary(event.target.value) } } />

    <button className="add" onClick={addEmployee}><strong>Add Employee</strong></button>
    <button className="show"onClick={getEmployees}><strong>Show Employees</strong></button>
    <button className="show"onClick={reset}><strong>Hide Employees</strong></button>

    {currentPosts.map( (val, key) => {
    return <div className="employee"> 

    <div>
    <button className="delete" onClick={ () => {deleteEmployee(val.id)} }><strong>Delete</strong></button> 
    <h3>Name: {val.name} </h3>
    <input type="text" placeholder="Update" onChange={ 
    (event) => { setNewName(event.target.value) } } /> 
    <button className="update" onClick={ () => {updateEmployeeName(val.id)} } ><strong>Update</strong></button>
    </div>

    <div>
    <h3>Age: {val.age} </h3>
    <input type="number" placeholder="Update" onChange={ 
    (event) => { setNewAge(event.target.value) } } /> 
    <button button className="update" onClick={ () => {updateEmployeeAge(val.id)} } ><strong>Update</strong></button>
    </div>

    <div>
    <h3>Country: {val.country} </h3>
    <input type="text" placeholder="Update" onChange={ 
    (event) => { setNewCountry(event.target.value) } } /> 
    <button button className="update" onClick={ () => {updateEmployeeCountry(val.id)} } ><strong>Update</strong></button>
    </div>

    <div>
    <h3>Position: {val.position} </h3>
    <input type="text" placeholder="Update" onChange={ 
    (event) => { setNewPosition(event.target.value) } } /> 
    <button button className="update" onClick={ () => {updateEmployeePosition(val.id)} } ><strong>Update</strong></button>
    </div>
    <div>
    <h3>Salary: {val.salary} </h3>
    <input type="number" placeholder="Update" onChange={ 
    (event) => { setNewSalary(event.target.value) } }/> 
    <button button className="update" onClick={ () => {updateEmployeeSalary(val.id)} } ><strong>Update</strong></button> 
    </div> 

    </div> 
    } )}
    <Pagination postsPerPage={postsPerPage} 
    totalPosts={employeeList.length} 
    paginate={paginate} />
    </div>
</div>
);
}

export default App;