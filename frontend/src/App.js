import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ProjectList from './components/Project.js';
import TaskList from './components/ToDo.js';
import ProjectTasksList from './components/ProjectTasks.js';
// import axios from 'axios';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'


const NotFound404 = ({ location }) => {
  return (
    <div>
      <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}

class App extends React.Component {

  constructor(props) {
    super(props)
    const projects = [
      {
        name_of_project: "Bachinin",
        created_at: "2003"
      }, {

        name_of_project: "Azbukina",
        created_at: "2003"
      }
    ]

    const tasks = [
      {
        task: projects[1],
        task_content: "Как любить?"
      }, {
        task: projects[0],
        task_content: "КАК СРАТЬ?"
      },
      {
        task: projects[1],
        task_content: "Как любить 2?"
      }, {
        task: projects[0],
        task_content: "КАК СРАТЬ 2?"
      },
    ]

    this.state = {
      // 'projects': [],
      'projects': projects,
      'tasks': tasks
    }
  }
  render() {
    return (
      <div className='App'>
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
            <Route exact path='/' component={() => <ProjectList projects={this.state.projects} />} />
            <Route exact path='/task' component={() => <TaskList tasks={this.state.tasks} />} />
            <Route exact path='/project/:id' component={() => <ProjectTasksList items={this.state.tasks} />} />
            {/* <Redirect from='/projects' to='/' /> */}
            <Route component={NotFound404} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}


// constructor(props) {
//   super(props)

//   this.state = {
//     'projects': [],
//     'items': []
//   }
// }


// // componentDidMoun() {
// //   axios.get('http://127.0.0.1:8000/api/projects/')
// //     .then(response => {
// //       const projects = response.data
// //       this.setState(
// //         {
// //           'projects': projects
// //         }
// //       )
// //     }).catch(error => console.log(error))
// // }


// // componentDidMountToDo() {
// //   axios.get('http://127.0.0.1:8000/api/tasks/')
// //     .then(response => {
// //       const items = response.data
// //       this.setState(
// //         {
// //           'items': items
// //         }
// //       )
// //     }).catch(error => console.log(error))
// // }





// render() {
//   return (
//     // <div className="App">
//     //   <ProjectList projects={this.state.projects} />
//     //   <TaskList items={this.state.items} />

//     // </div>
//     // Если раскомментировать код выше, то отображается только Project Name Created at, но без данных в таблице. С тасками так же

//     <div className="App">
//       <BrowserRouter>
//         <nav>
//           <ul>
//             <li>
//               <Link to='/'>Projects</Link>
//             </li>
//             <li>
//               <Link to='/tasks'>Tasks</Link>
//             </li>
//           </ul>
//         </nav>
//         <Routes>
//           <Route path='/' element={() => <ProjectList projects={this.state.projects} />} />
//           <Route path='/tasks' element={() => <TaskList items={this.state.items} />} />
//           <Route path='/tasks/:id'><ProjectTasksList tasks={this.state.items} /></Route>
//           <Route path='/projects' element={<Navigate to='/' />} />
//           <Route element={NotFound404} />
//           {/* <Route path='/'><ProjectList projects={this.state.projects} /></Route> */}
//         </Routes>
//       </BrowserRouter>
//     </div>
//     // Если оставить этот код с роутером, то просто белая страница. И с BrowserRouter, и с HashRouter белая страница
//   )
// }


export default App;

