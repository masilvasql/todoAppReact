import React,{Component} from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'


const URL = 'http://localhost:3002/api/todos'

export default class Todo extends Component{

    constructor(props){
        super(props)
        this.state={
            description:'',
            list:[]
        }
        this.handleRemove = this.handleRemove.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd= this.handleAdd.bind(this)
        this.refresh()
    }

    refresh(){ // ordenação por data de criação do mais novo para o mais velho
        axios.get(`${URL}?sort=-createdAt`)
        .then(resp=> this.setState({...this.state,description:'', list:resp.data}))
    }

    handleChange(e){
        this.setState({...this.state, description:e.target.value})
    }
    
    handleAdd(){
        const description = this.state.description
        axios.post(URL,{description})
        .then(resp => this.refresh())
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh( ))
    }

    render(){
        return(
            <div>
                <PageHeader nome="Tarefas" small="Cadastro"></PageHeader>
                <TodoForm
                    handleAdd={this.handleAdd}
                    description = {this.state.description}
                    handleChange ={this.handleChange}
                />
                <TodoList
                    list = {this.state.list}
                    handleRemove = {this.handleRemove}
                />
            </div>
        )
    }
}