# hook顺序执行

如果每一次Hook 的调用顺序是稳定的，React 就能够知道哪个 state 对应到哪个 useState 。   
每一个Hook 在每一次元件渲染时的调用顺序都一样，只要Hook 的调用顺序在每次渲染时保持一致，React 就能正确地将内部state 和对应的Hook 进行关联。