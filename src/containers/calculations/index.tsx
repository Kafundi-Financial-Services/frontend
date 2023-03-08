import {
    DeleteOutlined,
    CheckOutlined,
    ShoppingCartOutlined,
    FileAddOutlined
} from '@ant-design/icons'
import { Button, Card, Col, message, Popconfirm,Form, Row, Table, Tabs, Input, Tag, DatePicker } from 'antd'
import moment from 'moment-timezone'
import React from 'react'
import { connect } from 'react-redux'
import { IMobileComponent } from '../../models/ContainerProps'
import { emitRootKeyChanged } from '../../redux/actions/GlobalActions'
import ApiComponent from '../global/ApiComponent'
import CenteredSpinner from '../global/CenteredSpinner'
import ErrorRetry from '../global/ErrorRetry'
import Result from "./result"
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
        apiData: number
        isLoading: boolean
        confirmOrder: boolean
        transactions: undefined
        mtn: any
        airtel: any
        bunya: any,
        cash: any,
        startDate: any,
        endDate: any,
        showResult: boolean,
   
    }
> {
    constructor(props: any) {
        super(props)
        this.state = {
            searchTerm: '',
            apiData: 0,
            isLoading: false,
            confirmOrder: false,
            transactions: undefined,
            mtn: 5000,
            airtel: 5000,
            bunya: 5000,
            cash: 5000,
            startDate: undefined,
            endDate: undefined,
            showResult: false, 
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

    add() {
        const {mtn, airtel, bunya, cash, startDate, endDate} = this.state
        this.setState({ isLoading: true }, () => {

            this.postPathData({
                path: '/calculations',
                data: { mtn, airtel, bunya, cash, startDate, endDate },
            })
                .then((response: any) => {
                    // let result = response.result
                    console.log(response, 'cals')
                    this.setState({apiData: response})
                    this.setState({showResult: true})
                    this.setState({ isLoading: false })

                    // this.props.emitRootKeyChanged()
                })
                .catch((err) => {
                    console.log(err)
                    message.success('this is an error')
                    this.setState({ isLoading: false })
                })
        })
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

        const { RangePicker } = DatePicker

        return (
            <div>
                <Row justify="center">
                    <Col
                        xs={{ span: 23 }}
                        lg={{ span: 23 }}
                        style={{ paddingBottom: 300 }}
                    >
                        {' '}
                        {!this.state.showResult ? (
                            <Card
                                // extra={!this.props.isMobile && searchAppInput}
                                title={
                                    <React.Fragment>
                                        <span>
                                            <ShoppingCartOutlined />
                                            {`  `} CALCULATIONS
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
                                <Form layout="vertical">
                                    <Row justify="center">
                                        <Col style={{ paddingRight: 10 }}>
                                            <Form.Item
                                                label="MTN"
                                                // required={!this.props.data}
                                            >
                                                <Input
                                                    type="number"
                                                    placeholder="MTN"
                                                    name="mtn"
                                                    size="large"
                                                    value={this.state.mtn}
                                                    onChange={(e: any) =>
                                                        this.setState({
                                                            mtn: Number(
                                                                e.target.value
                                                            ),
                                                        })
                                                    }
                                                    autoFocus
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col style={{ paddingRight: 10 }}>
                                            <Form.Item label="AIRTEL">
                                                <Input
                                                    type="number"
                                                    placeholder="Airtel"
                                                    name="airtel"
                                                    size="large"
                                                    value={this.state.airtel}
                                                    onChange={(e: any) =>
                                                        this.setState({
                                                            airtel: Number(
                                                                e.target.value
                                                            ),
                                                        })
                                                    }
                                                    autoFocus
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row justify="center">
                                        <Col style={{ paddingRight: 10 }}>
                                            <Form.Item label="BUNYA">
                                                <Input
                                                    type="number"
                                                    placeholder="Bunya"
                                                    name="bunya"
                                                    size="large"
                                                    value={this.state.bunya}
                                                    onChange={(e: any) =>
                                                        this.setState({
                                                            bunya: Number(
                                                                e.target.value
                                                            ),
                                                        })
                                                    }
                                                    autoFocus
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col style={{ paddingRight: 10 }}>
                                            <Form.Item
                                                label="CASH"
                                                labelAlign="left"
                                            >
                                                <Input
                                                    type="number"
                                                    placeholder="Cash"
                                                    name="airtel"
                                                    size="large"
                                                    value={this.state.cash}
                                                    onChange={(e: any) =>
                                                        this.setState({
                                                            cash: Number(
                                                                e.target.value
                                                            ),
                                                        })
                                                    }
                                                    autoFocus
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>

                                {/* <Add> */}
                                <Button
                                    type="primary"
                                    style={{ marginTop: '15px' }}
                                    onClick={this.add.bind(this)}
                                >
                                    <FileAddOutlined />
                                    Calculate
                                </Button>
                                {/* </Add> */}
                            </Card>
                        ) : (
                                  <Card
                                // extra={!this.props.isMobile && searchAppInput}
                                title={
                                    <React.Fragment>
                                        <span>
                                            <ShoppingCartOutlined />
                                            {`  `} RESULT
                                        </span>
                                        <br />
                                      
                                    </React.Fragment>
                                }
                                
                            >
                                <Row justify='center'>


                                <Result result={this.state.apiData}/>
                                </Row>
                            </Card>
                        )}
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
