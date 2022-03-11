import Vue from "vue";
import "@/styles/inject.scss";
import "@/styles/element-ui.scss";

import {
  Button,
  Radio,
  Checkbox,
  Select,
  Input,
  Card,
  Form,
  FormItem,
  Table,
  TableColumn,
  Row,
  Col,
  Message,
  Loading
} from "element-ui";

Vue.prototype.$ELEMENT = { size: "mini" };
Vue.use(Button);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Input);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Row);
Vue.use(Col);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
