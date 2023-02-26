import { Card, Col, Row, Statistic, Button, Typography } from 'antd'

import ReactECharts from 'echarts-for-react'

import { RouteComponentProps } from 'react-router'
import ApiComponent from './global/ApiComponent'


export default class Dashboard extends ApiComponent<RouteComponentProps<any>, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            isLoading: false,
            stats: {},
            collections: 0,
            profits: 0,
            monthlyExpenses: 0,
            monthlyTransactions: 0,
            monthlyProfits: 0,
            dailyExpenses: 0,
            dailyTransactions: 0,
            dailyProfits: 0
        }
    }

    getOptions(data: any) {
        return {
            color: '#1b8ad3',
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    data: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                    ],
                },
            ],
            yAxis: [
                {
                    type: 'value',
                },
            ],
            series: [
                {
                    type: 'bar',
                    barWidth: '60%',
                    data,
                },
            ],
        }
    }

    getWeeklyOptions(data: any) {
        return {
            color: '#1b8ad3',
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    data: [
                        'Mon',
                        'Tue',
                        'Wed',
                        'Thur',
                        'Fri',
                        'Sat',
                        'Sun',
                     
                    ],
                },
            ],
            yAxis: [
                {
                    type: 'value',
                },
            ],
            series: [
                {
                    type: 'bar',
                    barWidth: '60%',
                    data,
                },
            ],
        }
    }

    fetchStats() {
        this.getPathData({ path: '/statistics/monthly' })
            .then((stats: any) => {
                console.log(stats, 'stats month');
                this.setState({ stats })
                this.fetchCollections()
            })
            .catch(() => {})
    }

    fetchCollections() {
        this.getPathData({ path: '/statistics' })
            .then((stats: any) => {
                console.log(stats, 'stats')       

                this.setState({
                    monthlyExpenses: stats.monthlyExpenses[0].amount,
                    monthlyTransactions: stats.monthlyTransactions[0].amount,
                    monthlyProfits: stats.monthlyTransactions[0].amount-stats.monthlyExpenses[0].amount,
                        dailyTransactions: stats.dailyTransactions[0].amount,
                        dailyExpenses: stats.dailyExpenses[0].amount,
                        dailyProfits: stats.dailyTransactions[0].amount - stats.dailyExpenses[0].amount,
                });


            })
            .catch((err) => {console.log(err)})
    }
    componentDidMount() {
        this.fetchStats()
        // this.fetchCollections()
    }

    render() {
        return (
            <>
                <Row justify="center" gutter={20}>
                    <Col
                        style={{ marginBottom: 20 }}
                        lg={{ span: 10 }}
                        xs={{ span: 23 }}
                    >
                        <Card>
                            <ReactECharts
                                option={{
                                    ...this.getWeeklyOptions(
                                        this.state.stats.dailyTransactions
                                    ),
                                    title: {
                                        text: 'Daily',
                                    },
                                }}
                                notMerge={true}
                                lazyUpdate={true}
                                style={{ height: '220px', width: '100%' }}
                            />
                        </Card>
                    </Col>
                    <Col
                        style={{ marginBottom: 20 }}
                        lg={{ span: 10 }}
                        xs={{ span: 23 }}
                    >
                        <Card>
                            <ReactECharts
                                option={{
                                    ...this.getOptions(
                                        this.state.stats.transactions
                                    ),
                                    title: {
                                        text: 'Monthly',
                                    },
                                }}
                                notMerge={true}
                                lazyUpdate={true}
                                style={{ height: '220px', width: '100%' }}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row justify="center" gutter={20} title="Daily">
                    <Col>
                     
                        <Card>
                            <Statistic
                                title="Collections"
                                value={`USD ${this.state.dailyTransactions}`}
                                // precision={2}
                            />
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Statistic
                                title="Profits"
                                value={`USD ${Math.round(
                                    Number(this.state.dailyProfits)
                                )}`}
                                precision={2}
                            />
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Statistic
                                title="Expenses"
                                value={`USD ${Math.round(
                                    Number(this.state.dailyExpenses)
                                )}`}
                                precision={2}
                            />
                        </Card>
                    </Col>
                </Row>
                <br></br>
                <Row justify="center" gutter={20} title="Monthly">

                    <Col>
                        <Card>
                            <Statistic
                                title="Collections"
                                value={`USD ${this.state.monthlyTransactions}`}
                                // precision={2}
                            />
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Statistic
                                title="Profits"
                                value={`USD ${Math.round(
                                    Number(this.state.monthlyProfits)
                                )}`}
                                precision={2}
                            />
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Statistic
                                title="Expenses"
                                value={`USD ${Math.round(
                                    Number(this.state.monthlyExpenses)
                                )}`}
                                precision={2}
                            />
                        </Card>
                    </Col>
                </Row>
            </>
        )
    }
}
