import { Card, Col, Row, Statistic, Button } from 'antd'

import ReactECharts from 'echarts-for-react'

import { RouteComponentProps } from 'react-router'
import ApiComponent from './global/ApiComponent'

export default class Dashboard extends ApiComponent<
    RouteComponentProps<any>,
    any
> {
    constructor(props: any) {
        super(props)
        this.state = {
            isLoading: false,
            stats: {},
            collections: 0,
            profits: 0
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

    fetchStats() {
        this.getPathData({ path: '/statistics/monthly' })
            .then((stats: any) => {
                // console.log(stats, 'stats')
                this.setState({ stats })
                this.fetchCollections()
            })
            .catch(() => {})
    }

    fetchCollections() {
        this.getPathData({ path: '/statistics' })
            .then((stats: any) => {
                console.log(stats, 'stats')
                
                this.setState({ collections: stats.totalTransactions[0].amount })
                this.setState({
                    profits: stats.profit[0].profit,
                })
            })
            .catch(() => {})
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
                                    ...this.getOptions(
                                        this.state.stats.transactions
                                    ),
                                    title: {
                                        text: 'Transactions',
                                    },
                                }}
                                notMerge={true}
                                lazyUpdate={true}
                                style={{ height: '220px', width: '100%' }}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row justify="center" gutter={20}>
                    <Col>
                        <Statistic
                            title="Collections"
                            value={`USD ${this.state.collections}`}
                            // precision={2}
                        />
                    </Col>
                    <Col>
                        <Statistic
                            title="Profits"
                            value={`USD ${this.state.profits}`}
                            // precision={2}
                        />
                    </Col>
                </Row>
            </>
        )
    }
}
