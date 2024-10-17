# vue2和vue3双向绑定原理的区别

vue2：vue2的双向数据绑定是利用ES5的一个APIObject.definePropert() 对数据进行劫持，结合发布订阅模式的方式来实现的。   
vue3：vue3中使用了ES6的Proxy API对数据代理。相比vue2.x，使用proxy的优势如下：

defineProperty只能监听某个属性，不能对全对象监听
可以省去for in，闭包等内容来提升效率(直接绑定整个对象即可)
可以监听数组，不用再去单独的对数组做特异性操作vue3.x可以检测到数组内部数据的变化。