import React from 'react'
import { Link } from 'react-router-dom'


const ProjectItem = ({ project, deleteProject }) => {
    return (
        <tr>
            <td>
                <Link to={`project/${project.id}`}>{project.name_of_project}</Link>
            </td>
            <td>
                {project.created_at}
            </td>
            <td><button onClick={() => deleteProject(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({ projects, deleteProject }) => {
    return (
        <div>
            <table>
                <tr>
                    <th>
                        Project Name
                    </th>
                    <th>
                        Created at
                    </th>
                    <th></th>
                </tr>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
            </table>
        </div>
    )
}
export default ProjectList
