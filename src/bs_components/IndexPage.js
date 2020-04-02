import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./Layout"

class IndexPage extends React.Component {
    render() {
        const siteTitle = "site title"
        return (
            <Layout location={this.props.location} title={siteTitle}>
            </Layout>
        )
    }
}

export default IndexPage;
