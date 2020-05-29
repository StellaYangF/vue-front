import Vue from "vue";
import {
  Button,
  Container,
  Footer,
  Header,
  Main,
  Col,
  Row,
  Menu,
  MenuItem,
  Carousel,
  CarouselItem,
  Input,
  Form,
  FormItem,
  Message,
  Steps,
  Step,
  Submenu,
  Aside,
} from "element-ui";

const components = {
  Button,
  Container,
  Footer,
  Header,
  Main,
  Col,
  Row,
  Menu,
  MenuItem,
  Carousel,
  CarouselItem,
  Input,
  Form,
  FormItem,
  Message,
  Steps,
  Step,
  Submenu,
  Aside,
};

Object.values(components).forEach((component) => Vue.use(component));

Vue.prototype.$message = Message;
