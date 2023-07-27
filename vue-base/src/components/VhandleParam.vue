<template>
<h3>方法事件处理器 Event </h3>
<button @click="addCount">Add 1</button>
<p>count1 is : {{ count1 }}</p>

<h3>方法事件处理器 Param</h3>
<button @click="addCount2('hello')">Add 1</button>
<p>count2 is : {{ count2 }}</p>


<h3>方法事件处理器 Param , Event</h3>
<button @click="addCount3('hello',$event)">Add 1</button>
<p>count2 is : {{ count2 }}</p>
</template>

<script>
export default{
    data(){
        return{
            count1: 0,
            count2: 0
        }
    },
    methods:{
        addCount(event){
            // Vue中的event 就是原生JS的Event
            event.target.innerHTML = "Add " + this.count1
            this.count1 ++
        },
        addCount2(msg){
            // Vue中的event 就是原生JS的Event
            console.log(msg)
            this.count2 ++
        },
        addCount3(msg,event){
            // Vue中的event 就是原生JS的Event
            console.log(msg + "，" + event.target.innerHTML)
            this.count2 ++
        }
    }
}

</script>