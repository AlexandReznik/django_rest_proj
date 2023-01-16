import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ProjectList from './components/Project.js';
import TaskList from './components/ToDo.js';
import ProjectTasksList from './components/ProjectTasks.js';
import axios from 'axios';
import { BrowserRouter, Route, Link, Routes, Navigate, HashRouter } from 'react-router-dom'


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
  // С этим кодом выше не выводит. Белый экран просто.


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
  // }


  // componentDidMountToDo() {
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





  render() {
    return (
      // <div className="App">
      //   <ProjectList projects={this.state.projects} />
      //   <TaskList items={this.state.items} />

      // </div>
      // Если раскомментировать код выше, то отображается только Project Name Created at, но без данных в таблице. С тасками так же

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
            <Route path='/' element={() => <ProjectList projects={this.state.projects} />} />
            <Route path='/tasks' element={() => <TaskList items={this.state.items} />} />
            <Route path='/tasks/:id'><ProjectTasksList tasks={this.state.items} /></Route>
            <Route path='/projects' element={<Navigate to='/' />} />
            <Route element={NotFound404} />
            {/* <Route path='/'><ProjectList projects={this.state.projects} /></Route> */}
          </Routes>
        </BrowserRouter>
      </div>
      // Если оставить этот код с роутером, то просто белая страница. И с BrowserRouter, и с HashRouter белая страница
    )
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
  // Axios почему то не вытягивает данные, пробовал по-разному, ничего не помогает.
  // Пожалуйста, посмотрите код, потому что я без понятия где ошибка. Все перепробовал.

}
export default App;

