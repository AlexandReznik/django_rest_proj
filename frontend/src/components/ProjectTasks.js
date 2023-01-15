import React from 'react'
import { useParams } from 'react-router-dom'

const TaskItem = ({ item }) => {
    return (
        <tr>
            {/* <td>{item.id}</td> */}
            <td>{item.task}</td>
            <td>{item.task_content}</td>
        </tr>
    )
}
const ProjectTasksList = ({ items }) => {
    let { id } = useParams();
    let filtered_items = items.filter((item) => item.project.id === id)
    return (
        <table>
            <tr>
                <th>Task</th>
                <th>Content</th>
            </tr>
            {filtered_items.map((item) => <TaskItem item={item} />)}
        </table>
    )
}
export default ProjectTasksList
