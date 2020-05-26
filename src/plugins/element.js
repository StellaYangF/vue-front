import Vue from 'vue';
import { Header, Footer, Main, Container, Row, Col } from 'element-ui';

const components = {
  Header, Footer, Main, Container, Row, Col,
};

Object.values(components).forEach(component => Vue.use(component));