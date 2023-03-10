import { Form, Input, Modal, Select } from 'antd'
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
            transactions: false,
            isModalVisible: false,
            data: xtend(props.data, {}),
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
                path: '/expenses',
                data: xtend(this.state.data),
            })
                .then(() => {
                    this.props.emitRootKeyChanged()
                })
                .catch(() => {
                    this.setState({ isLoading: false })
                })
        })
    }

    render() {
        return (
            <>
                <Modal
                    title={`${this.props.data ? 'UPDATE' : 'NEW'} TRANSACTION`}
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
                                label="Expense"
                                required={!this.props.data}
                            >
                                <Input
                                    type="text"
                                    placeholder="Expense"
                                    name="amount"
                                    size="large"
                                    value={this.state.data.expense}
                                    onChange={(e: any) =>
                                        this.setData('expense', e.target.value)
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
                            {/* <Form.Item
                                label="STATUS"
                                required={!this.props.data}
                            >
                                <Input
                                    type="text"
                                    placeholder="Status"
                                    name="status"
                                    size="large"
                                    value={this.state.data.status}
                                    onChange={(e: any) =>
                                        this.setData('status', e.target.value)
                                    }
                                />
                            </Form.Item> */}
                            {/* <Form.Item label="ROLES">
                                <Select
                                    onChange={(value: any) => {
                                        this.setData('roles', value)
                                    }}
                                    value={this.state.data.roles}
                                    size="large"
                                    mode="multiple"
                                    placeholder="Roles"
                                >
                                    {['ADMIN'].map((role, index) => (
                                        <Select.Option value={role} key={index}>
                                            {role}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item> */}
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
