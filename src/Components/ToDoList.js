import React, {Component} from "react"

class ToDoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputText: "",
            allTasksExpanded: false,
            pendingTasksExpanded: false,
            completedTasksExpanded: false,
            deletedTasksExpanded: false,
            todoListCount: [
                {
                    "id": 0,
                    "taskName": "This is a dummy task!",
                    "taskCompleted": false,
                    "taskDeleted": false
                }
            ]
        }
        this.handleInput = this.handleInput.bind(this)
        this.updateTasks = this.updateTasks.bind(this)
        this.taskActions = this.taskActions.bind(this)
    }

    handleInput(e) {
        this.setState({
            inputText: e.target.value
        })
    }

    updateTasks(ev) {
        var getMaxID = this.getMaxCurrentId()
        if (this.state.inputText.toString().length > 0) {
            this.setState({
                todoListCount: this.state.todoListCount.concat(
                    {
                        "id": ++getMaxID,
                        "taskName": this.state.inputText,
                        "taskCompleted": false,
                        "taskDeleted": false
                    }
                ),
                inputText: ""
            })
        }
    }

    getMaxCurrentId() {
        var theArr = this.state.todoListCount
        var theHighTide = Math.max.apply(Math, theArr.map(function(o) { return o.id; }))
        return theHighTide
    }

    taskActions(e, type) {
        console.log(e.target.id)
        var taskId = e.target.id.toString().split("_")[1]
        var theArr = this.state.todoListCount
        if (type === 1) {
            let objToUpdate = theArr.find((el) =>  el.id === parseInt(taskId)) // grab element with matching id
            objToUpdate.taskCompleted = !objToUpdate.taskCompleted
            this.setState({
                todoListCount: theArr
            })
        }
        else {
            let objToUpdate = theArr.find((el) =>  el.id === parseInt(taskId)) // grab element with matching id
            objToUpdate.taskDeleted = !objToUpdate.taskDeleted
            this.setState({
                todoListCount: theArr
            })
        }
    }

    returnTasks(type) {
        var tasksStuff = []

        if (type === "pending") {
            var pendingTasks = this.state.todoListCount.filter(obj => {
                return obj.taskCompleted !== true && obj.taskDeleted !== true
            })
            var pendingTasksLen = pendingTasks.length
            for (var t = 0; t < pendingTasksLen; t++) {
                tasksStuff.push(
                    <div key={"taskId" + pendingTasks[t].id} className="taskName hidO">
                        <span>
                        {
                            pendingTasks[t].taskName
                        }
                        </span>
                        <section className="taskActions">
                            <button className="plainBtn" id={"cTask_" + pendingTasks[t].id} onClick={(e) => this.taskActions(e, 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
                                </svg>
                            </button>
                            <button className="plainBtn" id={"dTask_" + pendingTasks[t].id} onClick={(e) => this.taskActions(e, 2)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"/>
                                </svg>
                            </button>
                        </section>
                    </div>
                )
            }
        }
        else if (type === "completed") {
            var completedTasks = this.state.todoListCount.filter(obj => {
                return obj.taskCompleted === true && obj.taskDeleted !== true
            })
            var completedTasksLen = completedTasks.length
            for (var t = 0; t < completedTasksLen; t++) {
                tasksStuff.push(
                    <div key={"taskId" + completedTasks[t].id} className="taskName hidO">
                        <span>
                        {
                            completedTasks[t].taskName
                        }
                        </span>
                    </div>
                )
            }
        }
        else {
            var deletedTasks = this.state.todoListCount.filter(obj => {
                return obj.taskDeleted === true
            })
            var deletedTasksLen = deletedTasks.length
            for (var t = 0; t < deletedTasksLen; t++) {
                tasksStuff.push(
                    <div key={"taskId" + deletedTasks[t].id} className="taskName hidO">
                        <span>
                        {
                            deletedTasks[t].taskName
                        }
                        </span>
                    </div>
                )
            }
        }

        return tasksStuff
    }

    render() {
        const {tdL} = this.state.todoListCount
        var totalTasks = this.state.todoListCount.length
        var pendingTasks = this.state.todoListCount.filter(obj => {
            return obj.taskCompleted !== true && obj.taskDeleted !== true
        })
        var completedTasks = this.state.todoListCount.filter(obj => {
            return obj.taskCompleted === true && obj.taskDeleted !== true
        })
        var deletedTasks = this.state.todoListCount.filter(obj => {
            return obj.taskDeleted === true
        })
        return (
            <div className="posRel hidO productPage">
                <div className="todoList posRel hidO">
                    <div className="addNewTH posRel hidO">
                        <input type="text" placeholder="Add a new task" className="txtNew" value={this.state.inputText} onChange={(e) => this.handleInput(e)} />
                    </div>
                    <div className="addNewBH n posRel hidO">
                        <button className="btnAdd" onClick={(e) => this.updateTasks(e)}>Add</button>
                    </div>
                </div>
                <div className="tasksHolder posRel visO">
                    <div className="tabs visO">
                        {
                            pendingTasks.length > 0 ?
                                <div className="tab visO posRel">
                                    <input type="checkbox" id="chck1" />
                                    <label className="tab-label" htmlFor="chck1"><span>Pending Tasks</span></label>
                                    <div className="tab-content hidO">
                                    {
                                        this.returnTasks("pending")
                                    }
                                    </div>
                                </div> :
                            null
                        }
                        {
                            completedTasks.length > 0 ?
                                <div className="tab visO posRel">
                                    <input type="checkbox" id="chck2" />
                                    <label className="tab-label" htmlFor="chck2"><span>Completed Tasks</span></label>
                                    <div className="tab-content hidO">
                                    {
                                        this.returnTasks("completed")
                                    }
                                    </div>
                                </div> :
                            null
                        }
                        {
                            deletedTasks.length > 0 ?
                                <div className="tab visO posRel">
                                    <input type="checkbox" id="chck3" />
                                    <label className="tab-label" htmlFor="chck3"><span>Deleted Tasks</span></label>
                                    <div className="tab-content hidO">
                                    {
                                        this.returnTasks("deleted")
                                    }
                                    </div>
                                </div> :
                            null
                        }
                    </div>
                </div>
                <div className="allTasksStatus posFix hidO">
                    <section className="oneQ">
                        <h3>All Tasks</h3>
                        <h1>{totalTasks}</h1>
                    </section>
                    <section className="oneQ">
                        <h3>Pending Tasks</h3>
                        <h1>{pendingTasks.length}</h1>
                    </section>
                    <section className="oneQ">
                        <h3>Completed Tasks</h3>
                        <h1>{completedTasks.length}</h1>
                    </section>
                    <section className="oneQ">
                        <h3>Deleted Tasks</h3>
                        <h1>{deletedTasks.length}</h1>
                    </section>
                </div>
            </div>
        )
    }
}

export default ToDoList