import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Select,
  Button,
  DatePicker,
  Table,
} from 'antd';
import styles from './Mydemo02.less';

const { RangePicker } = DatePicker;

const list = [];
class Mydemo02 extends PureComponent{
    state = {
        columns:[
            {title:'所属区县',
             dataIndex:'name'   
            },
            {title:'用血机构',
             dataIndex:'useBldOrgName'   
            },
            {title:'红细胞',
             dataIndex:'hxb'   
            },
            {title:'血浆',
             dataIndex:'xj'   
            },
            {title:'机采板',
             dataIndex:'xxbdc'   
            }
        ]
    };

    render(){
        let this_props = this.props;
        const {columns} = this.state;
        return (
            <Card bordered={false}>
                <div className={styles.tableList}>
                    <div className={styles.tableListForm}></div>
                    <Table 
                        
                        dataSource={list}
                        columns={columns}
                        pagination={false}
                        borderd
                    />
                </div>
            </Card>

        );
    }

}

export default Mydemo02;