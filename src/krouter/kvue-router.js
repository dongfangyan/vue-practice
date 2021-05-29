/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
let Vue;
class VueRouter {
  // eslint-disable-next-line no-unused-vars
  constructor(options) {
    this.options = options;
    //如何造一个响应式
    // 方式1：借鸡生蛋 - new Vue({data: {}})
    // // 方式2：Vue.util.defineReactive(obj, 'current')
    // Vue.set(this)
    // Vue.set(obj, 'key', 'val')
    Vue.util.defineReactive(
      this,
      "current",
      window.location.hash.slice(1) || "/"
    )
    // this.current = window.location.hash.slice(1) || '/'
    window.addEventListener('hashchange', () => {
        this.current = window.location.hash.slice(1);
    })
  }
}
// 插件要实现unstall方法



VueRouter.install = function (_Vue) {
  Vue = _Vue;
//   全局混入：
Vue.mixin({
    beforeCreate (){
        // 仅在根组件创建执行
     if (this.$options.router){    
      Vue.prototype.$router = this.$options.router
     }
    }
})
  Vue.component("router-view", {
    render(h) {
    //   (url) => component;
    //   return h("div", "router-view");
    let component = null
    const {current, options} = this.$router;
    const routes = options.routes.find(route => route.path === current)
     console.log(current, options);
     if(routes){
       component = routes.component
     }
    // console.log(this.$router.current);
    return h(component);
    },
  });
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      // <a href="#/about">xxx</a>
      return h(
        "a",
        {
          attrs: {
            href: "#" + this.to,
          },
        },
        this.$slots.default
      );
    },
  });
};
export default VueRouter;
