import React, { Component } from 'react';
import './App.css';
import TaskForm from './component/TaskForm'
import Control from './component/Control'
import TaskList from './component/TaskList'
import _ from 'lodash'
import { findIndex } from 'lodash'
import { connect } from 'react-redux'
import * as action from './actions/index'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyword: '',
            sortBy: 'name',
            sortValue: 1
        }
    }

    onGenerateDate = () => {
        var tasks = [
            {
                id: this.generateID(),
                name: 'Học Lập Trình',
                status: true
            },
            {
                id: this.generateID(),
                name: 'Đi chơi',
                status: false
            },
            {
                id: this.generateID(),
                name: 'Ngủ',
                status: true
            }
        ]
        console.log(tasks)
        this.setState({
            tasks: tasks
        })
        // console.log('generate = ' + this.state.tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks))  // conver object to string
    }

    /*  */
    onToggleForm = () => {
        this.props.onToggleForm();
    }

    /* Sunmit Form Data */
    onSubmit = (data) => {
        console.log(data)
        var { tasks } = this.state;
        if (data.id === '') {
            // insert
            data.id = this.generateID();
            tasks.push(data);
        } else {
            // update
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({
            tasks: tasks,
            taskEditing: null
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /* Update Item Status */
/*     onUpdateStatus = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id)
        console.log(index)
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks: tasks
            })
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
 */
    /* Find Item Index */
    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if (task.id == id) {
                result = index;
            }
        });
        return result;
    }

    /* Delete Item */
    onDelete = (id) => {
        console.log(id)
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1)
            this.setState({
                tasks: tasks
            })
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.onCloseForm();
    }

    /* Update Item */
    onUpdate = (id) => {
        console.log(id)
        var { tasks } = this.state;
        var index = findIndex(tasks, (task) => {
            return task.id === id;
        })
        var taskEditing = tasks[index];
        console.log(taskEditing)
        this.setState({
            taskEditing: taskEditing
        })
        this.onShowForm();
    }

    /* Filter */
    onFileter = (filterName, filterStatus) => {
        console.log(filterName + ' ' + filterStatus)
        filterStatus = parseInt(filterStatus, 10)
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        });
    }

    /* Search */
    onSearch = (keyword) => {
        console.log(keyword)
        this.setState({
            keyword: keyword
        })

    }

    /* Sort */
    onSort = (sortBy, sortValue) => {
        console.log(sortBy + ' ' + sortValue)
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        })
        console.log(this.state)
    }

    render() {
        var {
            sortBy,
            sortValue
        } = this.state;  /* var task = this.state.tasks */

        var { isDisplayForm } = this.props;

        var elementTaskForm = isDisplayForm ? <TaskForm onSubmit={this.onSubmit} /> : ''

        // var tasks = this.state.tasks;
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr />
                </div>
                <div className="row">
                    <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>

                        {/* Form */}
                        {/* <TaskForm /> */}
                        {elementTaskForm}
                    </div>
                    <div
                        className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}
                        >
                            <span className="fa fa-plus mr-5" />Thêm Công Việc
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger ml-5"
                            onClick={this.onGenerateDate}>
                            Generate Data
                        </button>

                        {/* Search - Sort */}
                        <Control
                            onSearch={this.onSearch}
                            onSort={this.onSort}
                            sortBy={sortBy}
                            sortValue={sortValue}
                        />

                        {/* List */}
                        <TaskList
                            onDelete={this.onDelete}
                            onUpdate={this.onUpdate}
                            onFileter={this.onFileter}
                        />

                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm: state.isDisplayForm  // state on the store
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(action.toggleForm())
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
