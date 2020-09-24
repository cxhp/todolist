<template>
  <div class="container">
    <header>
      <label for="title">TodoList</label>
      <div class="input">
        <input type="text" value="todo" v-model="todo" placeholder="添加待做事项" />
        <el-button type="success" icon="el-icon-check" circle @click="addTodo(todo)"></el-button>
      </div>
    </header>
    <section>
      <div class="title">
        <p>待处理</p>
        <span>{{todoLen}}</span>
      </div>
      <ul>
        <div v-for="(item,index) in todoList" :key="index">
          <div v-if="!item.done">
            <li>
              <input type="checkbox" @change="changeTodo(index,true)" />
              <p>{{item.todo}}</p>
              <a @click="removeTodo(index,true)">-</a>
            </li>
          </div>
        </div>
      </ul>

      <div class="title">
        <p>已完成</p>
        <span>{{ todoList.length - todoLen }}</span>
      </div>
      <ul>
        <div v-for="(item,index) in todoList" :key="index">
          <div v-if="item.done">
            <li>
              <input type="checkbox"  @change="changeTodo(index,false)" checked='checked'>
              <p>{{item.todo}}</p>
              <a @click="removeTodo(index,false)">-</a>
            </li>
          </div>
        </div>
      </ul>

    </section>

    <footer>
     <span>Copyright &copy; 2020 my todo 嘻嘻嘻.com</span> 
      <a>clear</a>
    </footer>
  </div>
</template>
<script>
import * as Utils from '@/utils/utils'
export default {
  name: 'TodoList',
  components: {
   
  },
  data () {
    return {
      todoList: [],
      todoLen: 0,
      todo: '',
    }
  },
  mounted(){
    this.initData()
  },
  methods: {
    // 初始化
    initData(){
      var todoArr = Utils.getItem('todoList')
      if (todoArr) {
        for (let i = 0, len = todoArr.length; i < len; i++) {
          if (todoArr[i].done === false) {
            this.todoLen++
          }
        }
        this.todoList = todoArr
      }
    },
    // 添加待处理事项
    addTodo(todo){
        if(!todo)  return false;
        var addObj ={
          todo: todo,
          done: false
        }  
        var tempList = this.todoList ?  this.todoList : []
        tempList.unshift(addObj)
        Utils.setItem('todoList',tempList)
        this.todoLen++
        this.todo=''
    },
    // 移除待处理
   removeTodo(index,done){
      if(done){
        this.todoLen--
      }
      this.todoList.splice(index,1)
      Utils.setItem('todoList', this.todoList)
   },
   // 选中某项内容
      changeTodo (index, done) {
      if (done) {
        this.todoLen--
        this.todoList[index].done = true
        Utils.setItem('todoList', this.todoList)
      } else {
        this.todoLen++
        this.todoList[index].done = false
        Utils.setItem('todoList', this.todoList)
      }
    },
  }
}
</script>

<style scoped>
  .container{
    margin: 0 auto;
    font-size: 24px;
    font-weight: bold;

  }
  header{
    height: 50px;
    background:black;
    padding: 0 20px;
  }
  header label{
    float: left;
    width: 100px;
    line-height: 50px;
    color: #FFFF;
  }
  header .input {
    float: right;
    width: 60%;
    margin-top:5px;
  }
  header .input input{
    width: 80%;
    height: 24px;
    border-radius: 5px;
    margin-right: 20px;
    border: none;
  }
  section{
    margin: 0 auto;
    padding: 0 20px;
  }
  section .title {
    position: relative;
    font-size: 24px;
    font-weight: bold;
  }
  section .title span {
    position: absolute;
    display: inline-block;
    top: 7px;
    right:5px;
    padding: 0 5px;
    height:20px;
    font-size: 14px;
    line-height:22px;
    border-radius: 20px;
    background: red;
  }
  ul{
    list-style: none;
    padding: 0;
    position: relative;
  }
  li {
    background: #FFFF;
    position: relative;
    height: 32px;
    margin-bottom: 10px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07);
  }
  li input{
    position: absolute;
    width: 20px;
    height: 20px;
    top: 3px;
    left: 5px;
  }
  li p{
    position: absolute;
    margin: 0 auto;
    width: 70%;
    font-size: 16px;
    left: 60px;
    line-height: 32px;
    text-align:left;
    /* 超出部分...+隐藏 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  li a{
    position: absolute;
    right: 5px;
    top: 3px;
    width: 12px;
    height:12px;
    border-radius: 14px;
    border: 6px double #CCC;
    line-height: 10px;
    color: #CCC;  
     cursor:pointer;
  }
  
  footer{
    /* position: fixed;
    bottom: 0;
    margin: 0 auto; */
    height: 40px;
    background: #000000;
    color: #FFFF;
  }

  footer span ,footer a{
    font-size: 12px;
    font-weight: bold;
  }
</style>
