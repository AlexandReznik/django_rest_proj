import React from 'react'


class TaskForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { task: props.projects[0].id, task_content: '' }
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.task]: event.target.value
            }
        );
    }
    handleSubmit(event) {
        this.props.createTask(this.state.task, this.state.task_content)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="project">Project</label>
                    <select name="project" className='form-control'
                        onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((project) => <option
                            value={project.id}>{project.name_of_project}</option>)}
                    </select>
                </div>
                <div className="form-group">

                    <label for="content">Content</label>
                    <input type="text" className="form-control" name="author"
                        value={this.state.task_content} onChange={(event) => this.handleChange(event)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}
export default TaskForm