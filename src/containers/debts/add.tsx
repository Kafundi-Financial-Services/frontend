import { Form, Input, Modal, Select, message } from 'antd'
import React, { ReactElement } from 'react'
import { connect } from 'react-redux'
import xtend from 'xtend'
import { emitRootKeyChanged } from '../../redux/actions/GlobalActions'
import ApiComponent from '../global/ApiComponent'
import CenteredSpinner from '../global/CenteredSpinner'

class AddTransaction extends ApiComponent<
    {
        emitRootKeyChanged: Function
        children: ReactElement
        data: any
    },
    any
> {
    constructor(props: any) {
        super(props)
        this.state = {
            isLoading: false,
            isModalVisible: false,
            data: xtend(props.data, {voda: false}),
        }
    }

    setData(key: any, value: any) {
        this.setState({
            data: xtend(this.state.data, {
                [`${key}`]: value,
            }),
        })
    }

    add() {
        this.setState({ isLoading: true }, () => {
            this[this.props.data ? 'updatePathData' : 'postPathData']({
                path: '/debts',
                data: xtend(this.state.data),
            })
                .then((response) => {
                    console.log(response, 'transactions')
                    this.props.emitRootKeyChanged()
                })
                .catch((err) => {
                    console.log(err)
                    message.success('this is an error')
                    this.setState({ isLoading: false })
                })
        })
    }

    render() {
        return (
            <>
                <Modal
                    title={`${this.props.data ? 'UPDATE' : 'NEW'} DEDT`}
                    visible={this.state.isModalVisible}
                    onOk={this.add.bind(this)}
                    onCancel={() =>
                        this.setState({
                            isModalVisible: false,
                        })
                    }
                    okButtonProps={{ disabled: this.state.isLoading }}
                    cancelButtonProps={{ disabled: this.state.isLoading }}
                    okText={this.props.data ? 'UPDATE' : 'ADD'}
                >
                    {this.state.isLoading ? (
                        <CenteredSpinner />
                    ) : (
                        <Form layout="vertical">
                            <Form.Item
                                label="Name"
                                required={!this.props.data}
                            >
                                <Input
                                    type="text"
                                    placeholder="Name"
                                    name="amount"
                                    size="large"
                                    value={this.state.data.name}
                                    onChange={(e: any) =>
                                        this.setData('name', e.target.value)
                                    }
                                    autoFocus
                                />
                            </Form.Item>
                            <Form.Item
                                label="AMOUNT"
                                required={!this.props.data}
                            >
                                <Input
                                    type="number"
                                    placeholder="Amount"
                                    name="amount"
                                    size="large"
                                    value={this.state.data.amount}
                                    onChange={(e: any) =>
                                        this.setData('amount', e.target.value)
                                    }
                                />
                            </Form.Item>

                        </Form>
                    )}
                </Modal>
                {React.cloneElement(this.props.children, {
                    onClick: () => this.setState({ isModalVisible: true }),
                })}
            </>
        )
    }
}

export default connect<any, any, any>(undefined, {
    emitRootKeyChanged: emitRootKeyChanged,
})(AddTransaction)
