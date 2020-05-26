import Vue from 'vue'
import { Button, Container, Footer, Header, Main, Col, Row, Menu, MenuItem, Carousel, CarouselItem, Input, Form, FormItem, Message, Steps, Step, Submenu, Aside } from 'element-ui'

const components = { Button, Container, Footer, Header, Main, Col, Row, Menu, MenuItem, Carousel, CarouselItem, Input, Form, FormItem, Steps, Step, Submenu, Aside }
Object.entries(components).forEach(([key, component]) => {
    Vue.use(component)
});



Vue.prototype.$message = Message