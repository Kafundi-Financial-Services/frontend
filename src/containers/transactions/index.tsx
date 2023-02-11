import {
    DeleteOutlined,
    CheckOutlined,
    ShoppingCartOutlined,
    FileAddOutlined
} from '@ant-design/icons'
import { Button, Card, Col, message, Popconfirm, Row, Table, Tabs, Input, Tag } from 'antd'
import moment from 'moment-timezone'
import React from 'react'
import { connect } from 'react-redux'
import { IMobileComponent } from '../../models/ContainerProps'
import { emitRootKeyChanged } from '../../redux/actions/GlobalActions'
import ApiComponent from '../global/ApiComponent'
import CenteredSpinner from '../global/CenteredSpinner'
import ErrorRetry from '../global/ErrorRetry'
import Add from "./add"
// import User from './add'
// change colomn name to suit the orders

class TransactionsTable extends ApiComponent<
    {
        emitRootKeyChanged: Function
        isMobile: boolean
    },
    {
        searchTerm: string
        apiData: any
        isLoading: boolean
        confirmOrder: boolean
            transactions: undefined

     
    }
> {
    constructor(props: any) {
        super(props)
        this.state = {
            searchTerm: '',
            apiData: undefined,
            isLoading: false,
            confirmOrder: false,
            transactions: undefined
        }
    }

    onSearchUser(input: any, option: any) {
        let regEx = new RegExp(input, 'ig')
        return regEx.test(option.type)
    }

    reFetchData(isLoading: boolean) {
        this.setState({ isLoading }, () => {
            this.getPathData({ path: '/browse/transactions' })
                .then(({ items }: any) => {
                    console.log(items, 'transactions')

                    const paid = items.filter(
                        (e: any) => e.payment === 'successful'
                    )

                    const unpaid = items.filter(
                        (e: any) => e.payment !== 'successful'
                    )
                    this.setState({
                        isLoading: false,
                        apiData: items,
                        transactions: items,
                        
                    })

                    // this.props.emitRootKeyChanged()
                })
                .catch(() => this.setState({ isLoading: false }))
        })
    }

    componentDidMount() {
        this.reFetchData(true)

    }

    render() {
        if (this.state.isLoading) return <CenteredSpinner />

        if (!this.state.apiData) {
            return <ErrorRetry reloadCallBack={this.reFetchData.bind(this)} />
        }

        // const data = this.state.apiData.filter((user: any) => {
        //     if (!this.state.searchTerm) return true
        //     return this.onSearchUser(this.state.searchTerm, user)
        // })

        const searchAppInput = (
            <Input
                placeholder="Search"
                type="text"
                onChange={(event) =>
                    this.setState({
                        searchTerm: (event.target.value || '').trim(),
                    })
                }
            />
        )

        return (
            <div>
                <Row justify="center">
                    <Col
                        xs={{ span: 23 }}
                        lg={{ span: 23 }}
                        style={{ paddingBottom: 300 }}
                    >
                        <Card
                            // extra={!this.props.isMobile && searchAppInput}
                            title={
                                <React.Fragment>
                                    <span>
                                        <ShoppingCartOutlined />
                                        {`  `} TRANSACTIONS
                                    </span>
                                    <br />
                                    {this.props.isMobile && (
                                        <div style={{ marginTop: 8 }}>
                                            {searchAppInput}
                                        </div>
                                    )}
                                </React.Fragment>
                            }
                        >
                         
                                    <Table
                                        rowKey={(record) => record.id}
                                        pagination={{
                                            defaultPageSize: 5,
                                            hideOnSinglePage: true,
                                            showSizeChanger: false,
                                        }}
                                        columns={[
                                            {
                                                title: 'Transaction ID',
                                                dataIndex: '_id',
                                                render: (_, {_id})=> _id.slice(-3) 
                                            },
                                            {
                                                title: 'Amount',
                                                dataIndex: 'amount',
                                            },
                                            {
                                                title: 'Status',
                                                dataIndex: 'status',
                                                // render: (_, record: any) =>
                                                //     record.address.locale,
                                                render: (_, {status}) => {
                                                    console.log(status, 'statuse')
                                                    let color: string
                                                    if (status === "PENDING") {
                                                        color = "volcano";
                                                    } else color = "green"
                                                    return (
						<Tag color={color} key={status}>
							{status.toUpperCase()}
						</Tag>
					);
                                                  
                                                }
		
		
                                            },
                                            {
                                                title: 'Profit',
                                                dataIndex: 'profit',
                                                render: (_, {profit}) =>
                                                    Math.round(profit)
                                            },
                                         
                                            {
                                                title: 'CREATED AT',
                                                dataIndex: 'createdAt',
                                                render: (createdAt) => (
                                                    <>
                                                        {moment(createdAt)
                                                            .tz(
                                                                'Africa/Kampala'
                                                            )
                                                            .format(
                                                                'MMMM Do, h:mm a'
                                                            )}
                                                    </>
                                                ),
                                            },
                                            
                                            {
                                                title: 'ACTION',
                                                dataIndex: 'actions',
                                                render: (_, record) => (
                                                    <span>
                                                        {/* <User data={record}>
                                                <Button
                                                    shape="circle"
                                                    type="primary"
                                                >
                                                    <EditOutlined />
                                                </Button>
                                            </User> */}
                                                        <Popconfirm
                                                            title="Sure to delete?"
                                                            onConfirm={() =>
                                                                this.deletePathData(
                                                                    {
                                                                        path: `/transactions/${record._id}`,
                                                                    }
                                                                ).then(() =>
                                                                    this.props.emitRootKeyChanged()
                                                                )
                                                            }
                                                        >
                                                            <Button
                                                                type="primary"
                                                                danger
                                                                shape="circle"
                                                                style={{
                                                                    marginLeft:
                                                                        '10px',
                                                                }}
                                                                icon={
                                                                    <DeleteOutlined />
                                                                }
                                                            />
                                                        </Popconfirm>
                                                        <Popconfirm
                                                            title="sure to approve?"
                                                            onConfirm={() => {
                                                                console.log(
                                                                    record
                                                                )

                                                                this.updatePathData(
                                                                    {
                                                                        path: `/transactions/${record._id}`,
                                                                        data: {
                                                                            status:
                                                                                'SUCCESS',
                                                                            confirmedAt: new Date(),
                                                                        },
                                                                    }
                                                                )
                                                                    .then(
                                                                        () => {
                                                                            this.props.emitRootKeyChanged()
                                                                        }
                                                                    )
                                                                    .catch(
                                                                        (e) => {
                                                                            message.error(
                                                                                e.message
                                                                            )
                                                                        }
                                                                    )
                                                            }}
                                                        >
                                                            <Button
                                                                type="primary"
                                                                shape="circle"
                                                                style={{
                                                                    marginLeft:
                                                                        '10px',
                                                                }}
                                                                icon={
                                                                    <CheckOutlined />
                                                                }
                                                            />
                                                        </Popconfirm>
                                                    </span>
                                                ),
                                            },
                                        ]}
                                        // dataSource={this.state.transactions}
                                        dataSource={this.state.transactions}
                                        size="small"
                                    />
                                    <Add>
    <Button
                                type="primary"
                                style={{ marginTop: '15px' }}
                            >
                               <FileAddOutlined />
                                ADD
                            </Button>
                                    </Add>
                                
                           
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        isMobile: state.globalReducer.isMobile,
    }
}

export default connect<IMobileComponent, any, any>(mapStateToProps, {
    emitRootKeyChanged: emitRootKeyChanged,
})(TransactionsTable)
