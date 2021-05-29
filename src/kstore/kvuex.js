/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
let Vue;
class Store {
  constructor(options) {
      this._mutations = options.mutations
      this._actions = options.actions
      this._wrappedGetters = options.getters
    // 响应式处理的
    // this.state = new Vue({
    //   data: options.state
    // });
    // setInterval(() => {
    //     this.state.counter++
    // }, 1000)
    const computed = {}
    this.getters = {}
    const store = this
    Object.keys(this._wrappedGetters).forEach(key => {
      // 获取用户定义的getter
      const fn = store._wrappedGetters[key]
      //转换为computed可以使用无参数形式
      computed[key] = function() {
        return fn(store.state)
      }
      // 为getters定义只读属性
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key]
      })
    })
    this._vm = new Vue({
        data: {
            // 添加$$,Vue就不会代理
            $$state: options.state
        },
        computed
    }),

  this.commit = this.commit.bind(this)
  this.dispatch = this.dispatch.bind(this)
  }
  
  get state() {
      return this._vm._data.$$state
  }
  set state(v) {
      console.error('请使用replaceState重置状态')
  }
  commit (type, payload) {
    // 1.根据type类型获取mutation
    const mutation = this._mutations[type]
    if(!mutation) {
    console.error('mutations不存在')
        return
    }
    mutation(this.state, payload)
  }
  dispatch (type) {
    // 1.根据type类型获取mutation
    const actions = this._actions[type]
    if(!actions) {
    console.error('mutations不存在')
        return
    }
  }
}
function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
      beforeCreate() {
          if(this.$options.store) {
        Vue.prototype.$store = this.$options.store
}
    }
  })
}
export default { Store, install };
