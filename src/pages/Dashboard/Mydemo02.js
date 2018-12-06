import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Select, Button, DatePicker, Table } from 'antd';
import styles from './Mydemo02.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;

@connect(({ mydemo02, loading }) => ({
  mydemo02,
  loading: loading.models.mydemo02,
}))
@Form.create()
class Mydemo02 extends PureComponent {
  state = {
    mode: ['month', 'month'],
    columns: [
      { title: '所属区县', dataIndex: 'name' },
      { title: '用血机构', dataIndex: 'useBldOrgName' },
      { title: '红细胞', dataIndex: 'hxb' },
      { title: '血浆', dataIndex: 'xj' },
      { title: '机采板', dataIndex: 'xxbdc' },
    ],
  };

  componentDidMount() {
    // this.handleSearch();
    const { dispatch } = this.props;
    dispatch({
      type: 'mydemo02/availableOrgs',
    });
  }

  handlePanelChange = (value, mode) => {
    const { form } = this.props;
    form.setFieldsValue({ range: value });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.handleSearch();
  };

  handleSubmit = e => {
    e.preventDefault();

    this.handleSearch();
  };

  handleSearch = () => {
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const {
        range: [beginTime, endTime],
        org,
      } = fieldsValue;
      const tBeginTime = beginTime.clone().subtract(1, 'year');
      const tEndTime = endTime.clone().subtract(1, 'year');
      const dateFormat = 'YYYY-MM-DD HH:mm:ss';
      const values = {
        beginTime: beginTime.format(dateFormat),
        endTime: endTime.format(dateFormat),
        tBeginTime: tBeginTime.format(dateFormat),
        tEndTime: tEndTime.format(dateFormat),
        org,
      };

      dispatch({
        type: 'mydemo02/submit',
        payload: values,
      });
    });
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
      mydemo02: { orgs },
    } = this.props;
    const { mode } = this.state;
    const start = moment().startOf('year');
    const end = moment()
      .subtract(1, 'month')
      .endOf('month');
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="时间范围">
              {getFieldDecorator('range', {
                initialValue: [start, end],
                rules: [{ required: true, message: '时间范围不能为空' }],
              })(
                <RangePicker
                  format={this.monthFormat}
                  mode={mode}
                  onPanelChange={this.handlePanelChange}
                />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="所在区域">
              {getFieldDecorator('org')(
                <Select placeholder="全部" style={{ width: '100%' }}>
                  {orgs.map(org =>
                    ['30', '40'].indexOf(org.orgType) !== -1 ? (
                      <Option value={org.code} key={org.code}>
                        {org.name}
                      </Option>
                    ) : null
                  )}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    let this_props = this.props;
    const {
      mydemo02: { list },
      loading,
    } = this.props;
    const { columns } = this.state;
    return (
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <Table dataSource={list} columns={columns} pagination={false} borderd />
        </div>
      </Card>
    );
  }
}

export default Mydemo02;
