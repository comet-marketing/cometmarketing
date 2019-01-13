import React, { Component } from 'react';
import Head from 'next/head';
import CmNav from './CmNav';
import Header from "./Header";
import Footer from './Footer';
import 'bootstrap/scss/bootstrap.scss';
import '../scss/main.scss';

export default class Layout extends Component {
  render() {
    return(
      <div className='layout'>
        <Head>
          <title>{this.props.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
          <link href="https://fonts.googleapis.com/css?family=Merriweather:300,300i,400" rel="stylesheet"></link>
        </Head>
        <div className='layout-header'>
          <CmNav title={this.props.title}></CmNav>
          <Header isHome={this.props.isHome} pageName={this.props.pageName} intro={this.props.intro} banner={this.props.banner}></Header>
        </div>
        <div className='layout-body'>
          {this.props.children}
        </div>
        <div className='layout-footer'>
          <Footer></Footer>
        </div>
      </div>
    )
  }
}