import React, { Component } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
    Form,
    Input,
    DatePicker,
    Select,
    Button,
    Card,
    InputNumber,
    Radio,
    Icon,
    Tooltip,
  } from 'antd';
  import PageHeaderWrapper from '@/components/PageHeaderWrapper';
  import styles from './Mydemo.less';

class Mydemo extends Component{

    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }

    render() {
        return  (
            <PageHeaderWrapper
        title={<FormattedMessage id="app.forms.demo.title" />}
        content={<FormattedMessage id="app.forms.demo.description" />}
      >
            <Card bordered={false}>
          <Form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <Input type="text" value={this.state.value} onChange={this.handleChange} style={{ width: 256 }}/>
            </label>
            <Input type="submit" value="Submit" style={{ width: 256 }} />
          </Form>
          </Card>
          </PageHeaderWrapper>
          );
    }

}
export default Mydemo;