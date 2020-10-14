import React, { Component } from 'react';
import Head from 'next/head';
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
          <meta name='description' content={this.props.description}></meta>
          <meta name='keywords' content={this.props.keywords}></meta>
          <meta name='author' content={this.props.author}></meta>
          {props.isHome && <meta name="google-site-verification" content="hxjFc4l-CMCNGmdIW7lkTbik_bc1hNOUcuUdFwhiUBU" />}
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
          <meta charSet="UTF-8"></meta>
          <link href="https://fonts.googleapis.com/css?family=Merriweather:300,300i,400" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet"></link>
          <link rel="icon" type="image/png" sizes="32x32" href="../static/favicon-32x32.png"></link>
          <link rel="icon" type="image/png" sizes="16x16" href="../static/favicon-16x16.png"></link>
        </Head>
        <div className='layout-header'>
          <Header title={this.props.title} isHome={this.props.isHome} pageName={this.props.pageName} intro={this.props.intro} banner={this.props.banner}></Header>
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