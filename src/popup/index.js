import Vue from "vue";
import AppComponent from "./App/App.vue";
import {
  Button,
  Row,
  Col,
  Input,
  Select,
  Option,
  Form,
  FormItem
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.component("app-component", AppComponent);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
