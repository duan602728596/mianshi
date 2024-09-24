# this的几种模式

* 方法调用模式下，this 总是指向调用它所在方法的对象，this 的指向与所在方法的调用位置有关，而与方法的声明位置无关（箭头函数特殊）；
* 函数调用下，this 指向 window ,调用方法没有明确对象的时候，this 指向 window，如 setTimeout、匿名函数等；
* 构造函数调用模式下，this 指向被构造的对象；
* apply,call,bind 调用模式下，this 指向第一个参数；
* 箭头函数，在声明的时候绑定this，而非取决于调用位置；
* 严格模式下，如果 this 没有被执行环境（execution context）定义，那 this是 为undefined；