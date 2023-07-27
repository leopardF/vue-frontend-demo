
<template>

<h3>模板语法</h3>
<p>{{ msg }}</p>
<p>{{ number + 1 }}</p>
<p>{{ ok ? "yes" : "no" }}</p>
<p>{{ msg2 }}</p>
<p v-html="rawhtml"></p>

</template>

<script>

export default{
  data() {
    return {
      msg:"申请的语法",
      msg2:"申请的语法".split("").reverse().join(""),
      number:10 + 1,
      ok: true,
      rawhtml: "<a href = 'https://www.baidu.com'>百度一下</a>"
    }
  }
}

</script>
