import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ProjectList from './components/Project.js';
import TaskList from './components/ToDo.js';
import ProjectTasksList from './components/ProjectTasks.js';
import axios from 'axios';
import { BrowserRouter, Route, Link, Routes, Navigate } from 'react-router-dom'


const NotFound404 = ({ location }) => {
  return (
    <div>
      <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}

class App extends React.Component {

  // constructor(props) {
  //   super(props)
  //   const proj1 = { name_of_project: 'Грин', created_at: 1880 }
  //   const proj2 = { name_of_project: 'Пушкин', created_at: 1799 }
  //   const projects = [proj1, proj2]

  //   const item1 = { task: proj1, task_content: 'Task1' }
  //   const item2 = { task: proj1, task_content: 'Task2' }
  //   const item3 = { task: proj2, task_content: 'task1' }
  //   const item4 = { task: proj2, task_content: 'task1' }
  //   const items = [item1, item2, item3, item4]

  //   this.state = {
  //     'projects': projects,
  //     'items': items
  //   }
  // }


  constructor(props) {
    super(props)

    // axios.get('http://127.0.0.1:8000/api/projects/')
    //   .then(response => {
    //     const projects = response.data
    //     this.setState(
    //       {
    //         'projects': projects
    //       }
    //     )
    //   }).catch(error => console.log(error))

    // axios.get('http://127.0.0.1:8000/api/tasks/')
    //   .then(response => {
    //     const items = response.data
    //     this.setState(
    //       {
    //         'items': items
    //       }
    //     )
    //   }).catch(error => console.log(error))

    this.state = {
      'projects': [],
      'items': []
    }
  }


  componentDidMoun() {
    axios.get('http://127.0.0.1:8000/api/projects/')
      .then(response => {
        const projects = response.data
        this.setState(
          {
            'projects': projects
          }
        )
      }).catch(error => console.log(error))
  }


  componentDidMountToDo() {
    axios.get('http://127.0.0.1:8000/api/tasks/')
      .then(response => {
        const items = response.data
        this.setState(
          {
            'items': items
          }
        )
      }).catch(error => console.log(error))
  }





  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to='/'>Projects</Link>
              </li>
              <li>
                <Link to='/tasks'>Tasks</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route exact path='/' component={() => <ProjectList items={this.state.projects} />} />
            <Route exact path='/tasks' component={() => <TaskList items={this.state.items} />} />
            <Route path='/tasks/:id'><ProjectTasksList items={this.state.tasks} /></Route>
            <Route path='/projects' element={<Navigate to='/' />} />
            <Route component={NotFound404} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }

  // componentDidMoun() {
  //   axios.get('http://127.0.0.1:8000/api/projects/')
  //     .then(response => {
  //       const projects = response.data
  //       this.setState(
  //         {
  //           'projects': projects
  //         }
  //       )
  //     }).catch(error => console.log(error))

  //   axios.get('http://127.0.0.1:8000/api/tasks/')
  //     .then(response => {
  //       const items = response.data
  //       this.setState(
  //         {
  //           'items': items
  //         }
  //       )
  //     }).catch(error => console.log(error))
  // }

}
export default App;

